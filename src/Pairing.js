/// <summary>
/// Pairing Interaction 1: Outgoing
/// </summary>
class PairRequest {
    ToMessage() {
        let data = {padding: true};
        return new Message(RequestIdHelper.Id("pr"), Events.PairRequest, data, false);
    }
}

/// Pairing Interaction 2: Incoming
class KeyRequest {
    constructor(m) {
        this.RequestId = m.Id;
        this.Aenc = m.Data.enc.A;
        this.Ahmac = m.Data.hmac.A;
    }
}

/// Pairing Interaction 3: Outgoing
class KeyResponse {
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

/// Pairing Interaction 4: Incoming
class KeyCheck {
    constructor(m) {
        this.ConfirmationCode = m.IncomingHmac.substring(0,6);
    }
}

/// Pairing Interaction 5: Incoming
class PairResponse {
    constructor(m) {
        this.Success = m.Data.success;
    }
}

/// Holder class for Secrets and KeyResponse, so that we can use them together in method signatures.
class SecretsAndKeyResponse {
    constructor(secrets, keyResponse) {
        this.Secrets = secrets;
        this.KeyResponse = keyResponse;
    }
}
