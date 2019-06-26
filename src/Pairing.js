import {Events, Message} from './Messages';
import {RequestIdHelper} from './RequestIdHelper';

// <summary>
// Pairing Interaction 1: Outgoing
// </summary>
export class PairRequest {
    ToMessage() {
        let data = {padding: true};
        return new Message(RequestIdHelper.Id("pr"), Events.PairRequest, data, false);
    }
}

// Pairing Interaction 2: Incoming
export class KeyRequest {
    constructor(m) {
        this.RequestId = m.Id;
        this.Aenc = m.Data.enc.A;
        this.Ahmac = m.Data.hmac.A;
    }
}

// Pairing Interaction 3: Outgoing
export class KeyResponse {
    constructor(requestId, Benc, Bhmac) {
        this.RequestId = requestId;
        this.Benc = Benc;
        this.Bhmac = Bhmac;
    }

    ToMessage() {
        let data = {
            enc: {
                B: this.Benc
            },
            hmac: {
                B: this.Bhmac
            }
        };

        return new Message(this.RequestId, Events.KeyResponse, data, false);
    }
}

// Pairing Interaction 4: Incoming
export class KeyCheck {
    constructor(m) {
        this.ConfirmationCode = m.IncomingHmac.substring(0,6);
    }
}

// Pairing Interaction 5: Incoming
export class PairResponse {
    constructor(m) {
        this.Success = m.Data.success;
    }
}

// Holder class for Secrets and KeyResponse, so that we can use them together in method signatures.
export class SecretsAndKeyResponse {
    constructor(secrets, keyResponse) {
        this.Secrets = secrets;
        this.KeyResponse = keyResponse;
    }
}

export class DropKeysRequest
{
    ToMessage()
    {
        return new Message(RequestIdHelper.Id("drpkys"), Events.DropKeysAdvice, null, true);
    }
}