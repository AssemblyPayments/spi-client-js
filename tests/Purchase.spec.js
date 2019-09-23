import {Message, Events, MessageStamp} from '../src/Messages';
import {Secrets} from '../src/Secrets';
import {RequestIdHelper} from '../src/RequestIdHelper';
import {CancelTransactionResponse} from '../src/Purchase';
import {PurchaseHelper} from '../src/PurchaseHelper';
import {SpiClientUtils} from './utils/SpiClientUtils';

describe('Purchase', function() {
    'use strict';  

    it('should create a new purchase request', function() {
        var purchaseAmountCents = 10;
        var secrets = new Secrets("11A1162B984FEF626ECC27C659A8B0EEAD5248CA867A6A87BEA72F8A8706109D", "40510175845988F13F6162ED8526F0B09F73384467FA855E1E79B44A56562A58");
        var spiMessageStamp = new MessageStamp('BAR1', secrets, 0);

        var id = RequestIdHelper.Id("p");
        var purchase = PurchaseHelper.CreatePurchaseRequest(purchaseAmountCents, id);

        expect(purchase.AmountCents).toBe(10);
        expect(purchase.Id).toBe(id);

        var encryptedMsg = purchase.ToMessage().ToJson(spiMessageStamp);

        expect(encryptedMsg.enc).not.toBeNull();
        expect(encryptedMsg.hmac).not.toBeNull();

        var decryptedMsg = Message.FromJson(encryptedMsg, secrets);

        expect(decryptedMsg.Id.substr(0,5)).toBe('prchs');
        expect(decryptedMsg.EventName).toBe(Events.PurchaseRequest);
        expect(decryptedMsg.Data.purchase_amount).toBe(purchaseAmountCents);

    });

    it('should correctly identify and handle trying to cancel a transaction past the point of no return', () => {
        // arrange
        var secrets = SpiClientUtils.SetTestSecrets();

        const terminalResponse = {
            message: {
              event: 'cancel_response',
              id: '0',
              datetime: '2018-02-06T15:16:44.094',
              data: {
                pos_ref_id: '123456abc',
                success: false,
                error_reason: 'TXN_PAST_POINT_OF_NO_RETURN',
                error_detail: 'Txn has passed the point of no return'
              }
            }
          };

        // act
        var msg = Message.FromJson(JSON.stringify(terminalResponse), secrets);
        var response = new CancelTransactionResponse(msg);

        // assert
        expect(msg.EventName).toBe(terminalResponse.message.event);
        expect(response.Success).toBeFalsy();
        expect(response.PosRefId).toBe(terminalResponse.message.data.pos_ref_id);
        expect(response.GetErrorReason()).toBe(terminalResponse.message.data.error_reason);
        expect(response.WasTxnPastPointOfNoReturn()).tobeTruthy;
        expect(response.GetErrorDetail()).not.toBeNull();
        expect(response.PosRefId).toBe(response.GetResponseValueWithAttribute('pos_ref_id'));
    });
});
