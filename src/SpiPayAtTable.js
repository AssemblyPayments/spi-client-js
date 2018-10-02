class SpiPayAtTable
{  
    constructor(spi)
    {
        this._spi = spi;
        this._log = console;

        this.Config = Object.assign(new PayAtTableConfig(), {
            PayAtTabledEnabled: true,
            OperatorIdEnabled: true,
            AllowedOperatorIds: [],
            EqualSplitEnabled: true,
            SplitByAmountEnabled: true,
            SummaryReportEnabled: true,
            TippingEnabled: true,
            LabelOperatorId: "Operator ID",
            LabelPayButton: "Pay at Table",
            LabelTableId: "Table Number"
        });
    }

    // <summary>
    // This delegate will be called when the Eftpos needs to know the current state of a bill for a table. 
    // <para />
    // Parameters:<para />
    // billId - The unique identifier of the bill. If empty, it means that the PayAtTable flow on the Eftpos is just starting, and the lookup is by tableId.<para />
    // tableId - The identifier of the table that the bill is for. <para />
    // operatorId - The id of the operator entered on the eftpos. <para />
    // <para />
    // Return:<para />
    // You need to return the current state of the bill.
    // </summary>
    GetBillStatus(billId, tableId, operatorId) {
        throw new Exception('Method not implemented. Please overwrite this method in your POS');
    }

    // Abstract method, must implement in POS system
    BillPaymentReceived(billPayment, updatedBillData) {
        throw new Exception('Method not implemented. Please overwrite this method in your POS');
    }

    PushPayAtTableConfig()
    {
        this._spi._send(this.Config.ToMessage(RequestIdHelper.Id("patconf")));
    } 
    
    _handleGetBillDetailsRequest(m)
    {
        var operatorId = m.Data["operator_id"];
        var tableId = m.Data["table_id"];

        // Ask POS for Bill Details for this tableId, inluding encoded PaymentData
        var billStatus = this.GetBillStatus(null, tableId, operatorId);
        billStatus.TableId = tableId;
        if (billStatus.TotalAmount <= 0)
        {
            this._log.info("Table has 0 total amount. not sending it to eftpos.");
            billStatus.Result = BillRetrievalResult.INVALID_TABLE_ID;
        }
        
        this._spi._send(billStatus.ToMessage(m.Id));
    }

    _handleBillPaymentAdvice(m)
    {
        var billPayment = new BillPayment(m);
        
        // Ask POS for Bill Details, inluding encoded PaymentData
        var existingBillStatus = this.GetBillStatus(billPayment.BillId, billPayment.TableId, billPayment.OperatorId);
        if (existingBillStatus.Result != BillRetrievalResult.SUCCESS)
        {
            this._log.warn("Could not retrieve Bill Status for Payment Advice. Sending Error to Eftpos.");
            this._spi._send(existingBillStatus.ToMessage(m.Id));
        }
                    
        var existingPaymentHistory = existingBillStatus.getBillPaymentHistory();
   
        var foundExistingEntry = existingPaymentHistory.find(phe => phe.GetTerminalRefId() == billPayment.PurchaseResponse.GetTerminalReferenceId());
        if (foundExistingEntry)
        {
            // We have already processed this payment.
            // perhaps Eftpos did get our acknowledgement.
            // Let's update Eftpos.
            this._log.warn("Had already received this bill_paymemnt advice from eftpos. Ignoring.");
            this._spi._send(existingBillStatus.ToMessage(m.Id));
            return;
        }

        // Let's add the new entry to the history
        var updatedHistoryEntries = existingPaymentHistory;
        updatedHistoryEntries.push(
            new PaymentHistoryEntry(billPayment.PaymentType.toLowerCase(), billPayment.PurchaseResponse.ToPaymentSummary())
        );
        
        var updatedBillData = BillStatusResponse.ToBillData(updatedHistoryEntries);

        // Advise POS of new payment against this bill, and the updated BillData to Save.
        var updatedBillStatus = this.BillPaymentReceived(billPayment, updatedBillData);

        // Just in case client forgot to set these:
        updatedBillStatus.BillId = billPayment.BillId;
        updatedBillStatus.TableId = billPayment.TableId;

        if (updatedBillStatus.Result != BillRetrievalResult.SUCCESS)
        {
            this._log.warn("POS Errored when being Advised of Payment. Letting EFTPOS know, and sending existing bill data.");
            updatedBillStatus.BillData = existingBillStatus.BillData;
        }
        else
        {
            updatedBillStatus.BillData = updatedBillData;
        }
    
        this._spi._send(updatedBillStatus.ToMessage(m.Id));
    }
    
    _handleGetTableConfig(m)
    {
        this._spi._send(this.Config.ToMessage(m.Id));
    }
}
