import {RequestIdHelper} from './RequestIdHelper';
import {Message} from './Messages';
import {PurchaseResponse} from './Purchase';
import {SpiConfig, TransactionOptions} from './SpiModels';

export const PreauthEvents = 
{
    AccountVerifyRequest: "account_verify",
    AccountVerifyResponse: "account_verify_response",
    
    PreauthOpenRequest : "preauth",
    PreauthOpenResponse : "preauth_response",

    PreauthTopupRequest: "preauth_topup",
    PreauthTopupResponse: "preauth_topup_response",

    PreauthExtendRequest: "preauth_extend",
    PreauthExtendResponse: "preauth_extend_response",

    PreauthPartialCancellationRequest : "preauth_partial_cancellation",
    PreauthPartialCancellationResponse : "preauth_partial_cancellation_response",
    
    PreauthCancellationRequest : "preauth_cancellation",
    PreauthCancellationResponse : "preauth_cancellation_response",

    PreauthCompleteRequest : "completion",
    PreauthCompleteResponse : "completion_response"
};

export class AccountVerifyRequest
{
    constructor(posRefId)
    {
        this.PosRefId = posRefId;
    }

    ToMessage()
    {
        var data = {
            "pos_ref_id": this.PosRefId
        };

        return new Message(RequestIdHelper.Id("prav"), PreauthEvents.AccountVerifyRequest, data, true);
    }
}

export class AccountVerifyResponse
{
    constructor(m)
    {
        this.Details = new PurchaseResponse(m);
        this.PosRefId = this.Details.PosRefId;
        this._m = m;
    }
}

export class PreauthOpenRequest
{
    constructor(amountCents, posRefId)
    {
        this.PosRefId = posRefId;
        this.PreauthAmount = amountCents;
        this.Config = new SpiConfig();
        this.Options = new TransactionOptions();
    }

    ToMessage()
    {
        var data = {
            "pos_ref_id": this.PosRefId,
            "preauth_amount": this.PreauthAmount
        };

        this.Config.EnabledPrintMerchantCopy = true;
        this.Config.EnabledPromptForCustomerCopyOnEftpos = true;
        this.Config.EnabledSignatureFlowOnEftpos = true;
        this.Config.AddReceiptConfig(data);
        this.Options.AddOptions(data);
        return new Message(RequestIdHelper.Id("prac"), PreauthEvents.PreauthOpenRequest, data, true);
    }
}

export class PreauthTopupRequest
{
    constructor(preauthId, topupAmountCents, posRefId)
    {
        this.PreauthId = preauthId;
        this.TopupAmount = topupAmountCents;
        this.PosRefId = posRefId;
        this.Config = new SpiConfig();
        this.Options = new TransactionOptions();
    }

    ToMessage()
    {
        var data = {
            "pos_ref_id": this.PosRefId,
            "preauth_id": this.PreauthId,
            "topup_amount": this.TopupAmount
        };

        this.Config.EnabledPrintMerchantCopy = true;
        this.Config.EnabledPromptForCustomerCopyOnEftpos = true;
        this.Config.EnabledSignatureFlowOnEftpos = true;
        this.Config.AddReceiptConfig(data);
        this.Options.AddOptions(data);
        return new Message(RequestIdHelper.Id("prtu"), PreauthEvents.PreauthTopupRequest, data, true);
    }
}

export class PreauthPartialCancellationRequest
{
    constructor(preauthId, partialCancellationAmountCents, posRefId)
    {
        this.PreauthId = preauthId;
        this.PartialCancellationAmount = partialCancellationAmountCents;
        this.PosRefId = posRefId;
        this.Config = new SpiConfig();
        this.Options = new TransactionOptions();
    }

    ToMessage()
    {
        var data = {
            "pos_ref_id": this.PosRefId,
            "preauth_id": this.PreauthId,
            "preauth_cancel_amount": this.PartialCancellationAmount
        };

        this.Config.EnabledPrintMerchantCopy = true;
        this.Config.EnabledPromptForCustomerCopyOnEftpos = true;
        this.Config.EnabledSignatureFlowOnEftpos = true;
        this.Config.AddReceiptConfig(data);
        this.Options.AddOptions(data);
        return new Message(RequestIdHelper.Id("prpc"), PreauthEvents.PreauthPartialCancellationRequest, data, true);
    }
}

export class PreauthExtendRequest
{
    constructor(preauthId, posRefId)
    {
        this.PreauthId = preauthId;
        this.PosRefId = posRefId;
        this.Config = new SpiConfig();
        this.Options = new TransactionOptions();
    }

    ToMessage()
    {
        var data = {
            "pos_ref_id": this.PosRefId,
            "preauth_id": this.PreauthId
        };

        this.Config.EnabledPrintMerchantCopy = true;
        this.Config.EnabledPromptForCustomerCopyOnEftpos = true;
        this.Config.EnabledSignatureFlowOnEftpos = true;
        this.Config.AddReceiptConfig(data);
        this.Options.AddOptions(data);
        return new Message(RequestIdHelper.Id("prext"), PreauthEvents.PreauthExtendRequest, data, true);
    }
}

export class PreauthCancelRequest
{
    constructor(preauthId, posRefId)
    {
        this.PreauthId = preauthId;
        this.PosRefId = posRefId;
        this.Config = new SpiConfig();
        this.Options = new TransactionOptions();
    }

    ToMessage()
    {
        var data = {
            "pos_ref_id": this.PosRefId,
            "preauth_id": this.PreauthId
        };

        this.Config.EnabledPrintMerchantCopy = true;
        this.Config.EnabledPromptForCustomerCopyOnEftpos = true;
        this.Config.EnabledSignatureFlowOnEftpos = true;
        this.Config.AddReceiptConfig(data);
        this.Options.AddOptions(data);
        return new Message(RequestIdHelper.Id("prac"), PreauthEvents.PreauthCancellationRequest, data, true);
    }
}

export class PreauthCompletionRequest
{
    constructor(preauthId, completionAmountCents, posRefId, surchargeAmount)
    {
        this.PreauthId = preauthId;
        this.CompletionAmount = completionAmountCents;
        this.PosRefId = posRefId;
        this.SurchargeAmount = surchargeAmount;
        this.Config = new SpiConfig();
        this.Options = new TransactionOptions();
    }

    ToMessage()
    {
        var data = {
            "pos_ref_id": this.PosRefId,
            "preauth_id": this.PreauthId,
            "completion_amount": this.CompletionAmount,
            "surcharge_amount": this.SurchargeAmount
        };

        this.Config.EnabledPrintMerchantCopy = true;
        this.Config.EnabledPromptForCustomerCopyOnEftpos = true;
        this.Config.EnabledSignatureFlowOnEftpos = true;
        this.Config.AddReceiptConfig(data);
        this.Options.AddOptions(data);
        return new Message(RequestIdHelper.Id("prac"), PreauthEvents.PreauthCompleteRequest, data, true);
    }
}

export class PreauthResponse
{
    constructor(m)
    {
        this.PreauthId = m.Data["preauth_id"];
        this.Details = new PurchaseResponse(m);
        this.PosRefId = this.Details.PosRefId;
        this._m = m;
    }

    GetBalanceAmount()
    {
        var txType = this._m.Data["transaction_type"];
        switch (txType)
        {
            case "PRE-AUTH":
                return this._m.Data["preauth_amount"];
            case "TOPUP":
                return this._m.Data["balance_amount"];
            case "CANCEL": // PARTIAL CANCELLATION
                return this._m.Data["balance_amount"];
            case "PRE-AUTH EXT":
                return this._m.Data["balance_amount"];
            case "PCOMP":
                return 0; // Balance is 0 after completion
            case "PRE-AUTH CANCEL":
                return 0; // Balance is 0 after cancellation
            default:
                return 0;
        }
    }

    GetPreviousBalanceAmount()
    {
        var txType = this._m.Data["transaction_type"];
        switch (txType)
        {   
            case "PRE-AUTH":
                return 0;
            case "TOPUP":
                return this._m.Data["existing_preauth_amount"];
            case "CANCEL": // PARTIAL CANCELLATION
                return this._m.Data["existing_preauth_amount"];
            case "PRE-AUTH EXT":
                return this._m.Data["existing_preauth_amount"];
            case "PCOMP":
                // THIS IS TECHNICALLY NOT CORRECT WHEN COMPLETION HAPPENS FOR A PARTIAL AMOUNT.
                // BUT UNFORTUNATELY, THIS RESPONSE DOES NOT CONTAIN "existing_preauth_amount".
                // SO "completion_amount" IS THE CLOSEST WE HAVE.
                return this._m.Data["completion_amount"];
            case "PRE-AUTH CANCEL":
                return this._m.Data["preauth_amount"];
            default:
                return 0;
        }
    }
    
    GetCompletionAmount()
    {
        var txType = this._m.Data["transaction_type"];
        switch (txType)
        {   
            case "PCOMP":
                return this._m.Data["completion_amount"];
            default:
                return 0;
        }

    }

    GetSurchargeAmount()
    {
        var txType = this._m.Data["transaction_type"];
        switch (txType)
        {
            case "PCOMP":
                return this._m.Data["surcharge_amount"];
            default:
                return 0;
        }
    }

    WasMerchantReceiptPrinted()
    {
        return this._m.Data["merchant_receipt_printed"];
    }

    WasCustomerReceiptPrinted()
    {
        return this._m.Data["customer_receipt_printed"];
    }
}