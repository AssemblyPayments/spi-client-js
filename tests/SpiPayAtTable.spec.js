import {Spi} from '../src/Spi';
import {SpiStatus} from '../src/SpiModels';
import {SpiPayAtTable} from '../src/SpiPayAtTable';
import {BillStatusResponse, BillRetrievalResult, GetOpenTablesResponse, OpenTablesEntry} from '../src/PayAtTable';
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
  
    describe("PushPayAtTableConfig()", () => {
        it("should not push pay at table config when not paired", () => {
            // arrange
            const spi = new Spi("TABLEPOS1", "", "localhost", null);
            const payAtTable = new SpiPayAtTable(spi);
            spi.CurrentStatus = SpiStatus.Unpaired;
            spi._send = () => true;
            spyOn(spi, "_send");

            // act
            payAtTable.PushPayAtTableConfig();

            // assert
            expect(spi._send).not.toHaveBeenCalled();
        });

        it("should push pay at table config when paired", () => {
            // arrange
            const spi = new Spi("TABLEPOS1", "", "localhost", null);
            const payAtTable = new SpiPayAtTable(spi);
            spi.CurrentStatus = SpiStatus.PairedConnected;
            spi._send = () => true;
            spyOn(spi, "_send");

            // act
            payAtTable.PushPayAtTableConfig();

            // assert
            expect(spi._send).toHaveBeenCalledWith(jasmine.objectContaining({ EventName: 'set_table_config' }));
        });
    });

    it('should open a table and correctly return a response with the open table', () =>
    {
        // arrange
        const openTablesEntries = [];
        const openTablesEntry = Object.assign(new OpenTablesEntry(), {
            TableId: '1',
            Label: '1',
            BillOutstandingAmount: 2000,
        });
        openTablesEntries.push(openTablesEntry);

        // act
        const getOpenTablesResponse = Object.assign(new GetOpenTablesResponse(), {
            TableData: JSON.stringify(openTablesEntries),
        });
        const openTablesResponse = getOpenTablesResponse.GetOpenTables();

        // assert
        expect(openTablesResponse.length).toBe(openTablesEntries.length);
    });
    
    it('should return an empty array when the open table data is null', () =>
    {
        // arrange
        const getOpenTablesResponse = Object.assign(new GetOpenTablesResponse(), {
            TableData: null,
        });

        // act
        const openTablesResponse = getOpenTablesResponse.GetOpenTables();

        // assert
        expect(openTablesResponse.length).toBe(0);
        expect(getOpenTablesResponse.TableData).toBeNull();
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
