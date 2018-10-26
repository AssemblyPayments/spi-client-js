import {Events, SuccessState, Message} from './Messages';

export class SettleRequest {
    constructor(id) {
        this.Id = id;
    }

    ToMessage() {
        return new Message(this.Id, Events.SettleRequest, null, true);
    }
}

export class Settlement {
    constructor(m) {
        this.RequestId = m.Id;
        this._m = m;
        this.Success = m.GetSuccessState() == SuccessState.Success;
    }

    GetSettleByAcquirerCount()
    {
        return this._m.Data.accumulated_settle_by_acquirer_count;
    }

    GetSettleByAcquirerValue()
    {
        return this._m.Data.accumulated_settle_by_acquirer_value;
    }

    GetTotalCount()
    {
        return this._m.Data.accumulated_total_count;
    }

    GetTotalValue()
    {
        return this._m.Data.accumulated_total_value;
    }

    GetPeriodStartTime()
    {
        var timeStr = this._m.Data.settlement_period_start_time; // "05:00"
        var dateStr = this._m.Data.settlement_period_start_date; // "05Oct17"
        return Message.ParseBankDateTimeStr(dateStr, timeStr);
    }

    GetPeriodEndTime()
    {
        var timeStr = this._m.Data.settlement_period_end_time; // "05:00"
        var dateStr = this._m.Data.settlement_period_end_date; // "05Oct17"
        return Message.ParseBankDateTimeStr(dateStr, timeStr);
    }

    GetTriggeredTime()
    {
        var timeStr = this._m.Data.settlement_triggered_time; // "05:00:45"
        var dateStr = this._m.Data.settlement_triggered_date; // "05Oct17"
        return Message.ParseBankDateTimeStr(dateStr, timeStr);
    }

    GetResponseText()
    {
        return this._m.Data.host_response_text;
    }
    
    GetReceipt()
    {
        return this._m.Data.merchant_receipt;
    }

    GetTransactionRange()
    {
        return this._m.Data.transaction_range;
    }

    GetTerminalId()
    {
        return this._m.Data.terminal_id;
    }

    GetSchemeSettlementEntries()
    {
        var schemes = this._m.Data.schemes;
        if (!schemes) return [];

        return schemes.map((scheme) => {
            return new SchemeSettlementEntry(scheme);
        });
    }
}

export class SchemeSettlementEntry
{
    // SchemeSettlementEntry(string schemeName, bool settleByAcquirer, int totalCount, int totalValue)
    // SchemeSettlementEntry(Object schemeObj)
    constructor(...args)
    {
        if(args.length === 1) {
            this.SchemeName = args[0].scheme_name;
            this.SettleByAcquirer = args[0].settle_by_acquirer.toLowerCase() == "yes";
            this.TotalValue = parseInt(args[0].total_value,10);
            this.TotalCount = parseInt(args[0].total_count,10);
        } else if(args.length === 4) {
            this.SchemeName = args[0];
            this.SettleByAcquirer = args[1];
            this.TotalCount = args[2];
            this.TotalValue = args[3];
        }
    }
    
    ToString()
    {
        return `SchemeName: ${this.SchemeName}, SettleByAcquirer: ${this.SettleByAcquirer}, TotalCount: ${this.TotalCount}, TotalValue: ${this.TotalValue}`;
    }
}

export class SettlementEnquiryRequest
{
    constructor(id)
    {
        this.Id = id;
    }
    
    ToMessage()
    {
        return new Message(this.Id, Events.SettlementEnquiryRequest, null, true);
    }
}