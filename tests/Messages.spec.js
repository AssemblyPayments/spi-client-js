describe('MessagesTest', function() {
    'use strict';

    const mockKeyRequest = JSON.stringify({
        message: {
            event: "key_request",
            id: "62",
            data: {
                enc: {
                    A: "17E7BE43D53102647040FC090000C215810E28E5E0CBD4F47923E194AE72AB0CDADF922642B73C568AA94A84B61874A475549E1F95847BE2725462E3D635F019BE39B2064F1EFFBE6B80CE97FBB7C0913ADC06A2445980B57647778B127FFCCE8B28A44BADEDE0110A5AFB05FEF7AA3F54988AFB04310A113F713601683D8E30CA2BAFC2EC34879127019E3352D8CAB9603184283AE3C9359D40C12474500018B8640AF371DC8712A06A3A443DF41DA9C1C60FAD2ACB02564A6694382B18811AA30CE38A1FC251DE0669504CAB620C2BA4A84CCC8FBDCBB30BBB3EACA76008599F74C2FDF6231773DC0439969CB5F2904A71DDF57F7DF9394AA29CBE4856FC82"
                },
                hmac: {
                    A: "89708531EADF129B4F67F00ECBF883C825A0EF3D766E32BC2BA13508B53FC3F5928316DE05CBE82FA1BBF4116E58A68C6F9C3C8FEF492051498188F4E80F82D5764FF50331B34E418E41480FAE0C794F20D9F7AE9819CB317AD2351B165783D57D12C39F95D9A5A292B89D3A26F9BBDE5C218EEC3FE63D910DCB0E1A0E6B570AF94BBD3025EB5E23FFBD9E8D58FE68403B3E50566DA8E2E54EED1A4D754689ECB7266B3D4804E39FB868F1741896757E7844C3389DA49F87D23FB2E9F6ADDBE9C14CC92F322CF3B471CE217E48D0762D5C963827AA6F4316B905F19E0262A35DC4B62E2FB95B7AAD5616C61F31C9A74008EE51BAB2CD6F646320FA30A6DDC4D7"
                }
            }                        
        }
    });

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
