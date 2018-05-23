class CashoutOnlyRequest
{  
    constructor(amountCents, posRefId)
    {
        this.PosRefId = posRefId;
        this.CashoutAmount = amountCents;
        this.Config = new SpiConfig();
    }
    
    ToMessage()
    {
        var data = {
            "pos_ref_id": PosRefId,
            "cash_amount": CashoutAmount
        };

        this.Config.addReceiptConfig(data);
        return new Message(RequestIdHelper.Id("cshout"), Events.CashoutOnlyRequest, data, true);
    }
}

class CashoutOnlyResponse
{
    constructor(m)
    {
        this._m = m;
        this.RequestId = m.Id;
        this.PosRefId = m["pos_ref_id"];
        this.SchemeName = m["scheme_name"];
        this.Success = m.GetSuccessState() == SuccessState.Success;
    }

    GetRRN()
    {
        return this._m["rrn"];
    }

    GetCashoutAmount()
    {
        return this._m["cash_amount"];
    }

    GetBankNonCashAmount()
    {
        return this._m["bank_noncash_amount"];
    }

    GetBankCashAmount()
    {
        return this._m["bank_cash_amount"];
    }
    
    GetCustomerReceipt()
    {
        return this._m["customer_receipt"];
    }

    GetMerchantReceipt()
    {
        return this._m["merchant_receipt"];
    }
    
    GetResponseText()
    {
        return this._m["host_response_text"];
    }

    GetResponseCode()
    {
        return this._m["host_response_code"];
    }
    
    GetTerminalReferenceId()
    {
        return this._m["terminal_ref_id"];
    }

    GetAccountType()
    {
        return this._m["account_type"];
    }

    GetAuthCode()
    {
        return this._m["auth_code"];
    }

    GetBankDate()
    {
        return this._m["bank_date"];
    }

    GetBankTime()
    {
        return this._m["bank_time"];
    }
    
    GetMaskedPan()
    {
        return this._m["masked_pan"];
    }
    
    GetTerminalId()
    {
        return this._m["terminal_id"];
    }

    WasMerchantReceiptPrinted()
    {
        return this._m["merchant_receipt_printed"];
    }

    WasCustomerReceiptPrinted()
    {
        return this._m["customer_receipt_printed"];
    }
    
    GetResponseValue(attribute)
    {
        return this._m[attribute];
    }

}