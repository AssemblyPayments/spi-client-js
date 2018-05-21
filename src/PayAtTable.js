/// <summary>
/// This class represents the BillDetails that the POS will be asked for throughout a PayAtTable flow.
/// </summary>
class BillStatusResponse
{
    getBillPaymentHistory()
    {
        if (!this.BillData)
        {
            return [];
        }
        
        return JSON.parse(this.BillData);
    }

    static ToBillData(ph)
    {
        if (ph.length < 1)
        {
            return "";
        }

        return JSON.serialize(ph);
    }
    
    ToMessage(messageId)
    {
        var data = {
            "success": this.Result==BillRetrievalResult.SUCCESS
        };
        
        if (BillId) data.bill_id = BillId;
        if (TableId) data.table_id = TableId;

        if (this.Result == BillRetrievalResult.SUCCESS)
        {
            data.bill_total_amount = TotalAmount;
            data.bill_outstanding_amount = OutstandingAmount;
            data.bill_payment_history = getBillPaymentHistory();
        }
        else
        {
            data.error_reason = Result.toString();
            data.error_detail = Result.toString();
        }

        return new Message(messageId, Events.PayAtTableBillDetails, data, true);
    }
}

const BillRetrievalResult = 
{
    SUCCESS: 'SUCCESS',
    INVALID_TABLE_ID: 'INVALID_TABLE_ID',
    INVALID_BILL_ID: 'INVALID_BILL_ID',
    INVALID_OPERATOR_ID: 'INVALID_OPERATOR_ID'
};

const PaymentType = 
{
    CARD: 'CARD',
    CASH: 'CASH' 
};

class BillPayment
{
    constructor(m)
    {
        this._incomingAdvice = m;
        this.BillId = this._incomingAdvice["bill_id"];
        this.TableId = this._incomingAdvice["table_id"];
        this.OperatorId = this._incomingAdvice["operator_id"];
        
        var pt = this._incomingAdvice["payment_type"];
        this.PaymentType = pt;
        
        // this is when we ply the sub object "payment_details" into a purchase response for convenience.
        var purchaseMsg = new Message(m.Id, "payment_details", m.Data["payment_details"], false);
        this.PurchaseResponse = new PurchaseResponse(purchaseMsg);

        this.PurchaseAmount = this.PurchaseResponse.GetPurchaseAmount();
        this.TipAmount = this.PurchaseResponse.GetTipAmount();
    }
}

class PaymentHistoryEntry
{
    constructor(paymentType, paymentSummary)
    {
        this.PaymentType = paymentType;
        this.PaymentSummary = paymentSummary;
    }

    toJSON() {
        return {
            payment_type: this.PaymentType,
            payment_summary: this.PaymentSummary
        };
    }
    
    GetTerminalRefId()
    {
        return this.PaymentSummary["terminal_ref_id"];
    }
}

class PayAtTableConfig
{
    constructor() {
        this.OperatorIdEnabled = false;
        this.SplitByAmountEnabled = false;
        this.EqualSplitEnabled = false;
    
        this.TippingEnabled = false;
    
        this.SummaryReportEnabled = false;
    
        this.LabelPayButton = '';
        this.LabelOperatorId = '';
        this.LabelTableId = '';
    
        // 
        /// <summary>
        /// Fill in with operator ids that the eftpos terminal will validate against. 
        /// Leave Empty to allow any operator_id through. 
        /// </summary>
       this.AllowedOperatorIds = [];
    }

    ToMessage(messageId)
    {
        var data = {
            "pay_at_table_enabled": true,
            "operator_id_enabled": this.OperatorIdEnabled,
            "split_by_amount_enabled": this.SplitByAmountEnabled,
            "equal_split_enabled": this.EqualSplitEnabled,
            "tipping_enabled": this.TippingEnabled,
            "summary_report_enabled": this.SummaryReportEnabled,
            "pay_button_label": this.LabelPayButton,
            "operator_id_label": this.LabelOperatorId,
            "table_id_label": this.LabelTableId,
            "operator_id_list": this.AllowedOperatorIds
        };

        return new Message(messageId, Events.PayAtTableSetTableConfig, data, true);
    }
    
    static FeatureDisableMessage(messageId) {
        var data = {
            "pay_at_table_enabled": false
        };
        return new Message(messageId, Events.PayAtTableSetTableConfig, data, true);
    }
}

    