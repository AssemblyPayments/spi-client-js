import {RequestIdHelper} from './RequestIdHelper';
import {BillPayment, PayAtTableConfig, PaymentHistoryEntry, BillRetrievalResult, BillStatusResponse} from './PayAtTable';
import {SpiStatus} from '../src/SpiModels';

export class SpiPayAtTable
{  
    constructor(spi)
    {
        this._spi = spi;
        this._log = console;

        this.Config = new PayAtTableConfig();
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
    GetBillStatus(billId, tableId, operatorId, paymentFlowStarted) {
        throw new Error('Method not implemented. Please overwrite this method in your POS');
    }

    // Abstract method, must implement in POS system
    BillPaymentReceived(billPayment, updatedBillData) {
        throw new Error('Method not implemented. Please overwrite this method in your POS');
    }

    GetOpenTables(operatorId) {
        throw new Error('Method not implemented. Please overwrite this method in your POS');
    }

    BillPaymentFlowEnded(message) {
        throw new Error('Method not implemented. Please overwrite this method in your POS');
    }

    PushPayAtTableConfig()
    {
        if (this._spi.CurrentStatus === SpiStatus.PairedConnected) {
            this._spi._send(this.Config.ToMessage(RequestIdHelper.Id("patconf")));
        }
    } 
    
    _handleGetBillDetailsRequest(m)
    {
        var operatorId = m.Data["operator_id"];
        var tableId = m.Data["table_id"];
        var paymentFlowStarted = m.Data["payment_flow_started"];

        // Ask POS for Bill Details for this tableId, inluding encoded PaymentData
        return Promise.resolve(this.GetBillStatus("", tableId, operatorId, paymentFlowStarted)).then(billStatus => {
            billStatus.TableId = tableId;
            if (billStatus.TotalAmount <= 0)
            {
              this._log.info("Table has 0 total amount. not sending it to eftpos.");
              billStatus.Result = BillRetrievalResult.INVALID_TABLE_ID;
            }
        
            this._spi._send(billStatus.ToMessage(m.Id));
        })
    }

    _handleBillPaymentAdvice(m)
    {
        var billPayment = new BillPayment(m);
        
        // Ask POS for Bill Details, inluding encoded PaymentData
        return Promise.resolve(this.GetBillStatus(billPayment.BillId, billPayment.TableId, billPayment.OperatorId, billPayment.PaymentFlowStarted)).then(existingBillStatus => {
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
            Promise.resolve(this.BillPaymentReceived(billPayment, updatedBillData)).then(updatedBillStatus => {

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
            })
        })
    }
    
    _handleGetTableConfig(m)
    {
        this._spi._send(this.Config.ToMessage(m.Id));
    }

    _handleGetOpenTablesRequest(m)
    {
        const operatorId = m.Data["operator_id"];

        // Ask POS for Bill Details for this tableId, inluding encoded PaymentData
        const openTablesResponse = typeof this.GetOpenTables === 'function'
            ? this.GetOpenTables(operatorId)
            : null;
        if (!openTablesResponse || !openTablesResponse.TableData || !openTablesResponse.TableData.length)
        {
            openTablesResponse = new GetOpenTablesResponse();
            this._log.info("There is no open table.");
        }

        this._spi._send(openTablesResponse.ToMessage(m.Id));
    }

    _handleBillPaymentFlowEnded(m)
    {
        this.BillPaymentFlowEnded(m);
    }
}
