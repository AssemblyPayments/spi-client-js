import {
    PreauthEvents,
    AccountVerifyRequest, 
    PreauthOpenRequest, 
    PreauthTopupRequest, 
    PreauthPartialCancellationRequest, 
    PreauthExtendRequest,
    PreauthCompletionRequest,
    PreauthCancelRequest} from './Preauth';


import {TransactionFlowState, TransactionType, InitiateTxResult, SpiStatus, SpiFlow, SpiConfig, TransactionOptions} from './SpiModels';

export class SpiPreauth
{
    constructor(spi)
    {
        this._spi = spi;
        this._log = console;

        this.Config = new SpiConfig();
    }

    InitiateAccountVerifyTx(posRefId)
    {
        var verifyMsg = new AccountVerifyRequest(posRefId).ToMessage();

        var tfs = new TransactionFlowState(
            posRefId, TransactionType.AccountVerify, 0, verifyMsg,
            "Waiting for EFTPOS connection to make account verify request");
        var sentMsg = "Asked EFTPOS to verify account";
        return this._initiatePreauthTx(tfs, sentMsg);
    }
    
    InitiateOpenTx(posRefId, amountCents, options = new TransactionOptions())
    {
        var msg = Object.assign(new PreauthOpenRequest(amountCents, posRefId),
        {
            Config: this.Config,
            Options: options
        }).ToMessage();

        var tfs = new TransactionFlowState(
            posRefId, TransactionType.Preauth, amountCents, msg,
            `Waiting for EFTPOS connection to make preauth request for ${(amountCents / 100.0).toFixed(2)}`);
        var sentMsg = `Asked EFTPOS to create preauth for ${(amountCents / 100.0).toFixed(2)}`;
        return this._initiatePreauthTx(tfs, sentMsg);
    }

    InitiateTopupTx(posRefId, preauthId, amountCents, options = new TransactionOptions())
    {
        var msg = Object.assign(new PreauthTopupRequest(preauthId, amountCents, posRefId),
        {
            Config: this.Config,
            Options: options
        }).ToMessage();

        var tfs = new TransactionFlowState(
            posRefId, TransactionType.Preauth, amountCents, msg,
            `Waiting for EFTPOS connection to make preauth topup request for ${(amountCents / 100.0).toFixed(2)}`);
        var sentMsg = `Asked EFTPOS to make preauth topup for ${(amountCents / 100.0).toFixed(2)}`;
        return this._initiatePreauthTx(tfs, sentMsg);
    }

    InitiatePartialCancellationTx(posRefId, preauthId, amountCents, options = new TransactionOptions())
    {
        var msg = Object.assign(new PreauthPartialCancellationRequest(preauthId, amountCents, posRefId),
        {
            Config: this.Config,
            Options: options
        }).ToMessage();

        var tfs = new TransactionFlowState(
            posRefId, TransactionType.Preauth, amountCents, msg,
            `Waiting for EFTPOS connection to make preauth partial cancellation request for ${(amountCents / 100.0).toFixed(2)}`);
        var sentMsg = `Asked EFTPOS to make preauth partial cancellation for ${(amountCents / 100.0).toFixed(2)}`;
        return this._initiatePreauthTx(tfs, sentMsg);
    }

    InitiateExtendTx(posRefId, preauthId, options = new TransactionOptions())
    {
        var msg = Object.assign(new PreauthExtendRequest(preauthId, posRefId),
        {
            Config: this.Config,
            Options: options
        }).ToMessage();

        var tfs = new TransactionFlowState(
            posRefId, TransactionType.Preauth, 0, msg,
            "Waiting for EFTPOS connection to make preauth Extend request");
        var sentMsg = "Asked EFTPOS to make preauth Extend request";
        return this._initiatePreauthTx(tfs, sentMsg);
    }

    InitiateCompletionTx(posRefId, preauthId, amountCents, surchargeAmount = 0, options = new TransactionOptions())
    {
        var msg = Object.assign(new PreauthCompletionRequest(preauthId, amountCents, posRefId),
        {
            Config: this.Config,
            SurchargeAmount: surchargeAmount,
            Options: options
        }).ToMessage();

        var tfs = new TransactionFlowState(
            posRefId, TransactionType.Preauth, amountCents, msg,
            `Waiting for EFTPOS connection to make preauth completion request for ${(amountCents / 100.0).toFixed(2)}`);
        var sentMsg = `Asked EFTPOS to make preauth completion for ${(amountCents / 100.0).toFixed(2)}`;
        return this._initiatePreauthTx(tfs, sentMsg);
    }

    InitiateCancelTx(posRefId, preauthId, options = new TransactionOptions())
    {
        var msg = Object.assign(new PreauthCancelRequest(preauthId, posRefId),
        {
            Config: this.Config,
            Options: options
        }).ToMessage();

        var tfs = new TransactionFlowState(
            posRefId, TransactionType.Preauth, 0, msg,
            "Waiting for EFTPOS connection to make preauth cancellation request");
        var sentMsg = "Asked EFTPOS to make preauth cancellation request";
        return this._initiatePreauthTx(tfs, sentMsg);
    }

    _initiatePreauthTx(tfs, sentMsg)
    {
        if (this._spi.CurrentStatus == SpiStatus.Unpaired) return new InitiateTxResult(false, "Not Paired");

        if (this._spi.CurrentFlow != SpiFlow.Idle) return new InitiateTxResult(false, "Not Idle");

        this._spi.CurrentFlow = SpiFlow.Transaction;
        this._spi.CurrentTxFlowState = tfs;
        if (this._spi._send(tfs.Request))
        {
            this._spi.CurrentTxFlowState.Sent(sentMsg);
        }
    
        this._spi._eventBus.dispatchEvent(new CustomEvent('TxFlowStateChanged', {detail: this._spi.CurrentTxFlowState}));
        return new InitiateTxResult(true, "Preauth Initiated");
    }

    _handlePreauthMessage(m)
    {
        switch (m.EventName)
        {
            case PreauthEvents.AccountVerifyResponse:
                this._handleAccountVerifyResponse(m);
                break;
            case PreauthEvents.PreauthOpenResponse:
            case PreauthEvents.PreauthTopupResponse:
            case PreauthEvents.PreauthPartialCancellationResponse:
            case PreauthEvents.PreauthExtendResponse:
            case PreauthEvents.PreauthCompleteResponse:
            case PreauthEvents.PreauthCancellationResponse:
                this._handlePreauthResponse(m);
                break;
            default:
                this._log.info(`I don't Understand Preauth Event: ${m.EventName}, ${m.Data}. Perhaps I have not implemented it yet.`);
                break;
        }
    }

    _handleAccountVerifyResponse(m)
    {
        var incomingPosRefId = m.Data.pos_ref_id;
        var currentTxFlowState = this._spi.CurrentTxFlowState;
        if (this._spi.CurrentFlow != SpiFlow.Transaction || currentTxFlowState.Finished || !currentTxFlowState.PosRefId === incomingPosRefId)
        {
            this._log.info(`Received Account Verify response but I was not waiting for one. Incoming Pos Ref ID: ${incomingPosRefId}`);
            return;
        }
        // TH-1A, TH-2A

        currentTxFlowState.Completed(m.GetSuccessState(), m, "Account Verify Transaction Ended.");
        // TH-6A, TH-6E
        
        this._spi._eventBus.dispatchEvent(new CustomEvent('TxFlowStateChanged', {detail: this._spi.CurrentTxFlowState}));
    }
    
    _handlePreauthResponse(m)
    {
        var incomingPosRefId = m.Data.pos_ref_id;
        var currentTxFlowState = this._spi.CurrentTxFlowState;
        if (this._spi.CurrentFlow != SpiFlow.Transaction || currentTxFlowState.Finished || !currentTxFlowState.PosRefId === incomingPosRefId)
        {
            this._log.info(`Received Preauth response but I was not waiting for one. Incoming Pos Ref ID: ${incomingPosRefId}`);
            return;
        }
        // TH-1A, TH-2A

        currentTxFlowState.Completed(m.GetSuccessState(), m, "Preauth Transaction Ended.");
        // TH-6A, TH-6E
        
        this._spi._eventBus.dispatchEvent(new CustomEvent('TxFlowStateChanged', {detail: this._spi.CurrentTxFlowState}));
    }

    static IsPreauthEvent(eventName)
    {
        return eventName.lastIndexOf("preauth",0) === 0 
                || eventName == PreauthEvents.PreauthCompleteResponse
                || eventName == PreauthEvents.PreauthCompleteRequest
                || eventName == PreauthEvents.AccountVerifyRequest
                || eventName == PreauthEvents.AccountVerifyResponse;
    }
}
