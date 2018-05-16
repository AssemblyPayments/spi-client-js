class Spi {

    get CurrentStatus() {
        return this._currentStatus;
    }

    set CurrentStatus(value) {
        if(this._currentStatus === value) {
            return;
        }

        this._currentStatus = value;
        document.dispatchEvent(new CustomEvent('StatusChanged', {detail: value}));
    }

    constructor(posId, eftposAddress, secrets, log) 
    {
        this._posId = posId;
        this._secrets = secrets;
        this._eftposAddress = "ws://" + eftposAddress;
        this._log = console;

        // Our stamp for signing outgoing messages
        this._spiMessageStamp = new MessageStamp(this._posId, this._secrets, 0);

        // We will maintain some state
        this._mostRecentPingSent = null;
        this._mostRecentPongReceived = null;
        this._missedPongsCount = 0;
        this._mostRecentLoginResponse = null;

        this._pongTimeout = 5000;
        this._pingFrequency = 18000;
        
        this._readyToTransact = null;
        this._periodicPingThread = null;

        this._txMonitorCheckFrequency = 1000;
        this._checkOnTxFrequency = 20000;
        this._maxWaitForCancelTx = 10000;
        this._missedPongsToDisconnect = 2;

        this.CurrentFlow                = null;
        this.CurrentPairingFlowState    = null;
        this.CurrentTxFlowState         = null;

        this._resetConn();

    }

    Start() {

        this._startTransactionMonitoringThread();

        this.CurrentFlow = SpiFlow.Idle;
        if (this._secrets != null)
        {
            this._currentStatus = SpiStatus.PairedConnecting;
            this._conn.Connect(); // This is non-blocking
        }
        else
        {
            this._currentStatus = SpiStatus.Unpaired;
        } 
    }

    /// <summary>
    /// Allows you to set the PosId which identifies this instance of your POS.
    /// Can only be called in thge Unpaired state. 
    /// </summary>
    SetPosId(posId)
    {
        if (this.CurrentStatus != SpiStatus.Unpaired)
            return false;

        this._posId = posId;
        this._spiMessageStamp.PosId = posId;
        return true;
    }

    /// <summary>
    /// Allows you to set the PinPad address. Sometimes the PinPad might change IP address 
    /// (we recommend reserving static IPs if possible).
    /// Either way you need to allow your User to enter the IP address of the PinPad.
    /// </summary>
    SetEftposAddress(address)
    {
        if (this.CurrentStatus == SpiStatus.PairedConnected) {
            return false;
        }

        this._eftposAddress = "ws://" + address;
        this._conn.Address = this._eftposAddress;
        return true;
    }

    /// <summary>
    /// Call this one when a flow is finished and you want to go back to idle state.
    /// Typically when your user clicks the "OK" bubtton to acknowldge that pairing is
    /// finished, or that transaction is finished.
    /// When true, you can dismiss the flow screen and show back the idle screen.
    /// </summary>
    /// <returns>true means we have moved back to the Idle state. false means current flow was not finished yet.</returns>
    AckFlowEndedAndBackToIdle()
    {
        if (this.CurrentFlow == SpiFlow.Idle)
            return true; // already idle

        if (this.CurrentFlow == SpiFlow.Pairing && this.CurrentPairingFlowState.Finished)
        {
            this.CurrentFlow = SpiFlow.Idle;
            return true;
        }
        
        if (this.CurrentFlow == SpiFlow.Transaction && this.CurrentTxFlowState.Finished)
        {
            this.CurrentFlow = SpiFlow.Idle;
            return true;
        }

        return false;
    }

    /// <summary>
    /// This will connect to the Eftpos and start the pairing process.
    /// Only call this if you are in the Unpaired state.
    /// Subscribe to the PairingFlowStateChanged event to get updates on the pairing process.
    /// </summary>
    Pair()
    {
        if (this.CurrentStatus != SpiStatus.Unpaired) {
            return;
        }

        this.CurrentFlow = SpiFlow.Pairing;
        this.CurrentPairingFlowState = new PairingFlowState
        ({
            Successful: false,
            Finished: false,
            Message: "Connecting...",
            AwaitingCheckFromEftpos: false,
            AwaitingCheckFromPos: false,
            ConfirmationCode: ""
        });

        document.dispatchEvent(new CustomEvent('PairingFlowStateChanged', {detail: this.CurrentPairingFlowState}));
        this._conn.Connect(); // Non-Blocking
    }

    /// <summary>
    /// Call this when your user clicks yes to confirm the pairing code on your 
    /// screen matches the one on the Eftpos.
    /// </summary>
    PairingConfirmCode()
    {
        if (!this.CurrentPairingFlowState.AwaitingCheckFromPos)
        {
            // We weren't expecting this
            return;
        }

        this.CurrentPairingFlowState.AwaitingCheckFromPos = false;
        if (this.CurrentPairingFlowState.AwaitingCheckFromEftpos)
        {
            // But we are still waiting for confirmation from Eftpos side.
            this.CurrentPairingFlowState.Message =
                "Click YES on EFTPOS if code is: " + this.CurrentPairingFlowState.ConfirmationCode;
        }
        else
        {
            // Already confirmed from Eftpos - So all good now. We're Paired also from the POS perspective.
            this.CurrentPairingFlowState.Message = "Pairing Successful";
            this._onPairingSuccess();
            this._onReadyToTransact();
        }
        document.dispatchEvent(new CustomEvent('PairingFlowStateChanged', {detail: this.CurrentPairingFlowState}));
    }

    /// <summary>
    /// Call this if your user clicks CANCEL or NO during the pairing process.
    /// </summary>
    PairingCancel()
    {
        if (this.CurrentFlow != SpiFlow.Pairing || this.CurrentPairingFlowState.Finished) {
            return;
        }

        this.CurrentPairingFlowState.Message = "Pairing Canelled";
        this._onPairingFailed();

        document.dispatchEvent(new CustomEvent('PairingFlowStateChanged', {detail: this.CurrentPairingFlowState}));
    }

    /// <summary>
    /// Call this when your uses clicks the Unpair button.
    /// This will disconnect from the Eftpos and forget the secrets.
    /// The CurrentState is then changed to Unpaired.
    /// Call this only if you are not yet in the Unpaired state.
    /// </summary>
    Unpair()
    {
        if (this.CurrentStatus == SpiStatus.Unpaired) {
            return false;
        }

        if (this.CurrentFlow != SpiFlow.Idle) {
            return false;
        }
        
        this.CurrentStatus = SpiStatus.Unpaired;

        this._conn.Disconnect();
        this._secrets = null;
        this._spiMessageStamp.Secrets = null;
        document.dispatchEvent(new CustomEvent('SecretsChanged', {detail: this._secrets}));
        return true;
    }

    /// <summary>
    /// Initiates a purchase transaction. Be subscribed to TxFlowStateChanged event to get updates on the process.
    /// </summary>
    /// <param name="id">Alphanumeric Identifier for your purchase.</param>
    /// <param name="amountCents">Amount in Cents to charge</param>
    /// <returns>InitiateTxResult</returns>
    InitiatePurchaseTx(id, amountCents)
    {
        if (this.CurrentStatus == SpiStatus.Unpaired) {
            return new InitiateTxResult(false, "Not Paired");
        }

        if (this.CurrentFlow != SpiFlow.Idle) {
            return new InitiateTxResult(false, "Not Idle");
        }

        var purchase = PurchaseHelper.CreatePurchaseRequest(amountCents, id);
        this.CurrentFlow = SpiFlow.Transaction;
        this.CurrentTxFlowState = new TransactionFlowState(
            id, TransactionType.Purchase, amountCents, purchase.ToMessage(),
            `Waiting for EFTPOS connection to make payment request for ${amountCents / 100.0}`);
        if (this._send(purchase.ToMessage()))
        {
            this.CurrentTxFlowState.Sent(`Asked EFTPOS to accept payment for ${amountCents / 100.0}`);
        }
        
        document.dispatchEvent(new CustomEvent('TxFlowStateChanged', {detail: this.CurrentTxFlowState}));
        return new InitiateTxResult(true, "Purchase Initiated");
    }

    /// <summary>
    /// Initiates a refund transaction. Be subscribed to TxFlowStateChanged event to get updates on the process.
    /// </summary>
    /// <param name="id">Alphanumeric Identifier for your refund.</param>
    /// <param name="amountCents">Amount in Cents to charge</param>
    /// <returns>InitiateTxResult</returns>
    InitiateRefundTx(id, amountCents)
    {
        if (this.CurrentStatus == SpiStatus.Unpaired) {
            return new InitiateTxResult(false, "Not Paired");
        }

        if (this.CurrentFlow != SpiFlow.Idle) {
            return new InitiateTxResult(false, "Not Idle");
        }

        var purchase = PurchaseHelper.CreateRefundRequest(amountCents, id);
        this.CurrentFlow = SpiFlow.Transaction;
        this.CurrentTxFlowState = new TransactionFlowState(
            id, TransactionType.Refund, amountCents, purchase.ToMessage(), 
            `Waiting for EFTPOS connection to make refund request for ${amountCents / 100.0}`);
        if (this._send(purchase.ToMessage()))
        {
            this.CurrentTxFlowState.Sent(`Asked EFTPOS to refund ${amountCents / 100.0}`);
        }
        
        document.dispatchEvent(new CustomEvent('TxFlowStateChanged', {detail: this.CurrentTxFlowState}));
        return new InitiateTxResult(true,"Refund Initiated");
    }
    
    /// <summary>
    /// Let the EFTPOS know whether merchant accepted or declined the signature
    /// </summary>
    /// <param name="accepted">whether merchant accepted the signature from customer or not</param>
    AcceptSignature(accepted)
    {

        if (this.CurrentFlow != SpiFlow.Transaction || this.CurrentTxFlowState.Finished || !this.CurrentTxFlowState.AwaitingSignatureCheck)
        {
            this._log.info("Asked to accept signature but I was not waiting for one.");
            return;
        }

        this.CurrentTxFlowState.SignatureResponded(accepted ? "Accepting Signature..." : "Declining Signature...");
        var sigReqMsg = this.CurrentTxFlowState.SignatureRequiredMessage;
        this._send(accepted
            ? new SignatureAccept(sigReqMsg.RequestId).ToMessage()
            : new SignatureDecline(sigReqMsg.RequestId).ToMessage());
        
        document.dispatchEvent(new CustomEvent('TxFlowStateChanged', {detail: this.CurrentTxFlowState}));
    }

    /// <summary>
    /// Attempts to cancel a Transaction. 
    /// Be subscribed to TxFlowStateChanged event to see how it goes.
    /// Wait for the transaction to be finished and then see whether cancellation was successful or not.
    /// </summary>
    CancelTransaction()
    {
        if (this.CurrentFlow != SpiFlow.Transaction || this.CurrentTxFlowState.Finished)
        {
            this._log.info("Asked to cancel transaction but I was not in the middle of one.");
            return;
        }

        // TH-1C, TH-3C - Merchant pressed cancel
        if (this.CurrentTxFlowState.RequestSent)
        {
            var cancelReq = new CancelTransactionRequest();
            this.CurrentTxFlowState.Cancelling("Attempting to Cancel Transaction...");
            this._send(cancelReq.ToMessage());
        }
        else
        {
            // We Had Not Even Sent Request Yet. Consider as known failed.
            this.CurrentTxFlowState.Failed(null, "Transaction Cancelled. Request Had not even been sent yet.");
        }
        
        document.dispatchEvent(new CustomEvent('TxFlowStateChanged', {detail: this.CurrentTxFlowState}));
    }

    /// <summary>
    /// Initiates a cashout only transaction. Be subscribed to TxFlowStateChanged event to get updates on the process.
    /// </summary>
    /// <param name="posRefId">Alphanumeric Identifier for your transaction.</param>
    /// <param name="amountCents">Amount in Cents to cash out</param>
    /// <returns>InitiateTxResult</returns>
    InitiateCashoutOnlyTx(posRefId, amountCents)
    {
        if (this.CurrentStatus == SpiStatus.Unpaired) return new InitiateTxResult(false, "Not Paired");

        if (this.CurrentFlow != SpiFlow.Idle) return new InitiateTxResult(false, "Not Idle");
        var cashoutOnlyRequest = new CashoutOnlyRequest(amountCents, posRefId);
        cashoutOnlyRequest.Config = Config;
        var cashoutMsg = cashoutOnlyRequest.ToMessage();
        this.CurrentFlow = SpiFlow.Transaction;
        this.CurrentTxFlowState = new TransactionFlowState(
            posRefId, TransactionType.CashoutOnly, amountCents, cashoutMsg,
            `Waiting for EFTPOS connection to send cashout request for ${amountCents / 100}`);
        if (this._send(cashoutMsg))
        {
            this.CurrentTxFlowState.Sent(`Asked EFTPOS to do cashout for ${amountCents / 100}`);
        }
        
        document.dispatchEvent(new CustomEvent('TxFlowStateChanged', {detail: this.CurrentTxFlowState}));
        return new InitiateTxResult(true, "Cashout Initiated");
    }    

    /// <summary>
    /// Initiates a Mail Order / Telephone Order Purchase Transaction
    /// </summary>
    /// <param name="posRefId">Alphanumeric Identifier for your transaction.</param>
    /// <param name="amountCents">Amount in Cents</param>
    /// <returns>InitiateTxResult</returns>
    InitiateMotoPurchaseTx(posRefId, amountCents)
    {
        if (this.CurrentStatus == SpiStatus.Unpaired) return new InitiateTxResult(false, "Not Paired");

        if (this.CurrentFlow != SpiFlow.Idle) return new InitiateTxResult(false, "Not Idle");
        var motoPurchaseRequest = new MotoPurchaseRequest(amountCents, posRefId);
        motoPurchaseRequest.Config = Config;
        var cashoutMsg = motoPurchaseRequest.ToMessage();
        this.CurrentFlow = SpiFlow.Transaction;
        this.CurrentTxFlowState = new TransactionFlowState(
            posRefId, TransactionType.MOTO, amountCents, cashoutMsg,
            `Waiting for EFTPOS connection to send MOTO request for ${amountCents / 100}`);
        if (this._send(cashoutMsg))
        {
            this.CurrentTxFlowState.Sent(`Asked EFTPOS do MOTO for ${amountCents / 100}`);
        }
        
        document.dispatchEvent(new CustomEvent('TxFlowStateChanged', {detail: this.CurrentTxFlowState}));
        return new InitiateTxResult(true, "MOTO Initiated");
    }

    /// <summary>
    /// Initiates a settlement transaction.
    /// Be subscribed to TxFlowStateChanged event to get updates on the process.
    /// </summary>
    InitiateSettleTx(posRefId)
    {
        if (this.CurrentStatus == SpiStatus.Unpaired) {
            return new InitiateTxResult(false, "Not Paired");
        }

        if (this.CurrentFlow != SpiFlow.Idle) {
            return new InitiateTxResult(false, "Not Idle");
        }

        var settleRequestMsg = new SettleRequest(RequestIdHelper.Id("settle")).ToMessage();
        this.CurrentFlow = SpiFlow.Transaction;
        this.CurrentTxFlowState = new TransactionFlowState(
            posRefId, TransactionType.Settle, 0, settleRequestMsg, 
            `Waiting for EFTPOS connection to make a settle request`);

        if (this._send(settleRequestMsg))
        {
            this.CurrentTxFlowState.Sent(`Asked EFTPOS to settle.`);
        }
        
        document.dispatchEvent(new CustomEvent('TxFlowStateChanged', {detail: this.CurrentTxFlowState}));
        return new InitiateTxResult(true,"Settle Initiated");   
    }

    /// <summary>
    /// </summary>
    InitiateSettlementEnquiry(posRefId)
    {
        if (this.CurrentStatus == SpiStatus.Unpaired) return new InitiateTxResult(false, "Not Paired");

        if (this.CurrentFlow != SpiFlow.Idle) return new InitiateTxResult(false, "Not Idle");
        var stlEnqMsg = new SettlementEnquiryRequest(RequestIdHelper.Id("stlenq")).ToMessage();
        this.CurrentFlow = SpiFlow.Transaction;
        this.CurrentTxFlowState = new TransactionFlowState(
            posRefId, TransactionType.SettlementEnquiry, 0, stlEnqMsg,
            "Waiting for EFTPOS connection to make a settlement enquiry");
        if (this._send(stlEnqMsg))
        {
            this.CurrentTxFlowState.Sent("Asked EFTPOS to make a settlement enquiry.");
        }
        
        document.dispatchEvent(new CustomEvent('TxFlowStateChanged', {detail: this.CurrentTxFlowState}));
        return new InitiateTxResult(true,"Settle Initiated");   
    }

    /// <summary>
    /// Initiates a Get Last Transaction. Use this when you want to retrieve the most recent transaction
    /// that was processed by the Eftpos.
    /// Be subscribed to TxFlowStateChanged event to get updates on the process.
    /// </summary>
    InitiateGetLastTx()
    {
        if (this.CurrentStatus == SpiStatus.Unpaired) {
            return new InitiateTxResult(false, "Not Paired");
        }

        if (this.CurrentFlow != SpiFlow.Idle) {
            return new InitiateTxResult(false, "Not Idle");
        }

        var gltRequestMsg = new GetLastTransactionRequest().ToMessage();
        this.CurrentFlow = SpiFlow.Transaction;
        var posRefId = gltRequestMsg.Id; // GetLastTx is not trying to get anything specific back. So we just use the message id.
        this.CurrentTxFlowState = new TransactionFlowState(
            posRefId, TransactionType.GetLastTransaction, 0, gltRequestMsg, 
            "Waiting for EFTPOS connection to make a Get-Last-Transaction request.");
        
        if (this._send(gltRequestMsg))
        {
            this.CurrentTxFlowState.Sent(`Asked EFTPOS for last transaction.`);
        }
    
        document.dispatchEvent(new CustomEvent('TxFlowStateChanged', {detail: this.CurrentTxFlowState}));
        return new InitiateTxResult(true, "GLT Initiated");   
    }

    /// <summary>
    /// This is useful to recover from your POS crashing in the middle of a transaction.
    /// When you restart your POS, if you had saved enough state, you can call this method to recover the client library state.
    /// You need to have the posRefId that you passed in with the original transaction, and the transaction type.
    /// This method will return immediately whether recovery has started or not.
    /// If recovery has started, you need to bring up the transaction modal to your user a be listening to TxFlowStateChanged.
    /// </summary>
    /// <param name="posRefId">The is that you had assigned to the transaction that you are trying to recover.</param>
    /// <param name="txType">The transaction type.</param>
    /// <returns></returns>
    InitiateRecovery(posRefId, txType)
    {
        if (this.CurrentStatus == SpiStatus.Unpaired) return new InitiateTxResult(false, "Not Paired");
    
        if (this.CurrentFlow != SpiFlow.Idle) return new InitiateTxResult(false, "Not Idle");
        
        this.CurrentFlow = SpiFlow.Transaction;
        
        var gltRequestMsg = new GetLastTransactionRequest().ToMessage();
        this.CurrentTxFlowState = new TransactionFlowState(
            posRefId, txType, 0, gltRequestMsg, 
            "Waiting for EFTPOS connection to attempt recovery.");
        
        if (this._send(gltRequestMsg))
        {
            this.CurrentTxFlowState.Sent(`Asked EFTPOS to recover state.`);
        }
    
        document.dispatchEvent(new CustomEvent('TxFlowStateChanged', {detail: this.CurrentTxFlowState}));
        return new InitiateTxResult(true, "Recovery Initiated");
    }

    /// <summary>
    /// Handling the 2nd interaction of the pairing process, i.e. an incoming KeyRequest.
    /// </summary>
    /// <param name="m">incoming message</param>
    _handleKeyRequest(m)
    {
        this.CurrentPairingFlowState.Message = "Negotiating Pairing...";
        document.dispatchEvent(new CustomEvent('PairingFlowStateChanged', {detail: this.CurrentPairingFlowState}));

        // Use the helper. It takes the incoming request, and generates the secrets and the response.
        var ph      = new PairingHelper();
        var result  = ph.GenerateSecretsAndKeyResponse(new KeyRequest(m));
        this._secrets = result.Secrets; // we now have secrets, although pairing is not fully finished yet.
        this._spiMessageStamp.Secrets = this._secrets; // updating our stamp with the secrets so can encrypt messages later.
        this._send(result.KeyResponse.ToMessage()); // send the key_response, i.e. interaction 3 of pairing.
    }

    /// <summary>
    /// Handling the 4th interaction of the pairing process i.e. an incoming KeyCheck.
    /// </summary>
    /// <param name="m"></param>
    _handleKeyCheck(m)
    {
        var keyCheck = new KeyCheck(m);
        this.CurrentPairingFlowState.ConfirmationCode = keyCheck.ConfirmationCode;
        this.CurrentPairingFlowState.AwaitingCheckFromEftpos = true;
        this.CurrentPairingFlowState.AwaitingCheckFromPos = true;
        this.CurrentPairingFlowState.Message = "Confirm that the following Code is showing on the Terminal";
        document.dispatchEvent(new CustomEvent('PairingFlowStateChanged', {detail: this.CurrentPairingFlowState}));
    }


    /// <summary>
    /// Handling the 5th and final interaction of the pairing process, i.e. an incoming PairResponse
    /// </summary>
    /// <param name="m"></param>
    _handlePairResponse(m)
    {
        var pairResp = new PairResponse(m);

        this.CurrentPairingFlowState.AwaitingCheckFromEftpos = false;
        if (pairResp.Success)
        {
            if (this.CurrentPairingFlowState.AwaitingCheckFromPos)
            {
                // Still Waiting for User to say yes on POS
                this.CurrentPairingFlowState.Message = "Confirm that the following Code is what the EFTPOS showed";
            }
            else
            {
                this.CurrentPairingFlowState.Message = "Pairing Successful";
                this._onPairingSuccess();
            }
            // I need to ping/login even if the pos user has not said yes yet, 
            // because otherwise within 5 seconds connectiong will be dropped by eftpos.
            this._startPeriodicPing();
        }
        else
        {
            this.CurrentPairingFlowState.Message = "Pairing Failed";
            this._onPairingFailed();
        }

        document.dispatchEvent(new CustomEvent('PairingFlowStateChanged', {detail: this.CurrentPairingFlowState}));
    }

    _onPairingSuccess()
    {
        this.CurrentPairingFlowState.Successful = true;
        this.CurrentPairingFlowState.Finished = true;
        this.CurrentPairingFlowState.Message = "Pairing Successful!";
        this.CurrentStatus = SpiStatus.PairedConnected;
        document.dispatchEvent(new CustomEvent('SecretsChanged', {detail: this._secrets}));
        document.dispatchEvent(new CustomEvent('PairingFlowStateChanged', {detail: this.CurrentPairingFlowState}));
    }

    _onPairingFailed()
    {
        this._secrets = null;
        this._spiMessageStamp.Secrets = null;
        this._conn.Disconnect();

        this.CurrentStatus = SpiStatus.Unpaired;
        this.CurrentPairingFlowState.Message = "Pairing Failed";
        this.CurrentPairingFlowState.Finished = true;
        this.CurrentPairingFlowState.Successful = false;
        this.CurrentPairingFlowState.AwaitingCheckFromPos = false;
        document.dispatchEvent(new CustomEvent('PairingFlowStateChanged', {detail: this.CurrentPairingFlowState}));
    }

    /// <summary>
    /// Sometimes the server asks us to roll our secrets.
    /// </summary>
    /// <param name="m"></param>
    _handleKeyRollingRequest(m)
    {
        // we calculate the new ones...
        var krRes = KeyRollingHelper.PerformKeyRolling(m, this._secrets);
        this._secrets = krRes.NewSecrets; // and update our secrets with them
        this._spiMessageStamp.Secrets = this._secrets; // and our stamp
        this._send(krRes.KeyRollingConfirmation); // and we tell the server that all is well.
        document.dispatchEvent(new CustomEvent('SecretsChanged', {detail: this._secrets}));
    }

    /// <summary>
    /// The PinPad server will send us this message when a customer signature is reqired.
    /// We need to ask the customer to sign the incoming receipt.
    /// And then tell the pinpad whether the signature is ok or not.
    /// </summary>
    /// <param name="m"></param>
    _handleSignatureRequired(m)
    {

        if (this.CurrentFlow != SpiFlow.Transaction || this.CurrentTxFlowState.Finished)
        {
            this._log.info(`Received Signature Required but I was not waiting for one. ${m.DecryptedJson}`);
            return;
        }
        this.CurrentTxFlowState.SignatureRequired(new SignatureRequired(m), "Ask Customer to Sign the Receipt");
    
        document.dispatchEvent(new CustomEvent('TxFlowStateChanged', {detail: this.CurrentTxFlowState}));
    }

    /// <summary>
    /// The PinPad server will reply to our PurchaseRequest with a PurchaseResponse.
    /// </summary>
    /// <param name="m"></param>
    _handlePurchaseResponse(m)
    {

        if (this.CurrentFlow != SpiFlow.Transaction || this.CurrentTxFlowState.Finished)
        {
            this._log.info(`Received Purchase response but I was not waiting for one. ${m.DecryptedJson}`);
            return;
        }
        // TH-1A, TH-2A
        
        this.CurrentTxFlowState.Completed(m.GetSuccessState(), m, "Purchase Transaction Ended.");
        // TH-6A, TH-6E
        
        document.dispatchEvent(new CustomEvent('TxFlowStateChanged', {detail: this.CurrentTxFlowState}));
    }

    /// <summary>
    /// The PinPad server will reply to our RefundRequest with a RefundResponse.
    /// </summary>
    /// <param name="m"></param>
    _handleRefundResponse(m)
    {
        if (this.CurrentFlow != SpiFlow.Transaction || this.CurrentTxFlowState.Finished)
        {
            this._log.info(`Received Refund response but I was not waiting for one. ${m.DecryptedJson}`);
            return;
        }
        // TH-1A, TH-2A
        
        this.CurrentTxFlowState.Completed(m.GetSuccessState(), m, "Refund Transaction Ended.");
        // TH-6A, TH-6E
        
        document.dispatchEvent(new CustomEvent('TxFlowStateChanged', {detail: this.CurrentTxFlowState}));
    }

    /// <summary>
    /// TODO: Handle the Settlement Response received from the PinPad
    /// </summary>
    /// <param name="m"></param>
    HandleSettleResponse(m)
    {
        if (this.CurrentFlow != SpiFlow.Transaction || this.CurrentTxFlowState.Finished)
        {
            this._log.info(`Received Settle response but I was not waiting for one. ${m.DecryptedJson}`);
            return;
        }
        // TH-1A, TH-2A
        
        this.CurrentTxFlowState.Completed(m.GetSuccessState(), m, "Settle Transaction Ended.");
        // TH-6A, TH-6E
    
        document.dispatchEvent(new CustomEvent('TxFlowStateChanged', {detail: this.CurrentTxFlowState}));
    }

    /// <summary>
    /// Sometimes we receive event type "error" from the server, such as when calling cancel_transaction and there is no transaction in progress.
    /// </summary>
    /// <param name="m"></param>
    _handleErrorEvent(m)
    {
        if (this.CurrentFlow == SpiFlow.Transaction
            && !this.CurrentTxFlowState.Finished
            && this.CurrentTxFlowState.AttemptingToCancel
            && m.GetError() == "NO_TRANSACTION")
        {
            // TH-2E
            this._log.info(`Was trying to cancel a transaction but there is nothing to cancel. Calling GLT to see what's up`);
            this._callGetLastTransaction();
        }
        else
        {
            this._log.info(`Received Error Event But Don't know what to do with it. ${m.DecryptedJson}`);
        }
    }
    /// <summary>
    /// GltMatch attempts to conclude whether a gltResponse matches an expected transaction and returns
    /// the outcome. 
    /// If Success/Failed is returned, it means that the gtlResponse did match, and that transaction was succesful/failed.
    /// If Unknown is returned, it means that the gtlResponse does not match the expected transaction. 
    /// </summary>
    /// <param name="gltResponse">The GetLastTransactionResponse message to check</param>
    /// <param name="expectedType">The expected Type, Purchase/Refund/...</param>
    /// <param name="expectedAmount">The expected Amount in cents</param>
    /// <param name="requestTime">The time you made your request.</param>
    /// <param name="posRefId">The Reference Id that you passed in with the original request. Currently not used. 
    /// But will be used in the future for abetter conclusion.</param>
    /// <returns></returns>
    GltMatch(gltResponse, expectedType, expectedAmount, requestTime, posRefId) {

        // adjust request time for serverTime and also give 5 seconds slack.
        var reqServerTime = new Date(requestTime + this._spiMessageStamp.ServerTimeDelta - 5000);

        /* Transformat into  ISO format */
        var bankDateTime = gltResponse.GetBankDateTimeString();
        var gtlBankTime = new Date(bankDateTime.substring(4, 8) + "-" 
            + bankDateTime.substring(2, 4) + "-"
            + bankDateTime.substring(0, 2) + "T"
            + bankDateTime.substring(8, 10)+":"+ bankDateTime.substring(10, 12) +":"+bankDateTime.substring(12, 14));

        // For now we use amount and date to match as best we can.
        // In the future we will be able to pass our own pos_ref_id in the tx request that will be returned here.
        this._log.info(`Amount: ${expectedAmount}->${gltResponse.GetTransactionAmount()}, Date: ${reqServerTime}->${gtlBankTime}`);
        
        if (gltResponse.GetTransactionAmount() != expectedAmount)
        {
            return SuccessState.Unknown;
        }

        switch (gltResponse.GetTxType())
        {
            case "PURCHASE":
                if (expectedType != TransactionType.Purchase) 
                    return SuccessState.Unknown;
                break;
            case "REFUND":
                if (expectedType != TransactionType.Refund) 
                    return SuccessState.Unknown;
                break;
            default: 
                return SuccessState.Unknown;
        }

        if (reqServerTime > gtlBankTime) 
        {
            return SuccessState.Unknown;
        }

        // For now we use amount and date to match as best we can.
        // In the future we will be able to pass our own pos_ref_id in the tx request that will be returned here.
        return gltResponse.GetSuccessState();
    }


    /// <summary>
    /// When the PinPad returns to us what the Last Transaction was.
    /// </summary>
    /// <param name="m"></param>
    _handleGetLastTransactionResponse(m)
    {
        var txState = this.CurrentTxFlowState;
        if (this.CurrentFlow != SpiFlow.Transaction || txState.Finished)
        {
            // We were not in the middle of a transaction, who cares?
            return;
        }

        // TH-4 We were in the middle of a transaction.
        // Let's attempt recovery. This is step 4 of Transaction Processing Handling
        this._log.info(`Got Last Transaction.. Attempting Recovery.`);
        txState.GotGltResponse();

        var gtlResponse = new GetLastTransactionResponse(m);
        if (!gtlResponse.WasRetrievedSuccessfully())
        {
            if (gtlResponse.WasOperationInProgressError())
            {
                // TH-4E - Operation In Progress
                this._log.info(`Operation still in progress... stay waiting.`);
            }
            else
            {
                // TH-4X - Unexpected Error when recovering
                this._log.info(`Unexpected error in Get Last Transaction Response during Transaction Recovery: ${m.GetError()}`);
                txState.UnknownCompleted(`Unexpected Error when recovering Transaction Status. Check EFTPOS.`);
            }
        }
        else
        {
            if (txState.Type === TransactionType.GetLastTransaction)
            {
                // THIS WAS A PLAIN GET LAST TRANSACTION REQUEST, NOT FOR RECOVERY PURPOSES.
                this._log.info("Retrieved Last Transaction as asked directly by the user.");
                gtlResponse.CopyMerchantReceiptToCustomerReceipt();
                txState.Completed(m.GetSuccessState(), m, "Last Transaction Retrieved");
            } 
            else 
            {
                let successState = this.GltMatch(gtlResponse, txState.Type, txState.AmountCents, txState.RequestTime, "_NOT_IMPL_YET");
                if (successState == SuccessState.Unknown) 
                {
                    // TH-4N: Didn't Match our transaction. Consider Unknown State.
                    this._log.info(`Did not match transaction.`);
                    txState.UnknownCompleted("Failed to recover Transaction Status. Check EFTPOS. ");
                }
                else
                {
                    // TH-4Y: We Matched, transaction finished, let's update ourselves
                    gtlResponse.CopyMerchantReceiptToCustomerReceipt();
                    txState.Completed(m.GetSuccessState(), m, "GLT Transaction Ended.");
                }
            }
        }
        document.dispatchEvent(new CustomEvent('TxFlowStateChanged', {detail: txState}));
    }

    _startTransactionMonitoringThread()
    {
        var needsPublishing = false;
    
        var txState = this.CurrentTxFlowState;
        if (this.CurrentFlow == SpiFlow.Transaction && !txState.Finished)
        {
            var state = txState;
            if (state.AttemptingToCancel && Date.now() > state.CancelAttemptTime + this._maxWaitForCancelTx)
            {
                // TH-2T - too long since cancel attempt - Consider unknown
                this._log.info(`Been too long waiting for transaction to cancel.`);
                txState.UnknownCompleted(`Waited long enough for Cancel Transaction result. Check EFTPOS. `);
                needsPublishing = true;
            }
            else if (state.RequestSent && Date.now() > state.LastStateRequestTime + this._checkOnTxFrequency)
            {
                // TH-1T, TH-4T - It's been a while since we received an update, let's call a GLT
                this._log.info(`Checking on our transaction. Last we asked was at ${state.LastStateRequestTime}...`);
                txState.CallingGlt();
                this._callGetLastTransaction();
            }
        }
        
        if (needsPublishing) {
            document.dispatchEvent(new CustomEvent('TxFlowStateChanged', {detail: this.CurrentTxFlowState}));
        }

        setTimeout(() => this._startTransactionMonitoringThread(), this._txMonitorCheckFrequency);
    }

    _resetConn()
    {
        // Setup the Connection
        this._conn = new Connection();
        this._conn.Address = this._eftposAddress;

        // Register our Event Handlers
        document.addEventListener('ConnectionStatusChanged', (e) => this._onSpiConnectionStatusChanged(e.detail));
        document.addEventListener('MessageReceived', (e) => this._onSpiMessageReceived(e.detail.data));
        document.addEventListener('ErrorReceived', (e) => this._onWsErrorReceived(e.detail));
    }

    /// <summary>
    /// This method will be called when the connection status changes.
    /// You are encouraged to display a PinPad Connection Indicator on the POS screen.
    /// </summary>
    /// <param name="state"></param>
    _onSpiConnectionStatusChanged(state)
    {
        switch (state)
        {
            case ConnectionState.Connecting:
                this._log.info(`I'm Connecting to the Eftpos at ${this._eftposAddress}...`);
                break;

            case ConnectionState.Connected:
                if (this.CurrentFlow == SpiFlow.Pairing)
                {
                    this.CurrentPairingFlowState.Message = "Requesting to Pair...";
                    document.dispatchEvent(new CustomEvent('PairingFlowStateChanged', {detail: this.CurrentPairingFlowState}));
                    var pr = PairingHelper.NewPairRequest();
                    this._send(pr.ToMessage());
                }
                else
                {
                    this._log.info(`I'm Connected to ${this._eftposAddress}...`);
                    this._spiMessageStamp.Secrets = this._secrets;
                    this._startPeriodicPing();
                }
                break;

            case ConnectionState.Disconnected:
                // Let's reset some lifecycle related to connection state, ready for next connection
                this._log.info(`I'm disconnected from ${this._eftposAddress}...`);
                this._mostRecentPingSent = null;
                this._mostRecentPongReceived = null;
                this._missedPongsCount = 0;
                this._mostRecentLoginResponse = null;
                this._readyToTransact = false;
                this._stopPeriodicPing();

                if (this.CurrentStatus != SpiStatus.Unpaired)
                {
                    this.CurrentStatus = SpiStatus.PairedConnecting;

                    if (this.CurrentFlow == SpiFlow.Transaction && !this.CurrentTxFlowState.Finished)
                    {
                        // we're in the middle of a transaction, just so you know!
                        // TH-1D
                        this._log.info(`Lost connection in the middle of a transaction...`);
                    }
                    
                    this._log.info(`Will try to reconnect in 5s...`);

                    setTimeout(() => {
                        if (this.CurrentStatus != SpiStatus.Unpaired)
                        {
                            // This is non-blocking
                            this._conn.Connect();
                        }
                    }, 5000);
                }
                else if (this.CurrentFlow == SpiFlow.Pairing)
                {
                    this._log.info("Lost Connection during pairing.");
                    this.CurrentPairingFlowState.Message = "Could not Connect to Pair. Check Network and Try Again...";
                    this._onPairingFailed();
                    document.dispatchEvent(new CustomEvent('PairingFlowStateChanged', {detail: this.CurrentPairingFlowState}));
                }
                break;
            default:
                throw new Exception('Unknown state: ' + state);
        }
    }

    _startPeriodicPing() {
        this._stopPeriodicPing();
        this._periodicPingThread = setInterval(() => this._periodicPing(),this._pingFrequency);
        this._periodicPing();
    }

    _periodicPing() {
        // while i'm still connected AND paired...
        if(this._conn.Connected && this._secrets != null) {
            this._doPing();

            setTimeout(() => {
                if (this._mostRecentPingSent != null &&
                    (this._mostRecentPongReceived == null || this._mostRecentPongReceived.Id != this._mostRecentPingSent.Id))
                {
                    this._missedPongsCount += 1;

                    this._log.info(`Eftpos didn't reply to my Ping. Missed Count: ${this._missedPongsCount}/${this._missedPongsToDisconnect}.`);

                    if (this._missedPongsCount < this._missedPongsToDisconnect)
                    {
                        this._log.info("Trying another ping...");
                        this._startPeriodicPing();
                        return;
                    }

                    // This means that we have not received a pong for our most recent ping.
                    // We consider this connection as broken.
                    // Let's Disconnect.
                    this._log.info("Disconnecting...");
                    this._conn.Disconnect();
                    this._readyToTransact = false;
                    this._stopPeriodicPing();
                }

                this._missedPongsCount = 0;

            },this._pongTimeout);

        } else {
            this._stopPeriodicPing();
            this._log.info("Cancelling periodic ping as were disconnected or not paired");
        }
    }

    /// <summary>
    /// We call this ourselves as soon as we're ready to transact with the PinPad after a connection is established.
    /// This function is effectively called after we received the first Login Response from the PinPad.
    /// </summary>
    _onReadyToTransact()
    {
        // So, we have just made a connection, pinged and logged in successfully.
        this.CurrentStatus = SpiStatus.PairedConnected;

        if (this.CurrentFlow == SpiFlow.Transaction && !this.CurrentTxFlowState.Finished)
        {
            if (this.CurrentTxFlowState.RequestSent)
            {
                // TH-3A - We've just reconnected and were in the middle of Tx.
                // Let's get the last transaction to check what we might have missed out on.
                this.CurrentTxFlowState.CallingGlt();
                this._callGetLastTransaction();
            }
            else
            {
                // TH-3AR - We had not even sent the request yet. Let's do that now
                this._send(this.CurrentTxFlowState.Request);
                this.CurrentTxFlowState.Sent(`Asked EFTPOS to accept payment for ${this.CurrentTxFlowState.AmountCents / 100.0}`);
                document.dispatchEvent(new CustomEvent('TxFlowStateChanged', {detail: this.CurrentTxFlowState}));
            }
        }
    }

    /// <summary>
    /// When we disconnect, we should also stop the periodic ping.
    /// </summary>
    _stopPeriodicPing() {
        if(this._periodicPingThread) {
            // If we were already set up, clean up before restarting.
            clearInterval(this._periodicPingThread);
            this._periodicPingThread = null;
        }
    }


    // Send a Ping to the Server
    _doPing()
    {
        var ping = PingHelper.GeneratePingRequest();
        this._mostRecentPingSent = ping;
        this._send(ping);
    }

    /// <summary>
    /// Received a Pong from the server
    /// </summary>
    /// <param name="m"></param>
    _handleIncomingPong(m)
    {
        // We need to maintain this time delta otherwise the server will not accept our messages.
        this._spiMessageStamp.ServerTimeDelta = m.GetServerTimeDelta();

        if (this._mostRecentLoginResponse == null ||
            this._mostRecentLoginResponse.ExpiringSoon(this._spiMessageStamp.ServerTimeDelta))
        {
            // We have not logged in yet, or login expiring soon.
            this._doLogin();
        }
        this._mostRecentPongReceived = m;
    }

    /// <summary>
    /// Login is a mute thing but is required. 
    /// </summary>
    _doLogin()
    {
        var lr = LoginHelper.NewLoginRequest();
        this._send(lr.ToMessage());
    }

    /// <summary>
    /// When the server replied to our LoginRequest with a LoginResponse, we take note of it.
    /// </summary>
    /// <param name="m"></param>
    _handleLoginResponse(m)
    {
        var lr = new LoginResponse(m);
        if (lr.Success)
        {
            this._mostRecentLoginResponse = lr;

            if (!this._readyToTransact)
            {
                // We are finally ready to make transactions.
                // Let's notify ourselves so we can take some actions.
                this._readyToTransact = true;
                this._log.info(`Logged in Successfully. Expires: ${lr.Expires}`);
                if (this.CurrentStatus != SpiStatus.Unpaired) {
                    this._onReadyToTransact();
                }
            }
            else
            {
                this._log.info(`I have just refreshed my Login. Now Expires: ${lr.Expires}`);
            }
        }
        else
        {
            this._log.info("Logged in Failure.");
            this._conn.Disconnect();
        }
    }

    /// <summary>
    /// The server will also send us pings. We need to reply with a pong so it doesn't disconnect us.
    /// </summary>
    /// <param name="m"></param>
    _handleIncomingPing(m)
    {
        var pong = PongHelper.GeneratePongRessponse(m);
        this._send(pong);
    }

    /// <summary>
    /// Ask the PinPad to tell us what the Most Recent Transaction was
    /// </summary>
    _callGetLastTransaction()
    {
        var gltRequest = new GetLastTransactionRequest();
        this._send(gltRequest.ToMessage());
    }


    /// <summary>
    /// This method will be called whenever we receive a message from the Connection
    /// </summary>
    /// <param name="messageJson"></param>
    _onSpiMessageReceived(messageJson)
    {
        // First we parse the incoming message
        var m = Message.FromJson(messageJson, this._secrets);
        this._log.info("Received:" + m.DecryptedJson);
        // And then we switch on the event type.
        switch (m.EventName)
        {
            case Events.KeyRequest:
                this._handleKeyRequest(m);
                break;
            case Events.KeyCheck:
                this._handleKeyCheck(m);
                break;
            case Events.PairResponse:
                this._handlePairResponse(m);
                break;
            case Events.LoginResponse:
                this._handleLoginResponse(m);
                break;
            case Events.PurchaseResponse:
                this._handlePurchaseResponse(m);
                break;
            case Events.RefundResponse:
                this._handleRefundResponse(m);
                break;
            case Events.SignatureRequired:
                this._handleSignatureRequired(m);
                break;
            case Events.GetLastTransactionResponse:
                this._handleGetLastTransactionResponse(m);
                break;
            case Events.SettleResponse:
                this.HandleSettleResponse(m);
                break;
            case Events.Ping:
                this._handleIncomingPing(m);
                break;
            case Events.Pong:
                this._handleIncomingPong(m);
                break;
            case Events.KeyRollRequest:
                this._handleKeyRollingRequest(m);
                break;
            case Events.Error:
                this._handleErrorEvent(m);
                break;
            case Events.InvalidHmacSignature:
                this._log.info("I could not verify message from Eftpos. You might have to Un-pair Eftpos and then reconnect.");
                break;
            default:
                this._log.info(`I don't Understand Event: ${m.EventName}, ${m.Data}. Perhaps I have not implemented it yet.`);
                break;
        }
    }

    _onWsErrorReceived(error)
    {
        this._log.warn("Received WS Error: " + error);
    }

    _send(message)
    {
        var json = message.ToJson(this._spiMessageStamp);
        if (this._conn.Connected)
        {
            this._log.info("Sending: " + message.DecryptedJson);
            this._conn.Send(json);
            return true;
        }
        else
        {
            this._log.info("Asked to send, but not connected: " + message.DecryptedJson);
            return false;
        }
    }
}
