describe('SpiPreauth', function() {
    'use strict';
  
    it('should InitiateAccountVerifyTx', function() {
        var spi = new Spi('TABLEPOS1', 'localhost', null);
        var spiPreauth = new SpiPreauth(spi);
        var posRefId = '1234';

        spyOn(spiPreauth,'_initiatePreauthTx');

        spiPreauth.InitiateAccountVerifyTx(posRefId);
        expect(spiPreauth._initiatePreauthTx).toHaveBeenCalledWith(jasmine.objectContaining({ Type: 'AccountVerify' }),'Asked EFTPOS to verify account');
    });
  
    it('should InitiateOpenTx', function() {
        var spi = new Spi('TABLEPOS1', 'localhost', null);
        var spiPreauth = new SpiPreauth(spi);
        var posRefId = '1234';
        var amount = 1000;

        spyOn(spiPreauth,'_initiatePreauthTx');

        spiPreauth.InitiateOpenTx(posRefId, amount);
        expect(spiPreauth._initiatePreauthTx).toHaveBeenCalledWith(jasmine.objectContaining({ Type: 'Preauth' }),'Asked EFTPOS to create preauth for 10.00');
    });

    it('should InitiateTopupTx', function() {
        var spi = new Spi('TABLEPOS1', 'localhost', null);
        var spiPreauth = new SpiPreauth(spi);
        var posRefId = '1234';
        var preauthId = 123456;
        var amount = 1000;

        spyOn(spiPreauth,'_initiatePreauthTx');

        spiPreauth.InitiateTopupTx(posRefId, preauthId, amount);
        expect(spiPreauth._initiatePreauthTx).toHaveBeenCalledWith(
            jasmine.objectContaining({
                Request: jasmine.objectContaining({ 
                    EventName: 'preauth_topup' 
                })
            }),'Asked EFTPOS to make preauth topup for 10.00');
    });

    it('should InitiatePartialCancellationTx', function() {
        var spi = new Spi('TABLEPOS1', 'localhost', null);
        var spiPreauth = new SpiPreauth(spi);
        var posRefId = '1234';
        var preauthId = 123456;
        var amount = 1000;

        spyOn(spiPreauth,'_initiatePreauthTx');

        spiPreauth.InitiatePartialCancellationTx(posRefId, preauthId, amount);
        expect(spiPreauth._initiatePreauthTx).toHaveBeenCalledWith(
            jasmine.objectContaining({
                Request: jasmine.objectContaining({ 
                    EventName: 'preauth_partial_cancellation' 
                })
            }),'Asked EFTPOS to make preauth partial cancellation for 10.00');
    });

    it('should InitiateExtendTx', function() {
        var spi = new Spi('TABLEPOS1', 'localhost', null);
        var spiPreauth = new SpiPreauth(spi);
        var posRefId = '1234';
        var preauthId = 123456;

        spyOn(spiPreauth,'_initiatePreauthTx');

        spiPreauth.InitiateExtendTx(posRefId, preauthId);
        expect(spiPreauth._initiatePreauthTx).toHaveBeenCalledWith(
            jasmine.objectContaining({
                Request: jasmine.objectContaining({ 
                    EventName: 'preauth_extend' 
                })
            }),'Asked EFTPOS to make preauth Extend request');
    });

    it('should InitiateCompletionTx', function() {
        var spi = new Spi('TABLEPOS1', 'localhost', null);
        var spiPreauth = new SpiPreauth(spi);
        var posRefId = '1234';
        var preauthId = 123456;
        var amount = 1000;

        spyOn(spiPreauth,'_initiatePreauthTx');

        spiPreauth.InitiateCompletionTx(posRefId, preauthId, amount);
        expect(spiPreauth._initiatePreauthTx).toHaveBeenCalledWith(
            jasmine.objectContaining({
                Request: jasmine.objectContaining({ 
                    EventName: 'completion' 
                })
            }),'Asked EFTPOS to make preauth completion for 10.00');
    });

    it('should InitiateCancelTx', function() {
        var spi = new Spi('TABLEPOS1', 'localhost', null);
        var spiPreauth = new SpiPreauth(spi);
        var posRefId = '1234';
        var preauthId = 123456;

        spyOn(spiPreauth,'_initiatePreauthTx');

        spiPreauth.InitiateCancelTx(posRefId, preauthId);
        expect(spiPreauth._initiatePreauthTx).toHaveBeenCalledWith(
            jasmine.objectContaining({
                Request: jasmine.objectContaining({ 
                    EventName: 'preauth_cancellation' 
                })
            }),'Asked EFTPOS to make preauth cancellation request');
    });

    it('should determine if a preauth event', function() {
        expect(SpiPreauth.IsPreauthEvent('preauth_test')).toBe(true);
        expect(SpiPreauth.IsPreauthEvent(PreauthEvents.PreauthCompleteResponse)).toBe(true);
        expect(SpiPreauth.IsPreauthEvent(PreauthEvents.PreauthCompleteRequest)).toBe(true);
        expect(SpiPreauth.IsPreauthEvent(PreauthEvents.AccountVerifyRequest)).toBe(true);
        expect(SpiPreauth.IsPreauthEvent(PreauthEvents.AccountVerifyResponse)).toBe(true);
    });
});
