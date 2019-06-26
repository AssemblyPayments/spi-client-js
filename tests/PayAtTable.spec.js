import {Message} from '../src/Messages';
import {BillRetrievalResult, PaymentType, BillPayment, PaymentHistoryEntry, PayAtTableConfig} from '../src/PayAtTable';

describe('PayAtTable', function() {
    'use strict';  

    it('should define constants', function()
    {
        expect(typeof BillRetrievalResult).toBe('object');
        expect(typeof PaymentType).toBe('object');
    });

    it('should create a new bill payment', function()
    {
        var data = JSON.stringify(__fixtures__['BillPaymentWithCard']);

        var message = Message.FromJson(data);
        var response = new BillPayment(message);

        expect(response.BillId).toBe('2018-03-12T09:53:49.934');
        expect(response.TableId).toBe('123456');
        expect(response.OperatorId).toBe('12345');
        expect(response.PaymentType).toBe('card');
        expect(response.PurchaseAmount).toBe(1234);
        expect(response.TipAmount).toBe(1234);
    });


    it('should create payment history entry', function()
    {
        var type    = 'card';
        var summary = {
            "bank_date":"12032018",
            "bank_time":"075403",
            "purchase_amount":1234,
            "terminal_id":"P2015071",
            "terminal_ref_id":"some string",
            "tip_amount":0
        };

        var request     = new PaymentHistoryEntry(type, summary);

        expect(request.toJSON().payment_type).toEqual('card');
        expect(request.GetTerminalRefId()).toBe("some string");
    });

    it('should configure PayAtTableConfig', function()
    {
        var payAtTableConfig = new PayAtTableConfig();
        var message = payAtTableConfig.ToMessage('test123');
        expect(message.EventName).toBe('set_table_config');
    });

    it('should disable PayAtTable', function()
    {
        expect(PayAtTableConfig.FeatureDisableMessage().EventName).toBe('set_table_config');
        expect(PayAtTableConfig.FeatureDisableMessage().Data.pay_at_table_enabled).toBe(false);
    });
});
