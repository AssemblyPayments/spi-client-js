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
            "pos_ref_id": this.PosRefId,
            "cash_amount": this.CashoutAmount
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
        this.PosRefId = m.Data.pos_ref_id;
        this.SchemeName = m.Data.scheme_name;
        this.Success = m.GetSuccessState() == SuccessState.Success;
    }

    GetRRN()
    {
        return this._m.Data["rrn"];
    }

    GetCashoutAmount()
    {
        return this._m.Data["cash_amount"];
    }

    GetBankNonCashAmount()
    {
        return this._m.Data["bank_noncash_amount"];
    }

    GetBankCashAmount()
    {
        return this._m.Data["bank_cash_amount"];
    }
    
    GetCustomerReceipt()
    {
        return this._m.Data["customer_receipt"];
    }

    GetMerchantReceipt()
    {
        return this._m.Data["merchant_receipt"];
    }
    
    GetResponseText()
    {
        return this._m.Data["host_response_text"];
    }

    GetResponseCode()
    {
        return this._m.Data["host_response_code"];
    }
    
    GetTerminalReferenceId()
    {
        return this._m.Data["terminal_ref_id"];
    }

    GetAccountType()
    {
        return this._m.Data["account_type"];
    }

    GetAuthCode()
    {
        return this._m.Data["auth_code"];
    }

    GetBankDate()
    {
        return this._m.Data["bank_date"];
    }

    GetBankTime()
    {
        return this._m.Data["bank_time"];
    }
    
    GetMaskedPan()
    {
        return this._m.Data["masked_pan"];
    }
    
    GetTerminalId()
    {
        return this._m.Data["terminal_id"];
    }

    WasMerchantReceiptPrinted()
    {
        return this._m.Data["merchant_receipt_printed"];
    }

    WasCustomerReceiptPrinted()
    {
        return this._m.Data["customer_receipt_printed"];
    }
    
    GetResponseValue(attribute)
    {
        return this._m.Data[attribute];
    }

}