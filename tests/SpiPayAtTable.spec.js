import {Spi} from '../src/Spi';
import {SpiPayAtTable} from '../src/SpiPayAtTable';
import {BillStatusResponse, BillRetrievalResult} from '../src/PayAtTable';
import {Message} from '../src/Messages';

describe('SpiPayAtTable', function() {
    'use strict';
  
    it('should setup a new pay at table instance', function() 
    {
        var spi = new Spi('TABLEPOS1', 'localhost', null);
        var payAtTable = new SpiPayAtTable(spi);

        expect(payAtTable._spi).toBeDefined();
        expect(payAtTable.Config).toBeDefined();
        expect(payAtTable.Config.TableRetrievalEnabled).toBeFalsy();
    });
  
    it('should push pay at table config', function() 
    {
        var spi = new Spi('TABLEPOS1', 'localhost', null);
        spyOn(spi,'_send');
        var payAtTable = new SpiPayAtTable(spi);

        payAtTable.PushPayAtTableConfig();

        expect(spi._send).toHaveBeenCalledWith(jasmine.objectContaining({ EventName: 'set_table_config' }));
    });

    it('should handle bill status request', function() 
    {
        var request = JSON.stringify(__fixtures__['BillStatusRequest']);
        var spi = new Spi('TABLEPOS1', 'localhost', null);
        spyOn(spi,'_send');
        var payAtTable = new SpiPayAtTable(spi);
        var message = Message.FromJson(request);

        payAtTable.GetBillStatus = function(billId, tableId, operatorId) {
            return Object.assign(new BillStatusResponse(),
            {
                Result: BillRetrievalResult.SUCCESS,
                BillId: billId,
                TableId: tableId,
                TotalAmount: 100,
                OutstandingAmount: 100
            });
        };
        
        payAtTable._handleGetBillDetailsRequest(message).then(() => {
            expect(spi._send).toHaveBeenCalledWith(jasmine.objectContaining({ EventName: 'bill_details' }));
        })
    });

    it('should handle bill payment advice', function() 
    {
        var request = JSON.stringify(__fixtures__['BillPaymentWithCard']);
        var spi = new Spi('TABLEPOS1', 'localhost', null);
        spyOn(spi,'_send');
        var payAtTable = new SpiPayAtTable(spi);
        var message = Message.FromJson(request);

        payAtTable.GetBillStatus = function(billId, tableId, operatorId) {
            return Object.assign(new BillStatusResponse(),
            {
                Result: BillRetrievalResult.SUCCESS,
                BillId: billId,
                TableId: tableId,
                TotalAmount: 100,
                OutstandingAmount: 100
            });
        };
        
        payAtTable.BillPaymentReceived = function(billPayment, updatedBillData) {
            return Object.assign(new BillStatusResponse(),
            {
                Result: BillRetrievalResult.SUCCESS,
                OutstandingAmount: 10,
                TotalAmount: 10
            });
        };

        payAtTable._handleBillPaymentAdvice(message).then(() => {
          expect(spi._send).toHaveBeenCalledWith(jasmine.objectContaining({ EventName: 'bill_details' }));
        })
    });

});
