import {Events, Message} from './Messages';
import {Crypto} from './Crypto';
import {Secrets} from './Secrets';

export class KeyRollingHelper {
    static PerformKeyRolling(krRequest, currentSecrets)
    {
        let m = new Message(krRequest.Id, Events.KeyRollResponse, {"status": "confirmed"}, true);
        let newSecrets = new Secrets(Crypto.GenerateHash(currentSecrets.EncKey).toUpperCase(),Crypto.GenerateHash(currentSecrets.HmacKey).toUpperCase());
        return new KeyRollingResult(m, newSecrets);
    }
}

export class KeyRollingResult {
    constructor(keyRollingConfirmation, newSecrets) {
        this.KeyRollingConfirmation = keyRollingConfirmation;
        this.NewSecrets = newSecrets;
    }
}
