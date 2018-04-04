describe('Purchase', function() {
    'use strict';  

    it('should create a new purchase request', function() {
        var purchaseAmountCents = 10;
        var secrets = new Secrets("11A1162B984FEF626ECC27C659A8B0EEAD5248CA867A6A87BEA72F8A8706109D", "40510175845988F13F6162ED8526F0B09F73384467FA855E1E79B44A56562A58");
        var spiMessageStamp = new MessageStamp('BAR1', secrets, 0);

        var purchase = PurchaseHelper.CreatePurchaseRequest(purchaseAmountCents, RequestIdHelper.Id("p"));

        expect(purchase.AmountCents).toBe(10);
        expect(purchase.Id).toBe('p1');

        var encryptedMsg = purchase.ToMessage().ToJson(spiMessageStamp);

        expect(encryptedMsg.enc).not.toBeNull();
        expect(encryptedMsg.hmac).not.toBeNull();

        var decryptedMsg = Message.FromJson(encryptedMsg, secrets);

        expect(decryptedMsg.Id).toBe('p1');
        expect(decryptedMsg.EventName).toBe(Events.PurchaseRequest);
        expect(decryptedMsg.Data.amount_purchase).toBe(purchaseAmountCents);

    });

});
