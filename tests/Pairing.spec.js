import {Message} from '../src/Messages';
import {PairingHelper} from '../src/PairingHelper';
import {KeyRequest} from '../src/Pairing';

describe('PairingTests', function() {
    'use strict';
  
    it('TestPairingKeyResponse', function() {

        var secrets = null;
        var mockKeyRequest = JSON.stringify(__fixtures__['KeyRequest']);
        var incomingMessage = Message.FromJson(mockKeyRequest, secrets);
        
        expect(incomingMessage.EventName).toEqual('key_request');

        var keyRequest = new KeyRequest(incomingMessage);

        // Let's generate the Secrets and the KeyResponse
        var pr = new PairingHelper();
        var result = pr.GenerateSecretsAndKeyResponse(keyRequest);
                    
        secrets = result.Secrets; // Save These. They are precious!
                    
        var keyResponse = result.KeyResponse;

        expect(keyResponse.Benc).not.toBeNull();
        expect(keyResponse.Bhmac).not.toBeNull();
        expect(keyResponse.RequestId).toBe("62");

        // Let's now prepare to send the key_response back to the server.
        var msgToSend = keyResponse.ToMessage();
        expect(msgToSend.Id).toBe("62");
        expect(msgToSend.Data.enc.B).not.toBeNull();
        expect(msgToSend.Data.hmac.B).not.toBeNull();
    });
  
    it('TestSecretConversion', function() {
        var secret = "8ABD4BE643031C8DC97B1CF5DD0807C69F7BE5BC0538A9A4A08FC903D21BFCCA079F2283095013EAE3599AD04C12F7396D668DFF1709AAE987C8FAB45F0B6E09303B4859CC068336E8990701BB548FE88162F518DDBDF0180B578D0AE12F5C2C1424FAC4F4FCC5EF20D23EC57543329B7DE6BF6E68367BE2A1BAFAA37CEF10CF00FC607F038D289ED6F4BDFAAF166908971959587A6214A1CC131970446097C7C5753E349DC1584B448229E04960DB84785BF55159596B61FABB0610ACA32102DC132ABFF537FE4CA9609FAE9AB3CC6489AF745A503D63A0FC1E2F7E70A40B72FAB38D76AAABBABD7487945BBB6305C3C091813F3D01753C5BCAEA4B3D8179B5";

        var pr = new PairingHelper();
        var calculatedSecret = pr.DHSecretToSPISecret(secret);
        var expectedSecret = "4564e59afa27b2e24c9f568e92d27488b9dd81ccf9d2fcae0b319d70add7feb4";

        expect(calculatedSecret).toEqual(expectedSecret);
    });

});
