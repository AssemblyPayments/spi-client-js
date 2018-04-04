class PurchaseRequest {
    constructor(amountCents, id) {
        this.AmountCents = amountCents;
        this.Id = id;
    }

    ToMessage() {
        let data = {
            amount_purchase: this.AmountCents
        };

        return new Message(this.Id, Events.PurchaseRequest, data, true);
    }
}

class PurchaseResponse
{
    constructor(m)
    {
        this.RequestId = m.Id;
        this._m = m;
        this.SchemeName = m.Data.scheme_name;
        this.Success = m.GetSuccessState() == SuccessState.Success;
    }

    GetRRN()
    {
        return this._m.Data.rrn;
    }

    GetCustomerReceipt()
    {
        return this._m.Data.customer_receipt || "";
    }

    GetMerchantReceipt()
    {
        return this._m.Data.merchant_receipt || "";
    }

    GetResponseText()
    {
        return this._m.Data.host_response_text || "";
    }

    GetResponseValue(attribute)
    {
        return this._m.Data[attribute];
    }
}

class CancelTransactionRequest
{
    
    ToMessage()
    {
        return new Message(RequestIdHelper.Id("ctx"), Events.CancelTransactionRequest, null, true);
    }
}

class GetLastTransactionRequest
{
    constructor(id) {
        this.Id = id;
    }
    ToMessage()
    {
        return new Message(RequestIdHelper.Id("glt"), Events.GetLastTransactionRequest, null, true);
    }
}

class GetLastTransactionResponse
{
    constructor(m)
    {
        this._m = m;
        this.Success = (m.GetSuccessState() === SuccessState.Success);
    }

    WasRetrievedSuccessfully()
    {
        // We can't rely on checking "success" flag or "error" fields here,
        // as retrieval may be successful, but the retrieved transaction was a fail.
        // So we check if we got back an RRN.
        return !!this.GetRRN();
    }

    WasOperationInProgressError()
    {
        return this._m.GetError() == "OPERATION_IN_PROGRESS";
    }

    GetSuccessState()
    {
        return this._m.GetSuccessState();
    }
    GetResponseText()
    {
        return this._m.Data.host_response_text | "";
    }
    GetMerchantReceipt()
    {
        return this._m.Data.merchant_receipt || "";
    }
    WasSuccessfulTx()
    {
        return this._m.GetSuccessState() == SuccessState.Success;
    }

    GetTxType()
    {
        return this._m.Data.transaction_type;
    }

    GetSchemeApp()
    {
        return this._m.Data.scheme_name;
    }
    
    GetAmount()
    {
        return this._m.Data.amount_purchase;
    }

    GetTransactionAmount()
    {
        return this._m.Data.amount_transaction_type;
    }

    GetBankDateTimeString()
    {
        var ds = this._m.Data.bank_date + this._m.Data.bank_time;
        return ds;
    }

    GetRRN()
    {
        return this._m.Data.rrn;
    }
    
    GetResponseValue(attribute)
    {
        return this._m.Data[attribute];
    }   

    /// <summary>
    /// There is a bug, VSV-920, whereby the customer_receipt is missing from a glt response.
    /// The current recommendation is to use the merchant receipt in place of it if required.
    /// This method modifies the underlying incoming message data by copying
    /// the merchant receipt into the customer receipt only if there 
    /// is a merchant_receipt and there is not a customer_receipt.   
    /// </summary>
    CopyMerchantReceiptToCustomerReceipt()
    {
        var cr = this._m.Data.customer_receipt;
        var mr = this._m.Data.merchant_receipt;
        if (mr != "" && !(cr))
        {
            this._m.Data.customer_receipt = mr;
        }
    }
}

class RefundRequest
{
    constructor(amountCents, id)
    {
        this.AmountCents = amountCents;
        this.Id = id;
    }
    
    ToMessage()
    {
        let data = {amount_purchase: this.AmountCents};
        return new Message(this.Id, Events.RefundRequest, data, true);
    }

}

class RefundResponse
{
    constructor(m)
    {
        this.RequestId = m.Id;
        this._m = m;
        this.SchemeName = m.Data.scheme_name;
        this.Success = m.GetSuccessState() == SuccessState.Success;
    }

    GetRRN()
    {
        return this._m.Data.rrn;
    }

    GetCustomerReceipt()
    {
        return this._m.Data.customer_receipt || "";
    }

    GetMerchantReceipt()
    {
        return this._m.Data.merchant_receipt;
    }

    GetResponseText()
    {
        return this._m.Data.host_response_text || "";
    }
    
    GetResponseValue(attribute)
    {
        return this._m.Data[attribute];
    }
}

class SignatureRequired
{
    constructor(m)
    {
        this.RequestId = m.Id;
        this._m = m;
    }
    
    GetMerchantReceipt()
    {
        return this._m.Data.merchant_receipt;
    }
}

class SignatureDecline
{
    constructor(signatureRequiredRequestId)
    {
        this.SignatureRequiredRequestId = signatureRequiredRequestId;
    }

    ToMessage()
    {
        return new Message(this.SignatureRequiredRequestId, Events.SignatureDeclined, null, true);
    }
}

class SignatureAccept
{
    constructor(signatureRequiredRequestId)
    {
        this.SignatureRequiredRequestId = signatureRequiredRequestId;
    }

    ToMessage()
    {
        return new Message(this.SignatureRequiredRequestId, Events.SignatureAccepted, null, true);
    }
}