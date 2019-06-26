import {CashoutOnlyRequest, CashoutOnlyResponse} from '../src/Cashout';
import {Message} from '../src/Messages';

describe('Cashout', function() {
    'use strict';  

    it('should open cashout only request', function()
    {
        var amount      = 1000;
        var posRefId    = '123456';
        var request     = new CashoutOnlyRequest(amount, posRefId);
        var message     = request.ToMessage();

        expect(message.EventName).toEqual('cash');
        expect(message.Data.pos_ref_id).toBe(posRefId);
        expect(message.Data.cash_amount).toBe(amount);
    });

    it('should parse cashout only response', function()
    {
        var data    = JSON.stringify(__fixtures__['CashoutOnlyResponse']);

        var message = Message.FromJson(data);
        var response = new CashoutOnlyResponse(message);

        expect(response.GetRRN()).toBe('180206002786');
        expect(response.GetCashoutAmount()).toBe(1500);
        expect(response.GetBankCashAmount()).toBe(1500);
        expect(response.GetResponseText()).toBe('APPROVED');
        expect(response.GetAccountType()).toBe('SAVINGS');
        expect(response.GetAuthCode()).toBe('839791');
        expect(response.GetBankDate()).toBe('06022018');
        expect(response.GetBankTime()).toBe('144752');
        expect(response.WasMerchantReceiptPrinted()).toBe(false);
        expect(response.WasCustomerReceiptPrinted()).toBe(false);
    });
});
