// <summary>
// Events statically declares the various event names in messages.
// </summary>
const Events = {
     PairRequest : "pair_request",
     KeyRequest : "key_request",
     KeyResponse : "key_response",
     KeyCheck : "key_check",
     PairResponse : "pair_response",
     DropKeysAdvice : "drop_keys",

     LoginRequest : "login_request",
     LoginResponse : "login_response",

     Ping : "ping",
     Pong : "pong",

     PurchaseRequest : "purchase",
     PurchaseResponse : "purchase_response",
     CancelTransactionRequest : "cancel_transaction",
     CancelTransactionResponse : "cancel_response",
     GetLastTransactionRequest : "get_last_transaction",
     GetLastTransactionResponse : "last_transaction",
     RefundRequest : "refund",
     RefundResponse : "refund_response",
     SignatureRequired : "signature_required",
     SignatureDeclined : "signature_decline",
     SignatureAccepted : "signature_accept",
     AuthCodeRequired : "authorisation_code_required",
     AuthCodeAdvice : "authorisation_code_advice",

     CashoutOnlyRequest : "cash",
     CashoutOnlyResponse : "cash_response",

     MotoPurchaseRequest : "moto_purchase",
     MotoPurchaseResponse : "moto_purchase_response",

     SettleRequest : "settle",
     SettleResponse : "settle_response",
     SettlementEnquiryRequest : "settlement_enquiry",
     SettlementEnquiryResponse : "settlement_enquiry_response",

     SetPosInfoRequest : "set_pos_info",
     SetPosInfoResponse : "set_pos_info_response",

     KeyRollRequest : "request_use_next_keys",
     KeyRollResponse : "response_use_next_keys",

     Error : "error",
    
     InvalidHmacSignature : "_INVALID_SIGNATURE_",

    // Pay At Table Related Messages
    PayAtTableGetTableConfig : "get_table_config", // incoming. When eftpos wants to ask us for P@T configuration.
    PayAtTableSetTableConfig : "set_table_config", // outgoing. When we want to instruct eftpos with the P@T configuration.
    PayAtTableGetBillDetails : "get_bill_details", // incoming. When eftpos wants to aretrieve the bill for a table.
    PayAtTableBillDetails : "bill_details",        // outgoing. We reply with this when eftpos requests to us get_bill_details.
    PayAtTableBillPayment : "bill_payment",        // incoming. When the eftpos advices 

    PrintingRequest : "print",
    PrintingResponse : "print_response"
};

const SuccessState = {
    Unknown: 'Unknown', Success: 'Success', Failed: 'Failed'
};

// <summary>
// MessageStamp represents what is required to turn an outgoing Message into Json
// including encryption and date setting.
// </summary>
class MessageStamp {
    constructor(posId, secrets, serverTimeDelta) {
        this.PosId = posId;
        this.Secrets = secrets;
        this.ServerTimeDelta = serverTimeDelta;
    }
}

// <summary>
// MessageEnvelope represents the outer structure of any message that is exchanged
// between the Pos and the PinPad and vice-versa.
// See http://www.simplepaymentapi.com/#/api/message-encryption
// </summary>
class MessageEnvelope {
    constructor(message, enc, hmac, posId) {
        // <summary>
        // The Message field is set only when in Un-encrypted form.
        // In fact it is the only field in an envelope in the Un-Encrypted form.
        // </summary>
        this.Message = message;

        // <summary>
        // The enc field is set only when in Encrypted form.
        // It contains the encrypted Json of another MessageEnvelope 
        // </summary>
        this.Enc = enc;

        // <summary>
        // The hmac field is set only when in Encrypted form.
        // It is the signature of the "enc" field.
        // </summary>
        this.Hmac = hmac;

        // <summary>
        // The pos_id field is only filled for outgoing Encrypted messages.
        // </summary>
        this.PosId = posId;
    }

    toJSON() {
        return {
            message: this.Message,
            enc: this.Enc,
            hmac: this.Hmac,
            pos_id: this.PosId
        }
    }
}

// <summary>
// Message represents the contents of a Message.
// See http://www.simplepaymentapi.com/#/api/message-encryption
// </summary>
class Message {
    constructor(id, eventName, data, needsEncryption) {
        this.Id = id;
        this.EventName = eventName;
        this.Data = data;
        this.DateTimeStamp = '';
        this.PosId = ''; // Pos_id is set here only for outgoing Un-encrypted messages. 
        this.IncommingHmac = ''; // Sometimes the logic around the incoming message might need access to the sugnature, for example in the key_check.
        this._needsEncryption = needsEncryption; // Denotes whether an outgoing message needs to be encrypted in ToJson()
        this.DecryptedJson = ''; // Set on an incoming message just so you can have a look at what it looked like in its json form.
    }

    GetSuccessState() {
        if(!this.Data || typeof this.Data.success === "undefined") {
            return SuccessState.Unknown;
        }

        return this.Data.success ? SuccessState.Success : SuccessState.Failed;
    }

    GetError() {
        return this.Data.error_reason ? this.Data.error_reason : "";
    }

    GetErrorDetail() {
        return this.Data.error_detail;
    }

    GetServerTimeDelta()
    {
        let now = Date.now();
        
        // Stamp format: 2018-04-19T01:42:38.279
        let dts = this.DateTimeStamp.split(/[\-\+\. :T]/);
        let msgTime = new Date(
            // year, month, date
            dts[0], dts[1] - 1, dts[2],
            // hour, minute, second, millis
            dts[3], dts[4], dts[5], dts[6]
        ).getTime(); // Local time zone

        return msgTime - now;
    }

    // Helper method to parse bank date format 20042018 (ddMMyyyy)
    static ParseBankDate(bankDate) {
        if(bankDate.length !== 8) return null;

        return new Date(`${bankDate.substr(4,4)}-${bankDate.substr(2,2)}-${bankDate.substr(0,2)}`);
    }

    // Parses a bank date & time str from "05Oct17" / "05:00" ("ddMMMyy/HH:mm") into date obj
    static ParseBankDateTimeStr(date, time) {
        return new Date(`${date.substr(0,2)} ${date.substr(2,3)} ${date.substr(5,2)} ${time}`);
    }

    static FromJson(msgJson, secrets) {
        let env = JSON.parse(msgJson);

        if(env.message != null) {
            let message = new Message(env.message.id, env.message.event, env.message.data, false);
            message.DecryptedJson = msgJson;
            return message;
        }

        if (secrets == null)
        {
            // This may happen if we somehow received an encrypted message from eftpos but we're not configered with secrets.
            // For example, if we cancel the pairing process a little late in the game and we get an encrypted key_check message after we've dropped the keys.
            return new Message("UNKNOWN", "NOSECRETS", null, false);
        }

        // Its encrypted, verify sig
        let sig = Crypto.HmacSignature(secrets.HmacKey, env.enc);
        if (sig.toUpperCase() != env.hmac) {
            return new Message("_", Events.InvalidHmacSignature, null, false);
        }

        let decryptedJson = Crypto.AesDecrypt(secrets.EncKey, env.enc);

        try {
            let decryptedMsg = JSON.parse(decryptedJson);

            let message = new Message(decryptedMsg.message.id, decryptedMsg.message.event, decryptedMsg.message.data, true);

            message.DateTimeStamp = decryptedMsg.message.datetime;
            message.PosId = decryptedMsg.message.pos_id;
            message.IncomingHmac = env.hmac; 
            message.DecryptedJson = decryptedJson;

            return message;

        } catch(e) {
            return new Message("UNKNOWN", "UNPARSEABLE", {"msg": decryptedJson}, false);
        }
    }

    ToJson(stamp) {
        let now = Date.now();
        let tzoffset = new Date().getTimezoneOffset() * 60 * 1000;
        let adjustedTime = new Date(now - tzoffset + stamp.ServerTimeDelta);

        // Format date: "yyyy-MM-ddTHH:mm:ss.fff"
        this.DateTimeStamp = adjustedTime.toISOString().slice(0,-1);
        this.PosId = stamp.PosId;
        
        var envelope = {
            message: {
                id: this.Id,
                event: this.EventName,
                data: this.Data,
                datetime: this.DateTimeStamp
            }
        };

        if (!this._needsEncryption) {
            // Unencrypted Messages need PosID inside the message
            envelope.message.pos_id = this.PosId
        }
        this.DecryptedJson = JSON.stringify(envelope);

        if (!this._needsEncryption) {
            return this.DecryptedJson;
        }

        let encMsg = Crypto.AesEncrypt(stamp.Secrets.EncKey, this.DecryptedJson);
        let hmacSig = Crypto.HmacSignature(stamp.Secrets.HmacKey, encMsg);
        let encrMessageEnvelope = {enc: encMsg, hmac: hmacSig.toUpperCase(), pos_id: stamp.PosId};

        return JSON.stringify(encrMessageEnvelope);
    }
}
