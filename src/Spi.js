import {AnalyticsService, TransactionReport} from './Service/AnalyticsService';
import {Message, MessageStamp, Events, SuccessState} from './Messages';
import {SpiConfig, SpiFlow, SpiStatus, PairingFlowState, TransactionFlowState, TransactionType, InitiateTxResult, MidTxResult, SubmitAuthCodeResult, TransactionOptions} from './SpiModels';
import {RequestIdHelper} from './RequestIdHelper';
import {PairingHelper} from './PairingHelper';
import {Connection, ConnectionState} from './Connection';
import {SpiPayAtTable} from './SpiPayAtTable';
import {PayAtTableConfig} from './PayAtTable';
import {SpiPreauth} from './SpiPreauth';
import {CashoutOnlyRequest} from './Cashout';
import {SettleRequest, SettlementEnquiryRequest} from './Settlement';
import {DropKeysRequest, KeyRequest, KeyCheck, PairResponse} from './Pairing';
import {SetPosInfoRequest, SetPosInfoResponse, DeviceInfo} from './PosInfo';
import {PurchaseHelper} from './PurchaseHelper';
import {KeyRollingHelper} from './KeyRollingHelper';
import {PingHelper, PongHelper} from './PingHelper';
import {GetTransactionRequest, GetTransactionResponse, GetLastTransactionRequest, GetLastTransactionResponse, SignatureAccept, SignatureDecline, MotoPurchaseRequest, AuthCodeAdvice, CancelTransactionRequest, SignatureRequired, CancelTransactionResponse, PhoneForAuthRequired, TransactionUpdate} from './Purchase';
import {DeviceHelper} from './DeviceHelper';
import {DeviceAddressService, DeviceAddressStatus, DeviceAddressResponseCode, HttpStatusCode} from './Service/DeviceService';
import {PrintingRequest} from './Printing';
import {ReversalRequest} from './Reversal';
import {TenantsService} from './Service/TenantsService';
import {TerminalHelper} from './TerminalHelper';
import {TerminalStatusRequest} from './TerminalStatus';
import {TerminalConfigurationRequest, TerminalConfigurationResponse} from './TerminalConfiguration';
import {TransactionReportHelper} from "./TransactionReportHelper";
import {ZipRefundRequest, ZipPurchaseRequest} from './ZipTransactions';

const SPI_VERSION = '2.9.0';

class Spi {

    get CurrentStatus() {
        return this._currentStatus;
    }

    set CurrentStatus(value) {
        if(this._currentStatus === value) {
            return;
        }

        this._currentStatus = value;
        this._eventBus.dispatchEvent(new CustomEvent('StatusChanged', { detail: value }));
    }

    constructor(posId, serialNumber, eftposAddress, secrets) 
    {
        this._posId = posId;
        this._serialNumber = serialNumber;
        this._secrets = secrets;
        this._forceSecureWebSockets = this._isSecureConnection();
        this._eftposAddress = `${this._isSecureConnection() ? "wss" : "ws"}://${eftposAddress}`;
        this._eventBus = document;
        this._log = console;
        this.Config = new SpiConfig();
        this._conn = new Connection(this);

        this.CurrentDeviceStatus = null;
        this._deviceApiKey  = null;
        this._tenantCode  = null;
        this._terminalModel = null;
        this._inTestMode    = false;
        this._autoAddressResolutionEnabled = this._isSecureConnection();

        // Our stamp for signing outgoing messages
        this._spiMessageStamp = new MessageStamp(this._posId, this._secrets);

        this._hasSetInfo = null;
        this._posVendorId = null;
        this._posVersion = null;
        this._libraryLanguage = "js";
        this._spiceVersion = null;

        this._transactionReport = new TransactionReport();

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
        this._transactionMonitoringThread = null;

        this._txMonitorCheckFrequency = 1000;
        this._checkOnTxFrequency = 20000;
        this._maxWaitForCancelTx = 10000;
        this._sleepBeforeReconnectMs = 3000;
        this._missedPongsToDisconnect = 2;
        this._retriesBeforeResolvingDeviceAddress = 3;
        this._retriesSinceLastPairing = 0;
        this._retriesBeforePairing = 3;

        this._regexItemsForEftposAddress =/^[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}(\:[0-9]{1,5})?$/;
        this._regexItemsForFqdnEftposAddress = /^[a-zA-Z0-9\.-]+$/;
        this._regexItemsForPosId = /^[a-zA-Z0-9]*$/;

        this.CurrentFlow                = null;
        this.CurrentPairingFlowState    = null;
        this.CurrentTxFlowState         = null;
    }

    EnablePayAtTable()
    {
        this._spiPat = new SpiPayAtTable(this);
        return this._spiPat;
    }

    DisablePayAtTable()
    {
        this._spiPat = new SpiPayAtTable(this);
        this._spiPat.Config.PayAtTableEnabled = false;
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
            this._log.warn("Missing POS vendor ID and version. posVendorId and posVersion are required before starting");
            throw new Error("Missing POS vendor ID and version. posVendorId and posVersion are required before starting");
        }

        if (!this._isPosIdValid(this._posId))
        {
            // continue, as they can set the posId later on
            this._posId = "";
            this._log.warn("Invalid parameter, please correct them before pairing");
        }

        if (!this._isEftposAddressValid(this._eftposAddress))
        {
            // continue, as they can set the eftposAddress later on
            this._eftposAddress = "";
            this._log.warn("Invalid parameter, please correct them before pairing");
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
    /// Set a custom event bus so that events from multiple SPI instances can be seperated
    /// </summary>
    SetEventBus(eventBus) {
        if (
            eventBus &&
            typeof eventBus.addEventListener === "function" &&
            typeof eventBus.removeEventListener === "function" &&
            typeof eventBus.dispatchEvent === "function"
        ) {
            this._eventBus = eventBus;
            return true;
        }

        return false;
    }

    /// <summary>
    /// Set the acquirer code of your bank, please contact mx51's Integration Engineers for acquirer code.
    /// </summary>
    SetAcquirerCode(acquirerCode)
    {
        this.SetTenantCode(acquirerCode);
    }

    SetTenantCode(tenantCode)
    {
        this._tenantCode = tenantCode;
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
        const was = this._serialNumber;
        this._serialNumber = serialNumber;

        if (this.HasSerialNumberChanged(was))
        {
            this._autoResolveEftposAddress();
        }
        else
        {
            if (this.CurrentDeviceStatus === null)
            {
                this.CurrentDeviceStatus = new DeviceAddressStatus(this._forceSecureWebSockets);
            }

            this.CurrentDeviceStatus.DeviceAddressResponseCode = DeviceAddressResponseCode.SERIAL_NUMBER_NOT_CHANGED;
            this._eventBus.dispatchEvent(new CustomEvent('DeviceAddressChanged', { detail: this.CurrentDeviceStatus }));
        }

        return true;
    }

    /// <summary>
    /// Allows you to set the auto address discovery feature. 
    /// </summary>
    /// <returns></returns>
    SetAutoAddressResolution(autoAddressResolutionEnable)
    {
        const was = this._autoAddressResolutionEnabled;
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
        if (testMode === this._inTestMode)
            return true;

        // we're changing mode
        this._inTestMode = testMode;
        this._autoResolveEftposAddress();

        return true;
    }

    /// <summary>
    /// Set the client library to use secure web sockets TLS (wss protocol)
    /// </summary>
    /// <param name="isSecure"></param>
    /// <returns></returns>
    SetSecureWebSockets(useSecureWebSockets)
    {
        this._forceSecureWebSockets = useSecureWebSockets;
        this._autoResolveEftposAddress();
    }

    // <summary>
    // Allows you to set the PosId which identifies this instance of your POS.
    // Can only be called in thge Unpaired state. 
    // </summary>
    SetPosId(posId)
    {
        if (this.CurrentStatus != SpiStatus.Unpaired)
            return false;

        this._posId = ""; // reset posId to give more explicit feedback

        if (!this._isPosIdValid(posId))
        {
            this._log.info("Pos Id set to null");
            return false;
        }

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
        if (this.CurrentStatus === SpiStatus.PairedConnected) {
            return false;
        }

        this._eftposAddress = ""; // reset eftposAddress to give more explicit feedback

        if (!this._isEftposAddressValid(address))
        {
            this._log.info("Eftpos Address set to null");
            return false;
        }

        this._eftposAddress = `${this._isSecureConnection() ? "wss" : "ws"}://${address}`;
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

    ResendPosInfo()
    {
        this._callSetPosInfo();
    }

    SetSpiceInfo(spiceVersion)
    {
        this._spiceVersion = spiceVersion;
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
        this._log.info("Trying to pair ....");

        if (this.CurrentStatus != SpiStatus.Unpaired) {
            this._log.warn("Tried to Pair, but we're already paired. Stop pairing.");
            return false;
        }

        if (!this._isPosIdValid(this._posId) || !this._isEftposAddressValid(this._eftposAddress))
        {
            this._log.warn("Invalid Pos Id or Eftpos address, stop pairing.");
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

        this._eventBus.dispatchEvent(new CustomEvent('PairingFlowStateChanged', { detail: this.CurrentPairingFlowState }));
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
            this._eventBus.dispatchEvent(new CustomEvent('PairingFlowStateChanged', { detail: this.CurrentPairingFlowState }));
        }
        else
        {
            // Already confirmed from Eftpos - So all good now. We're Paired also from the POS perspective.
            this._log.info("Pair Code Confirmed from POS side, and was already confirmed from Eftpos side. Pairing finalised.");
            this._onPairingSuccess();
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
        
        this._eventBus.dispatchEvent(new CustomEvent('TxFlowStateChanged', { detail: this.CurrentTxFlowState }));
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
    InitiatePurchaseTxV2(posRefId, purchaseAmount, tipAmount, cashoutAmount, promptForCashout, options = new TransactionOptions(), surchargeAmount = 0)
    {
        if (this.CurrentStatus == SpiStatus.Unpaired) return new InitiateTxResult(false, "Not Paired");

        if (tipAmount > 0 && (cashoutAmount > 0 || promptForCashout)) return new InitiateTxResult(false, "Cannot Accept Tips and Cashout at the same time.");
        
        // no printing available, reset header and footer and disable print
        let transactionOptions = options;
        if (!TerminalHelper.IsPrinterAvailable(this._terminalModel) && this._isPrintingConfigEnabled())
        {
            transactionOptions = new TransactionOptions();
            this.Config.PromptForCustomerCopyOnEftpos = false;
            this.Config.PrintMerchantCopy = false;
            this.Config.SignatureFlowOnEftpos = false;
            this._log.warn("Printing is enabled on a terminal without printer. Printing options will now be disabled.");
        }

        if (this.CurrentFlow != SpiFlow.Idle) return new InitiateTxResult(false, "Not Idle");
        this.CurrentFlow = SpiFlow.Transaction;
        
        var purchase = PurchaseHelper.CreatePurchaseRequestV2(posRefId, purchaseAmount, tipAmount, cashoutAmount, promptForCashout, surchargeAmount);
        purchase.Config = this.Config;
        purchase.Options = transactionOptions;
        var purchaseMsg = purchase.ToMessage();
        this.CurrentTxFlowState = new TransactionFlowState(
            posRefId, TransactionType.Purchase, purchaseAmount, purchaseMsg,
            `Waiting for EFTPOS connection to make payment request. ${purchase.AmountSummary()}`);
        if (this._send(purchaseMsg))
        {
            this.CurrentTxFlowState.Sent(`Asked EFTPOS to accept payment for ${purchase.AmountSummary()}`);
        }
        
        this._eventBus.dispatchEvent(new CustomEvent('TxFlowStateChanged', { detail: this.CurrentTxFlowState }));
        return new InitiateTxResult(true, "Purchase Initiated");
    }

    // <summary>
    // Initiates a refund transaction. Be subscribed to TxFlowStateChanged event to get updates on the process.
    // </summary>
    // <param name="posRefId">Alphanumeric Identifier for your refund.</param>
    // <param name="amountCents">Amount in Cents to charge</param>
    // <param name="suppressMerchantPassword">Merchant Password control in VAA</param>
    // <param name="options">The Setting to set Header and Footer for the Receipt</param>
    // <returns>InitiateTxResult</returns>
    InitiateRefundTx(posRefId, amountCents, suppressMerchantPassword = false, options = new TransactionOptions())
    {
        if (this.CurrentStatus == SpiStatus.Unpaired) {
            return new InitiateTxResult(false, "Not Paired");
        }

        // no printing available, reset header and footer and disable print
        let transactionOptions = options;
        if (!TerminalHelper.IsPrinterAvailable(this._terminalModel) && this._isPrintingConfigEnabled())
        {
            transactionOptions = new TransactionOptions();
            this.Config.PromptForCustomerCopyOnEftpos = false;
            this.Config.PrintMerchantCopy = false;
            this.Config.SignatureFlowOnEftpos = false;
            this._log.warn("Printing is enabled on a terminal without printer. Printing options will now be disabled.");
        }

        if (this.CurrentFlow != SpiFlow.Idle) {
            return new InitiateTxResult(false, "Not Idle");
        }

        var refundRequest = PurchaseHelper.CreateRefundRequest(amountCents, posRefId, suppressMerchantPassword);
        refundRequest.Config = this.Config;
        refundRequest.Options = transactionOptions;
        var refundMsg = refundRequest.ToMessage();
        this.CurrentFlow = SpiFlow.Transaction;
        this.CurrentTxFlowState = new TransactionFlowState(
            posRefId, TransactionType.Refund, amountCents, refundMsg, 
            `Waiting for EFTPOS connection to make refund request for ${(amountCents / 100.0).toFixed(2)}`);
        if (this._send(refundMsg))
        {
            this.CurrentTxFlowState.Sent(`Asked EFTPOS to refund ${(amountCents / 100.0).toFixed(2)}`);
        }
        
        this._eventBus.dispatchEvent(new CustomEvent('TxFlowStateChanged', { detail: this.CurrentTxFlowState }));
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
        
        this._eventBus.dispatchEvent(new CustomEvent('TxFlowStateChanged', { detail: this.CurrentTxFlowState }));
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
        
        this._eventBus.dispatchEvent(new CustomEvent('TxFlowStateChanged', { detail: this.CurrentTxFlowState }));
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
        if (this.CurrentFlow !== SpiFlow.Transaction || this.CurrentTxFlowState.Finished)
        {
            this._log.info("Asked to cancel transaction but I was not in the middle of one.");
            return new MidTxResult(false, "Asked to cancel transaction but I was not in the middle of one.");
        }

        // TH-1C, TH-3C - Merchant pressed cancel
        if (this.CurrentTxFlowState.RequestSent)
        {
            const cancelReq = new CancelTransactionRequest();
            this.CurrentTxFlowState.Cancelling("Attempting to Cancel Transaction...");
            this._send(cancelReq.ToMessage());
        }
        else
        {
            // We Had Not Even Sent Request Yet. Consider as known failed.
            this.CurrentTxFlowState.Failed(null, "Transaction Cancelled. Request Had not even been sent yet.");
        }
        
        this._eventBus.dispatchEvent(new CustomEvent('TxFlowStateChanged', { detail: this.CurrentTxFlowState }));
        this._sendTransactionReport();
        return new MidTxResult(true, "");
    }

    // <summary>
    // Initiates a cashout only transaction. Be subscribed to TxFlowStateChanged event to get updates on the process.
    // </summary>
    // <param name="posRefId">Alphanumeric Identifier for your transaction.</param>
    // <param name="amountCents">Amount in Cents to cash out</param>
    // <param name="surchargeAmount">The Surcharge Amount in Cents</param>
    // <returns>InitiateTxResult</returns>
    InitiateCashoutOnlyTx(posRefId, amountCents, surchargeAmount = 0, options = new TransactionOptions())
    {
        if (this.CurrentStatus == SpiStatus.Unpaired) return new InitiateTxResult(false, "Not Paired");

        // no printing available, reset header and footer and disable print
        let transactionOptions = options;
        if (!TerminalHelper.IsPrinterAvailable(this._terminalModel) && this._isPrintingConfigEnabled())
        {
            transactionOptions = new TransactionOptions();
            this.Config.PromptForCustomerCopyOnEftpos = false;
            this.Config.PrintMerchantCopy = false;
            this.Config.SignatureFlowOnEftpos = false;
            this._log.warn("Printing is enabled on a terminal without printer. Printing options will now be disabled.");
        }

        if (this.CurrentFlow != SpiFlow.Idle) return new InitiateTxResult(false, "Not Idle");

        var cashoutMsg = Object.assign(new CashoutOnlyRequest(amountCents, posRefId), {
            SurchargeAmount: surchargeAmount,
            Options: transactionOptions,
            Config: this.Config
        }).ToMessage();

        this.CurrentFlow = SpiFlow.Transaction;
        this.CurrentTxFlowState = new TransactionFlowState(
            posRefId, TransactionType.CashoutOnly, amountCents, cashoutMsg,
            `Waiting for EFTPOS connection to send cashout request for ${(amountCents / 100).toFixed(2)}`);
        if (this._send(cashoutMsg))
        {
            this.CurrentTxFlowState.Sent(`Asked EFTPOS to do cashout for ${(amountCents / 100).toFixed(2)}`);
        }
        
        this._eventBus.dispatchEvent(new CustomEvent('TxFlowStateChanged', { detail: this.CurrentTxFlowState }));
        return new InitiateTxResult(true, "Cashout Initiated");
    }    

    // <summary>
    // Initiates a Mail Order / Telephone Order Purchase Transaction
    // </summary>
    // <param name="posRefId">Alphanumeric Identifier for your transaction.</param>
    // <param name="amountCents">Amount in Cents</param>
    // <param name="surchargeAmount">The Surcharge Amount in Cents</param>
    // <param name="suppressMerchantPassword">>Merchant Password control in VAA</param>
    // <param name="options">The Setting to set Header and Footer for the Receipt</param>
    // <returns>InitiateTxResult</returns>
    InitiateMotoPurchaseTx(posRefId, amountCents, surchargeAmount = 0, suppressMerchantPassword = false, options = new TransactionOptions())
    {
        if (this.CurrentStatus == SpiStatus.Unpaired) return new InitiateTxResult(false, "Not Paired");

        // no printing available, reset header and footer and disable print
        let transactionOptions = options;
        if (!TerminalHelper.IsPrinterAvailable(this._terminalModel) && this._isPrintingConfigEnabled())
        {
            transactionOptions = new TransactionOptions();
            this.Config.PromptForCustomerCopyOnEftpos = false;
            this.Config.PrintMerchantCopy = false;
            this.Config.SignatureFlowOnEftpos = false;
            this._log.warn("Printing is enabled on a terminal without printer. Printing options will now be disabled.");
        }

        if (this.CurrentFlow != SpiFlow.Idle) return new InitiateTxResult(false, "Not Idle");
        var motoPurchaseMsg = Object.assign(new MotoPurchaseRequest(amountCents, posRefId),
        {
            SurchargeAmount: surchargeAmount,
            SuppressMerchantPassword: suppressMerchantPassword,
            Config: this.Config,
            Options: transactionOptions
        }).ToMessage();

        this.CurrentFlow = SpiFlow.Transaction;
        this.CurrentTxFlowState = new TransactionFlowState(
            posRefId, TransactionType.MOTO, amountCents, motoPurchaseMsg,
            `Waiting for EFTPOS connection to send MOTO request for ${(amountCents / 100).toFixed(2)}`);
        if (this._send(motoPurchaseMsg))
        {
            this.CurrentTxFlowState.Sent(`Asked EFTPOS do MOTO for ${(amountCents / 100).toFixed(2)}`);
        }
        
        this._eventBus.dispatchEvent(new CustomEvent('TxFlowStateChanged', { detail: this.CurrentTxFlowState }));
        return new InitiateTxResult(true, "MOTO Initiated");
    }

    // <summary>
    // Initiates a settlement transaction.
    // Be subscribed to TxFlowStateChanged event to get updates on the process.
    // <param name="options">The Setting to set Header and Footer for the Receipt</param>
    // </summary>
    InitiateSettleTx(posRefId, options = new TransactionOptions())
    {
        if (this.CurrentStatus == SpiStatus.Unpaired) {
            return new InitiateTxResult(false, "Not Paired");
        }

        // no printing available, reset header and footer and disable print
        let transactionOptions = options;
        if (!TerminalHelper.IsPrinterAvailable(this._terminalModel) && this._isPrintingConfigEnabled())
        {
            transactionOptions = new TransactionOptions();
            this.Config.PromptForCustomerCopyOnEftpos = false;
            this.Config.PrintMerchantCopy = false;
            this.Config.SignatureFlowOnEftpos = false;
            this._log.warn("Printing is enabled on a terminal without printer. Printing options will now be disabled.");
        }

        if (this.CurrentFlow != SpiFlow.Idle) {
            return new InitiateTxResult(false, "Not Idle");
        }

        var settleMsg = Object.assign(new SettleRequest(RequestIdHelper.Id("settle")),
        {
            Config: this.Config,
            Options: transactionOptions
        }).ToMessage();

        this.CurrentFlow = SpiFlow.Transaction;
        this.CurrentTxFlowState = new TransactionFlowState(
            posRefId, TransactionType.Settle, 0, settleMsg, 
            `Waiting for EFTPOS connection to make a settle request`);

        if (this._send(settleMsg))
        {
            this.CurrentTxFlowState.Sent(`Asked EFTPOS to settle.`);
        }
        
        this._eventBus.dispatchEvent(new CustomEvent('TxFlowStateChanged', { detail: this.CurrentTxFlowState }));
        return new InitiateTxResult(true, "Settle Initiated");   
    }

    // <summary>
    // <param name="options">The Setting to set Header and Footer for the Receipt</param>
    // </summary>
    InitiateSettlementEnquiry(posRefId, options = new TransactionOptions())
    {
        if (this.CurrentStatus == SpiStatus.Unpaired) return new InitiateTxResult(false, "Not Paired");

        if (this.CurrentFlow != SpiFlow.Idle) return new InitiateTxResult(false, "Not Idle");
        var stlEnqMsg = Object.assign(new SettlementEnquiryRequest(RequestIdHelper.Id("stlenq")),
        {
            Config: this.Config,
            Options: options
        }).ToMessage();

        this.CurrentFlow = SpiFlow.Transaction;
        this.CurrentTxFlowState = new TransactionFlowState(
            posRefId, TransactionType.SettlementEnquiry, 0, stlEnqMsg,
            "Waiting for EFTPOS connection to make a settlement enquiry");
        if (this._send(stlEnqMsg))
        {
            this.CurrentTxFlowState.Sent("Asked EFTPOS to make a settlement enquiry.");
        }
        
        this._eventBus.dispatchEvent(new CustomEvent('TxFlowStateChanged', { detail: this.CurrentTxFlowState }));
        return new InitiateTxResult(true, "Settle Initiated");   
    }

    // <summary>
    // Initiates a Get Last Transaction. Use this when you want to retrieve the most recent transaction
    // that was processed by the Eftpos.
    // Be subscribed to TxFlowStateChanged event to get updates on the process.
    // </summary>
    InitiateGetLastTx()
    {
        if (this.CurrentStatus === SpiStatus.Unpaired) {
            return new InitiateTxResult(false, "Not Paired");
        }

        if (this.CurrentFlow !== SpiFlow.Idle) {
            return new InitiateTxResult(false, "Not Idle");
        }

        this.CurrentFlow = SpiFlow.Transaction;
        const gltRequestMsg = new GetLastTransactionRequest().ToMessage();
        const posRefId = gltRequestMsg.Id; // GetLastTx is not trying to get anything specific back. So we just use the message id.

        this.CurrentTxFlowState = new TransactionFlowState(
            posRefId, TransactionType.GetLastTransaction, 0, gltRequestMsg,
            "Waiting for EFTPOS connection to make a Get-Last-Transaction request.");
        if (this._send(gltRequestMsg))
        {
            this.CurrentTxFlowState.Sent("Asked EFTPOS for last transaction.");
        }
    
        this._eventBus.dispatchEvent(new CustomEvent('TxFlowStateChanged', { detail: this.CurrentTxFlowState }));
        return new InitiateTxResult(true, "GLT Initiated");   
    }

    /// <summary>
    /// Initiates a Get Transaction request. Use this when you want to retrieve from one of the last 10 transactions
    /// that was processed by the Eftpos.
    /// Be subscribed to TxFlowStateChanged event to get updates on the process.
    /// </summary>
    /// <param name="posRefId">This is the posRefId of the transaction you are trying to retrieve</param>
    InitiateGetTx(posRefId)
    {
        if (this.CurrentStatus === SpiStatus.Unpaired) return new InitiateTxResult(false, "Not Paired");

        if (this.CurrentFlow !== SpiFlow.Idle) return new InitiateTxResult(false, "Not Idle");

        const gtRequestMsg = new GetTransactionRequest(posRefId).ToMessage();
        this.CurrentFlow = SpiFlow.Transaction;
        this.CurrentTxFlowState = new TransactionFlowState(
            posRefId, TransactionType.GetTransaction, 0, gtRequestMsg,
            "Waiting for EFTPOS connection to make a Get Transaction request.");
        this.CurrentTxFlowState.CallingGt(gtRequestMsg.Id);
        if (this._send(gtRequestMsg)) {
            this.CurrentTxFlowState.Sent(`Asked EFTPOS to Get Transaction ${posRefId}.`);
        }

        this._eventBus.dispatchEvent(new CustomEvent("TxFlowStateChanged", { detail: this.CurrentTxFlowState }));
        return new InitiateTxResult(true, "GT Initiated");

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
        if (this.CurrentStatus === SpiStatus.Unpaired) return new InitiateTxResult(false, "Not Paired");
    
        if (this.CurrentFlow !== SpiFlow.Idle) return new InitiateTxResult(false, "Not Idle");
        
        this.CurrentFlow = SpiFlow.Transaction;
        
        const gtRequestMsg = new GetTransactionRequest(posRefId).ToMessage();
        this.CurrentTxFlowState = new TransactionFlowState(
            posRefId, txType, 0, gtRequestMsg,
            "Waiting for EFTPOS connection to attempt recovery.");
        this.CurrentTxFlowState.CallingGt(gtRequestMsg.Id);
        
        if (this._send(gtRequestMsg))
        {
            this.CurrentTxFlowState.Sent(`Asked EFTPOS to recover state.`);
        }
    
        this._eventBus.dispatchEvent(new CustomEvent('TxFlowStateChanged', { detail: this.CurrentTxFlowState }));
        return new InitiateTxResult(true, "Recovery Initiated");
    }

    /// <summary>
    /// Alpha Build - Please do not use
    /// </summary>
    /// <param name="posRefId"></param>
    /// <returns></returns>
    InitiateReversal(posRefId)
    {
        if (this.CurrentStatus === SpiStatus.Unpaired) return new InitiateTxResult(false, "Not Paired");

        if (this.CurrentFlow !== SpiFlow.Idle) return new InitiateTxResult(false, "Not Idle");

        this.CurrentFlow = SpiFlow.Transaction;

        const reversalRequestMsg = new ReversalRequest(posRefId).ToMessage();
        this.CurrentTxFlowState = new TransactionFlowState(
            posRefId, TransactionType.Reversal, 0, reversalRequestMsg,
            "Waiting for EFTPOS to make a reversal request");
        if (this._send(reversalRequestMsg)) {
            this.CurrentTxFlowState.Sent("Asked EFTPOS reversal");
        }

        return new InitiateTxResult(true, "Reversal Initiated");
    }

    /// <summary>
    /// Initiates a Zip refund transaction. Be subscribed to TxFlowStateChanged event to get updates on the process.
    /// </summary>
    /// <param name="posRefId">Alphanumeric Identifier for your refund.</param>
    /// <param name="refundAmount">Amount in Cents to charge</param>
    /// <param name="originalReceiptNumber">Zip transaction identifier to refun</param>
    /// <param name="options">The Setting to set Header and Footer for the Receipt</param>
    /// <returns>InitiateTxResult</returns>
    InitiateZipRefundTx(posRefId, refundAmount, originalReceiptNumber, options = new TransactionOptions())
    {
        if (this.CurrentStatus == SpiStatus.Unpaired) return new InitiateTxResult(false, 'Not Paired');
        if (this.CurrentFlow != SpiFlow.Idle) return new InitiateTxResult(false, 'Not Idle');

        const zipRefundRequest = Object.assign(
            new ZipRefundRequest(refundAmount, posRefId),
            {
                Config: this.Config,
                Options: options,
                OriginalReceiptNumber: originalReceiptNumber,
            }
        );
        const zipRefundMsg = zipRefundRequest.ToMessage();

        this.CurrentFlow = SpiFlow.Transaction;
        this.CurrentTxFlowState = new TransactionFlowState(
            posRefId, TransactionType.ZipRefund, refundAmount, zipRefundMsg,
            `Waiting for EFTPOS connection to make Zip refund request for ${refundAmount / 100}`
        );
        if (this._send(zipRefundMsg))
        {
            this.CurrentTxFlowState.Sent(`Asked EFTPOS to refund ${refundAmount / 100}`);
        }

        this._eventBus.dispatchEvent(new CustomEvent('TxFlowStateChanged', { detail: this.CurrentTxFlowState }));
        return new InitiateTxResult(true, 'Zip Refund Initiated');
    }

    /// <summary>
    /// Initiates a Zip purchase transaction. Be subscribed to TxFlowStateChanged event to get updates on the process.
    /// </summary>
    /// <param name="posRefId">An Unique Identifier for your Order/Purchase</param>
    /// <param name="purchaseAmount">The Purchase Amount in Cents.</param>
    /// <param name="description">Description of the item to purchase</param>
    /// <param name="storeCode">Zip store code used for this transaction</param>
    /// <param name="options">The Setting to set Header and Footer for the Receipt</param>
    /// <returns>InitiateTxResult</returns>
    InitiateZipPurchaseTx(posRefId, purchaseAmount, description, storeCode, options = new TransactionOptions())
    {
        if (this.CurrentStatus == SpiStatus.Unpaired) return new InitiateTxResult(false, 'Not Paired');
        if (this.CurrentFlow != SpiFlow.Idle) return new InitiateTxResult(false, 'Not Idle');

        this.CurrentFlow = SpiFlow.Transaction;
        const zipPurchase = Object.assign(
            new ZipPurchaseRequest(purchaseAmount, posRefId),
            {
                Config: this.Config,
                Options: options,
                Description: description,
                StoreCode: storeCode,
            }
        );
        const zipPurchaseMsg = zipPurchase.ToMessage();

        this.CurrentTxFlowState = new TransactionFlowState(
            posRefId, TransactionType.ZipPurchase, purchaseAmount, zipPurchaseMsg,
            `Waiting for EFTPOS connection to make Zip payment request. ${zipPurchase.AmountSummary()}`);
        if (this._send(zipPurchaseMsg))
        {
            this.CurrentTxFlowState.Sent(`Asked EFTPOS to accept Zip payment for ${zipPurchase.AmountSummary()}`);
        }

        this._eventBus.dispatchEvent(new CustomEvent('TxFlowStateChanged', { detail: this.CurrentTxFlowState }));
        return new InitiateTxResult(true, 'Zip Purchase Initiated');
    }

    PrintReceipt(key, payload)
    {
        if (this.CurrentStatus === SpiStatus.PairedConnected) {
            this._send(new PrintingRequest(key, payload).toMessage());
        }
    }

    /// <summary>
    /// Static call to retrieve the available tenants (payment providers) for mx51. This is used to display the payment providers available in your Simple Payments Integration setup.
    /// </summary>
    /// <param name="posVendorId">This is the POS identifier, same as the one you provided in SetPosInfo() method</param>
    /// <param name="countryCode">2 digit ISO Country code, eg. AU</param>
    /// <param name="apiKey">ApiKey provided by mx51</param>
    static async GetAvailableTenants(posVendorId, apiKey, countryCode) {
        try
        {
            const { data: Data } = await TenantsService.RetrieveTenantsList(posVendorId, apiKey, countryCode);
            return { Data };
        } 
        catch (error)
        {
            return { Data: [] };
        }
    }

    GetTerminalStatus()
    {
        if (this.CurrentStatus === SpiStatus.PairedConnected) {
            this._send(new TerminalStatusRequest().ToMessage());
        }
    }

    GetTerminalConfiguration()
    {
        if (this.CurrentStatus === SpiStatus.PairedConnected) {
            this._send(new TerminalConfigurationRequest().ToMessage());
        }
    }

    /// <summary>
    /// Async call to get the current terminal address, this does not update the internals address of the library.
    /// </summary>
    /// <returns></returns>
    async GetTerminalAddress()
    {
        const service = new DeviceAddressService();

        let deviceAddressStatus;
        try
        {
            const addressResponse = await service.RetrieveDeviceAddress(this._serialNumber, this._deviceApiKey, this._tenantCode, this._isSecureConnection(), this._inTestMode);
            const addressResponseJson = await addressResponse.json();
            deviceAddressStatus = DeviceHelper.GenerateDeviceAddressStatus(
                {
                    Data: addressResponseJson,
                    StatusCode: addressResponse.status,
                    StatusDescription: addressResponse.statusText,
                },
                this._eftposAddress,
                this._forceSecureWebSockets
            );
        } 
        catch (error)
        {
            deviceAddressStatus = DeviceHelper.GenerateDeviceAddressStatus(
                {
                    Data: {},
                    StatusCode: null,
                    StatusDescription: error.message,
                },
                this._eftposAddress,
                this._forceSecureWebSockets
            );
        }

        return deviceAddressStatus.Address;
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
        this._eventBus.dispatchEvent(new CustomEvent('PairingFlowStateChanged', { detail: this.CurrentPairingFlowState }));

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
        this._eventBus.dispatchEvent(new CustomEvent('PairingFlowStateChanged', { detail: this.CurrentPairingFlowState }));
    }

    // <summary>
    // Handling the 5th and final interaction of the pairing process, i.e. an incoming PairResponse
    // </summary>
    // <param name="m"></param>
    _handlePairResponse(m)
    {
        const pairResp = new PairResponse(m);

        this.CurrentPairingFlowState.AwaitingCheckFromEftpos = false;
        if (pairResp.Success)
        {
            if (this.CurrentPairingFlowState.AwaitingCheckFromPos)
            {
                // Waiting for PoS, auto confirming code
                this._log.info("Confirming pairing from library.");
                this.PairingConfirmCode();
            }

            this._log.info("Got Pair Confirm from Eftpos, and already had confirm from POS. Now just waiting for first pong.");
            this._onPairingSuccess();

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
        this._eventBus.dispatchEvent(new CustomEvent('SecretsChanged', {detail: this._secrets}));
        this._eventBus.dispatchEvent(new CustomEvent('PairingFlowStateChanged', { detail: this.CurrentPairingFlowState }));
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
        this._eventBus.dispatchEvent(new CustomEvent('PairingFlowStateChanged', { detail: this.CurrentPairingFlowState }));
    }

    _doUnpair()
    {
        this.CurrentStatus = SpiStatus.Unpaired;
        this._conn.Disconnect();
        this._secrets = null;
        this._spiMessageStamp.Secrets = null;
        this._eventBus.dispatchEvent(new CustomEvent('SecretsChanged', { detail: this._secrets }));
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
        this._eventBus.dispatchEvent(new CustomEvent('SecretsChanged', { detail: this._secrets }));
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
    
        this._eventBus.dispatchEvent(new CustomEvent('TxFlowStateChanged', { detail: this.CurrentTxFlowState }));
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
    
        this._eventBus.dispatchEvent(new CustomEvent('TxFlowStateChanged', { detail: this.CurrentTxFlowState }));
    }

    // <summary>
    // The PinPad server will reply to our PurchaseRequest with a PurchaseResponse.
    // </summary>
    // <param name="m"></param>
    _handlePurchaseResponse(m)
    {
        const incomingPosRefId = m.Data.pos_ref_id;
        if (this.CurrentFlow !== SpiFlow.Transaction || this.CurrentTxFlowState.Finished || !this.CurrentTxFlowState.PosRefId === incomingPosRefId)
        {
            this._log.info(`Received Purchase response but I was not waiting for one. Incoming Pos Ref ID: ${incomingPosRefId}"`);
            return;
        }
        // TH-1A, TH-2A
        
        this.CurrentTxFlowState.Completed(m.GetSuccessState(), m, "Purchase Transaction Ended.");
        // TH-6A, TH-6E
        
        this._eventBus.dispatchEvent(new CustomEvent('TxFlowStateChanged', { detail: this.CurrentTxFlowState }));
        this._sendTransactionReport();
    }

    // <summary>
    // The PinPad server will reply to our CashoutOnlyRequest with a CashoutOnlyResponse.
    // </summary>
    // <param name="m"></param>
    _handleCashoutOnlyResponse(m)
    {
        const incomingPosRefId = m.Data.pos_ref_id;
        if (this.CurrentFlow !== SpiFlow.Transaction || this.CurrentTxFlowState.Finished || !this.CurrentTxFlowState.PosRefId === incomingPosRefId)
        {
            this._log.info(`Received Cashout Response but I was not waiting for one. Incoming Pos Ref ID: ${incomingPosRefId}`);
            return;
        }
        // TH-1A, TH-2A
        
        this.CurrentTxFlowState.Completed(m.GetSuccessState(), m, "Cashout Transaction Ended.");
        // TH-6A, TH-6E
        
        this._eventBus.dispatchEvent(new CustomEvent('TxFlowStateChanged', { detail: this.CurrentTxFlowState }));
        this._sendTransactionReport();
    }

    // <summary>
    // The PinPad server will reply to our MotoPurchaseRequest with a MotoPurchaseResponse.
    // </summary>
    // <param name="m"></param>
    _handleMotoPurchaseResponse(m)
    {
        const incomingPosRefId = m.Data.pos_ref_id;
        if (this.CurrentFlow !== SpiFlow.Transaction || this.CurrentTxFlowState.Finished || !this.CurrentTxFlowState.PosRefId === incomingPosRefId)
        {
            this._log.info(`Received Moto Response but I was not waiting for one. Incoming Pos Ref ID: ${incomingPosRefId}`);
            return;
        }
        // TH-1A, TH-2A
        
        this.CurrentTxFlowState.Completed(m.GetSuccessState(), m, "Moto Transaction Ended.");
        // TH-6A, TH-6E
        
        this._eventBus.dispatchEvent(new CustomEvent('TxFlowStateChanged', { detail: this.CurrentTxFlowState }));
        this._sendTransactionReport();
    }   

    // <summary>
    // The PinPad server will reply to our RefundRequest with a RefundResponse.
    // </summary>
    // <param name="m"></param>
    _handleRefundResponse(m)
    {
        const incomingPosRefId = m.Data.pos_ref_id;
        if (this.CurrentFlow !== SpiFlow.Transaction || this.CurrentTxFlowState.Finished | !this.CurrentTxFlowState.PosRefId === incomingPosRefId)
        {
            this._log.info(`Received Refund response but I was not waiting for this one. Incoming Pos Ref ID: ${incomingPosRefId}`);
            return;
        }
        // TH-1A, TH-2A
        
        this.CurrentTxFlowState.Completed(m.GetSuccessState(), m, "Refund Transaction Ended.");
        // TH-6A, TH-6E
        
        this._eventBus.dispatchEvent(new CustomEvent('TxFlowStateChanged', { detail: this.CurrentTxFlowState }));
        this._sendTransactionReport();
    }

    // <summary>
    // Handle the Settlement Response received from the PinPad
    // </summary>
    // <param name="m"></param>
    _handleSettleResponse(m)
    {
        if (this.CurrentFlow !== SpiFlow.Transaction || this.CurrentTxFlowState.Finished)
        {
            this._log.info(`Received Settle response but I was not waiting for one. ${m.DecryptedJson}`);
            return;
        }
        // TH-1A, TH-2A
        
        this.CurrentTxFlowState.Completed(m.GetSuccessState(), m, "Settle Transaction Ended.");
        // TH-6A, TH-6E
    
        this._eventBus.dispatchEvent(new CustomEvent('TxFlowStateChanged', { detail: this.CurrentTxFlowState }));
        this._sendTransactionReport();
    }

    // <summary>
    // Handle the Settlement Enquiry Response received from the PinPad
    // </summary>
    // <param name="m"></param>
    _handleSettlementEnquiryResponse(m)
    {
        if (this.CurrentFlow !== SpiFlow.Transaction || this.CurrentTxFlowState.Finished)
        {
            this._log.info(`Received Settlement Enquiry response but I was not waiting for one. ${m.DecryptedJson}`);
            return;
        }
        // TH-1A, TH-2A
        
        this.CurrentTxFlowState.Completed(m.GetSuccessState(), m, "Settlement Enquiry Ended.");
        // TH-6A, TH-6E
        
        this._eventBus.dispatchEvent(new CustomEvent('TxFlowStateChanged', { detail: this.CurrentTxFlowState }));
        this._sendTransactionReport();
    }

    /// <summary>
    /// Handle the Reversal Response received from the PinPad
    /// </summary>
    /// <param name="m"></param>
    _handleReversalTransaction(m)
    {
        const incomingPosRefId = m.Data.pos_ref_id;
        if (
            this.CurrentFlow !== SpiFlow.Transaction ||
            this.CurrentTxFlowState.Finished ||
            !this.CurrentTxFlowState.PosRefId === incomingPosRefId
        ) {
            this._log.info(`Received Reversal response but I was not waiting for this one. Incoming Pos Ref ID: ${incomingPosRefId}`);
            return;
        }

        this.CurrentTxFlowState.Completed(m.GetSuccessState(), m, "Reversal Transaction Ended.");

        this._eventBus.dispatchEvent(new CustomEvent('TxFlowStateChanged', { detail: this.CurrentTxFlowState }));
        this._sendTransactionReport();
    }

    // <summary>
    // Sometimes we receive event type "error" from the server, such as when calling cancel_transaction and there is no transaction in progress.
    // </summary>
    // <param name="m"></param>
    _handleErrorEvent(m)
    {
        if (this.CurrentFlow === SpiFlow.Transaction
            && !this.CurrentTxFlowState.Finished
            && this.CurrentTxFlowState.AttemptingToCancel
            && m.GetError() === "NO_TRANSACTION")
        {
            // TH-2E
            this._log.info("Was trying to cancel a transaction but there is nothing to cancel. Calling GT to see what's up");
            this._callGetTransaction(this.CurrentTxFlowState.PosRefId);
        }
        else
        {
            this._log.info(`Received Error Event But Don't know what to do with it. ${m.DecryptedJson}`);
        }
    }

    // <summary>
    // When the PinPad returns to us what the Transaction was.
    // </summary>
    // <param name="m"></param>
    _handleGetTransactionResponse(m)
    {
        const txState = this.CurrentTxFlowState;
        if (this.CurrentFlow !== SpiFlow.Transaction || txState.Finished)
        {
            this._log.info("Received gt response but we were not in the middle of a tx. ignoring.");
            return;
        }

        if (!txState.AwaitingGtResponse)
        {
            this._log.info("received a gt response but we had not asked for one within this transaction. Perhaps leftover from previous one. ignoring.");
            return;
        }

        if (txState.GtRequestId !== m.Id)
        {
            this._log.info("received a gt response but the message id does not match the gt request that we sent. strange. ignoring.");
            return;
        }

        this._log.info("Got Transaction.");
        txState.GotGtResponse();
        const gtResponse = new GetTransactionResponse(m);

        if (!gtResponse.WasRetrievedSuccessfully())
        {
            // GetTransaction Failed... let's figure out one of reason and act accordingly
            if (gtResponse.IsWaitingForSignatureResponse())
            {
                if (!txState.AwaitingSignatureCheck)
                {
                    this._log.info("GTR-01: Eftpos is waiting for us to send it signature accept/decline, but we were not aware of this. The user can only really decline at this stage as there is no receipt to print for signing.");
                    txState.SignatureRequired(new SignatureRequired(m).SignatureRequired(txState.PosRefId, m.Id, "MISSING RECEIPT\n DECLINE AND TRY AGAIN."), "Recovered in Signature Required but we don't have receipt. You may Decline then Retry.");
                }
                else
                {
                    this._log.info("Waiting for Signature response ... stay waiting.");
                    // No need to publish txFlowStateChanged. Can return;
                    return;
                }
            }
            else if (gtResponse.IsWaitingForAuthCode() && !txState.AwaitingPhoneForAuth)
            {
                this._log.info(
                    "GTR-02: Eftpos is waiting for us to send it auth code, but we were not aware of this. We can only cancel the transaction at this stage as we don't have enough information to recover from this."
                );
                txState.PhoneForAuthRequired(new PhoneForAuthRequired(txState.PosRefId, m.Id, "UNKNOWN", "UNKNOWN"), "Recovered mid Phone-For-Auth but don't have details. You may Cancel then Retry.");
            }
            else if (gtResponse.IsTransactionInProgress())
            {
                this._log.info("GTR-03: Transaction is currently in progress... stay waiting.");
                return;
            }
            else if (gtResponse.PosRefIdNotFound()) 
            {
                this._log.info("GTR-04: Get transaction failed, PosRefId is not found.");
                txState.Completed(SuccessState.Failed, m, `PosRefId not found for ${gtResponse.GetPosRefId()}.`);
            }
            else if (gtResponse.PosRefIdInvalid())
            {
                this._log.info("GTR-05: Get transaction failed, PosRefId is invalid.");
                txState.Completed(SuccessState.Failed, m, `PosRefId invalid for ${gtResponse.GetPosRefId()}.`);
            }
            else if (gtResponse.PosRefIdMissing())
            {
                this._log.info("GTR-06: Get transaction failed, PosRefId is missing.");
                txState.Completed(SuccessState.Failed, m, `PosRefId is missing for ${gtResponse.GetPosRefId()}.`);
            }
            else if (gtResponse.IsSomethingElseBlocking())
            {
                this._log.info("GTR-07: Terminal is Blocked by something else... stay waiting.");
                return;
            }
            else
            {
                // get transaction failed, but we weren't given a specific reason
                this._log.info(`GTR-08: Unexpected Response in Get Transaction - Received posRefId:${gtResponse.GetPosRefId()} Error:${m.GetError()}.`);
                txState.Completed(SuccessState.Failed, m, `Get Transaction failed, ${m.GetError()}.`);
            }
        }
        else
        {
            const tx = gtResponse.GetTxMessage();
            if (tx === null)
            {
                // tx payload missing from get transaction protocol, could be a VAA issue.
                this._log.info("GTR-09: Unexpected Response in Get Transaction. Missing TX payload... stay waiting");
                return;
            }

            // get transaction was successful
            gtResponse.CopyMerchantReceiptToCustomerReceipt();

            if (txState.Type === TransactionType.GetTransaction)
            {
                // this was a get transaction request, not for recovery
                this._log.info("GTR-10: Retrieved Transaction as asked directly by the user.");
                txState.Completed(tx.GetSuccessState(), tx, `Transaction Retrieved for ${gtResponse.GetPosRefId()}.`);
            }
            else
            {
                // this was a get transaction from a recovery
                this._log.info("GTR-11: Retrieved transaction during recovery.");
                txState.Completed(tx.GetSuccessState(), tx, `Transaction Recovered for ${gtResponse.GetPosRefId()}.`);
            } 
        }
        this._eventBus.dispatchEvent(new CustomEvent('TxFlowStateChanged', { detail: txState }));
    }

    /// <summary>
    /// When the PinPad returns to us what the Last Transaction was.
    /// </summary>
    /// <param name="m"></param>
    _handleGetLastTransactionResponse(m)
    {
        const txState = this.CurrentTxFlowState;
        if (this.CurrentFlow !== SpiFlow.Transaction || txState.Finished || txState.Type !== TransactionType.GetLastTransaction)
        {
            this._log.info("Received glt response but we were not expecting one. ignoring.");
            return;
        }

        this._log.info("Got Last Transaction Response..");
        const gtlResponse = new GetLastTransactionResponse(m);
        if (!gtlResponse.WasRetrievedSuccessfully())
        {
            this._log.info(`Error in Response for Get Last Transaction - Received posRefId:${gtlResponse.GetPosRefId()} Error:${m.GetError()}. UnknownCompleted.`);
            txState.UnknownCompleted("Failed to Retrieve Last Transaction");
        }
        else
        {
            this._log.info("Retrieved Last Transaction as asked directly by the user.");
            gtlResponse.CopyMerchantReceiptToCustomerReceipt();
            txState.Completed(m.GetSuccessState(), m, "Last Transaction Retrieved");
        }
        this._eventBus.dispatchEvent(new CustomEvent('TxFlowStateChanged', { detail: txState }));
        this._sendTransactionReport();
    }

    //When the transaction cancel response is returned.
    _handleCancelTransactionResponse(m)
    {
        const incomingPosRefId = m.Data.pos_ref_id;
        const txState = this.CurrentTxFlowState;
        const cancelResponse = new CancelTransactionResponse(m);

        if (this.CurrentFlow !== SpiFlow.Transaction || txState.Finished || !txState.PosRefId === incomingPosRefId)
        {
            if (!cancelResponse.WasTxnPastPointOfNoReturn()) {
                this._log.info(`Received Cancel Required but I was not waiting for one. Incoming Pos Ref ID: ${incomingPosRefId}`);
                return;
            }
        }

        if (cancelResponse.Success) return;

        this._log.warn("Failed to cancel transaction: reason=" + cancelResponse.GetErrorReason() + ", detail=" + cancelResponse.GetErrorDetail());

        txState.CancelFailed("Failed to cancel transaction: " + cancelResponse.GetErrorDetail() + ". Check EFTPOS.");
    
        this._eventBus.dispatchEvent(new CustomEvent('TxFlowStateChanged', { detail: txState }));
        this._sendTransactionReport();
    }

    _handleSetPosInfoResponse(m)
    {
        var response = new SetPosInfoResponse(m);
        if (response.isSuccess())
        {
            this._hasSetInfo = true;
            this._log.info("Setting POS info successful");
        }
        else
        {
            this._log.warn("Setting POS info failed: reason=" + response.getErrorReason() + ", detail=" + response.getErrorDetail());
        }
    }

    _startTransactionMonitoringThread()
    {
        let needsPublishing = false;
    
        const txState = this.CurrentTxFlowState;
        if (this.CurrentFlow === SpiFlow.Transaction && !txState.Finished)
        {
            const state = txState;
            if (state.AttemptingToCancel && Date.now() > state.CancelAttemptTime + this._maxWaitForCancelTx)
            {
                // TH-2T - too long since cancel attempt - Consider unknown
                this._log.info("Been too long waiting for transaction to cancel.");
                txState.UnknownCompleted("Waited long enough for Cancel Transaction result. Check EFTPOS. ");
                needsPublishing = true;
            }
            else if (state.RequestSent && Date.now() > state.LastStateRequestTime + this._checkOnTxFrequency)
            {
                // It's been a while since we received an update.

                if (txState.Type === TransactionType.GetLastTransaction)
                {
                    // It is not possible to recover a GLT with a GT, so we send another GLT
                    txState.LastStateRequestTime = Date.Now();
                    this._send(new GetLastTransactionRequest().ToMessage());
                    this._log.info(`Been to long waiting for GLT response. Sending another GLT. Last checked at ${state.LastStateRequestTime}...`);
                }
                else
                {
                    // let's call a GT to see what is happening
                    this._log.info(`Checking on our transaction. Last checked at ${state.LastStateRequestTime}...`);
                    this._callGetTransaction(txState.PosRefId);
                }
            }
        }
        
        if (needsPublishing) {
            this._eventBus.dispatchEvent(new CustomEvent('TxFlowStateChanged', { detail: this.CurrentTxFlowState }));
        }

        this._transactionMonitoringThread = setTimeout(() => this._startTransactionMonitoringThread(), this._txMonitorCheckFrequency);
    }

    PrintingResponse(m) {
        throw new Error('Method not implemented. Please overwrite this method in your POS');
    }

    TerminalStatusResponse(m) {
        throw new Error('Method not implemented. Please overwrite this method in your POS');
    }

    TerminalConfigurationResponse(m) {
        throw new Error('Method not implemented. Please overwrite this method in your POS');
    }

    BatteryLevelChanged(m) {
        throw new Error('Method not implemented. Please overwrite this method in your POS');
    }

    TransactionUpdateMessage(m) {
        throw new Error('Method not implemented. Please overwrite this method in your POS');
    }

    _handlePrintingResponse(m)
    {
        if (typeof this.PrintingResponse === 'function') this.PrintingResponse(m);
    }

    _handleTransactionUpdateMessage(m) 
    {
        if (typeof this.TransactionUpdateMessage === 'function') this.TransactionUpdateMessage(m);
    }

    _handleTerminalStatusResponse(m)
    {
        if (typeof this.TerminalStatusResponse === 'function') this.TerminalStatusResponse(m);
    }

    _handleTerminalConfigurationResponse(m)
    {
        const response = new TerminalConfigurationResponse(m);
        if (response.isSuccess())
        {
            this._serialNumber = response.GetSerialNumber();
            this._terminalModel = response.GetTerminalModel();
        }

        if (typeof this.TerminalStatusResponse === 'function') this.TerminalConfigurationResponse(m);
    }

    _handleBatteryLevelChanged(m)
    {
        if (typeof this.BatteryLevelChanged === 'function') this.BatteryLevelChanged(m);
    }

    _isPrintingConfigEnabled()
    {
        if (this.Config.PromptForCustomerCopyOnEftpos || this.Config.PrintMerchantCopy || this.Config.SignatureFlowOnEftpos)
        {
            return true;
        }

        return false;
    }

    _handleZipPurchaseResponse(m)
    {
        const incomingPosRefId = m.Data.pos_ref_id;
        if (this.CurrentFlow !== SpiFlow.Transaction || this.CurrentTxFlowState.Finished || !this.CurrentTxFlowState.PosRefId === incomingPosRefId)
        {
            this._log.info(`Received Zip Purchase response but I was not waiting for one. Incoming Pos Ref ID: ${incomingPosRefId}`);
            return;
        }
        // TH-1A, TH-2A

        this.CurrentTxFlowState.Completed(m.GetSuccessState(), m, 'Zip Purchase Transaction Ended.');
        // TH-6A, TH-6E

        this._eventBus.dispatchEvent(new CustomEvent('TxFlowStateChanged', { detail: this.CurrentTxFlowState }));
        this._sendTransactionReport();
    }

    _handleZipRefundResponse(m)
    {
        const incomingPosRefId = m.Data.pos_ref_id;
        if (this.CurrentFlow !== SpiFlow.Transaction || this.CurrentTxFlowState.Finished || !this.CurrentTxFlowState.PosRefId === incomingPosRefId)
        {
            this._log.info(`Received Zip Refund response but I was not waiting for this one. Incoming Pos Ref ID: ${incomingPosRefId}`);
            return;
        }
        // TH-1A, TH-2A

        this.CurrentTxFlowState.Completed(m.GetSuccessState(), m, "Zip Refund Transaction Ended.");
        // TH-6A, TH-6E

        this._eventBus.dispatchEvent(new CustomEvent('TxFlowStateChanged', { detail: this.CurrentTxFlowState }));
        this._sendTransactionReport();
    }

    // endregion
        
    // region Internals for Connection Management

    _resetConn()
    {
        // Setup the Connection
        this._conn = new Connection(this);

        if (this._isUsingHttps() || this._forceSecureWebSockets) {
            this._log.info("Secure connection detected.");
            this._eftposAddress = this._eftposAddress.replace("ws://", "wss://");
            this._autoResolveEftposAddress();
        }
        this._conn.Address = this._eftposAddress;
    
        // Register our Event Handlers
        this._eventBus.addEventListener('ConnectionStatusChanged', (e) => this._onSpiConnectionStatusChanged(e.detail));
        this._eventBus.addEventListener('MessageReceived', (e) => this._onSpiMessageReceived(e.detail));
        this._eventBus.addEventListener('ErrorReceived', (e) => this._onWsErrorReceived(e.detail));
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
                this._spiMessageStamp.ResetConnection();

                if (this.CurrentFlow == SpiFlow.Pairing && this.CurrentStatus == SpiStatus.Unpaired)
                {
                    this.CurrentPairingFlowState.Message = "Requesting to Pair...";
                    this._eventBus.dispatchEvent(new CustomEvent('PairingFlowStateChanged', { detail: this.CurrentPairingFlowState }));
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
                this._spiMessageStamp.ResetConnection();

                if (this.CurrentStatus != SpiStatus.Unpaired)
                {
                    this.CurrentStatus = SpiStatus.PairedConnecting;

                    if (this.CurrentFlow == SpiFlow.Transaction && !this.CurrentTxFlowState.Finished)
                    {
                        // we're in the middle of a transaction, just so you know!
                        // TH-1D
                        this._log.info(`Lost connection in the middle of a transaction...`);
                    }

                    // As we have no way to recover from a reversal in the event of a disconnection, we will fail the reversal.
                    if (this.CurrentFlow === SpiFlow.Transaction && this.CurrentTxFlowState && this.CurrentTxFlowState.Type === TransactionType.Reversal)
                    {
                        this.CurrentTxFlowState.Completed(SuccessState.Failed, null, "We were in the middle of a reversal when a disconnection happened, let's fail the reversal.");
                        this._eventBus.dispatchEvent(new CustomEvent('TxFlowStateChanged', { detail: this.CurrentTxFlowState }));
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
                    if (this.CurrentPairingFlowState.Finished) return;

                    if (this._retriesSinceLastPairing >= this._retriesBeforePairing)
                    {
                        this._retriesSinceLastPairing = 0;
                        this._log.warn("Lost Connection during pairing.");
                        this._onPairingFailed();
                        this._eventBus.dispatchEvent(new CustomEvent('PairingFlowStateChanged', { detail: this.CurrentPairingFlowState }));
                        return;
                    }
                    else
                    {
                        this._log.info(`Will try to re-pair in ${this._sleepBeforeReconnectMs}ms ...`);
                        setTimeout(() => {
                            if (this.CurrentStatus != SpiStatus.PairedConnected)
                            {
                                // This is non-blocking
                                if (this._conn) this._conn.Connect();
                            }

                            this._retriesSinceLastPairing += 1;
                        }, this._sleepBeforeReconnectMs);
                    }
                }
                break;
            default:
                throw new Error('Unknown state: ' + state);
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
        if(this._conn.Connected && this._secrets !== null) {
            this._doPing(); // first ping

            setTimeout(() => {
                if (this._mostRecentPingSent !== null &&
                    (this._mostRecentPongReceived === null || this._mostRecentPongReceived.Id !== this._mostRecentPingSent.Id))
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

        if (this.CurrentFlow === SpiFlow.Transaction && !this.CurrentTxFlowState.Finished)
        {
            if (this.CurrentTxFlowState.RequestSent)
            {
                // TH-3A - We've just reconnected and were in the middle of Tx.
                // Let's get the transaction to check what we might have missed out on.
                this._callGetTransaction(this.CurrentTxFlowState.PosRefId);
            }
            else
            {
                // TH-3AR - We had not even sent the request yet. Let's do that now
                this._send(this.CurrentTxFlowState.Request);
                this.CurrentTxFlowState.Sent("Sending Request Now...");
                this._eventBus.dispatchEvent(new CustomEvent('TxFlowStateChanged', { detail: this.CurrentTxFlowState }));
            }
        }
        else
        {
            if (!this._hasSetInfo) { 
                this._callSetPosInfo(); 
                this._transactionReport = TransactionReportHelper.CreateTransactionReportEnvelope(this._posVendorId, this._posVersion, this._libraryLanguage, Spi.GetVersion(), this._serialNumber);
            }

            // let's also tell the eftpos our latest table configuration.
            if (this._spiPat) {
                this._spiPat.PushPayAtTableConfig();
            }

            this.GetTerminalConfiguration();
        }
    }

    _callSetPosInfo()
    {
        const setPosInfoRequest = new SetPosInfoRequest(this._posVersion, this._posVendorId, this._spiceVersion, this._libraryLanguage, SPI_VERSION, DeviceInfo.GetAppDeviceInfo());
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
        const ping = PingHelper.GeneratePingRequest();

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
        if (this._mostRecentPongReceived == null)
        {
            // First pong received after a connection, and after the pairing process is fully finalised.
            // Receive connection id from PinPad after first pong, store this as this needs to be passed for every request.
            this._spiMessageStamp.SetConnectionId(m.ConnId);

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
        this._eventBus.dispatchEvent(new CustomEvent('SpiPong', { detail: m }))
        this._log.debug(`PongLatency:${Date.now() - this._mostRecentPingSentTime}`);
    }

    // <summary>
    // The server will also send us pings. We need to reply with a pong so it doesn't disconnect us.
    // </summary>
    // <param name="m"></param>
    _handleIncomingPing(m)
    {
        const pong = PongHelper.GeneratePongResponse(m);
        this._send(pong);
    }

    // <summary>
    // Ask the PinPad to tell us about the transaction with the posRefId
    // </summary>
    _callGetTransaction(posRefId)
    {
        const gtRequestMsg = new GetTransactionRequest(posRefId).ToMessage();
        this.CurrentTxFlowState.CallingGt(gtRequestMsg.Id);
        this._send(gtRequestMsg);
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
            case Events.GetTransactionResponse:
                this._handleGetTransactionResponse(m);
                break;
            case Events.GetLastTransactionResponse:
                this._handleGetLastTransactionResponse(m);
                break;
            case Events.SettleResponse:
                this._handleSettleResponse(m);
                break;
            case Events.SettlementEnquiryResponse:
                this._handleSettlementEnquiryResponse(m);
                break;
            case Events.ReversalResponse:
                this._handleReversalTransaction(m);
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
            case Events.PayAtTableGetOpenTables:
                this._spiPat._handleGetOpenTablesRequest(m);
                break;
            case Events.PayAtTableBillPaymentFlowEnded:
                this._spiPat._handleBillPaymentFlowEnded(m);
                break;
            case Events.PrintingResponse:
                this._handlePrintingResponse(m);
                break;
            case Events.TransactionUpdateMessage:
                this._handleTransactionUpdateMessage(m);
                break;
            case Events.TerminalStatusResponse:
                this._handleTerminalStatusResponse(m);
                break;
            case Events.TerminalConfigurationResponse:
                this._handleTerminalConfigurationResponse(m);
                break;
            case Events.BatteryLevelChanged:
                this._handleBatteryLevelChanged(m);
                break;
            case Events.ZipPurchaseResponse:
                this._handleZipPurchaseResponse(m);
                break;
            case Events.ZipRefundResponse:
                this._handleZipRefundResponse(m);
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
        this._log.warn("Received WS Error", error.Message);
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

    _isPosIdValid(posId)
    {
        if (!posId)
        {
            this._log.warn("Pos Id cannot be null or empty");
            return false;
        }

        if (posId.length > 16)
        {
            this._log.warn("Pos Id is greater than 16 characters");
            return false;
        }

        if (!posId.match(this._regexItemsForPosId))
        {
            this._log.warn("Pos Id cannot include special characters");
            return false;
        }

        return true;
    }

    _isEftposAddressValid(eftposAddress)
    {
        if (!eftposAddress)
        {
            this._log.warn("The Eftpos address cannot be null or empty");
            return false;
        }

        const sanitisedEftposAddress = eftposAddress.replace(/^w[s]?s:\/\//, "");

        // The eftposAddress may be an IP address or if it is a secure connection, a FQDN
        if (
            (!this._isSecureConnection() && !sanitisedEftposAddress.match(this._regexItemsForEftposAddress)) ||
            (this._isSecureConnection() && !sanitisedEftposAddress.match(this._regexItemsForFqdnEftposAddress))
        )
        {
            this._log.warn("The Eftpos address is not in the right format");
            return false;
        }

        return true;
    }

    HasSerialNumberChanged(updatedSerialNumber)
    {
        return this._serialNumber != updatedSerialNumber;
    }

    async _autoResolveEftposAddress()
    {
        if (!this._autoAddressResolutionEnabled)
            return;
    
        if (!this._serialNumber || !this._deviceApiKey)
        {
            this._log.warn("Missing serialNumber and/or deviceApiKey. Need to set them before for Auto Address to work.");
            return;
        }

        const isSecureConnection = this._isSecureConnection();
        const service = new DeviceAddressService();
        let deviceAddressStatus;

        try
        {
            const addressResponse = await service.RetrieveDeviceAddress(this._serialNumber, this._deviceApiKey, this._tenantCode, isSecureConnection, this._inTestMode);
            const addressResponseJson = await addressResponse.json();
            deviceAddressStatus = DeviceHelper.GenerateDeviceAddressStatus(
                {
                    Data: addressResponseJson,
                    StatusCode: addressResponse.status,
                    StatusDescription: addressResponse.statusText,
                },
                this._eftposAddress,
                this._forceSecureWebSockets
            );

        } 
        catch (error)
        {
            this._log.warn("An error occurred communicating with the device address services", error);
            deviceAddressStatus = DeviceHelper.GenerateDeviceAddressStatus(
                {
                    Data: {},
                    StatusCode: null,
                    StatusDescription: error.message,
                },
                this._eftposAddress,
                this._forceSecureWebSockets
            );
        }

        this.CurrentDeviceStatus = deviceAddressStatus;

        if (deviceAddressStatus.DeviceAddressResponseCode === DeviceAddressResponseCode.DEVICE_SERVICE_ERROR)
        {
            this._log.warn("Could not communicate with device address service.");
            return;
        }
        else if (deviceAddressStatus.DeviceAddressResponseCode === DeviceAddressResponseCode.INVALID_SERIAL_NUMBER)
        {
            this._log.warn("Could not resolve address, invalid serial number.");
            return;
        }
        else if (deviceAddressStatus.DeviceAddressResponseCode === DeviceAddressResponseCode.ADDRESS_NOT_CHANGED)
        {
            this._log.warn("Address resolved, but device address has not changed.");

            // even though address haven't changed - dispatch event as PoS depend on this
            this._eventBus.dispatchEvent(new CustomEvent('DeviceAddressChanged', { detail: this.CurrentDeviceStatus }));
            return;
        }

        // new address, update device and connection address
        this._eftposAddress = `${isSecureConnection ? "wss" : "ws"}://${deviceAddressStatus.Address}`;
        this._conn.Address = this._eftposAddress;
        this._log.info(`Address resolved to ${deviceAddressStatus.Address}`);

        // dispatch event
        this._eventBus.dispatchEvent(new CustomEvent('DeviceAddressChanged', { detail: this.CurrentDeviceStatus }));
    }

    async _sendTransactionReport()
    {
        const CurrentTxFlowState = this.CurrentTxFlowState;
        const transactionReport = this._transactionReport;

        transactionReport.TxType = CurrentTxFlowState.Type;
        transactionReport.TxResult = CurrentTxFlowState.Success;
        transactionReport.TxStartTime = CurrentTxFlowState.RequestTime;
        transactionReport.TxEndTime = CurrentTxFlowState.RequestTime;
        transactionReport.DurationMs = CurrentTxFlowState.CompletedTime - CurrentTxFlowState.RequestTime;
        transactionReport.CurrentFlow = this.CurrentFlow;
        transactionReport.CurrentTxFlowState = CurrentTxFlowState.Type;
        transactionReport.CurrentStatus = this.CurrentStatus;
        transactionReport.PosRefId = CurrentTxFlowState.PosRefId;
        transactionReport.Event = `Waiting for Signature: ${CurrentTxFlowState.AwaitingSignatureCheck}, Attemtping to Cancel: ${CurrentTxFlowState.AttemptingToCancel}, Finished: ${CurrentTxFlowState.Finished}`;
        transactionReport.SerialNumber = this._serialNumber;

        try {
            await AnalyticsService.ReportTransaction(transactionReport, this._deviceApiKey, this._tenantCode, this._inTestMode);
        } catch (error) {
            this._log.error(error);
            this._log.warn("Error reporting to analytics service.");
        }
    }

    _isUsingHttps() 
    {
        return 'https:' == document.location.protocol ? true : false;
    }

    // determine whether to use wss or not
    _isSecureConnection() 
    {
        return this._isUsingHttps() || this._forceSecureWebSockets;
    }
}

export {Spi, SPI_VERSION};
