import {Message} from '../src/Messages';
import {
    PreauthEvents, 
    AccountVerifyRequest, 
    AccountVerifyResponse, 
    PreauthOpenRequest, 
    PreauthTopupRequest, 
    PreauthPartialCancellationRequest, 
    PreauthExtendRequest,
    PreauthCancelRequest,
    PreauthCompletionRequest,
    PreauthResponse} from '../src/Preauth';

describe('Preauth', function() {
    'use strict';  

    it('should define Pre auth events', function() 
    {
        expect(typeof PreauthEvents).toBe('object');
    });

    it('should create account verify request', function() 
    {
        var posRefId = '123456';
        var avr = new AccountVerifyRequest(posRefId);
        var message = avr.ToMessage();

        expect(message.EventName).toEqual('account_verify');
        expect(message.Data.pos_ref_id).toBe(posRefId);
    });

    it('should parse account verify response', function()
    {
        var response = JSON.stringify(__fixtures__['AccountVerifyResponse']);

        var message = Message.FromJson(response);
        var avr = new AccountVerifyResponse(message);

        expect(avr.PosRefId).toBe('POS_REF_ID_7');
    });

    it('should open preauth request', function()
    {
        var posRefId    = '123456';
        var amount      = 100;
        var request     = new PreauthOpenRequest(amount, posRefId);
        var message     = request.ToMessage();

        expect(message.EventName).toEqual('preauth');
        expect(message.Data.pos_ref_id).toBe(posRefId);
    });

    it('should issue a preauth topup request', function()
    {
        var posRefId    = '123456';
        var preauthId   = 9999999;
        var amount      = 100;
        var request     = new PreauthTopupRequest(preauthId, amount, posRefId);
        var message     = request.ToMessage();

        expect(message.EventName).toEqual('preauth_topup');
        expect(message.Data.pos_ref_id).toBe(posRefId);
        expect(message.Data.topup_amount).toBe(amount);
    });

    it('should issue a preauth partial cancellation request', function()
    {
        var posRefId    = '123456';
        var preauthId   = 9999999;
        var amount      = 50;
        var request     = new PreauthPartialCancellationRequest(preauthId, amount, posRefId);
        var message     = request.ToMessage();

        expect(message.EventName).toEqual('preauth_partial_cancellation');
        expect(message.Data.pos_ref_id).toBe(posRefId);
        expect(message.Data.preauth_cancel_amount).toBe(amount);
    });

    it('should open preauth extend request', function()
    {
        var preauthId   = 9999999;
        var posRefId    = '123456';
        var request     = new PreauthExtendRequest(preauthId, posRefId);
        var message     = request.ToMessage();

        expect(message.EventName).toEqual('preauth_extend');
        expect(message.Data.pos_ref_id).toBe(posRefId);
    });

    it('should open preauth cancel request', function()
    {
        var preauthId   = 9999999;
        var posRefId    = '123456';
        var request     = new PreauthCancelRequest(preauthId, posRefId);
        var message     = request.ToMessage();

        expect(message.EventName).toEqual('preauth_cancellation');
        expect(message.Data.pos_ref_id).toBe(posRefId);
    });

    it('should open preauth completion request', function()
    {
        var preauthId   = 9999999;
        var posRefId    = '123456';
        var amount      = 50;
        var request     = new PreauthCompletionRequest(preauthId, amount, posRefId);
        var message     = request.ToMessage();

        expect(message.EventName).toEqual('completion');
        expect(message.Data.pos_ref_id).toBe(posRefId);
    });

    it('should parse a preauth response', function() 
    {
        var response    = JSON.stringify(__fixtures__['PreAuthorisation']);
        var message     = Message.FromJson(response);
        var preauth_res = new PreauthResponse(message);

        expect(preauth_res.PosRefId).toBe('POS_REF_ID_7');

        expect(preauth_res.GetBalanceAmount()).toBe(1000);
        expect(preauth_res.GetPreviousBalanceAmount()).toBe(0);
        expect(preauth_res.GetCompletionAmount()).toBe(0);
    });

});
