describe('MessagesTest', function() {
    'use strict';

    const mockEncryptedMsg = JSON.stringify({
        enc: "819A6FF34A7656DBE5274AC44A28A48DD6D723FCEF12570E4488410B83A1504084D79BA9DF05C3CE58B330C6626EA5E9EB6BAAB3BFE95345A8E9834F183A1AB2F6158E8CDC217B4970E6331B4BE0FCAA",
        hmac: "21FB2315E2FB5A22857F21E48D3EEC0969AD24C0E8A99C56A37B66B9E503E1EF"
    });

    const mockEncryptedMsgWithBadHmac = JSON.stringify({
        enc: "819A6FF34A7656DBE5274AC44A28A48DD6D723FCEF12570E4488410B83A1504084D79BA9DF05C3CE58B330C6626EA5E9EB6BAAB3BFE95345A8E9834F183A1AB2F6158E8CDC217B4970E6331B4BE0FCAA",
        hmac: "00000000"
    });

    const mockEncryptedMsgWithBadData = JSON.stringify({
        enc: "00000",
        hmac: "00000000"
    });

    beforeEach(function() {
     
    });
  
    it('should parse unencrypted message', function() {

        var mockKeyRequest = JSON.stringify(__fixtures__['KeyRequest']);
        var incomingMessage = Message.FromJson(mockKeyRequest, null);
        
        expect(incomingMessage.EventName).toEqual('key_request');
    });


    it('should parse encrypted message', function() {

        var secrets = new Secrets("11A1162B984FEF626ECC27C659A8B0EEAD5248CA867A6A87BEA72F8A8706109D", "40510175845988F13F6162ED8526F0B09F73384467FA855E1E79B44A56562A58");
        var incomingMessage = Message.FromJson(mockEncryptedMsg, secrets);

        expect(incomingMessage.EventName).toEqual('pong');
    });

    it('should verify hmac sig', function() {
        var secrets = new Secrets("11A1162B984FEF626ECC27C659A8B0EEAD5248CA867A6A87BEA72F8A8706109D", "40510175845988F13F6162ED8526F0B09F73384467FA855E1E79B44A56562A58");
        var incomingMessage = Message.FromJson(mockEncryptedMsgWithBadHmac, secrets);
        
        expect(incomingMessage.EventName).toEqual(Events.InvalidHmacSignature);
    });

    it('should create outgoing message unencrypted', function() {
        var stamp   = new MessageStamp('BAR1', null, 0);
        var message = new Message("77", "event_y", {param1: "value1"}, false);

        var mJson   = message.ToJson(stamp);

        var testResult = JSON.parse(mJson);

        expect(testResult.message.event).toEqual('event_y');
        expect(testResult.message.data.param1).toBe('value1');
    });

    it('should create outgoing message encrypted', function() {
        var secrets = new Secrets("11A1162B984FEF626ECC27C659A8B0EEAD5248CA867A6A87BEA72F8A8706109D", "40510175845988F13F6162ED8526F0B09F73384467FA855E1E79B44A56562A58");
        var stamp   = new MessageStamp('BAR1', secrets, 0);
        var message = new Message("2", "ping", {param1: "value1"}, true);

        var mJson   = message.ToJson(stamp);

        // Assert by parsing it back again
        var revertedM = Message.FromJson(mJson, secrets);

        expect(revertedM.EventName).toEqual('ping');
        expect(revertedM.Data.param1).toEqual('value1');
    });
});
