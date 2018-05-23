class PurchaseRequest {
    constructor(amountCents, posRefId) {
        this.PosRefId = posRefId;
        this.PurchaseAmount = amountCents;
        this.TipAmount = 0;
        this.CashoutAmount = 0;
        this.PromptForCashout = false;
        this.Config = new SpiConfig();

        // Library Backwards Compatibility
        this.Id = posRefId;
        this.AmountCents = amountCents;
    }

    AmountSummary()
    {
        return `Purchase: ${(PurchaseAmount / 100.0).toFixed(2)}; 
            Tip: ${(TipAmount / 100.0).toFixed(2)}; 
            Cashout: ${(CashoutAmount / 100.0).toFixed(2)};`;
    }

    ToMessage() {
        let data = {
            pos_ref_id: this.PosRefId,
            purchase_amount: this.PurchaseAmount,
            tip_amount: this.TipAmount,
            cash_amount: this.CashoutAmount,
            prompt_for_cashout: this.PromptForCashout
        };

        this.Config.addReceiptConfig(data);
        return new Message(RequestIdHelper.Id("prchs"), Events.PurchaseRequest, data, true);
    }
}

class PurchaseResponse
{
    constructor(m)
    {
        this._m = m;
        this.RequestId = m.Id;
        this.PosRefId = m.Data.pos_ref_id;
        this.SchemeName = m.Data.scheme_name;
        this.SchemeAppName = m.Data.scheme_name;
        this.Success = m.GetSuccessState() == SuccessState.Success;
    }

    GetRRN()
    {
        return this._m.Data.rrn;
    }

    GetPurchaseAmount()
    {
        return this._m.Data.purchase_amount;
    }

    GetTipAmount()
    {
        return this._m.Data.tip_amount;
    }

    GetCashoutAmount()
    {
        return this._m.Data.cash_amount;
    }

    GetBankNonCashAmount()
    {
        return this._m.Data.bank_noncash_amount;
    }

    GetBankCashAmount()
    {
        return this._m.Data.bank_cash_amount;
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

    GetResponseCode()
    {
        return this._m.Data.host_response_code;
    }
    
    GetTerminalReferenceId()
    {
        return this._m.Data.terminal_ref_id;
    }

    GetCardEntry()
    {
        return this._m.Data.card_entry;
    }
    
    GetAccountType()
    {
        return this._m.Data.account_type;
    }

    GetAuthCode()
    {
        return this._m.Data.auth_code;
    }

    GetBankDate()
    {
        return this._m.Data.bank_date;
    }

    GetBankTime()
    {
        return this._m.Data.bank_time;
    }
    
    GetMaskedPan()
    {
        return this._m.Data.masked_pan;
    }
    
    GetTerminalId()
    {
        return this._m.Data.terminal_id;
    }

    WasMerchantReceiptPrinted()
    {
        return this._m.Data.merchant_receipt_printed;
    }

    WasCustomerReceiptPrinted()
    {
        return this._m.Data.customer_receipt_printed;
    }
    
    GetSettlementDate()
    {
        //"bank_settlement_date":"20042018"
        var dateStr = this._m.Data.bank_settlement_date;
        if (!dateStr) return null;
        return Message.ParseBankDate(dateStr);
    }

    GetResponseValue(attribute)
    {
        return this._m.Data[attribute];
    }

    ToPaymentSummary()
    {
        return {
            account_type: this.GetAccountType(),
            auth_code: this.GetAuthCode(),
            bank_date: this.GetBankDate(),
            bank_time: this.GetBankTime(),
            host_response_code: this.GetResponseCode(),
            host_response_text: this.GetResponseText(),
            masked_pan: this.GetMaskedPan(),
            purchase_amount: this.GetPurchaseAmount(),
            rrn: this.GetRRN(),
            scheme_name: this.SchemeName,
            terminal_id: this.GetTerminalId(),
            terminal_ref_id: this.GetTerminalReferenceId(),
            tip_amount: this.GetTipAmount()           
        };
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