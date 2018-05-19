const PreauthEvents = 
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

class AccountVerifyRequest
{
    constructor() {
        this.PosRefId = null;
    }

    AccountVerifyRequest(posRefId)
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

class AccountVerifyResponse
{
    constructor(m)
    {
        this.Details = new PurchaseResponse(m);
        this.PosRefId = this.Details.PosRefId;
        this._m = m;
    }
}

class PreauthOpenRequest
{
    constructor(amountCents, posRefId)
    {
        this.PosRefId = posRefId;
        this.PreauthAmount = amountCents;
    }

    ToMessage()
    {
        var data = {
            "pos_ref_id": this.PosRefId,
            "preauth_amount": this.PreauthAmount
        };

        return new Message(RequestIdHelper.Id("prac"), PreauthEvents.PreauthOpenRequest, data, true);
    }
}

class PreauthTopupRequest
{
    constructor(preauthId, topupAmountCents, posRefId)
    {
        this.PreauthId = preauthId;
        this.TopupAmount = topupAmountCents;
        this.PosRefId = posRefId;
    }

    ToMessage()
    {
        var data = {
            "pos_ref_id": this.PosRefId,
            "preauth_id": this.PreauthId,
            "topup_amount": this.TopupAmount
        };

        return new Message(RequestIdHelper.Id("prtu"), PreauthEvents.PreauthTopupRequest, data, true);
    }
}

class PreauthPartialCancellationRequest
{
    constructor(preauthId, partialCancellationAmountCents, posRefId)
    {
        this.PreauthId = preauthId;
        this.PartialCancellationAmount = partialCancellationAmountCents;
        this.PosRefId = posRefId;
    }

    ToMessage()
    {
        var data = {
            "pos_ref_id": this.PosRefId,
            "preauth_id": this.PreauthId,
            "preauth_cancel_amount": this.PartialCancellationAmount
        };

        return new Message(RequestIdHelper.Id("prpc"), PreauthEvents.PreauthPartialCancellationRequest, data, true);
    }
}

class PreauthExtendRequest
{
    constructor(preauthId, posRefId)
    {
        this.PreauthId = preauthId;
        this.PosRefId = posRefId;
    }

    ToMessage()
    {
        var data = {
            "pos_ref_id": this.PosRefId,
            "preauth_id": this.PreauthId
        };

        return new Message(RequestIdHelper.Id("prext"), PreauthEvents.PreauthExtendRequest, data, true);
    }
}

class PreauthCancelRequest
{
    constructor(preauthId, posRefId)
    {
        this.PreauthId = preauthId;
        this.PosRefId = posRefId;
    }

    ToMessage()
    {
        var data = {
            "pos_ref_id": this.PosRefId,
            "preauth_id": this.PreauthId
        };

        return new Message(RequestIdHelper.Id("prac"), PreauthEvents.PreauthCancellationRequest, data, true);
    }
}

class PreauthCompletionRequest
{
    constructor(preauthId, completionAmountCents, posRefId)
    {
        this.PreauthId = preauthId;
        this.CompletionAmount = completionAmountCents;
        this.PosRefId = posRefId;
    }

    ToMessage()
    {
        var data = {
            "pos_ref_id": this.PosRefId,
            "preauth_id": this.PreauthId,
            "completion_amount": this.CompletionAmount
        };

        return new Message(RequestIdHelper.Id("prac"), PreauthEvents.PreauthCompleteRequest, data, true);
    }
}

class PreauthResponse
{
    constructor(m)
    {
        this.PreauthId = m.GetDataStringValue("preauth_id");
        this.Details = new PurchaseResponse(m);
        this.PosRefId = this.Details.PosRefId;
        this._m = m;
    }

    GetBalanceAmount()
    {
        var txType = this._m["transaction_type"];
        switch (txType)
        {
            case "PRE-AUTH":
                return this._m["preauth_amount"];
            case "TOPUP":
                return this._m["balance_amount"];
            case "CANCEL": // PARTIAL CANCELLATION
                return this._m["balance_amount"];
            case "PRE-AUTH EXT":
                return this._m["balance_amount"];
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
        var txType = this._m["transaction_type"];
        switch (txType)
        {   
            case "PRE-AUTH":
                return 0;
            case "TOPUP":
                return this._m["existing_preauth_amount"];
            case "CANCEL": // PARTIAL CANCELLATION
                return this._m["existing_preauth_amount"];
            case "PRE-AUTH EXT":
                return this._m["existing_preauth_amount"];
            case "PCOMP":
                // THIS IS TECHNICALLY NOT CORRECT WHEN COMPLETION HAPPENS FOR A PARTIAL AMOUNT.
                // BUT UNFORTUNATELY, THIS RESPONSE DOES NOT CONTAIN "existing_preauth_amount".
                // SO "completion_amount" IS THE CLOSEST WE HAVE.
                return this._m["completion_amount"];
            case "PRE-AUTH CANCEL":
                return this._m["preauth_amount"];
            default:
                return 0;
        }
    }
    
    GetCompletionAmount()
    {
        var txType = this._m["transaction_type"];
        switch (txType)
        {   
            case "PCOMP":
                return this._m["completion_amount"];
                break;
            default:
                return 0;
        }

    }
}