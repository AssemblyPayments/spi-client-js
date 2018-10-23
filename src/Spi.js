import {Message, MessageStamp, Events, SuccessState} from './Messages';
import {SpiConfig, SpiFlow, SpiStatus, PairingFlowState, TransactionFlowState, InitiateTxResult, MidTxResult, SubmitAuthCodeResult} from './SpiModels';
import {RequestIdHelper} from './RequestIdHelper';
import {PairingHelper} from './PairingHelper';
import {SPI_URI_SCHEME, Connection, ConnectionState} from './Connection';
import {SpiPayAtTable} from './SpiPayAtTable';
import {PayAtTableConfig} from './PayAtTable';
import {SpiPreauth} from './SpiPreauth';
import {CashoutOnlyRequest} from './Cashout';
import {SettleRequest} from './Settlement';
import {DropKeysRequest, KeyRequest, KeyCheck, PairResponse} from './Pairing';
import {SetPosInfoRequest, SetPosInfoResponse, DeviceInfo} from './PosInfo';
import {PurchaseHelper} from './PurchaseHelper';
import {KeyRollingHelper} from './KeyRollingHelper';
import {PingHelper, PongHelper} from './PingHelper';
import {GetLastTransactionRequest, SignatureAccept, SignatureDecline, MotoPurchaseRequest, AuthCodeAdvice, CancelTransactionRequest, SignatureRequired, CancelTransactionResponse, PhoneForAuthRequired} from './Purchase';
import {DeviceAddressService, DeviceAddressStatus} from './Service/DeviceService';
import {PrintingRequest} from './Printing';
import {TerminalStatusRequest} from './TerminalStatus';

export const SPI_VERSION = '2.4.0';

export default class Spi {

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

    constructor(posId, serialNumber, eftposAddress, secrets) 
    {
        this._posId = posId;
        this._serialNumber = serialNumber;
        this._secrets = secrets;
        this._eftposAddress = `${SPI_URI_SCHEME}://${eftposAddress}`;
        this._log = console;
        this.Config = new SpiConfig();

        this.CurrentDeviceStatus = null;
        this._deviceApiKey = null;
        this._acquirerCode = null;
        this._inTestMode = false;
        this._autoAddressResolutionEnabled = false;

        // Our stamp for signing outgoing messages
        this._spiMessageStamp = new MessageStamp(this._posId, this._secrets, 0);

        this._posVendorId = null;
        this._posVersion = null;
        this._hasSetInfo = null;

        // We will maintain some state
        this._mostRecentPingSent = null;
        this._mostRecentPongReceived = null;
        this._missedPongsCount = 0;
        this._retriesSinceLastDeviceAddressResolution = 0;
        this._mostRecentLoginResponse = null;

        this._pongTimeout = 5000;
        this._pingFrequency = 18000;
        
        this._readyToTransact = null;
        this._periodicPingThread = null;

        this._txMonitorCheckFrequency = 1000;
        this._checkOnTxFrequency = 20000;
        this._maxWaitForCancelTx = 10000;
        this._sleepBeforeReconnectMs = 5000;
        this._missedPongsToDisconnect = 2;
        this._retriesBeforeResolvingDeviceAddress = 5;

        this.CurrentFlow                = null;
        this.CurrentPairingFlowState    = null;
        this.CurrentTxFlowState         = null;
    }

    EnablePayAtTable()
    {
        this._spiPat = new SpiPayAtTable(this);
        return this._spiPat;
    }

    EnablePreauth()
    {
        this._spiPreauth = new SpiPreauth(this);
        return this._spiPreauth;
    }

    Start() {

        if (!this._posVendorId || !this._posVersion)
        {
            // POS information is now required to be set
            this._log.Warn("Missing POS vendor ID and version. posVendorId and posVersion are required before starting");
            throw new Exception("Missing POS vendor ID and version. posVendorId and posVersion are required before starting");
        }

        this._resetConn();
        this._startTransactionMonitoringThread();

        this.CurrentFlow = SpiFlow.Idle;
        if (this._secrets != null)
        {
            this._log.info("Starting in Paired State");
            this._currentStatus = SpiStatus.PairedConnecting;
            this._conn.Connect(); // This is non-blocking
        }
        else
        {
            this._log.info("Starting in Unpaired State");
            this._currentStatus = SpiStatus.Unpaired;
        } 
    }

    /// <summary>
    /// Set the acquirer code of your bank, please contact Assembly's Integration Engineers for acquirer code.
    /// </summary>
    SetAcquirerCode(acquirerCode)
    {
        this._acquirerCode = acquirerCode;
        return true;
    }

    /// <summary>
    /// Set the api key used for auto address discovery feature
    /// </summary>
    /// <returns></returns>
    SetDeviceApiKey(deviceApiKey)
    {
        this._deviceApiKey = deviceApiKey;
        return true;
    }

    /// <summary>
    /// Allows you to set the serial number of the Eftpos
    /// </summary>
    SetSerialNumber(serialNumber)
    {
        if (this.CurrentStatus != SpiStatus.Unpaired)
            return false;

        var was = this._serialNumber;
        this._serialNumber = serialNumber;
        if (this._autoAddressResolutionEnabled && this.HasSerialNumberChanged(was))
        {
            this._autoResolveEftposAddress();
        }

        return true;
    }

    /// <summary>
    /// Allows you to set the auto address discovery feature. 
    /// </summary>
    /// <returns></returns>
    SetAutoAddressResolution(autoAddressResolutionEnable)
    {
        if (this.CurrentStatus == SpiStatus.PairedConnected)
            return false;

        var was = this._autoAddressResolutionEnabled;
        this._autoAddressResolutionEnabled = autoAddressResolutionEnable;
        if (autoAddressResolutionEnable && !was)
        {
            // we're turning it on
            this._autoResolveEftposAddress();
        }

        return true;
    }

    /// <summary>
    /// Call this method to set the client library test mode.
    /// Set it to true only while you are developing the integration. 
    /// It defaults to false. For a real merchant, always leave it set to false. 
    /// </summary>
    /// <param name="testMode"></param>
    /// <returns></returns>
    SetTestMode(testMode)
    {
        if (this.CurrentStatus != SpiStatus.Unpaired)
            return false;

        if (testMode == this._inTestMode)
            return true;

        // we're changing mode
        this._inTestMode = testMode;
        this._autoResolveEftposAddress();
        return true;
    }

    // <summary>
    // Allows you to set the PosId which identifies this instance of your POS.
    // Can only be called in thge Unpaired state. 
    // </summary>
    SetPosId(posId)
    {
        if (this.CurrentStatus != SpiStatus.Unpaired)
            return false;

        this._posId = posId;
        this._spiMessageStamp.PosId = posId;
        return true;
    }

    // <summary>
    // Allows you to set the PinPad address. Sometimes the PinPad might change IP address 
    // (we recommend reserving static IPs if possible).
    // Either way you need to allow your User to enter the IP address of the PinPad.
    // </summary>
    SetEftposAddress(address)
    {
        if (this.CurrentStatus == SpiStatus.PairedConnected || this._autoAddressResolutionEnabled) {
            return false;
        }

        this._eftposAddress = `${SPI_URI_SCHEME}://${address}`;
        this._conn.Address = this._eftposAddress;
        return true;
    }

    static GetVersion()
    {
        return SPI_VERSION;
    }

    /**
     * Sets values used to identify the POS software to the EFTPOS terminal.
     * Must be set before starting!
     *
     * @param posVendorId Vendor identifier of the POS itself.
     * @param posVersion  Version string of the POS itself.
     */
    SetPosInfo(posVendorId, posVersion)
    {
        this._posVendorId = posVendorId;
        this._posVersion = posVersion;
    }

    // <summary>
    // Call this one when a flow is finished and you want to go back to idle state.
    // Typically when your user clicks the "OK" bubtton to acknowldge that pairing is
    // finished, or that transaction is finished.
    // When true, you can dismiss the flow screen and show back the idle screen.
    // </summary>
    // <returns>true means we have moved back to the Idle state. false means current flow was not finished yet.</returns>
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

    // endregion

    // <summary>
    // This will connect to the Eftpos and start the pairing process.
    // Only call this if you are in the Unpaired state.
    // Subscribe to the PairingFlowStateChanged event to get updates on the pairing process.
    // </summary>
    // <returns>Whether pairing has initiated or not</returns>
    Pair()
    {
        if (this.CurrentStatus != SpiStatus.Unpaired) {
            this._log.warn("Tried to Pair but we're already so.");
            return false;
        }

        if (!this._posId || !this._eftposAddress)
        {
            this._log.warn("Tried to Pair but missing posId or updatedEftposAddress");
            return false;
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
        return true;
    }

    // <summary>
    // Call this when your user clicks yes to confirm the pairing code on your 
    // screen matches the one on the Eftpos.
    // </summary>
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
            this._log.info("Pair Code Confirmed from POS side, but am still waiting for confirmation from Eftpos.");
            this.CurrentPairingFlowState.Message =
                "Click YES on EFTPOS if code is: " + this.CurrentPairingFlowState.ConfirmationCode;
            document.dispatchEvent(new CustomEvent('PairingFlowStateChanged', {detail: this.CurrentPairingFlowState}));
        }
        else
        {
            // Already confirmed from Eftpos - So all good now. We're Paired also from the POS perspective.
            this._log.info("Pair Code Confirmed from POS side, and was already confirmed from Eftpos side. Pairing finalised.");
            this._onPairingSuccess();
            this._onReadyToTransact();
        }
    }

    // <summary>
    // Call this if your user clicks CANCEL or NO during the pairing process.
    // </summary>
    PairingCancel()
    {
        if (this.CurrentFlow != SpiFlow.Pairing || this.CurrentPairingFlowState.Finished) {
            return;
        }

        if (this.CurrentPairingFlowState.AwaitingCheckFromPos && !this.CurrentPairingFlowState.AwaitingCheckFromEftpos)
        {
            // This means that the Eftpos already thinks it's paired.
            // Let's tell it to drop keys
            this._send(new DropKeysRequest().ToMessage());
        }
        this._onPairingFailed();
    }

    // <summary>
    // Call this when your uses clicks the Unpair button.
    // This will disconnect from the Eftpos and forget the secrets.
    // The CurrentState is then changed to Unpaired.
    // Call this only if you are not yet in the Unpaired state.
    // </summary>
    Unpair()
    {
        if (this.CurrentStatus == SpiStatus.Unpaired) {
            return false;
        }

        if (this.CurrentFlow != SpiFlow.Idle) {
            return false;
        }
        
        // Best effort letting the eftpos know that we're dropping the keys, so it can drop them as well.
        this._send(new DropKeysRequest().ToMessage());
        this._doUnpair();
        return true;
    }

    // endregion

    // region Transaction Methods

    // <summary>
    // Initiates a purchase transaction. Be subscribed to TxFlowStateChanged event to get updates on the process.
    // </summary>
    // <param name="posRefId">Alphanumeric Identifier for your purchase.</param>
    // <param name="amountCents">Amount in Cents to charge</param>
    // <returns>InitiateTxResult</returns>
    InitiatePurchaseTx(posRefId, amountCents)
    {
        if (this.CurrentStatus == SpiStatus.Unpaired) {
            return new InitiateTxResult(false, "Not Paired");
        }

        if (this.CurrentFlow != SpiFlow.Idle) {
            return new InitiateTxResult(false, "Not Idle");
        }

        var purchaseRequest = PurchaseHelper.CreatePurchaseRequest(amountCents, posRefId);
        purchaseRequest.Config = this.Config;
        var purchaseMsg = purchaseRequest.ToMessage();
        this.CurrentFlow = SpiFlow.Transaction;
        this.CurrentTxFlowState = new TransactionFlowState(
            posRefId, TransactionType.Purchase, amountCents, purchaseMsg,
            `Waiting for EFTPOS connection to make payment request for ${amountCents / 100.0}`);
        if (this._send(purchaseMsg))
        {
            this.CurrentTxFlowState.Sent(`Asked EFTPOS to accept payment for ${amountCents / 100.0}`);
        }
        
        document.dispatchEvent(new CustomEvent('TxFlowStateChanged', {detail: this.CurrentTxFlowState}));
        return new InitiateTxResult(true, "Purchase Initiated");
    }

    // <summary>
    // Initiates a purchase transaction. Be subscribed to TxFlowStateChanged event to get updates on the process.
    // <para>Tip and cashout are not allowed simultaneously.</para>
    // </summary>
    // <param name="posRefId">An Unique Identifier for your Order/Purchase</param>
    // <param name="purchaseAmount">The Purchase Amount in Cents.</param>
    // <param name="tipAmount">The Tip Amount in Cents</param>
    // <param name="cashoutAmount">The Cashout Amount in Cents</param>
    // <param name="promptForCashout">Whether to prompt your customer for cashout on the Eftpos</param>
    // <param name="options">The Setting to set Header and Footer for the Receipt</param>
    // <param name="surchargeAmount">The Surcharge Amount in Cents</param>
    // <returns>InitiateTxResult</returns>
    InitiatePurchaseTxV2(posRefId, purchaseAmount, tipAmount, cashoutAmount, promptForCashout, options = {}, surchargeAmount = 0)
    {
        if (this.CurrentStatus == SpiStatus.Unpaired) return new InitiateTxResult(false, "Not Paired");

        if (tipAmount > 0 && (cashoutAmount > 0 || promptForCashout)) return new InitiateTxResult(false, "Cannot Accept Tips and Cashout at the same time.");
        
        if (this.CurrentFlow != SpiFlow.Idle) return new InitiateTxResult(false, "Not Idle");
        this.CurrentFlow = SpiFlow.Transaction;
        
        var purchase = PurchaseHelper.CreatePurchaseRequestV2(posRefId, purchaseAmount, tipAmount, cashoutAmount, promptForCashout, surchargeAmount);
        purchase.Config = this.Config;
        purchase.Options = options;
        var purchaseMsg = purchase.ToMessage();
        this.CurrentTxFlowState = new TransactionFlowState(
            posRefId, TransactionType.Purchase, purchaseAmount, purchaseMsg,
            `Waiting for EFTPOS connection to make payment request. ${purchase.AmountSummary()}`);
        if (this._send(purchaseMsg))
        {
            this.CurrentTxFlowState.Sent(`Asked EFTPOS to accept payment for ${purchase.AmountSummary()}`);
        }
        
        document.dispatchEvent(new CustomEvent('TxFlowStateChanged', {detail: this.CurrentTxFlowState}));
        return new InitiateTxResult(true, "Purchase Initiated");
    }

    // <summary>
    // Initiates a refund transaction. Be subscribed to TxFlowStateChanged event to get updates on the process.
    // </summary>
    // <param name="posRefId">Alphanumeric Identifier for your refund.</param>
    // <param name="amountCents">Amount in Cents to charge</param>
    // <param name="isSuppressMerchantPassword">Merchant Password control in VAA</param>
    // <returns>InitiateTxResult</returns>
    InitiateRefundTx(posRefId, amountCents, isSuppressMerchantPassword = false)
    {
        if (this.CurrentStatus == SpiStatus.Unpaired) {
            return new InitiateTxResult(false, "Not Paired");
        }

        if (this.CurrentFlow != SpiFlow.Idle) {
            return new InitiateTxResult(false, "Not Idle");
        }

        var refundRequest = PurchaseHelper.CreateRefundRequest(amountCents, posRefId, isSuppressMerchantPassword);
        refundRequest.Config = this.Config;
        var refundMsg = refundRequest.ToMessage();
        this.CurrentFlow = SpiFlow.Transaction;
        this.CurrentTxFlowState = new TransactionFlowState(
            posRefId, TransactionType.Refund, amountCents, refundMsg, 
            `Waiting for EFTPOS connection to make refund request for ${(amountCents / 100.0).toFixed(2)}`);
        if (this._send(refundMsg))
        {
            this.CurrentTxFlowState.Sent(`Asked EFTPOS to refund ${(amountCents / 100.0).toFixed(2)}`);
        }
        
        document.dispatchEvent(new CustomEvent('TxFlowStateChanged', {detail: this.CurrentTxFlowState}));
        return new InitiateTxResult(true, "Refund Initiated");
    }
    
    // <summary>
    // Let the EFTPOS know whether merchant accepted or declined the signature
    // </summary>
    // <param name="accepted">whether merchant accepted the signature from customer or not</param>
    AcceptSignature(accepted)
    {
        if (this.CurrentFlow != SpiFlow.Transaction || this.CurrentTxFlowState.Finished || !this.CurrentTxFlowState.AwaitingSignatureCheck)
        {
            this._log.info("Asked to accept signature but I was not waiting for one.");
            return new MidTxResult(false, "Asked to accept signature but I was not waiting for one.");
        }

        this.CurrentTxFlowState.SignatureResponded(accepted ? "Accepting Signature..." : "Declining Signature...");
        var sigReqMsg = this.CurrentTxFlowState.SignatureRequiredMessage;
        this._send(accepted
            ? new SignatureAccept(this.CurrentTxFlowState.PosRefId).ToMessage()
            : new SignatureDecline(this.CurrentTxFlowState.PosRefId).ToMessage());
        
        document.dispatchEvent(new CustomEvent('TxFlowStateChanged', {detail: this.CurrentTxFlowState}));
        return new MidTxResult(true, "");
    }

    // <summary>
    // Submit the Code obtained by your user when phoning for auth. 
    // It will return immediately to tell you whether the code has a valid format or not. 
    // If valid==true is returned, no need to do anything else. Expect updates via standard callback.
    // If valid==false is returned, you can show your user the accompanying message, and invite them to enter another code. 
    // </summary>
    // <param name="authCode">The code obtained by your user from the merchant call centre. It should be a 6-character alpha-numeric value.</param>
    // <returns>Whether code has a valid format or not.</returns>
    SubmitAuthCode(authCode)
    {
        if (authCode.length != 6)
        {
            return new SubmitAuthCodeResult(false, "Not a 6-digit code.");    
        }
                
        if (this.CurrentFlow != SpiFlow.Transaction || this.CurrentTxFlowState.Finished || !this.CurrentTxFlowState.AwaitingPhoneForAuth)
        {
            this._log.info("Asked to send auth code but I was not waiting for one.");
            return new SubmitAuthCodeResult(false, "Was not waiting for one.");
        }

        this.CurrentTxFlowState.AuthCodeSent(`Submitting Auth Code ${authCode}`);
        this._send(new AuthCodeAdvice(this.CurrentTxFlowState.PosRefId, authCode).ToMessage());
        
        document.dispatchEvent(new CustomEvent('TxFlowStateChanged', {detail: this.CurrentTxFlowState}));
        return new SubmitAuthCodeResult(true, "Valid Code.");
    }

    // <summary>
    // Attempts to cancel a Transaction. 
    // Be subscribed to TxFlowStateChanged event to see how it goes.
    // Wait for the transaction to be finished and then see whether cancellation was successful or not.
    // </summary>
    // <returns>MidTxResult - false only if you called it in the wrong state</returns>
    CancelTransaction()
    {
        if (this.CurrentFlow != SpiFlow.Transaction || this.CurrentTxFlowState.Finished)
        {
            this._log.info("Asked to cancel transaction but I was not in the middle of one.");
            return new MidTxResult(false, "Asked to cancel transaction but I was not in the middle of one.");
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
        return new MidTxResult(true, "");
    }

    // <summary>
    // Initiates a cashout only transaction. Be subscribed to TxFlowStateChanged event to get updates on the process.
    // </summary>
    // <param name="posRefId">Alphanumeric Identifier for your transaction.</param>
    // <param name="amountCents">Amount in Cents to cash out</param>
    // <param name="surchargeAmount">The Surcharge Amount in Cents</param>
    // <returns>InitiateTxResult</returns>
    InitiateCashoutOnlyTx(posRefId, amountCents, surchargeAmount = 0)
    {
        if (this.CurrentStatus == SpiStatus.Unpaired) return new InitiateTxResult(false, "Not Paired");

        if (this.CurrentFlow != SpiFlow.Idle) return new InitiateTxResult(false, "Not Idle");
        var cashoutOnlyRequest = new CashoutOnlyRequest(amountCents, posRefId, surchargeAmount);
        cashoutOnlyRequest.Config = this.Config;
        var cashoutMsg = cashoutOnlyRequest.ToMessage();
        this.CurrentFlow = SpiFlow.Transaction;
        this.CurrentTxFlowState = new TransactionFlowState(
            posRefId, TransactionType.CashoutOnly, amountCents, cashoutMsg,
            `Waiting for EFTPOS connection to send cashout request for ${(amountCents / 100).toFixed(2)}`);
        if (this._send(cashoutMsg))
        {
            this.CurrentTxFlowState.Sent(`Asked EFTPOS to do cashout for ${(amountCents / 100).toFixed(2)}`);
        }
        
        document.dispatchEvent(new CustomEvent('TxFlowStateChanged', {detail: this.CurrentTxFlowState}));
        return new InitiateTxResult(true, "Cashout Initiated");
    }    

    // <summary>
    // Initiates a Mail Order / Telephone Order Purchase Transaction
    // </summary>
    // <param name="posRefId">Alphanumeric Identifier for your transaction.</param>
    // <param name="amountCents">Amount in Cents</param>
    // <param name="surchargeAmount">The Surcharge Amount in Cents</param>
    // <returns>InitiateTxResult</returns>
    InitiateMotoPurchaseTx(posRefId, amountCents, surchargeAmount = 0)
    {
        if (this.CurrentStatus == SpiStatus.Unpaired) return new InitiateTxResult(false, "Not Paired");

        if (this.CurrentFlow != SpiFlow.Idle) return new InitiateTxResult(false, "Not Idle");
        var motoPurchaseRequest = new MotoPurchaseRequest(amountCents, posRefId, surchargeAmount);
        motoPurchaseRequest.Config = this.Config;
        var cashoutMsg = motoPurchaseRequest.ToMessage();
        this.CurrentFlow = SpiFlow.Transaction;
        this.CurrentTxFlowState = new TransactionFlowState(
            posRefId, TransactionType.MOTO, amountCents, cashoutMsg,
            `Waiting for EFTPOS connection to send MOTO request for ${(amountCents / 100).toFixed(2)}`);
        if (this._send(cashoutMsg))
        {
            this.CurrentTxFlowState.Sent(`Asked EFTPOS do MOTO for ${(amountCents / 100).toFixed(2)}`);
        }
        
        document.dispatchEvent(new CustomEvent('TxFlowStateChanged', {detail: this.CurrentTxFlowState}));
        return new InitiateTxResult(true, "MOTO Initiated");
    }

    // <summary>
    // Initiates a settlement transaction.
    // Be subscribed to TxFlowStateChanged event to get updates on the process.
    // </summary>
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
        return new InitiateTxResult(true, "Settle Initiated");   
    }

    // <summary>
    // </summary>
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
        return new InitiateTxResult(true, "Settle Initiated");   
    }

    // <summary>
    // Initiates a Get Last Transaction. Use this when you want to retrieve the most recent transaction
    // that was processed by the Eftpos.
    // Be subscribed to TxFlowStateChanged event to get updates on the process.
    // </summary>
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

    // <summary>
    // This is useful to recover from your POS crashing in the middle of a transaction.
    // When you restart your POS, if you had saved enough state, you can call this method to recover the client library state.
    // You need to have the posRefId that you passed in with the original transaction, and the transaction type.
    // This method will return immediately whether recovery has started or not.
    // If recovery has started, you need to bring up the transaction modal to your user a be listening to TxFlowStateChanged.
    // </summary>
    // <param name="posRefId">The is that you had assigned to the transaction that you are trying to recover.</param>
    // <param name="txType">The transaction type.</param>
    // <returns></returns>
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

    // <summary>
    // GltMatch attempts to conclude whether a gltResponse matches an expected transaction and returns
    // the outcome. 
    // If Success/Failed is returned, it means that the gtlResponse did match, and that transaction was succesful/failed.
    // If Unknown is returned, it means that the gltResponse does not match the expected transaction. 
    // </summary>
    // <param name="gltResponse">The GetLastTransactionResponse message to check</param>
    // <param name="posRefId">The Reference Id that you passed in with the original request.</param>

    // <returns></returns>
    GltMatch(gltResponse, posRefId, ...deprecatedArgs) 
    {
        // Obsolete method call check
        // Old interface: GltMatch(GetLastTransactionResponse gltResponse, TransactionType expectedType, int expectedAmount, DateTime requestTime, string posRefId)
        if(deprecatedArgs.length) {
            if(deprecatedArgs.length == 2) {
                this._log.info("Obsolete method call detected: Use GltMatch(gltResponse, posRefId)");
                return this.GltMatch(gltResponse, deprecatedArgs[2]);
            } else {
                throw new Error("Obsolete method call with unknown args: Use GltMatch(GetLastTransactionResponse gltResponse, string posRefId)");
            }
        }

        this._log.info(`GLT CHECK: PosRefId: ${posRefId}->${gltResponse.GetPosRefId()}`);

        if (!posRefId == gltResponse.GetPosRefId())
        {
            return SuccessState.Unknown;
        }

        return gltResponse.GetSuccessState();
    }
    
    PrintReceipt(key, payload)
    {
        this._send(new PrintingRequest(key, payload).toMessage());
    }

    GetTerminalStatus()
    {
        this._send(new TerminalStatusRequest().ToMessage());
    }

    // endregion
        
    // region Internals for Pairing Flow

    // <summary>
    // Handling the 2nd interaction of the pairing process, i.e. an incoming KeyRequest.
    // </summary>
    // <param name="m">incoming message</param>
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

    // <summary>
    // Handling the 4th interaction of the pairing process i.e. an incoming KeyCheck.
    // </summary>
    // <param name="m"></param>
    _handleKeyCheck(m)
    {
        var keyCheck = new KeyCheck(m);
        this.CurrentPairingFlowState.ConfirmationCode = keyCheck.ConfirmationCode;
        this.CurrentPairingFlowState.AwaitingCheckFromEftpos = true;
        this.CurrentPairingFlowState.AwaitingCheckFromPos = true;
        this.CurrentPairingFlowState.Message = "Confirm that the following Code is showing on the Terminal";
        document.dispatchEvent(new CustomEvent('PairingFlowStateChanged', {detail: this.CurrentPairingFlowState}));
    }

    // <summary>
    // Handling the 5th and final interaction of the pairing process, i.e. an incoming PairResponse
    // </summary>
    // <param name="m"></param>
    _handlePairResponse(m)
    {
        var pairResp = new PairResponse(m);

        this.CurrentPairingFlowState.AwaitingCheckFromEftpos = false;
        if (pairResp.Success)
        {
            if (this.CurrentPairingFlowState.AwaitingCheckFromPos)
            {
                // Still Waiting for User to say yes on POS
                this._log.info("Got Pair Confirm from Eftpos, but still waiting for use to confirm from POS.");
                this.CurrentPairingFlowState.Message = "Confirm that the following Code is what the EFTPOS showed";
                document.dispatchEvent(new CustomEvent('PairingFlowStateChanged', {detail: this.CurrentPairingFlowState}));
            }
            else
            {
                this._log.info("Got Pair Confirm from Eftpos, and already had confirm from POS. Now just waiting for first pong.");
                this._onPairingSuccess();
            }
            // I need to ping/login even if the pos user has not said yes yet, 
            // because otherwise within 5 seconds connectiong will be dropped by eftpos.
            this._startPeriodicPing();
        }
        else
        {
            this._onPairingFailed();
        }
    }

    _handleDropKeysAdvice(m)
    {
        this._log.info("Eftpos was Unpaired. I shall unpair from my end as well.");
        this._doUnpair();
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

    _doUnpair()
    {
        this.CurrentStatus = SpiStatus.Unpaired;
        this._conn.Disconnect();
        this._secrets = null;
        this._spiMessageStamp.Secrets = null;
        document.dispatchEvent(new CustomEvent('SecretsChanged', {detail: this._secrets}));
    }

    // <summary>
    // Sometimes the server asks us to roll our secrets.
    // </summary>
    // <param name="m"></param>
    _handleKeyRollingRequest(m)
    {
        // we calculate the new ones...
        var krRes = KeyRollingHelper.PerformKeyRolling(m, this._secrets);
        this._secrets = krRes.NewSecrets; // and update our secrets with them
        this._spiMessageStamp.Secrets = this._secrets; // and our stamp
        this._send(krRes.KeyRollingConfirmation); // and we tell the server that all is well.
        document.dispatchEvent(new CustomEvent('SecretsChanged', {detail: this._secrets}));
    }

    // <summary>
    // The PinPad server will send us this message when a customer signature is reqired.
    // We need to ask the customer to sign the incoming receipt.
    // And then tell the pinpad whether the signature is ok or not.
    // </summary>
    // <param name="m"></param>
    _handleSignatureRequired(m)
    {
        var incomingPosRefId = m.Data.pos_ref_id;
        if (this.CurrentFlow != SpiFlow.Transaction || this.CurrentTxFlowState.Finished || !this.CurrentTxFlowState.PosRefId == incomingPosRefId)
        {
            this._log.info(`Received Signature Required but I was not waiting for one. Incoming Pos Ref ID: ${incomingPosRefId}`);
            return;
        }
        this.CurrentTxFlowState.SignatureRequired(new SignatureRequired(m), "Ask Customer to Sign the Receipt");
    
        document.dispatchEvent(new CustomEvent('TxFlowStateChanged', {detail: this.CurrentTxFlowState}));
    }

    // <summary>
    // The PinPad server will send us this message when an auth code is required.
    // </summary>
    // <param name="m"></param>
    _handleAuthCodeRequired(m)
    {
        var incomingPosRefId = m.Data.pos_ref_id;
        if (this.CurrentFlow != SpiFlow.Transaction || this.CurrentTxFlowState.Finished || !this.CurrentTxFlowState.PosRefId == incomingPosRefId)
        {
            _log.info(`Received Auth Code Required but I was not waiting for one. Incoming Pos Ref ID: ${incomingPosRefId}`);
            return;
        }
        var phoneForAuthRequired = new PhoneForAuthRequired(m);
        var msg = `Auth Code Required. Call ${phoneForAuthRequired.GetPhoneNumber()} and quote merchant id ${phoneForAuthRequired.GetMerchantId()}`;
        this.CurrentTxFlowState.PhoneForAuthRequired(phoneForAuthRequired, msg);
    
        document.dispatchEvent(new CustomEvent('TxFlowStateChanged', {detail: this.CurrentTxFlowState}));
    }

    // <summary>
    // The PinPad server will reply to our PurchaseRequest with a PurchaseResponse.
    // </summary>
    // <param name="m"></param>
    _handlePurchaseResponse(m)
    {
        var incomingPosRefId = m.Data.pos_ref_id;
        if (this.CurrentFlow != SpiFlow.Transaction || this.CurrentTxFlowState.Finished || !this.CurrentTxFlowState.PosRefId == incomingPosRefId)
        {
            this._log.info(`Received Purchase response but I was not waiting for one. Incoming Pos Ref ID: ${incomingPosRefId}"`);
            return;
        }
        // TH-1A, TH-2A
        
        this.CurrentTxFlowState.Completed(m.GetSuccessState(), m, "Purchase Transaction Ended.");
        // TH-6A, TH-6E
        
        document.dispatchEvent(new CustomEvent('TxFlowStateChanged', {detail: this.CurrentTxFlowState}));
    }

    // <summary>
    // The PinPad server will reply to our CashoutOnlyRequest with a CashoutOnlyResponse.
    // </summary>
    // <param name="m"></param>
    _handleCashoutOnlyResponse(m)
    {
        var incomingPosRefId = m.Data.pos_ref_id;
        if (this.CurrentFlow != SpiFlow.Transaction || this.CurrentTxFlowState.Finished || !this.CurrentTxFlowState.PosRefId == incomingPosRefId)
        {
            this._log.info(`Received Cashout Response but I was not waiting for one. Incoming Pos Ref ID: ${incomingPosRefId}`);
            return;
        }
        // TH-1A, TH-2A
        
        this.CurrentTxFlowState.Completed(m.GetSuccessState(), m, "Cashout Transaction Ended.");
        // TH-6A, TH-6E
        
        document.dispatchEvent(new CustomEvent('TxFlowStateChanged', {detail: this.CurrentTxFlowState}));
    }

    // <summary>
    // The PinPad server will reply to our MotoPurchaseRequest with a MotoPurchaseResponse.
    // </summary>
    // <param name="m"></param>
    _handleMotoPurchaseResponse(m)
    {
        var incomingPosRefId = m.Data.pos_ref_id;
        if (this.CurrentFlow != SpiFlow.Transaction || this.CurrentTxFlowState.Finished || !this.CurrentTxFlowState.PosRefId == incomingPosRefId)
        {
            this._log.info(`Received Moto Response but I was not waiting for one. Incoming Pos Ref ID: ${incomingPosRefId}`);
            return;
        }
        // TH-1A, TH-2A
        
        this.CurrentTxFlowState.Completed(m.GetSuccessState(), m, "Moto Transaction Ended.");
        // TH-6A, TH-6E
        
        document.dispatchEvent(new CustomEvent('TxFlowStateChanged', {detail: this.CurrentTxFlowState}));
    }   

    // <summary>
    // The PinPad server will reply to our RefundRequest with a RefundResponse.
    // </summary>
    // <param name="m"></param>
    _handleRefundResponse(m)
    {
        var incomingPosRefId = m.Data.pos_ref_id;
        if (this.CurrentFlow != SpiFlow.Transaction || this.CurrentTxFlowState.Finished | !this.CurrentTxFlowState.PosRefId == incomingPosRefId)
        {
            this._log.info(`Received Refund response but I was not waiting for this one. Incoming Pos Ref ID: ${incomingPosRefId}`);
            return;
        }
        // TH-1A, TH-2A
        
        this.CurrentTxFlowState.Completed(m.GetSuccessState(), m, "Refund Transaction Ended.");
        // TH-6A, TH-6E
        
        document.dispatchEvent(new CustomEvent('TxFlowStateChanged', {detail: this.CurrentTxFlowState}));
    }

    // <summary>
    // TODO: Handle the Settlement Response received from the PinPad
    // </summary>
    // <param name="m"></param>
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

    // <summary>
    // Handle the Settlement Enquiry Response received from the PinPad
    // </summary>
    // <param name="m"></param>
    _handleSettlementEnquiryResponse(m)
    {
        if (this.CurrentFlow != SpiFlow.Transaction || this.CurrentTxFlowState.Finished)
        {
            this._log.info(`Received Settlement Enquiry response but I was not waiting for one. ${m.DecryptedJson}`);
            return;
        }
        // TH-1A, TH-2A
        
        this.CurrentTxFlowState.Completed(m.GetSuccessState(), m, "Settlement Enquiry Ended.");
        // TH-6A, TH-6E
        
        document.dispatchEvent(new CustomEvent('TxFlowStateChanged', {detail: this.CurrentTxFlowState}));
    }

    // <summary>
    // Sometimes we receive event type "error" from the server, such as when calling cancel_transaction and there is no transaction in progress.
    // </summary>
    // <param name="m"></param>
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

    // <summary>
    // When the PinPad returns to us what the Last Transaction was.
    // </summary>
    // <param name="m"></param>
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
        this._log.info(`Got Last Transaction..`);
        txState.GotGltResponse();
        var gtlResponse = new GetLastTransactionResponse(m);
        txState.GLTResponsePosRefId = gtlResponse.GetPosRefId();
        if (!gtlResponse.WasRetrievedSuccessfully())
        {
            if (gtlResponse.IsStillInProgress(txState.PosRefId))
            {
                // TH-4E - Operation In Progress

                if (gtlResponse.IsWaitingForSignatureResponse() && !txState.AwaitingSignatureCheck)
                {
                    this._log.info("Eftpos is waiting for us to send it signature accept/decline, but we were not aware of this. " +
                              "The user can only really decline at this stage as there is no receipt to print for signing.");
                    this.CurrentTxFlowState.SignatureRequired(new SignatureRequired(txState.PosRefId, m.Id, "MISSING RECEIPT\n DECLINE AND TRY AGAIN."), "Recovered in Signature Required but we don't have receipt. You may Decline then Retry.");
                }
                else if (gtlResponse.IsWaitingForAuthCode() && !txState.AwaitingPhoneForAuth)
                {
                    this._log.info("Eftpos is waiting for us to send it auth code, but we were not aware of this. " +
                              "We can only cancel the transaction at this stage as we don't have enough information to recover from this.");
                    this.CurrentTxFlowState.PhoneForAuthRequired(new PhoneForAuthRequired(txState.PosRefId, m.Id, "UNKNOWN", "UNKNOWN"), "Recovered mid Phone-For-Auth but don't have details. You may Cancel then Retry.");
                }
                else
                {
                    this._log.info("Operation still in progress... stay waiting.");
                    // No need to publish txFlowStateChanged. Can return;
                    return;
                }
            }
            else if (gtlResponse.WasTimeOutOfSyncError())
            {
                // Let's not give up based on a TOOS error.
                // Let's log it, and ignore it. 
                this._log.info(`Time-Out-Of-Sync error in Get Last Transaction response. Let's ignore it and we'll try again.`);
                // No need to publish txFlowStateChanged. Can return;
                return;
            }
            else
            {
                // TH-4X - Unexpected Response when recovering
                this._log.info(`Unexpected Response in Get Last Transaction during - Received posRefId:${gtlResponse.GetPosRefId()} Error:${m.GetError()}`);
                txState.UnknownCompleted("Unexpected Error when recovering Transaction Status. Check EFTPOS. ");
            }
        }
        else
        {
            if (txState.Type == TransactionType.GetLastTransaction)
            {
                // THIS WAS A PLAIN GET LAST TRANSACTION REQUEST, NOT FOR RECOVERY PURPOSES.
                this._log.info("Retrieved Last Transaction as asked directly by the user.");
                gtlResponse.CopyMerchantReceiptToCustomerReceipt();
                txState.Completed(m.GetSuccessState(), m, "Last Transaction Retrieved");
            }
            else
            {
                // TH-4A - Let's try to match the received last transaction against the current transaction
                var successState = this.GltMatch(gtlResponse, txState.PosRefId);
                if (successState == SuccessState.Unknown)
                {
                    // TH-4N: Didn't Match our transaction. Consider Unknown State.
                    this._log.info("Did not match transaction.");
                    txState.UnknownCompleted("Failed to recover Transaction Status. Check EFTPOS. ");
                }
                else
                {
                    // TH-4Y: We Matched, transaction finished, let's update ourselves
                    gtlResponse.CopyMerchantReceiptToCustomerReceipt();
                    txState.Completed(successState, m, "Transaction Ended.");
                }
            } 
        }
        document.dispatchEvent(new CustomEvent('TxFlowStateChanged', {detail: txState}));
    }

    //When the transaction cancel response is returned.
    _handleCancelTransactionResponse(m)
    {
        var incomingPosRefId = m.Data.pos_ref_id;
        if (this.CurrentFlow != SpiFlow.Transaction || this.CurrentTxFlowState.Finished || !this.CurrentTxFlowState.PosRefId == incomingPosRefId)
        {
            this._log.info(`Received Cancel Required but I was not waiting for one. Incoming Pos Ref ID: ${incomingPosRefId}`);
            return;
        }

        var txState = this.CurrentTxFlowState;
        var cancelResponse = new CancelTransactionResponse(m);

        if (cancelResponse.Success) return;

        this._log.warn("Failed to cancel transaction: reason=" + cancelResponse.GetErrorReason() + ", detail=" + cancelResponse.GetErrorDetail());

        txState.CancelFailed("Failed to cancel transaction: " + cancelResponse.GetErrorDetail() + ". Check EFTPOS.");
    
        document.dispatchEvent(new CustomEvent('TxFlowStateChanged', {detail: txState}));
    }

    _handleSetPosInfoResponse(m)
    {
        var response = new SetPosInfoResponse(m);
        if (response.isSuccess())
        {
            this._hasSetInfo = true;
            this._log.Info("Setting POS info successful");
        }
        else
        {
            this._log.Warn("Setting POS info failed: reason=" + response.getErrorReason() + ", detail=" + response.getErrorDetail());
        }
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

    PrintingResponse(m) {
        throw new Exception('Method not implemented. Please overwrite this method in your POS');
    }

    TerminalStatusResponse(m) {
        throw new Exception('Method not implemented. Please overwrite this method in your POS');
    }

    BatteryLevelChanged(m) {
        throw new Exception('Method not implemented. Please overwrite this method in your POS');
    }

    _handlePrintingResponse(m)
    {
        this.PrintingResponse(m);
    }

    _handleTerminalStatusResponse(m)
    {
        this.TerminalStatusResponse(m);
    }

    _handleBatteryLevelChanged(m)
    {
        this.BatteryLevelChanged(m);
    }

    // endregion
        
    // region Internals for Connection Management

    _resetConn()
    {
        // Setup the Connection
        this._conn = new Connection();
        this._conn.Address = this._eftposAddress;

        // Register our Event Handlers
        document.addEventListener('ConnectionStatusChanged', (e) => this._onSpiConnectionStatusChanged(e.detail));
        document.addEventListener('MessageReceived', (e) => this._onSpiMessageReceived(e.detail));
        document.addEventListener('ErrorReceived', (e) => this._onWsErrorReceived(e.detail));
    }

    // <summary>
    // This method will be called when the connection status changes.
    // You are encouraged to display a PinPad Connection Indicator on the POS screen.
    // </summary>
    // <param name="state"></param>
    _onSpiConnectionStatusChanged(state)
    {
        switch (state.ConnectionState)
        {
            case ConnectionState.Connecting:
                this._log.info(`I'm Connecting to the Eftpos at ${this._eftposAddress}...`);
                break;

            case ConnectionState.Connected:
                this._retriesSinceLastDeviceAddressResolution = 0;

                if (this.CurrentFlow == SpiFlow.Pairing && this.CurrentStatus == SpiStatus.Unpaired)
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
                    
                    if (this._conn == null) return; // This means the instance has been disposed. Aborting.
                    
                    if (this._autoAddressResolutionEnabled)
                    {
                        if (this._retriesSinceLastDeviceAddressResolution >= this._retriesBeforeResolvingDeviceAddress)
                        {
                            this._autoResolveEftposAddress();
                            this._retriesSinceLastDeviceAddressResolution = 0;
                        }
                        else
                        {
                            this._retriesSinceLastDeviceAddressResolution += 1;
                        }
                    }

                    this._log.info(`Will try to reconnect in ${this._sleepBeforeReconnectMs}ms...`);
                    setTimeout(() => {
                        if (this.CurrentStatus != SpiStatus.Unpaired)
                        {
                            // This is non-blocking
                            if(this._conn) 
                            {
                                this._conn.Connect();
                            }
                        }
                    }, this._sleepBeforeReconnectMs);
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

    // <summary>
    // This is an important piece of the puzzle. It's a background thread that periodically
    // sends Pings to the server. If it doesn't receive Pongs, it considers the connection as broken
    // so it disconnects. 
    // </summary>
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
                    this._stopPeriodicPing();
                }

                this._missedPongsCount = 0;

            },this._pongTimeout);

        } else {
            this._stopPeriodicPing();
            this._log.info("Cancelling periodic ping as were disconnected or not paired");
        }
    }

    // <summary>
    // We call this ourselves as soon as we're ready to transact with the PinPad after a connection is established.
    // This function is effectively called after we received the first Login Response from the PinPad.
    // </summary>
    _onReadyToTransact()
    {
        this._log.info("On Ready To Transact!");

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
                this.CurrentTxFlowState.Sent(`Sending Request Now...`);
                document.dispatchEvent(new CustomEvent('TxFlowStateChanged', {detail: this.CurrentTxFlowState}));
            }
        }
        else
        {
            if (!this._hasSetInfo) { 
                this._callSetPosInfo(); 
            }

            // let's also tell the eftpos our latest table configuration.
            if(this._spiPat) {
                this._spiPat.PushPayAtTableConfig();
            }
        }
    }

    _callSetPosInfo()
    {
        var setPosInfoRequest = new SetPosInfoRequest(this._posVersion, this._posVendorId, "js", this.GetVersion(), DeviceInfo.GetAppDeviceInfo());
        this._send(setPosInfoRequest.toMessage());
    }

    // <summary>
    // When we disconnect, we should also stop the periodic ping.
    // </summary>
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
        this._mostRecentPingSentTime = Date.now();
    }

    // <summary>
    // Received a Pong from the server
    // </summary>
    // <param name="m"></param>
    _handleIncomingPong(m)
    {
        // We need to maintain this time delta otherwise the server will not accept our messages.
        this._spiMessageStamp.ServerTimeDelta = m.GetServerTimeDelta();

        if (this._mostRecentPongReceived == null)
        {
            // First pong received after a connection, and after the pairing process is fully finalised.
            if (this.CurrentStatus != SpiStatus.Unpaired)
            {
                this._log.info("First pong of connection and in paired state.");
                this._onReadyToTransact();
            }
            else
            {
                this._log.info("First pong of connection but pairing process not finalised yet.");
            }
        }

        this._mostRecentPongReceived = m;
        this._log.debug(`PongLatency:${Date.now() - this._mostRecentPingSentTime}`);
    }

    // <summary>
    // The server will also send us pings. We need to reply with a pong so it doesn't disconnect us.
    // </summary>
    // <param name="m"></param>
    _handleIncomingPing(m)
    {
        var pong = PongHelper.GeneratePongRessponse(m);
        this._send(pong);
    }

    // <summary>
    // Ask the PinPad to tell us what the Most Recent Transaction was
    // </summary>
    _callGetLastTransaction()
    {
        var gltRequest = new GetLastTransactionRequest();
        this._send(gltRequest.ToMessage());
    }

    // <summary>
    // This method will be called whenever we receive a message from the Connection
    // </summary>
    // <param name="messageJson"></param>
    _onSpiMessageReceived(messageJson)
    {
        // First we parse the incoming message
        var m = Message.FromJson(messageJson.Message, this._secrets);
        this._log.info("Received:" + m.DecryptedJson);

        if (SpiPreauth.IsPreauthEvent(m.EventName))
        {
            this._spiPreauth._handlePreauthMessage(m);
            return;
        }

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
            case Events.DropKeysAdvice:
                this._handleDropKeysAdvice(m);
                break;
            case Events.PurchaseResponse:
                this._handlePurchaseResponse(m);
                break;
            case Events.RefundResponse:
                this._handleRefundResponse(m);
                break;
            case Events.CashoutOnlyResponse:
                this._handleCashoutOnlyResponse(m);
                break;
            case Events.MotoPurchaseResponse:
                this._handleMotoPurchaseResponse(m);
                break;
            case Events.SignatureRequired:
                this._handleSignatureRequired(m);
                break;
            case Events.AuthCodeRequired:
                this._handleAuthCodeRequired(m);
                break;
            case Events.GetLastTransactionResponse:
                this._handleGetLastTransactionResponse(m);
                break;
            case Events.SettleResponse:
                this.HandleSettleResponse(m);
                break;
            case Events.SettlementEnquiryResponse:
                this._handleSettlementEnquiryResponse(m);
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
            case Events.CancelTransactionResponse:
                this._handleCancelTransactionResponse(m);
                break;
            case Events.SetPosInfoResponse:
                this._handleSetPosInfoResponse(m);
                break;
            case Events.PayAtTableGetTableConfig:
                if (this._spiPat == null)
                {
                    this._send(PayAtTableConfig.FeatureDisableMessage(RequestIdHelper.Id("patconf")));
                    break;
                }
                this._spiPat._handleGetTableConfig(m);
                break;
            case Events.PayAtTableGetBillDetails:
                this._spiPat._handleGetBillDetailsRequest(m);
                break;
            case Events.PayAtTableBillPayment:
                this._spiPat._handleBillPaymentAdvice(m);
                break;
            case Events.PrintingResponse:
                this._handlePrintingResponse(m);
                break;
            case Events.TerminalStatusResponse:
                this._handleTerminalStatusResponse(m);
                break;
            case Events.BatteryLevelChanged:
                this._handleBatteryLevelChanged(m);
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
        this._log.warn("Received WS Error: " + error.Message);
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

    HasSerialNumberChanged(updatedSerialNumber)
    {
        return this._serialNumber != updatedSerialNumber;
    }

    HasEftposAddressChanged(updatedEftposAddress)
    {
        return this._eftposAddress != updatedEftposAddress;
    }

    _autoResolveEftposAddress()
    {
        if (!this._autoAddressResolutionEnabled)
            return;
    
        if (!this._serialNumber)
            return;

        var service = new DeviceAddressService();

        return service.RetrieveService(this._serialNumber, this._deviceApiKey, this._acquirerCode, this._inTestMode).then((response) => 
        {
            var deviceAddressStatus = Object.assign(new DeviceAddressStatus(), response);

            if(!deviceAddressStatus || !deviceAddressStatus.Address)
                return;

            if (!this.HasEftposAddressChanged(deviceAddressStatus.Address))
                return;

            // update device and connection address
            this._eftposAddress = `${SPI_URI_SCHEME}://${deviceAddressStatus.Address}`;
            this._conn.Address = this._eftposAddress;

            this.CurrentDeviceStatus = deviceAddressStatus;

            document.dispatchEvent(new CustomEvent('DeviceAddressChanged', {detail: this.CurrentDeviceStatus}));
            
            return this.CurrentDeviceStatus;
        });
    }
}

export {Spi};