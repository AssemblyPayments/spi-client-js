"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CashoutOnlyRequest = function () {
    function CashoutOnlyRequest(amountCents, posRefId) {
        _classCallCheck(this, CashoutOnlyRequest);

        this.PosRefId = posRefId;
        this.CashoutAmount = amountCents;
        this.Config = new SpiConfig();
    }

    _createClass(CashoutOnlyRequest, [{
        key: "ToMessage",
        value: function ToMessage() {
            var data = {
                "pos_ref_id": this.PosRefId,
                "cash_amount": this.CashoutAmount
            };

            this.Config.addReceiptConfig(data);
            return new Message(RequestIdHelper.Id("cshout"), Events.CashoutOnlyRequest, data, true);
        }
    }]);

    return CashoutOnlyRequest;
}();

var CashoutOnlyResponse = function () {
    function CashoutOnlyResponse(m) {
        _classCallCheck(this, CashoutOnlyResponse);

        this._m = m;
        this.RequestId = m.Id;
        this.PosRefId = m.Data.pos_ref_id;
        this.SchemeName = m.Data.scheme_name;
        this.Success = m.GetSuccessState() == SuccessState.Success;
    }

    _createClass(CashoutOnlyResponse, [{
        key: "GetRRN",
        value: function GetRRN() {
            return this._m.Data["rrn"];
        }
    }, {
        key: "GetCashoutAmount",
        value: function GetCashoutAmount() {
            return this._m.Data["cash_amount"];
        }
    }, {
        key: "GetBankNonCashAmount",
        value: function GetBankNonCashAmount() {
            return this._m.Data["bank_noncash_amount"];
        }
    }, {
        key: "GetBankCashAmount",
        value: function GetBankCashAmount() {
            return this._m.Data["bank_cash_amount"];
        }
    }, {
        key: "GetCustomerReceipt",
        value: function GetCustomerReceipt() {
            return this._m.Data["customer_receipt"];
        }
    }, {
        key: "GetMerchantReceipt",
        value: function GetMerchantReceipt() {
            return this._m.Data["merchant_receipt"];
        }
    }, {
        key: "GetResponseText",
        value: function GetResponseText() {
            return this._m.Data["host_response_text"];
        }
    }, {
        key: "GetResponseCode",
        value: function GetResponseCode() {
            return this._m.Data["host_response_code"];
        }
    }, {
        key: "GetTerminalReferenceId",
        value: function GetTerminalReferenceId() {
            return this._m.Data["terminal_ref_id"];
        }
    }, {
        key: "GetAccountType",
        value: function GetAccountType() {
            return this._m.Data["account_type"];
        }
    }, {
        key: "GetAuthCode",
        value: function GetAuthCode() {
            return this._m.Data["auth_code"];
        }
    }, {
        key: "GetBankDate",
        value: function GetBankDate() {
            return this._m.Data["bank_date"];
        }
    }, {
        key: "GetBankTime",
        value: function GetBankTime() {
            return this._m.Data["bank_time"];
        }
    }, {
        key: "GetMaskedPan",
        value: function GetMaskedPan() {
            return this._m.Data["masked_pan"];
        }
    }, {
        key: "GetTerminalId",
        value: function GetTerminalId() {
            return this._m.Data["terminal_id"];
        }
    }, {
        key: "WasMerchantReceiptPrinted",
        value: function WasMerchantReceiptPrinted() {
            return this._m.Data["merchant_receipt_printed"];
        }
    }, {
        key: "WasCustomerReceiptPrinted",
        value: function WasCustomerReceiptPrinted() {
            return this._m.Data["customer_receipt_printed"];
        }
    }, {
        key: "GetResponseValue",
        value: function GetResponseValue(attribute) {
            return this._m.Data[attribute];
        }
    }]);

    return CashoutOnlyResponse;
}();
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ConnectionState = {
    Disconnected: 'Disconnected',
    Connecting: 'Connecting',
    Connected: 'Connected'
};

var SPI_PROTOCOL = 'spi.2.1.0';

var ConnectionStateEventArgs = function ConnectionStateEventArgs(connectionState) {
    _classCallCheck(this, ConnectionStateEventArgs);

    this.ConnectionState = connectionState;
};

var MessageEventArgs = function MessageEventArgs(message) {
    _classCallCheck(this, MessageEventArgs);

    this.Message = message;
};

var Connection = function () {
    function Connection() {
        _classCallCheck(this, Connection);

        this.Address = null;
        this.Connected = false;
        this.State = ConnectionState.Disconnected;
        this.SpiProtocol = SPI_PROTOCOL;
        this._ws = null;

        if (typeof WebSocket === 'undefined') {
            throw new Error('Environment does not support WebSockets');
        }
    }

    _createClass(Connection, [{
        key: 'Connect',
        value: function Connect() {
            var _this = this;

            if (this.State === ConnectionState.Connected || this.State === ConnectionState.Connecting) {
                // already connected or connecting. disconnect first.
                return;
            }

            this.State = ConnectionState.Connecting;

            //Create a new socket instance specifying the url, SPI protocol and Websocket to use.
            //The will create a TCP/IP socket connection to the provided URL and perform HTTP websocket negotiation
            this._ws = new WebSocket(this.Address, this.SpiProtocol);
            this._ws.onopen = function () {
                return _this.pollWebSocketConnection();
            };
            this._ws.onmessage = function (payload) {
                return _this.onMessageReceived(payload);
            };
            this._ws.onclose = function () {
                return _this.onClosed();
            };
            this._ws.onerror = function (err) {
                return _this.onError(err);
            };

            document.dispatchEvent(new CustomEvent('ConnectionStatusChanged', { detail: new ConnectionStateEventArgs(ConnectionState.Connecting) }));
        }
    }, {
        key: 'Disconnect',
        value: function Disconnect() {
            if (this.State == ConnectionState.Disconnected) return;

            if (this._ws && this._ws.readyState != this._ws.CLOSED) {
                this._ws.close();
            }

            if (this._ws) {
                this._ws.onopen = null;
                this._ws.onmessage = null;
                this._ws.onclose = null;
                this._ws.onerror = null;
            }

            this.onClosed();
        }
    }, {
        key: 'Send',
        value: function Send(message) {
            this._ws.send(message);
        }
    }, {
        key: 'onOpened',
        value: function onOpened() {
            this.State = ConnectionState.Connected;
            this.Connected = true;
            document.dispatchEvent(new CustomEvent('ConnectionStatusChanged', { detail: new ConnectionStateEventArgs(ConnectionState.Connected) }));
        }
    }, {
        key: 'onClosed',
        value: function onClosed() {
            this.Connected = false;
            this.State = ConnectionState.Disconnected;
            this._ws = null;
            document.dispatchEvent(new CustomEvent('ConnectionStatusChanged', { detail: new ConnectionStateEventArgs(ConnectionState.Disconnected) }));
        }
    }, {
        key: 'pollWebSocketConnection',
        value: function pollWebSocketConnection() {
            var _this2 = this;

            var count = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;


            if (this._ws.readyState === this._ws.OPEN) {
                this.onOpened();
                return true;
            } else if (count < 25) {
                count++;
                setTimeout(function () {
                    return _this2.pollWebSocketConnection(count);
                }, 200);
            } else {
                this.Disconnect();
                return false;
            }
        }
    }, {
        key: 'onMessageReceived',
        value: function onMessageReceived(message) {
            document.dispatchEvent(new CustomEvent('MessageReceived', { detail: new MessageEventArgs(message.data) }));
        }
    }, {
        key: 'onError',
        value: function onError(err) {
            document.dispatchEvent(new CustomEvent('ErrorReceived', { detail: new MessageEventArgs(err) }));
        }
    }]);

    return Connection;
}();
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Crypto = function () {
    function Crypto() {
        _classCallCheck(this, Crypto);

        if (typeof jsSHA === 'undefined') {
            throw new Error('jsSHA hash lib requried');
        }

        if (typeof aesjs === 'undefined') {
            throw new Error('aes lib requried');
        }
    }

    // <summary>
    // Encrypt a block using CBC and PKCS7.
    // </summary>
    // <param name="key">The key value</param>
    // <param name="data">The message to encrypt</param>
    // <returns>Returns the resulting encrypted string data as HEX.</returns>


    _createClass(Crypto, null, [{
        key: 'AesEncrypt',
        value: function AesEncrypt(key, data) {
            var bytes = aesjs.utils.hex.toBytes(key);
            var iv = [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00];
            var textBytes = aesjs.padding.pkcs7.pad(aesjs.utils.utf8.toBytes(data));
            var aesCbc = new aesjs.ModeOfOperation.cbc(bytes, iv);
            var encryptedBytes = aesCbc.encrypt(textBytes);
            var encryptedString = aesjs.utils.hex.fromBytes(encryptedBytes);

            return encryptedString;
        }

        // <summary>
        // Decrypt a block using a CBC and PKCS7.
        // </summary>
        // <param name="key">The key value</param>
        // <param name="data">the data to decrypt</param>
        // <returns>Returns the resulting data decrypted in plaintext.</returns>

    }, {
        key: 'AesDecrypt',
        value: function AesDecrypt(key, data) {
            var bytes = aesjs.utils.hex.toBytes(key);
            var iv = [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00];
            var encryptedBytes = aesjs.utils.hex.toBytes(data);
            var aesCbc = new aesjs.ModeOfOperation.cbc(bytes, iv);
            var decryptedBytes = aesCbc.decrypt(encryptedBytes);
            var decrypted = aesjs.utils.utf8.fromBytes(aesjs.padding.pkcs7.strip(decryptedBytes));

            return decrypted;
        }

        // <summary>
        // Calculates the HMACSHA256 signature of a message.
        // </summary>
        // <param name="key">The Hmac Key as HEX</param>
        // <param name="messageToSign">The message to sign</param>
        // <returns>The HMACSHA256 signature as a hex string</returns>

    }, {
        key: 'HmacSignature',
        value: function HmacSignature(key, messageToSign) {
            var shaObj = new jsSHA("SHA-256", "TEXT");

            shaObj.setHMACKey(key, 'HEX');
            shaObj.update(messageToSign);

            return shaObj.getHMAC("HEX");
        }

        /**
         * This utility function calculates the SHA-256 value in hexadecimal format
         * @param {String} value the value to be hashed
         */

    }, {
        key: 'GenerateHash',
        value: function GenerateHash(value) {
            var shaObj = new jsSHA('SHA-256', 'HEX');
            shaObj.update(value);
            var shaHash = shaObj.getHash('HEX');
            return shaHash;
        }
    }]);

    return Crypto;
}();
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// This creates the private and public keys for diffie-hellman (https://en.wikipedia.org/wiki/Diffie%E2%80%93Hellman_key_exchange#Cryptographic_explanation)
// REQUIREMENTS: bn.js and jssha.js
// ASSUMPTIONS: Inputs to the functions are hexadecimal strings

// <summary>
// This class implements the Diffie-Hellman algorithm using BigIntegers.
// It can do the 3 main things:
// 1. Generate a random Private Key for you.
// 2. Generate your Public Key based on your Private Key.
// 3. Generate the Secret given their Public Key and your Private Key
// p and g are the shared constants for the algorithm, aka primeP and primeG.
// </summary>
var DiffieHellman = function () {
    function DiffieHellman() {
        _classCallCheck(this, DiffieHellman);

        if (typeof BN === 'undefined') {
            throw new Error('Big Number lib required');
        }

        if (typeof jsSHA === 'undefined') {
            throw new Error('jsSHA hash lib requried');
        }
    }

    // <summary>
    // Generates a random Private Key that you can use.
    // </summary>
    // <param name="p"></param>
    // <returns>Random Private Key</returns>


    _createClass(DiffieHellman, [{
        key: 'RandomPrivateKey',
        value: function RandomPrivateKey(maxValue) {
            var maxValueBN = new BN(maxValue);
            var shiftDistance = Math.floor(Math.random() * 1000 + 1);
            var randBitInt = maxValueBN.shrn(shiftDistance); // Right shift divides by a power of 2
            var min = new BN(2);

            if (randBitInt.cmp(min) == -1) {
                return min;
            }

            return randBitInt;
        }

        // <summary>
        // Calculates the Public Key from a Private Key.
        // </summary>
        // <param name="p"></param>
        // <param name="g"></param>
        // <param name="privateKey"></param>
        // <returns>Public Key (Hex)</returns>

    }, {
        key: 'PublicKey',
        value: function PublicKey(p, g, privateKey) {
            var aHex = new BN(privateKey, 16);
            var gHex = new BN(g, 16);
            var montPrime = BN.mont(new BN(p, 16));
            var gRed = gHex.toRed(montPrime);
            var secret = gRed.redPow(aHex).fromRed().toString(16);

            return secret;
        }

        // <summary>
        // Calculates the shared secret given their Public Key (A) and your Private Key (b)
        // </summary>
        // <param name="p"></param>
        // <param name="theirPublicKey"></param>
        // <param name="yourPrivateKey"></param>
        // <returns></returns>

    }, {
        key: 'Secret',
        value: function Secret(p, theirPublicKey, yourPrivateKey) {
            var bHex = new BN(theirPublicKey, 16);
            var AHex = new BN(yourPrivateKey, 16);
            var montPrime = BN.mont(new BN(p, 16));
            var BRed = bHex.toRed(montPrime);

            return BRed.redPow(AHex).fromRed().toString(16).toUpperCase();
        }
    }]);

    return DiffieHellman;
}();
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var KeyRollingHelper = function () {
    function KeyRollingHelper() {
        _classCallCheck(this, KeyRollingHelper);
    }

    _createClass(KeyRollingHelper, null, [{
        key: "PerformKeyRolling",
        value: function PerformKeyRolling(krRequest, currentSecrets) {
            var m = new Message(krRequest.Id, Events.KeyRollResponse, { "status": "confirmed" }, true);
            var newSecrets = new Secrets(Crypto.GenerateHash(currentSecrets.EncKey).toUpperCase(), Crypto.GenerateHash(currentSecrets.HmacKey).toUpperCase());
            return new KeyRollingResult(m, newSecrets);
        }
    }]);

    return KeyRollingHelper;
}();

var KeyRollingResult = function KeyRollingResult(keyRollingConfirmation, newSecrets) {
    _classCallCheck(this, KeyRollingResult);

    this.KeyRollingConfirmation = keyRollingConfirmation;
    this.NewSecrets = newSecrets;
};
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Logger = function () {
    function Logger(element) {
        _classCallCheck(this, Logger);

        this.buffer = [];
        this.element = element;
    }

    _createClass(Logger, [{
        key: 'Info',
        value: function Info() {
            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            this.buffer.push(args.join(' '));
            this._render();
        }
    }, {
        key: 'Debug',
        value: function Debug() {
            for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                args[_key2] = arguments[_key2];
            }

            this.buffer.push(args.join(' '));
            this._render();
        }
    }, {
        key: 'Warn',
        value: function Warn() {
            for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                args[_key3] = arguments[_key3];
            }

            this.buffer.push(args.join(' '));
            this._render();
        }
    }, {
        key: 'Error',
        value: function Error() {
            for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
                args[_key4] = arguments[_key4];
            }

            this.buffer.push(args.join(' '));
            this._render();
        }
    }, {
        key: 'Console',
        value: function Console() {
            for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
                args[_key5] = arguments[_key5];
            }

            console.log(args.join(' '));
        }
    }, {
        key: '_render',
        value: function _render() {
            this.element.innerText = this.buffer.join('\n');
            this.element.scrollTop = this.element.scrollHeight;
        }
    }, {
        key: 'Clear',
        value: function Clear() {
            this.buffer = [];
            this._render();
        }
    }]);

    return Logger;
}();
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// <summary>
// Events statically declares the various event names in messages.
// </summary>
var Events = {
    PairRequest: "pair_request",
    KeyRequest: "key_request",
    KeyResponse: "key_response",
    KeyCheck: "key_check",
    PairResponse: "pair_response",
    DropKeysAdvice: "drop_keys",

    LoginRequest: "login_request",
    LoginResponse: "login_response",

    Ping: "ping",
    Pong: "pong",

    PurchaseRequest: "purchase",
    PurchaseResponse: "purchase_response",
    CancelTransactionRequest: "cancel_transaction",
    GetLastTransactionRequest: "get_last_transaction",
    GetLastTransactionResponse: "last_transaction",
    RefundRequest: "refund",
    RefundResponse: "refund_response",
    SignatureRequired: "signature_required",
    SignatureDeclined: "signature_decline",
    SignatureAccepted: "signature_accept",
    AuthCodeRequired: "authorisation_code_required",
    AuthCodeAdvice: "authorisation_code_advice",

    CashoutOnlyRequest: "cash",
    CashoutOnlyResponse: "cash_response",

    MotoPurchaseRequest: "moto_purchase",
    MotoPurchaseResponse: "moto_purchase_response",

    SettleRequest: "settle",
    SettleResponse: "settle_response",
    SettlementEnquiryRequest: "settlement_enquiry",
    SettlementEnquiryResponse: "settlement_enquiry_response",

    KeyRollRequest: "request_use_next_keys",
    KeyRollResponse: "response_use_next_keys",

    Error: "error",

    InvalidHmacSignature: "_INVALID_SIGNATURE_",

    // Pay At Table Related Messages
    PayAtTableGetTableConfig: "get_table_config", // incoming. When eftpos wants to ask us for P@T configuration.
    PayAtTableSetTableConfig: "set_table_config", // outgoing. When we want to instruct eftpos with the P@T configuration.
    PayAtTableGetBillDetails: "get_bill_details", // incoming. When eftpos wants to aretrieve the bill for a table.
    PayAtTableBillDetails: "bill_details", // outgoing. We reply with this when eftpos requests to us get_bill_details.
    PayAtTableBillPayment: "bill_payment" // incoming. When the eftpos advices 
};

var SuccessState = {
    Unknown: 'Unknown', Success: 'Success', Failed: 'Failed'
};

// <summary>
// MessageStamp represents what is required to turn an outgoing Message into Json
// including encryption and date setting.
// </summary>

var MessageStamp = function MessageStamp(posId, secrets, serverTimeDelta) {
    _classCallCheck(this, MessageStamp);

    this.PosId = posId;
    this.Secrets = secrets;
    this.ServerTimeDelta = serverTimeDelta;
};

// <summary>
// MessageEnvelope represents the outer structure of any message that is exchanged
// between the Pos and the PinPad and vice-versa.
// See http://www.simplepaymentapi.com/#/api/message-encryption
// </summary>


var MessageEnvelope = function () {
    function MessageEnvelope(message, enc, hmac, posId) {
        _classCallCheck(this, MessageEnvelope);

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

    _createClass(MessageEnvelope, [{
        key: "toJSON",
        value: function toJSON() {
            return {
                message: this.Message,
                enc: this.Enc,
                hmac: this.Hmac,
                pos_id: this.PosId
            };
        }
    }]);

    return MessageEnvelope;
}();

// <summary>
// Message represents the contents of a Message.
// See http://www.simplepaymentapi.com/#/api/message-encryption
// </summary>


var Message = function () {
    function Message(id, eventName, data, needsEncryption) {
        _classCallCheck(this, Message);

        this.Id = id;
        this.EventName = eventName;
        this.Data = data;
        this.DateTimeStamp = '';
        this.PosId = ''; // Pos_id is set here only for outgoing Un-encrypted messages. 
        this.IncommingHmac = ''; // Sometimes the logic around the incoming message might need access to the sugnature, for example in the key_check.
        this._needsEncryption = needsEncryption; // Denotes whether an outgoing message needs to be encrypted in ToJson()
        this.DecryptedJson = ''; // Set on an incoming message just so you can have a look at what it looked like in its json form.
    }

    _createClass(Message, [{
        key: "GetSuccessState",
        value: function GetSuccessState() {
            if (!this.Data || typeof this.Data.success === "undefined") {
                return SuccessState.Unknown;
            }

            return this.Data.success ? SuccessState.Success : SuccessState.Failed;
        }
    }, {
        key: "GetError",
        value: function GetError() {
            return this.Data.error_reason ? this.Data.error_reason : null;
        }
    }, {
        key: "GetErrorDetail",
        value: function GetErrorDetail() {
            return this.Data.error_detail;
        }
    }, {
        key: "GetServerTimeDelta",
        value: function GetServerTimeDelta() {
            var now = Date.now();

            // Stamp format: 2018-04-19T01:42:38.279
            var dts = this.DateTimeStamp.split(/[\-\+\. :T]/);
            var msgTime = new Date(
            // year, month, date
            dts[0], dts[1] - 1, dts[2],
            // hour, minute, second, millis
            dts[3], dts[4], dts[5], dts[6]).getTime(); // Local time zone

            return msgTime - now;
        }

        // Helper method to parse bank date format 20042018 (ddMMyyyy)

    }, {
        key: "ToJson",
        value: function ToJson(stamp) {
            var now = Date.now();
            var tzoffset = new Date().getTimezoneOffset() * 60 * 1000;
            var adjustedTime = new Date(now - tzoffset + stamp.ServerTimeDelta);

            // Format date: "yyyy-MM-ddTHH:mm:ss.fff"
            this.DateTimeStamp = adjustedTime.toISOString().slice(0, -1);
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
                envelope.message.pos_id = this.PosId;
            }
            this.DecryptedJson = JSON.stringify(envelope);

            if (!this._needsEncryption) {
                return this.DecryptedJson;
            }

            var encMsg = Crypto.AesEncrypt(stamp.Secrets.EncKey, this.DecryptedJson);
            var hmacSig = Crypto.HmacSignature(stamp.Secrets.HmacKey, encMsg);
            var encrMessageEnvelope = { enc: encMsg, hmac: hmacSig.toUpperCase(), pos_id: stamp.PosId };

            return JSON.stringify(encrMessageEnvelope);
        }
    }], [{
        key: "ParseBankDate",
        value: function ParseBankDate(bankDate) {
            if (bankDate.length !== 8) return null;

            return new Date(bankDate.substr(4, 4) + "-" + bankDate.substr(2, 2) + "-" + bankDate.substr(0, 2));
        }

        // Parses a bank date & time str from "05Oct17" / "05:00" ("ddMMMyy/HH:mm") into date obj

    }, {
        key: "ParseBankDateTimeStr",
        value: function ParseBankDateTimeStr(date, time) {
            return new Date(date.substr(0, 2) + " " + date.substr(2, 3) + " " + date.substr(5, 2) + " " + time);
        }
    }, {
        key: "FromJson",
        value: function FromJson(msgJson, secrets) {
            var env = JSON.parse(msgJson);

            if (env.message != null) {
                var message = new Message(env.message.id, env.message.event, env.message.data, false);
                message.DecryptedJson = msgJson;
                return message;
            }

            if (secrets == null) {
                // This may happen if we somehow received an encrypted message from eftpos but we're not configered with secrets.
                // For example, if we cancel the pairing process a little late in the game and we get an encrypted key_check message after we've dropped the keys.
                return new Message("UNKNOWN", "NOSECRETS", null, false);
            }

            // Its encrypted, verify sig
            var sig = Crypto.HmacSignature(secrets.HmacKey, env.enc);
            if (sig.toUpperCase() != env.hmac) {
                return new Message("_", Events.InvalidHmacSignature, null, false);
            }

            var decryptedJson = Crypto.AesDecrypt(secrets.EncKey, env.enc);

            try {
                var decryptedMsg = JSON.parse(decryptedJson);

                var _message = new Message(decryptedMsg.message.id, decryptedMsg.message.event, decryptedMsg.message.data, true);

                _message.DateTimeStamp = decryptedMsg.message.datetime;
                _message.PosId = decryptedMsg.message.pos_id;
                _message.IncomingHmac = env.hmac;
                _message.DecryptedJson = decryptedJson;

                return _message;
            } catch (e) {
                return new Message("UNKNOWN", "UNPARSEABLE", { "msg": decryptedJson }, false);
            }
        }
    }]);

    return Message;
}();
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// <summary>
// Pairing Interaction 1: Outgoing
// </summary>
var PairRequest = function () {
    function PairRequest() {
        _classCallCheck(this, PairRequest);
    }

    _createClass(PairRequest, [{
        key: "ToMessage",
        value: function ToMessage() {
            var data = { padding: true };
            return new Message(RequestIdHelper.Id("pr"), Events.PairRequest, data, false);
        }
    }]);

    return PairRequest;
}();

// Pairing Interaction 2: Incoming


var KeyRequest = function KeyRequest(m) {
    _classCallCheck(this, KeyRequest);

    this.RequestId = m.Id;
    this.Aenc = m.Data.enc.A;
    this.Ahmac = m.Data.hmac.A;
};

// Pairing Interaction 3: Outgoing


var KeyResponse = function () {
    function KeyResponse(requestId, Benc, Bhmac) {
        _classCallCheck(this, KeyResponse);

        this.RequestId = requestId;
        this.Benc = Benc;
        this.Bhmac = Bhmac;
    }

    _createClass(KeyResponse, [{
        key: "ToMessage",
        value: function ToMessage() {
            var data = {
                enc: {
                    B: this.Benc
                },
                hmac: {
                    B: this.Bhmac
                }
            };

            return new Message(this.RequestId, Events.KeyResponse, data, false);
        }
    }]);

    return KeyResponse;
}();

// Pairing Interaction 4: Incoming


var KeyCheck = function KeyCheck(m) {
    _classCallCheck(this, KeyCheck);

    this.ConfirmationCode = m.IncomingHmac.substring(0, 6);
};

// Pairing Interaction 5: Incoming


var PairResponse = function PairResponse(m) {
    _classCallCheck(this, PairResponse);

    this.Success = m.Data.success;
};

// Holder class for Secrets and KeyResponse, so that we can use them together in method signatures.


var SecretsAndKeyResponse = function SecretsAndKeyResponse(secrets, keyResponse) {
    _classCallCheck(this, SecretsAndKeyResponse);

    this.Secrets = secrets;
    this.KeyResponse = keyResponse;
};

var DropKeysRequest = function () {
    function DropKeysRequest() {
        _classCallCheck(this, DropKeysRequest);
    }

    _createClass(DropKeysRequest, [{
        key: "ToMessage",
        value: function ToMessage() {
            return new Message(RequestIdHelper.Id("drpkys"), Events.DropKeysAdvice, null, true);
        }
    }]);

    return DropKeysRequest;
}();
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// This is the generator used for diffie-hellman in 2048-bit MODP Group 14 as per (https://tools.ietf.org/html/rfc3526#section-3)
var GENERATOR = 2;

// This is the prime used for diffie-hellman using 2048-bit MODP Group 14 as per (https://tools.ietf.org/html/rfc3526#section-3)
var GROUP14_2048_BIT_MODP = 'FFFFFFFFFFFFFFFFC90FDAA22168C234C4C6628B80DC1CD129024E088A67CC74020BBEA63B139B22514A08798E3404DDEF9519B3CD3A431B302B0A6DF25F14374FE1356D6D51C245E485B576625E7EC6F44C42E9A637ED6B0BFF5CB6F406B7EDEE386BFB5A899FA5AE9F24117C4B1FE649286651ECE45B3DC2007CB8A163BF0598DA48361C55D39A69163FA8FD24CF5F83655D23DCA3AD961C62F356208552BB9ED529077096966D670C354E4ABC9804F1746C08CA18217C32905E462E36CE3BE39E772C180E86039B2783A2EC07A28FB5C55DF06F4C52C9DE2BCBF6955817183995497CEA956AE515D2261898FA051015728E5A8AACAA68FFFFFFFFFFFFFFFF';

// <summary>
// This static class helps you with the pairing process as documented here:
// http://www.simplepaymentapi.com/#/api/pairing-process
// </summary>

var PairingHelper = function () {
    function PairingHelper() {
        _classCallCheck(this, PairingHelper);
    }

    _createClass(PairingHelper, [{
        key: 'GenerateSecretsAndKeyResponse',


        // <summary>
        // Calculates/Generates Secrets and KeyResponse given an incoming KeyRequest.
        // </summary>
        // <param name="keyRequest"></param>
        // <returns>Secrets and KeyResponse to send back.</returns>
        value: function GenerateSecretsAndKeyResponse(keyRequest) {
            var encPubAndSec = this._calculateMyPublicKeyAndSecret(keyRequest.Aenc);
            var Benc = encPubAndSec.MyPublicKey;
            var Senc = encPubAndSec.SharedSecretKey;

            var hmacPubAndSec = this._calculateMyPublicKeyAndSecret(keyRequest.Ahmac);
            var Bhmac = hmacPubAndSec.MyPublicKey;
            var Shmac = hmacPubAndSec.SharedSecretKey;

            var secrets = new Secrets(Senc, Shmac);
            var keyResponse = new KeyResponse(keyRequest.RequestId, Benc, Bhmac);

            return new SecretsAndKeyResponse(secrets, keyResponse);
        }

        // <summary>
        // Turns an incoming "A" value from the PinPad into the outgoing "B" value 
        // and the secret value using DiffieHelmman helper.
        // </summary>
        // <param name="theirPublicKey">The incoming A value</param>
        // <returns>Your B value and the Secret</returns>

    }, {
        key: '_calculateMyPublicKeyAndSecret',
        value: function _calculateMyPublicKeyAndSecret(theirPublicKey) {

            var diffieHellman = new DiffieHellman();
            var myPrivateBI = diffieHellman.RandomPrivateKey(GROUP14_2048_BIT_MODP);
            var myPublicBI = diffieHellman.PublicKey(GROUP14_2048_BIT_MODP, GENERATOR, myPrivateBI);
            var secretBI = diffieHellman.Secret(GROUP14_2048_BIT_MODP, theirPublicKey, myPrivateBI);

            var secret = this.DHSecretToSPISecret(secretBI);

            return new PublicKeyAndSecret(myPublicBI, secret);
        }

        // <summary>
        // Converts the DH secret BigInteger into the hex-string to be used as the secret.
        // There are some "gotchyas" here which is why this piece of work is abstracted so it can be tested separately.
        // See: http://www.simplepaymentapi.com/#/api/pairing-process
        // </summary>
        // <param name="secretBI">Secret as BigInteger</param>
        // <returns>Secret as Hex-String</returns>

    }, {
        key: 'DHSecretToSPISecret',
        value: function DHSecretToSPISecret(secret) {
            // If the calculated hexadecimal secret doesn't have an even number of characters, we add an extra 0 to the start. This allows SHA-256 to operate on the hexadecimal secret as if it were a hexadecimal representation of a string.
            if (secret.length % 2 === 1) {
                secret = '0' + secret;
            }

            secret = secret.padStart(512, '0');

            // We sha256 that byte array and return the hex string result
            return Crypto.GenerateHash(secret);
        }
    }], [{
        key: 'NewPairRequest',

        // <summary>
        // Generates a pairing Request.
        // </summary>
        // <returns>New PairRequest</returns>
        value: function NewPairRequest() {
            return new PairRequest();
        }
    }]);

    return PairingHelper;
}();

// <summary>
// Internal Holder class for Public and Secret, so that we can use them together in method signatures. 
// </summary>


var PublicKeyAndSecret = function PublicKeyAndSecret(myPublicKey, sharedSecretKey) {
    _classCallCheck(this, PublicKeyAndSecret);

    this.MyPublicKey = myPublicKey;
    this.SharedSecretKey = sharedSecretKey;
};
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// <summary>
// This class represents the BillDetails that the POS will be asked for throughout a PayAtTable flow.
// </summary>
var BillStatusResponse = function () {
    function BillStatusResponse() {
        _classCallCheck(this, BillStatusResponse);

        // <summary>
        // Set this Error accordingly if you are not able to return the BillDetails that were asked from you.
        // </summary>
        this.Result = null;

        // <summary>
        // This is a unique identifier that you assign to each bill.
        // It migt be for example, the timestamp of when the cover was opened.
        // </summary>
        this.BillId = null;

        // <summary>
        // This is the table id that this bill was for.
        // The waiter will enter it on the Eftpos at the start of the PayAtTable flow and the Eftpos will 
        // retrieve the bill using the table id. 
        // </summary>
        this.TableId = null;

        // <summary>
        // The Total Amount on this bill, in cents.
        // </summary>
        this.TotalAmount = 0;

        // <summary>
        // The currently outsanding amount on this bill, in cents.
        // </summary>
        this.OutstandingAmount = 0;

        // <summary>
        // Your POS is required to persist some state on behalf of the Eftpos so the Eftpos can recover state.
        // It is just a piece of string that you save against your billId.
        // WHenever you're asked for BillDetails, make sure you return this piece of data if you have it.
        // </summary>
        this.BillData = "";
    }

    _createClass(BillStatusResponse, [{
        key: "getBillPaymentHistory",
        value: function getBillPaymentHistory() {
            if (!this.BillData) {
                return [];
            }

            return JSON.parse(this.BillData);
        }
    }, {
        key: "ToMessage",
        value: function ToMessage(messageId) {
            var data = {
                "success": this.Result == BillRetrievalResult.SUCCESS
            };

            if (BillId) data.bill_id = BillId;
            if (TableId) data.table_id = TableId;

            if (this.Result == BillRetrievalResult.SUCCESS) {
                data.bill_total_amount = this.TotalAmount;
                data.bill_outstanding_amount = this.OutstandingAmount;
                data.bill_payment_history = this.getBillPaymentHistory();
            } else {
                data.error_reason = this.Result.toString();
                data.error_detail = this.Result.toString();
            }

            return new Message(messageId, Events.PayAtTableBillDetails, data, true);
        }
    }], [{
        key: "ToBillData",
        value: function ToBillData(ph) {
            if (ph.length < 1) {
                return "";
            }

            return JSON.serialize(ph);
        }
    }]);

    return BillStatusResponse;
}();

var BillRetrievalResult = {
    SUCCESS: 'SUCCESS',
    INVALID_TABLE_ID: 'INVALID_TABLE_ID',
    INVALID_BILL_ID: 'INVALID_BILL_ID',
    INVALID_OPERATOR_ID: 'INVALID_OPERATOR_ID'
};

var PaymentType = {
    CARD: 'CARD',
    CASH: 'CASH'
};

var BillPayment = function BillPayment(m) {
    _classCallCheck(this, BillPayment);

    this._incomingAdvice = m;
    this.BillId = this._incomingAdvice["bill_id"];
    this.TableId = this._incomingAdvice["table_id"];
    this.OperatorId = this._incomingAdvice["operator_id"];

    var pt = this._incomingAdvice["payment_type"];
    this.PaymentType = pt;

    // this is when we ply the sub object "payment_details" into a purchase response for convenience.
    var purchaseMsg = new Message(m.Id, "payment_details", m.Data["payment_details"], false);
    this.PurchaseResponse = new PurchaseResponse(purchaseMsg);

    this.PurchaseAmount = this.PurchaseResponse.GetPurchaseAmount();
    this.TipAmount = this.PurchaseResponse.GetTipAmount();
};

var PaymentHistoryEntry = function () {
    function PaymentHistoryEntry(paymentType, paymentSummary) {
        _classCallCheck(this, PaymentHistoryEntry);

        this.PaymentType = paymentType;
        this.PaymentSummary = paymentSummary;
    }

    _createClass(PaymentHistoryEntry, [{
        key: "toJSON",
        value: function toJSON() {
            return {
                payment_type: this.PaymentType,
                payment_summary: this.PaymentSummary
            };
        }
    }, {
        key: "GetTerminalRefId",
        value: function GetTerminalRefId() {
            return this.PaymentSummary["terminal_ref_id"];
        }
    }]);

    return PaymentHistoryEntry;
}();

var PayAtTableConfig = function () {
    function PayAtTableConfig() {
        _classCallCheck(this, PayAtTableConfig);

        this.OperatorIdEnabled = false;
        this.SplitByAmountEnabled = false;
        this.EqualSplitEnabled = false;

        this.TippingEnabled = false;

        this.SummaryReportEnabled = false;

        this.LabelPayButton = '';
        this.LabelOperatorId = '';
        this.LabelTableId = '';

        // 
        // <summary>
        // Fill in with operator ids that the eftpos terminal will validate against. 
        // Leave Empty to allow any operator_id through. 
        // </summary>
        this.AllowedOperatorIds = [];
    }

    _createClass(PayAtTableConfig, [{
        key: "ToMessage",
        value: function ToMessage(messageId) {
            var data = {
                "pay_at_table_enabled": true,
                "operator_id_enabled": this.OperatorIdEnabled,
                "split_by_amount_enabled": this.SplitByAmountEnabled,
                "equal_split_enabled": this.EqualSplitEnabled,
                "tipping_enabled": this.TippingEnabled,
                "summary_report_enabled": this.SummaryReportEnabled,
                "pay_button_label": this.LabelPayButton,
                "operator_id_label": this.LabelOperatorId,
                "table_id_label": this.LabelTableId,
                "operator_id_list": this.AllowedOperatorIds
            };

            return new Message(messageId, Events.PayAtTableSetTableConfig, data, true);
        }
    }], [{
        key: "FeatureDisableMessage",
        value: function FeatureDisableMessage(messageId) {
            var data = {
                "pay_at_table_enabled": false
            };
            return new Message(messageId, Events.PayAtTableSetTableConfig, data, true);
        }
    }]);

    return PayAtTableConfig;
}();
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PongHelper = function () {
    function PongHelper() {
        _classCallCheck(this, PongHelper);
    }

    _createClass(PongHelper, null, [{
        key: "GeneratePongRessponse",
        value: function GeneratePongRessponse(ping) {
            return new Message(ping.Id, Events.Pong, null, true);
        }
    }]);

    return PongHelper;
}();

var PingHelper = function () {
    function PingHelper() {
        _classCallCheck(this, PingHelper);
    }

    _createClass(PingHelper, null, [{
        key: "GeneratePingRequest",
        value: function GeneratePingRequest() {
            return new Message(RequestIdHelper.Id("ping"), Events.Ping, null, true);
        }
    }]);

    return PingHelper;
}();
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PreauthEvents = {
    AccountVerifyRequest: "account_verify",
    AccountVerifyResponse: "account_verify_response",

    PreauthOpenRequest: "preauth",
    PreauthOpenResponse: "preauth_response",

    PreauthTopupRequest: "preauth_topup",
    PreauthTopupResponse: "preauth_topup_response",

    PreauthExtendRequest: "preauth_extend",
    PreauthExtendResponse: "preauth_extend_response",

    PreauthPartialCancellationRequest: "preauth_partial_cancellation",
    PreauthPartialCancellationResponse: "preauth_partial_cancellation_response",

    PreauthCancellationRequest: "preauth_cancellation",
    PreauthCancellationResponse: "preauth_cancellation_response",

    PreauthCompleteRequest: "completion",
    PreauthCompleteResponse: "completion_response"
};

var AccountVerifyRequest = function () {
    function AccountVerifyRequest(posRefId) {
        _classCallCheck(this, AccountVerifyRequest);

        this.PosRefId = posRefId;
    }

    _createClass(AccountVerifyRequest, [{
        key: "ToMessage",
        value: function ToMessage() {
            var data = {
                "pos_ref_id": this.PosRefId
            };

            return new Message(RequestIdHelper.Id("prav"), PreauthEvents.AccountVerifyRequest, data, true);
        }
    }]);

    return AccountVerifyRequest;
}();

var AccountVerifyResponse = function AccountVerifyResponse(m) {
    _classCallCheck(this, AccountVerifyResponse);

    this.Details = new PurchaseResponse(m);
    this.PosRefId = this.Details.PosRefId;
    this._m = m;
};

var PreauthOpenRequest = function () {
    function PreauthOpenRequest(amountCents, posRefId) {
        _classCallCheck(this, PreauthOpenRequest);

        this.PosRefId = posRefId;
        this.PreauthAmount = amountCents;
    }

    _createClass(PreauthOpenRequest, [{
        key: "ToMessage",
        value: function ToMessage() {
            var data = {
                "pos_ref_id": this.PosRefId,
                "preauth_amount": this.PreauthAmount
            };

            return new Message(RequestIdHelper.Id("prac"), PreauthEvents.PreauthOpenRequest, data, true);
        }
    }]);

    return PreauthOpenRequest;
}();

var PreauthTopupRequest = function () {
    function PreauthTopupRequest(preauthId, topupAmountCents, posRefId) {
        _classCallCheck(this, PreauthTopupRequest);

        this.PreauthId = preauthId;
        this.TopupAmount = topupAmountCents;
        this.PosRefId = posRefId;
    }

    _createClass(PreauthTopupRequest, [{
        key: "ToMessage",
        value: function ToMessage() {
            var data = {
                "pos_ref_id": this.PosRefId,
                "preauth_id": this.PreauthId,
                "topup_amount": this.TopupAmount
            };

            return new Message(RequestIdHelper.Id("prtu"), PreauthEvents.PreauthTopupRequest, data, true);
        }
    }]);

    return PreauthTopupRequest;
}();

var PreauthPartialCancellationRequest = function () {
    function PreauthPartialCancellationRequest(preauthId, partialCancellationAmountCents, posRefId) {
        _classCallCheck(this, PreauthPartialCancellationRequest);

        this.PreauthId = preauthId;
        this.PartialCancellationAmount = partialCancellationAmountCents;
        this.PosRefId = posRefId;
    }

    _createClass(PreauthPartialCancellationRequest, [{
        key: "ToMessage",
        value: function ToMessage() {
            var data = {
                "pos_ref_id": this.PosRefId,
                "preauth_id": this.PreauthId,
                "preauth_cancel_amount": this.PartialCancellationAmount
            };

            return new Message(RequestIdHelper.Id("prpc"), PreauthEvents.PreauthPartialCancellationRequest, data, true);
        }
    }]);

    return PreauthPartialCancellationRequest;
}();

var PreauthExtendRequest = function () {
    function PreauthExtendRequest(preauthId, posRefId) {
        _classCallCheck(this, PreauthExtendRequest);

        this.PreauthId = preauthId;
        this.PosRefId = posRefId;
    }

    _createClass(PreauthExtendRequest, [{
        key: "ToMessage",
        value: function ToMessage() {
            var data = {
                "pos_ref_id": this.PosRefId,
                "preauth_id": this.PreauthId
            };

            return new Message(RequestIdHelper.Id("prext"), PreauthEvents.PreauthExtendRequest, data, true);
        }
    }]);

    return PreauthExtendRequest;
}();

var PreauthCancelRequest = function () {
    function PreauthCancelRequest(preauthId, posRefId) {
        _classCallCheck(this, PreauthCancelRequest);

        this.PreauthId = preauthId;
        this.PosRefId = posRefId;
    }

    _createClass(PreauthCancelRequest, [{
        key: "ToMessage",
        value: function ToMessage() {
            var data = {
                "pos_ref_id": this.PosRefId,
                "preauth_id": this.PreauthId
            };

            return new Message(RequestIdHelper.Id("prac"), PreauthEvents.PreauthCancellationRequest, data, true);
        }
    }]);

    return PreauthCancelRequest;
}();

var PreauthCompletionRequest = function () {
    function PreauthCompletionRequest(preauthId, completionAmountCents, posRefId) {
        _classCallCheck(this, PreauthCompletionRequest);

        this.PreauthId = preauthId;
        this.CompletionAmount = completionAmountCents;
        this.PosRefId = posRefId;
    }

    _createClass(PreauthCompletionRequest, [{
        key: "ToMessage",
        value: function ToMessage() {
            var data = {
                "pos_ref_id": this.PosRefId,
                "preauth_id": this.PreauthId,
                "completion_amount": this.CompletionAmount
            };

            return new Message(RequestIdHelper.Id("prac"), PreauthEvents.PreauthCompleteRequest, data, true);
        }
    }]);

    return PreauthCompletionRequest;
}();

var PreauthResponse = function () {
    function PreauthResponse(m) {
        _classCallCheck(this, PreauthResponse);

        this.PreauthId = m.Data["preauth_id"];
        this.Details = new PurchaseResponse(m);
        this.PosRefId = this.Details.PosRefId;
        this._m = m;
    }

    _createClass(PreauthResponse, [{
        key: "GetBalanceAmount",
        value: function GetBalanceAmount() {
            var txType = this._m.Data["transaction_type"];
            switch (txType) {
                case "PRE-AUTH":
                    return this._m.Data["preauth_amount"];
                case "TOPUP":
                    return this._m.Data["balance_amount"];
                case "CANCEL":
                    // PARTIAL CANCELLATION
                    return this._m.Data["balance_amount"];
                case "PRE-AUTH EXT":
                    return this._m.Data["balance_amount"];
                case "PCOMP":
                    return 0; // Balance is 0 after completion
                case "PRE-AUTH CANCEL":
                    return 0; // Balance is 0 after cancellation
                default:
                    return 0;
            }
        }
    }, {
        key: "GetPreviousBalanceAmount",
        value: function GetPreviousBalanceAmount() {
            var txType = this._m.Data["transaction_type"];
            switch (txType) {
                case "PRE-AUTH":
                    return 0;
                case "TOPUP":
                    return this._m.Data["existing_preauth_amount"];
                case "CANCEL":
                    // PARTIAL CANCELLATION
                    return this._m.Data["existing_preauth_amount"];
                case "PRE-AUTH EXT":
                    return this._m.Data["existing_preauth_amount"];
                case "PCOMP":
                    // THIS IS TECHNICALLY NOT CORRECT WHEN COMPLETION HAPPENS FOR A PARTIAL AMOUNT.
                    // BUT UNFORTUNATELY, THIS RESPONSE DOES NOT CONTAIN "existing_preauth_amount".
                    // SO "completion_amount" IS THE CLOSEST WE HAVE.
                    return this._m.Data["completion_amount"];
                case "PRE-AUTH CANCEL":
                    return this._m.Data["preauth_amount"];
                default:
                    return 0;
            }
        }
    }, {
        key: "GetCompletionAmount",
        value: function GetCompletionAmount() {
            var txType = this._m.Data["transaction_type"];
            switch (txType) {
                case "PCOMP":
                    return this._m.Data["completion_amount"];
                    break;
                default:
                    return 0;
            }
        }
    }]);

    return PreauthResponse;
}();
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * This class is a mock printer for the terminal to print Receipts
 */
var Printer = function () {
    function Printer(element) {
        _classCallCheck(this, Printer);

        this.buffer = [];
        this.element = element;
    }

    _createClass(Printer, [{
        key: 'print',
        value: function print() {
            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            this.buffer.push(args.join(' '));
            this._render();
        }
    }, {
        key: '_render',
        value: function _render() {
            this.element.innerText = this.buffer.join('\n\n \\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/ \n\n');
            this.element.scrollTop = this.element.scrollHeight;
        }
    }, {
        key: 'Clear',
        value: function Clear() {
            this.buffer = [];
            this._render();
        }
    }]);

    return Printer;
}();
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PurchaseRequest = function () {
    function PurchaseRequest(amountCents, posRefId) {
        _classCallCheck(this, PurchaseRequest);

        this.PosRefId = posRefId;
        this.PurchaseAmount = amountCents;
        this.TipAmount = 0;
        this.CashoutAmount = 0;
        this.PromptForCashout = false;
        this.Config = new SpiConfig();

        // Library Backwards Compatibility
        this.Id = posRefId;
        this.AmountCents = amountCents;
    }

    _createClass(PurchaseRequest, [{
        key: "AmountSummary",
        value: function AmountSummary() {
            return "Purchase: " + (this.PurchaseAmount / 100.0).toFixed(2) + "; \n            Tip: " + (this.TipAmount / 100.0).toFixed(2) + "; \n            Cashout: " + (this.CashoutAmount / 100.0).toFixed(2) + ";";
        }
    }, {
        key: "ToMessage",
        value: function ToMessage() {
            var data = {
                pos_ref_id: this.PosRefId,
                purchase_amount: this.PurchaseAmount,
                tip_amount: this.TipAmount,
                cash_amount: this.CashoutAmount,
                prompt_for_cashout: this.PromptForCashout
            };

            this.Config.addReceiptConfig(data);
            return new Message(RequestIdHelper.Id("prchs"), Events.PurchaseRequest, data, true);
        }
    }]);

    return PurchaseRequest;
}();

var PurchaseResponse = function () {
    function PurchaseResponse(m) {
        _classCallCheck(this, PurchaseResponse);

        this._m = m;
        this.RequestId = m.Id;
        this.PosRefId = m.Data.pos_ref_id;
        this.SchemeName = m.Data.scheme_name;
        this.SchemeAppName = m.Data.scheme_name;
        this.Success = m.GetSuccessState() == SuccessState.Success;
    }

    _createClass(PurchaseResponse, [{
        key: "GetRRN",
        value: function GetRRN() {
            return this._m.Data.rrn;
        }
    }, {
        key: "GetPurchaseAmount",
        value: function GetPurchaseAmount() {
            return this._m.Data.purchase_amount;
        }
    }, {
        key: "GetTipAmount",
        value: function GetTipAmount() {
            return this._m.Data.tip_amount;
        }
    }, {
        key: "GetCashoutAmount",
        value: function GetCashoutAmount() {
            return this._m.Data.cash_amount;
        }
    }, {
        key: "GetBankNonCashAmount",
        value: function GetBankNonCashAmount() {
            return this._m.Data.bank_noncash_amount;
        }
    }, {
        key: "GetBankCashAmount",
        value: function GetBankCashAmount() {
            return this._m.Data.bank_cash_amount;
        }
    }, {
        key: "GetCustomerReceipt",
        value: function GetCustomerReceipt() {
            return this._m.Data.customer_receipt || "";
        }
    }, {
        key: "GetMerchantReceipt",
        value: function GetMerchantReceipt() {
            return this._m.Data.merchant_receipt || "";
        }
    }, {
        key: "GetResponseText",
        value: function GetResponseText() {
            return this._m.Data.host_response_text || "";
        }
    }, {
        key: "GetResponseCode",
        value: function GetResponseCode() {
            return this._m.Data.host_response_code;
        }
    }, {
        key: "GetTerminalReferenceId",
        value: function GetTerminalReferenceId() {
            return this._m.Data.terminal_ref_id;
        }
    }, {
        key: "GetCardEntry",
        value: function GetCardEntry() {
            return this._m.Data.card_entry;
        }
    }, {
        key: "GetAccountType",
        value: function GetAccountType() {
            return this._m.Data.account_type;
        }
    }, {
        key: "GetAuthCode",
        value: function GetAuthCode() {
            return this._m.Data.auth_code;
        }
    }, {
        key: "GetBankDate",
        value: function GetBankDate() {
            return this._m.Data.bank_date;
        }
    }, {
        key: "GetBankTime",
        value: function GetBankTime() {
            return this._m.Data.bank_time;
        }
    }, {
        key: "GetMaskedPan",
        value: function GetMaskedPan() {
            return this._m.Data.masked_pan;
        }
    }, {
        key: "GetTerminalId",
        value: function GetTerminalId() {
            return this._m.Data.terminal_id;
        }
    }, {
        key: "WasMerchantReceiptPrinted",
        value: function WasMerchantReceiptPrinted() {
            return this._m.Data.merchant_receipt_printed;
        }
    }, {
        key: "WasCustomerReceiptPrinted",
        value: function WasCustomerReceiptPrinted() {
            return this._m.Data.customer_receipt_printed;
        }
    }, {
        key: "GetSettlementDate",
        value: function GetSettlementDate() {
            //"bank_settlement_date":"20042018"
            var dateStr = this._m.Data.bank_settlement_date;
            if (!dateStr) return null;
            return Message.ParseBankDate(dateStr);
        }
    }, {
        key: "GetResponseValue",
        value: function GetResponseValue(attribute) {
            return this._m.Data[attribute];
        }
    }, {
        key: "ToPaymentSummary",
        value: function ToPaymentSummary() {
            return {
                account_type: this.GetAccountType(),
                auth_code: this.GetAuthCode(),
                bank_date: this.GetBankDate(),
                bank_time: this.GetBankTime(),
                host_response_code: this.GetResponseCode(),
                host_response_text: this.GetResponseText(),
                masked_pan: this.GetMaskedPan(),
                purchase_amount: this.GetPurchaseAmount(),
                rrn: this.GetRRN(),
                scheme_name: this.SchemeName,
                terminal_id: this.GetTerminalId(),
                terminal_ref_id: this.GetTerminalReferenceId(),
                tip_amount: this.GetTipAmount()
            };
        }
    }]);

    return PurchaseResponse;
}();

var CancelTransactionRequest = function () {
    function CancelTransactionRequest() {
        _classCallCheck(this, CancelTransactionRequest);
    }

    _createClass(CancelTransactionRequest, [{
        key: "ToMessage",
        value: function ToMessage() {
            return new Message(RequestIdHelper.Id("ctx"), Events.CancelTransactionRequest, null, true);
        }
    }]);

    return CancelTransactionRequest;
}();

var GetLastTransactionRequest = function () {
    function GetLastTransactionRequest() {
        _classCallCheck(this, GetLastTransactionRequest);
    }

    _createClass(GetLastTransactionRequest, [{
        key: "ToMessage",
        value: function ToMessage() {
            return new Message(RequestIdHelper.Id("glt"), Events.GetLastTransactionRequest, null, true);
        }
    }]);

    return GetLastTransactionRequest;
}();

var GetLastTransactionResponse = function () {
    function GetLastTransactionResponse(m) {
        _classCallCheck(this, GetLastTransactionResponse);

        this._m = m;
    }

    _createClass(GetLastTransactionResponse, [{
        key: "WasRetrievedSuccessfully",
        value: function WasRetrievedSuccessfully() {
            // We can't rely on checking "success" flag or "error" fields here,
            // as retrieval may be successful, but the retrieved transaction was a fail.
            // So we check if we got back an RRN.
            return !!this.GetRRN();
        }
    }, {
        key: "WasOperationInProgressError",
        value: function WasOperationInProgressError() {
            return this._m.GetError() == "OPERATION_IN_PROGRESS";
        }
    }, {
        key: "IsWaitingForSignatureResponse",
        value: function IsWaitingForSignatureResponse() {
            return this._m.GetError().startsWith("OPERATION_IN_PROGRESS_AWAITING_SIGNATURE");
        }
    }, {
        key: "IsWaitingForAuthCode",
        value: function IsWaitingForAuthCode() {
            return this._m.GetError().startsWith("OPERATION_IN_PROGRESS_AWAITING_PHONE_AUTH_CODE");
        }
    }, {
        key: "IsStillInProgress",
        value: function IsStillInProgress(posRefId) {
            return this.WasOperationInProgressError() && this.GetPosRefId() == posRefId;
        }
    }, {
        key: "GetSuccessState",
        value: function GetSuccessState() {
            return this._m.GetSuccessState();
        }
    }, {
        key: "WasSuccessfulTx",
        value: function WasSuccessfulTx() {
            return this._m.GetSuccessState() == SuccessState.Success;
        }
    }, {
        key: "GetTxType",
        value: function GetTxType() {
            return this._m.Data.transaction_type;
        }
    }, {
        key: "GetPosRefId",
        value: function GetPosRefId() {
            return this._m.Data.pos_ref_id;
        }
    }, {
        key: "GetSchemeApp",
        value: function GetSchemeApp() {
            return this._m.Data.scheme_name;
        }
    }, {
        key: "GetSchemeName",
        value: function GetSchemeName() {
            return this._m.Data.scheme_name;
        }
    }, {
        key: "GetAmount",
        value: function GetAmount() {
            return this._m.Data.amount_purchase;
        }
    }, {
        key: "GetTransactionAmount",
        value: function GetTransactionAmount() {
            return this._m.Data.amount_transaction_type;
        }
    }, {
        key: "GetBankDateTimeString",
        value: function GetBankDateTimeString() {
            var ds = this._m.Data.bank_date + this._m.Data.bank_time;
            return ds;
        }
    }, {
        key: "GetRRN",
        value: function GetRRN() {
            return this._m.Data.rrn;
        }
    }, {
        key: "GetResponseText",
        value: function GetResponseText() {
            return this._m.Data.host_response_text | "";
        }
    }, {
        key: "GetResponseCode",
        value: function GetResponseCode() {
            return this._m.Data.host_response_code;
        }

        // <summary>
        // There is a bug, VSV-920, whereby the customer_receipt is missing from a glt response.
        // The current recommendation is to use the merchant receipt in place of it if required.
        // This method modifies the underlying incoming message data by copying
        // the merchant receipt into the customer receipt only if there 
        // is a merchant_receipt and there is not a customer_receipt.   
        // </summary>

    }, {
        key: "CopyMerchantReceiptToCustomerReceipt",
        value: function CopyMerchantReceiptToCustomerReceipt() {
            var cr = this._m.Data.customer_receipt;
            var mr = this._m.Data.merchant_receipt;
            if (mr != "" && !cr) {
                this._m.Data.customer_receipt = mr;
            }
        }
    }]);

    return GetLastTransactionResponse;
}();

var RefundRequest = function () {
    function RefundRequest(amountCents, posRefId) {
        _classCallCheck(this, RefundRequest);

        this.AmountCents = amountCents;
        this.Id = RequestIdHelper.Id("refund");
        this.PosRefId = posRefId;
        this.Config = new SpiConfig();
    }

    _createClass(RefundRequest, [{
        key: "ToMessage",
        value: function ToMessage() {
            var data = { refund_amount: this.AmountCents, pos_ref_id: this.PosRefId };
            this.Config.addReceiptConfig(data);
            return new Message(RequestIdHelper.Id("refund"), Events.RefundRequest, data, true);
        }
    }]);

    return RefundRequest;
}();

var RefundResponse = function () {
    function RefundResponse(m) {
        _classCallCheck(this, RefundResponse);

        this._m = m;
        this.RequestId = m.Id;
        this.PosRefId = m.Data.pos_ref_id;
        this.SchemeName = m.Data.scheme_name;
        this.SchemeAppName = m.Data.scheme_name;
        this.Success = m.GetSuccessState() == SuccessState.Success;
    }

    _createClass(RefundResponse, [{
        key: "GetRefundAmount",
        value: function GetRefundAmount() {
            return this._m.Data.refund_amount;
        }
    }, {
        key: "GetRRN",
        value: function GetRRN() {
            return this._m.Data.rrn;
        }
    }, {
        key: "GetCustomerReceipt",
        value: function GetCustomerReceipt() {
            return this._m.Data.customer_receipt || "";
        }
    }, {
        key: "GetMerchantReceipt",
        value: function GetMerchantReceipt() {
            return this._m.Data.merchant_receipt;
        }
    }, {
        key: "GetResponseText",
        value: function GetResponseText() {
            return this._m.Data.host_response_text || "";
        }
    }, {
        key: "GetResponseCode",
        value: function GetResponseCode() {
            return this._m.Data.host_response_code || "";
        }
    }, {
        key: "GetTerminalReferenceId",
        value: function GetTerminalReferenceId() {
            return this._m.Data.terminal_ref_id || "";
        }
    }, {
        key: "GetCardEntry",
        value: function GetCardEntry() {
            return this._m.Data.card_entry || "";
        }
    }, {
        key: "GetAccountType",
        value: function GetAccountType() {
            return this._m.Data.account_type || "";
        }
    }, {
        key: "GetAuthCode",
        value: function GetAuthCode() {
            return this._m.Data.auth_code || "";
        }
    }, {
        key: "GetBankDate",
        value: function GetBankDate() {
            return this._m.Data.bank_date || "";
        }
    }, {
        key: "GetBankTime",
        value: function GetBankTime() {
            return this._m.Data.bank_time || "";
        }
    }, {
        key: "GetMaskedPan",
        value: function GetMaskedPan() {
            return this._m.Data.masked_pan || "";
        }
    }, {
        key: "GetTerminalId",
        value: function GetTerminalId() {
            return this._m.Data.terminal_id || "";
        }
    }, {
        key: "WasMerchantReceiptPrinted",
        value: function WasMerchantReceiptPrinted() {
            return this._m.Data.merchant_receipt_printed;
        }
    }, {
        key: "WasCustomerReceiptPrinted",
        value: function WasCustomerReceiptPrinted() {
            return this._m.Data.customer_receipt_printed;
        }
    }, {
        key: "GetSettlementDate",
        value: function GetSettlementDate() {
            //"bank_settlement_date":"20042018"
            var dateStr = this._m.Data.bank_settlement_date;
            if (!dateStr) return null;
            return Message.ParseBankDate(dateStr);
        }
    }, {
        key: "GetResponseValue",
        value: function GetResponseValue(attribute) {
            return this._m.Data[attribute];
        }
    }]);

    return RefundResponse;
}();

var SignatureRequired = function () {
    function SignatureRequired(m) {
        _classCallCheck(this, SignatureRequired);

        this.RequestId = m.Id;
        this.PosRefId = m.Data.pos_ref_id;
        this._receiptToSign = m.Data.merchant_receipt;
    }

    _createClass(SignatureRequired, [{
        key: "SignatureRequired",
        value: function SignatureRequired(posRefId, requestId, receiptToSign) {
            this.RequestId = requestId;
            this.PosRefId = posRefId;
            this._receiptToSign = receiptToSign;
        }
    }, {
        key: "GetMerchantReceipt",
        value: function GetMerchantReceipt() {
            return this._receiptToSign;
        }
    }]);

    return SignatureRequired;
}();

var SignatureDecline = function () {
    function SignatureDecline(posRefId) {
        _classCallCheck(this, SignatureDecline);

        this.PosRefId = posRefId;
    }

    _createClass(SignatureDecline, [{
        key: "ToMessage",
        value: function ToMessage() {
            var data = {
                pos_ref_id: this.PosRefId
            };
            return new Message(RequestIdHelper.Id("sigdec"), Events.SignatureDeclined, data, true);
        }
    }]);

    return SignatureDecline;
}();

var SignatureAccept = function () {
    function SignatureAccept(posRefId) {
        _classCallCheck(this, SignatureAccept);

        this.PosRefId = posRefId;
    }

    _createClass(SignatureAccept, [{
        key: "ToMessage",
        value: function ToMessage() {
            var data = {
                pos_ref_id: this.PosRefId
            };
            return new Message(RequestIdHelper.Id("sigacc"), Events.SignatureAccepted, data, true);
        }
    }]);

    return SignatureAccept;
}();

var MotoPurchaseRequest = function () {
    function MotoPurchaseRequest(amountCents, posRefId) {
        _classCallCheck(this, MotoPurchaseRequest);

        this.PosRefId = posRefId;
        this.PurchaseAmount = amountCents;
        this.Config = new SpiConfig();
    }

    _createClass(MotoPurchaseRequest, [{
        key: "ToMessage",
        value: function ToMessage() {
            var data = {
                pos_ref_id: this.PosRefId,
                purchase_amount: this.PurchaseAmount
            };
            this.Config.addReceiptConfig(data);
            return new Message(RequestIdHelper.Id("moto"), Events.MotoPurchaseRequest, data, true);
        }
    }]);

    return MotoPurchaseRequest;
}();

var MotoPurchaseResponse = function MotoPurchaseResponse(m) {
    _classCallCheck(this, MotoPurchaseResponse);

    this.PurchaseResponse = new PurchaseResponse(m);
    this.PosRefId = PurchaseResponse.PosRefId;
};

var PhoneForAuthRequired = function () {
    function PhoneForAuthRequired() {
        _classCallCheck(this, PhoneForAuthRequired);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        if (args.length === 4) {
            this.PosRefId = args[0];
            this.RequestId = args[1];
            this._phoneNumber = args[2];
            this._merchantId = args[3];
        } else if (args.length === 1) {
            this.RequestId = args[0].Id;
            this.PosRefId = args[0].Data.pos_ref_id;
            this._phoneNumber = args[0].Data.auth_centre_phone_number;
            this._merchantId = args[0].Data.merchant_id;
        } else {
            throw new Error('Invalid call sig for Phone auth required class');
        }
    }

    _createClass(PhoneForAuthRequired, [{
        key: "GetPhoneNumber",
        value: function GetPhoneNumber() {
            return this._phoneNumber;
        }
    }, {
        key: "GetMerchantId",
        value: function GetMerchantId() {
            return this._merchantId;
        }
    }]);

    return PhoneForAuthRequired;
}();

var AuthCodeAdvice = function () {
    function AuthCodeAdvice(posRefId, authCode) {
        _classCallCheck(this, AuthCodeAdvice);

        this.PosRefId = posRefId;
        this.AuthCode = authCode;
    }

    _createClass(AuthCodeAdvice, [{
        key: "ToMessage",
        value: function ToMessage() {
            var data = {
                pos_ref_id: this.PosRefId,
                auth_code: this.AuthCode
            };
            return new Message(RequestIdHelper.Id("authad"), Events.AuthCodeAdvice, data, true);
        }
    }]);

    return AuthCodeAdvice;
}();
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PurchaseHelper = function () {
    function PurchaseHelper() {
        _classCallCheck(this, PurchaseHelper);
    }

    _createClass(PurchaseHelper, null, [{
        key: "CreatePurchaseRequest",
        value: function CreatePurchaseRequest(amountCents, purchaseId) {
            return new PurchaseRequest(amountCents, purchaseId);
        }
    }, {
        key: "CreatePurchaseRequestV2",
        value: function CreatePurchaseRequestV2(posRefId, purchaseAmount, tipAmount, cashoutAmount, promptForCashout) {
            var pr = Object.assign(new PurchaseRequest(purchaseAmount, posRefId), {
                CashoutAmount: cashoutAmount,
                TipAmount: tipAmount,
                PromptForCashout: promptForCashout
            });

            return pr;
        }
    }, {
        key: "CreateRefundRequest",
        value: function CreateRefundRequest(amountCents, purchaseId) {
            return new RefundRequest(amountCents, purchaseId);
        }
    }]);

    return PurchaseHelper;
}();
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var __RequestIdHelperCounter = 1;

var RequestIdHelper = function () {
    function RequestIdHelper() {
        _classCallCheck(this, RequestIdHelper);
    }

    _createClass(RequestIdHelper, null, [{
        key: "Id",
        value: function Id(prefix) {
            return prefix + __RequestIdHelperCounter++;
        }
    }]);

    return RequestIdHelper;
}();
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Secrets = function () {
    function Secrets(encKey, hmacKey) {
        _classCallCheck(this, Secrets);

        this.EncKey = encKey;
        this.HmacKey = hmacKey;
    }

    _createClass(Secrets, null, [{
        key: 'save',
        value: function save(EncKey, HmacKey) {
            localStorage.setItem('EncKey', EncKey);
            localStorage.setItem('HmacKey', HmacKey);
        }
    }, {
        key: 'restore',
        value: function restore() {
            return new Secrets(localStorage.getItem('EncKey'), localStorage.getItem('HmacKey'));
        }
    }, {
        key: 'isSaved',
        value: function isSaved() {
            return localStorage.getItem('EncKey') && localStorage.getItem('HmacKey');
        }
    }, {
        key: 'Reset',
        value: function Reset() {
            localStorage.removeItem('EncKey');
            localStorage.removeItem('HmacKey');
        }
    }]);

    return Secrets;
}();
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SettleRequest = function () {
    function SettleRequest(id) {
        _classCallCheck(this, SettleRequest);

        this.Id = id;
    }

    _createClass(SettleRequest, [{
        key: "ToMessage",
        value: function ToMessage() {
            return new Message(this.Id, Events.SettleRequest, null, true);
        }
    }]);

    return SettleRequest;
}();

var Settlement = function () {
    function Settlement(m) {
        _classCallCheck(this, Settlement);

        this.RequestId = m.Id;
        this._m = m;
        this.Success = m.GetSuccessState() == SuccessState.Success;
    }

    _createClass(Settlement, [{
        key: "GetSettleByAcquirerCount",
        value: function GetSettleByAcquirerCount() {
            return this._m.Data.accumulated_settle_by_acquirer_count;
        }
    }, {
        key: "GetSettleByAcquirerValue",
        value: function GetSettleByAcquirerValue() {
            return this._m.Data.accumulated_settle_by_acquirer_value;
        }
    }, {
        key: "GetTotalCount",
        value: function GetTotalCount() {
            return this._m.Data.accumulated_total_count;
        }
    }, {
        key: "GetTotalValue",
        value: function GetTotalValue() {
            return this._m.Data.accumulated_total_value;
        }
    }, {
        key: "GetPeriodStartTime",
        value: function GetPeriodStartTime() {
            var timeStr = this._m.Data.settlement_period_start_time; // "05:00"
            var dateStr = this._m.Data.settlement_period_start_date; // "05Oct17"
            return Message.ParseBankDateTimeStr(dateStr, timeStr);
        }
    }, {
        key: "GetPeriodEndTime",
        value: function GetPeriodEndTime() {
            var timeStr = this._m.Data.settlement_period_end_time; // "05:00"
            var dateStr = this._m.Data.settlement_period_end_date; // "05Oct17"
            return Message.ParseBankDateTimeStr(dateStr, timeStr);
        }
    }, {
        key: "GetTriggeredTime",
        value: function GetTriggeredTime() {
            var timeStr = this._m.Data.settlement_triggered_time; // "05:00:45"
            var dateStr = this._m.Data.settlement_triggered_date; // "05Oct17"
            return Message.ParseBankDateTimeStr(dateStr, timeStr);
        }
    }, {
        key: "GetResponseText",
        value: function GetResponseText() {
            return this._m.Data.host_response_text;
        }
    }, {
        key: "GetReceipt",
        value: function GetReceipt() {
            return this._m.Data.merchant_receipt;
        }
    }, {
        key: "GetTransactionRange",
        value: function GetTransactionRange() {
            return this._m.Data.transaction_range;
        }
    }, {
        key: "GetTerminalId",
        value: function GetTerminalId() {
            return this._m.Data.terminal_id;
        }
    }, {
        key: "GetSchemeSettlementEntries",
        value: function GetSchemeSettlementEntries() {
            var schemes = this._m.Data.schemes;
            if (!schemes) return [];

            return schemes.map(function (scheme) {
                return new SchemeSettlementEntry(scheme);
            });
        }
    }]);

    return Settlement;
}();

var SchemeSettlementEntry = function () {
    // SchemeSettlementEntry(string schemeName, bool settleByAcquirer, int totalCount, int totalValue)
    // SchemeSettlementEntry(Object schemeObj)
    function SchemeSettlementEntry() {
        _classCallCheck(this, SchemeSettlementEntry);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        if (args.length === 1) {
            this.SchemeName = args[0].scheme_name;
            this.SettleByAcquirer = args[0].settle_by_acquirer.toLowerCase() == "yes";
            this.TotalValue = parseInt(args[0].total_value, 10);
            this.TotalCount = parseInt(args[0].total_count, 10);
        } else if (args.length === 4) {
            this.SchemeName = args[0];
            this.SettleByAcquirer = args[1];
            this.TotalCount = args[2];
            this.TotalValue = args[3];
        }
    }

    _createClass(SchemeSettlementEntry, [{
        key: "ToString",
        value: function ToString() {
            return "SchemeName: " + this.SchemeName + ", SettleByAcquirer: " + this.SettleByAcquirer + ", TotalCount: " + this.TotalCount + ", TotalValue: " + this.TotalValue;
        }
    }]);

    return SchemeSettlementEntry;
}();

var SettlementEnquiryRequest = function () {
    function SettlementEnquiryRequest(id) {
        _classCallCheck(this, SettlementEnquiryRequest);

        this.Id = id;
    }

    _createClass(SettlementEnquiryRequest, [{
        key: "ToMessage",
        value: function ToMessage() {
            return new Message(this.Id, Events.SettlementEnquiryRequest, null, true);
        }
    }]);

    return SettlementEnquiryRequest;
}();
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Spi = function () {
    _createClass(Spi, [{
        key: "CurrentStatus",
        get: function get() {
            return this._currentStatus;
        },
        set: function set(value) {
            if (this._currentStatus === value) {
                return;
            }

            this._currentStatus = value;
            document.dispatchEvent(new CustomEvent('StatusChanged', { detail: value }));
        }
    }]);

    function Spi(posId, eftposAddress, secrets) {
        _classCallCheck(this, Spi);

        this._posId = posId;
        this._secrets = secrets;
        this._eftposAddress = "ws://" + eftposAddress;
        this._log = console;
        this.Config = new SpiConfig();

        // Our stamp for signing outgoing messages
        this._spiMessageStamp = new MessageStamp(this._posId, this._secrets, 0);

        // We will maintain some state
        this._mostRecentPingSent = null;
        this._mostRecentPongReceived = null;
        this._missedPongsCount = 0;
        this._mostRecentLoginResponse = null;

        this._pongTimeout = 5000;
        this._pingFrequency = 18000;

        this._readyToTransact = null;
        this._periodicPingThread = null;

        this._txMonitorCheckFrequency = 1000;
        this._checkOnTxFrequency = 20000;
        this._maxWaitForCancelTx = 10000;
        this._missedPongsToDisconnect = 2;

        this.CurrentFlow = null;
        this.CurrentPairingFlowState = null;
        this.CurrentTxFlowState = null;
    }

    _createClass(Spi, [{
        key: "EnablePayAtTable",
        value: function EnablePayAtTable() {
            this._spiPat = new SpiPayAtTable(this);
            return this._spiPat;
        }
    }, {
        key: "EnablePreauth",
        value: function EnablePreauth() {
            this._spiPreauth = new SpiPreauth(this);
            return this._spiPreauth;
        }
    }, {
        key: "Start",
        value: function Start() {
            this._resetConn();
            this._startTransactionMonitoringThread();

            this.CurrentFlow = SpiFlow.Idle;
            if (this._secrets != null) {
                this._log.info("Starting in Paired State");
                this._currentStatus = SpiStatus.PairedConnecting;
                this._conn.Connect(); // This is non-blocking
            } else {
                this._log.info("Starting in Unpaired State");
                this._currentStatus = SpiStatus.Unpaired;
            }
        }

        // <summary>
        // Allows you to set the PosId which identifies this instance of your POS.
        // Can only be called in thge Unpaired state. 
        // </summary>

    }, {
        key: "SetPosId",
        value: function SetPosId(posId) {
            if (this.CurrentStatus != SpiStatus.Unpaired) return false;

            this._posId = posId;
            this._spiMessageStamp.PosId = posId;
            return true;
        }

        // <summary>
        // Allows you to set the PinPad address. Sometimes the PinPad might change IP address 
        // (we recommend reserving static IPs if possible).
        // Either way you need to allow your User to enter the IP address of the PinPad.
        // </summary>

    }, {
        key: "SetEftposAddress",
        value: function SetEftposAddress(address) {
            if (this.CurrentStatus == SpiStatus.PairedConnected) {
                return false;
            }

            this._eftposAddress = "ws://" + address;
            this._conn.Address = this._eftposAddress;
            return true;
        }

        // <summary>
        // Call this one when a flow is finished and you want to go back to idle state.
        // Typically when your user clicks the "OK" bubtton to acknowldge that pairing is
        // finished, or that transaction is finished.
        // When true, you can dismiss the flow screen and show back the idle screen.
        // </summary>
        // <returns>true means we have moved back to the Idle state. false means current flow was not finished yet.</returns>

    }, {
        key: "AckFlowEndedAndBackToIdle",
        value: function AckFlowEndedAndBackToIdle() {
            if (this.CurrentFlow == SpiFlow.Idle) return true; // already idle

            if (this.CurrentFlow == SpiFlow.Pairing && this.CurrentPairingFlowState.Finished) {
                this.CurrentFlow = SpiFlow.Idle;
                return true;
            }

            if (this.CurrentFlow == SpiFlow.Transaction && this.CurrentTxFlowState.Finished) {
                this.CurrentFlow = SpiFlow.Idle;
                return true;
            }

            return false;
        }
    }, {
        key: "Pair",

        // endregion

        // <summary>
        // This will connect to the Eftpos and start the pairing process.
        // Only call this if you are in the Unpaired state.
        // Subscribe to the PairingFlowStateChanged event to get updates on the pairing process.
        // </summary>
        // <returns>Whether pairing has initiated or not</returns>
        value: function Pair() {
            if (this.CurrentStatus != SpiStatus.Unpaired) {
                this._log.warn("Tried to Pair but we're already so.");
                return false;
            }

            if (!this._posId || !this._eftposAddress) {
                this._log.warn("Tried to Pair but missing posId or eftposAddress");
                return false;
            }

            this.CurrentFlow = SpiFlow.Pairing;
            this.CurrentPairingFlowState = new PairingFlowState({
                Successful: false,
                Finished: false,
                Message: "Connecting...",
                AwaitingCheckFromEftpos: false,
                AwaitingCheckFromPos: false,
                ConfirmationCode: ""
            });

            document.dispatchEvent(new CustomEvent('PairingFlowStateChanged', { detail: this.CurrentPairingFlowState }));
            this._conn.Connect(); // Non-Blocking
            return true;
        }

        // <summary>
        // Call this when your user clicks yes to confirm the pairing code on your 
        // screen matches the one on the Eftpos.
        // </summary>

    }, {
        key: "PairingConfirmCode",
        value: function PairingConfirmCode() {
            if (!this.CurrentPairingFlowState.AwaitingCheckFromPos) {
                // We weren't expecting this
                return;
            }

            this.CurrentPairingFlowState.AwaitingCheckFromPos = false;
            if (this.CurrentPairingFlowState.AwaitingCheckFromEftpos) {
                // But we are still waiting for confirmation from Eftpos side.
                this._log.info("Pair Code Confirmed from POS side, but am still waiting for confirmation from Eftpos.");
                this.CurrentPairingFlowState.Message = "Click YES on EFTPOS if code is: " + this.CurrentPairingFlowState.ConfirmationCode;
                document.dispatchEvent(new CustomEvent('PairingFlowStateChanged', { detail: this.CurrentPairingFlowState }));
            } else {
                // Already confirmed from Eftpos - So all good now. We're Paired also from the POS perspective.
                this._log.info("Pair Code Confirmed from POS side, and was already confirmed from Eftpos side. Pairing finalised.");
                this._onPairingSuccess();
                this._onReadyToTransact();
            }
        }

        // <summary>
        // Call this if your user clicks CANCEL or NO during the pairing process.
        // </summary>

    }, {
        key: "PairingCancel",
        value: function PairingCancel() {
            if (this.CurrentFlow != SpiFlow.Pairing || this.CurrentPairingFlowState.Finished) {
                return;
            }

            if (this.CurrentPairingFlowState.AwaitingCheckFromPos && !this.CurrentPairingFlowState.AwaitingCheckFromEftpos) {
                // This means that the Eftpos already thinks it's paired.
                // Let's tell it to drop keys
                this._send(new DropKeysRequest().ToMessage());
            }
            this._onPairingFailed();
        }

        // <summary>
        // Call this when your uses clicks the Unpair button.
        // This will disconnect from the Eftpos and forget the secrets.
        // The CurrentState is then changed to Unpaired.
        // Call this only if you are not yet in the Unpaired state.
        // </summary>

    }, {
        key: "Unpair",
        value: function Unpair() {
            if (this.CurrentStatus == SpiStatus.Unpaired) {
                return false;
            }

            if (this.CurrentFlow != SpiFlow.Idle) {
                return false;
            }

            // Best effort letting the eftpos know that we're dropping the keys, so it can drop them as well.
            this._send(new DropKeysRequest().ToMessage());
            this._doUnpair();
            return true;
        }

        // endregion

        // region Transaction Methods

        // <summary>
        // Initiates a purchase transaction. Be subscribed to TxFlowStateChanged event to get updates on the process.
        // </summary>
        // <param name="posRefId">Alphanumeric Identifier for your purchase.</param>
        // <param name="amountCents">Amount in Cents to charge</param>
        // <returns>InitiateTxResult</returns>

    }, {
        key: "InitiatePurchaseTx",
        value: function InitiatePurchaseTx(posRefId, amountCents) {
            if (this.CurrentStatus == SpiStatus.Unpaired) {
                return new InitiateTxResult(false, "Not Paired");
            }

            if (this.CurrentFlow != SpiFlow.Idle) {
                return new InitiateTxResult(false, "Not Idle");
            }

            var purchaseRequest = PurchaseHelper.CreatePurchaseRequest(amountCents, posRefId);
            purchaseRequest.Config = this.Config;
            var purchaseMsg = purchaseRequest.ToMessage();
            this.CurrentFlow = SpiFlow.Transaction;
            this.CurrentTxFlowState = new TransactionFlowState(posRefId, TransactionType.Purchase, amountCents, purchaseMsg, "Waiting for EFTPOS connection to make payment request for " + amountCents / 100.0);
            if (this._send(purchaseMsg)) {
                this.CurrentTxFlowState.Sent("Asked EFTPOS to accept payment for " + amountCents / 100.0);
            }

            document.dispatchEvent(new CustomEvent('TxFlowStateChanged', { detail: this.CurrentTxFlowState }));
            return new InitiateTxResult(true, "Purchase Initiated");
        }

        // <summary>
        // Initiates a purchase transaction. Be subscribed to TxFlowStateChanged event to get updates on the process.
        // <para>Tip and cashout are not allowed simultaneously.</para>
        // </summary>
        // <param name="posRefId">An Unique Identifier for your Order/Purchase</param>
        // <param name="purchaseAmount">The Purchase Amount in Cents.</param>
        // <param name="tipAmount">The Tip Amount in Cents</param>
        // <param name="cashoutAmount">The Cashout Amount in Cents</param>
        // <param name="promptForCashout">Whether to prompt your customer for cashout on the Eftpos</param>
        // <returns>InitiateTxResult</returns>

    }, {
        key: "InitiatePurchaseTxV2",
        value: function InitiatePurchaseTxV2(posRefId, purchaseAmount, tipAmount, cashoutAmount, promptForCashout) {
            if (this.CurrentStatus == SpiStatus.Unpaired) return new InitiateTxResult(false, "Not Paired");

            if (tipAmount > 0 && (cashoutAmount > 0 || promptForCashout)) return new InitiateTxResult(false, "Cannot Accept Tips and Cashout at the same time.");

            if (this.CurrentFlow != SpiFlow.Idle) return new InitiateTxResult(false, "Not Idle");
            this.CurrentFlow = SpiFlow.Transaction;

            var purchase = PurchaseHelper.CreatePurchaseRequestV2(posRefId, purchaseAmount, tipAmount, cashoutAmount, promptForCashout);
            purchase.Config = this.Config;
            var purchaseMsg = purchase.ToMessage();
            this.CurrentTxFlowState = new TransactionFlowState(posRefId, TransactionType.Purchase, purchaseAmount, purchaseMsg, "Waiting for EFTPOS connection to make payment request. " + purchase.AmountSummary());
            if (this._send(purchaseMsg)) {
                this.CurrentTxFlowState.Sent("Asked EFTPOS to accept payment for " + purchase.AmountSummary());
            }

            document.dispatchEvent(new CustomEvent('TxFlowStateChanged', { detail: this.CurrentTxFlowState }));
            return new InitiateTxResult(true, "Purchase Initiated");
        }

        // <summary>
        // Initiates a refund transaction. Be subscribed to TxFlowStateChanged event to get updates on the process.
        // </summary>
        // <param name="posRefId">Alphanumeric Identifier for your refund.</param>
        // <param name="amountCents">Amount in Cents to charge</param>
        // <returns>InitiateTxResult</returns>

    }, {
        key: "InitiateRefundTx",
        value: function InitiateRefundTx(posRefId, amountCents) {
            if (this.CurrentStatus == SpiStatus.Unpaired) {
                return new InitiateTxResult(false, "Not Paired");
            }

            if (this.CurrentFlow != SpiFlow.Idle) {
                return new InitiateTxResult(false, "Not Idle");
            }

            var refundRequest = PurchaseHelper.CreateRefundRequest(amountCents, posRefId);
            refundRequest.Config = this.Config;
            var refundMsg = refundRequest.ToMessage();
            this.CurrentFlow = SpiFlow.Transaction;
            this.CurrentTxFlowState = new TransactionFlowState(posRefId, TransactionType.Refund, amountCents, refundMsg, "Waiting for EFTPOS connection to make refund request for " + (amountCents / 100.0).toFixed(2));
            if (this._send(refundMsg)) {
                this.CurrentTxFlowState.Sent("Asked EFTPOS to refund " + (amountCents / 100.0).toFixed(2));
            }

            document.dispatchEvent(new CustomEvent('TxFlowStateChanged', { detail: this.CurrentTxFlowState }));
            return new InitiateTxResult(true, "Refund Initiated");
        }

        // <summary>
        // Let the EFTPOS know whether merchant accepted or declined the signature
        // </summary>
        // <param name="accepted">whether merchant accepted the signature from customer or not</param>

    }, {
        key: "AcceptSignature",
        value: function AcceptSignature(accepted) {
            if (this.CurrentFlow != SpiFlow.Transaction || this.CurrentTxFlowState.Finished || !this.CurrentTxFlowState.AwaitingSignatureCheck) {
                this._log.info("Asked to accept signature but I was not waiting for one.");
                return new MidTxResult(false, "Asked to accept signature but I was not waiting for one.");
            }

            this.CurrentTxFlowState.SignatureResponded(accepted ? "Accepting Signature..." : "Declining Signature...");
            var sigReqMsg = this.CurrentTxFlowState.SignatureRequiredMessage;
            this._send(accepted ? new SignatureAccept(this.CurrentTxFlowState.PosRefId).ToMessage() : new SignatureDecline(this.CurrentTxFlowState.PosRefId).ToMessage());

            document.dispatchEvent(new CustomEvent('TxFlowStateChanged', { detail: this.CurrentTxFlowState }));
            return new MidTxResult(true, "");
        }

        // <summary>
        // Submit the Code obtained by your user when phoning for auth. 
        // It will return immediately to tell you whether the code has a valid format or not. 
        // If valid==true is returned, no need to do anything else. Expect updates via standard callback.
        // If valid==false is returned, you can show your user the accompanying message, and invite them to enter another code. 
        // </summary>
        // <param name="authCode">The code obtained by your user from the merchant call centre. It should be a 6-character alpha-numeric value.</param>
        // <returns>Whether code has a valid format or not.</returns>

    }, {
        key: "SubmitAuthCode",
        value: function SubmitAuthCode(authCode) {
            if (authCode.length != 6) {
                return new SubmitAuthCodeResult(false, "Not a 6-digit code.");
            }

            if (this.CurrentFlow != SpiFlow.Transaction || this.CurrentTxFlowState.Finished || !this.CurrentTxFlowState.AwaitingPhoneForAuth) {
                this._log.info("Asked to send auth code but I was not waiting for one.");
                return new SubmitAuthCodeResult(false, "Was not waiting for one.");
            }

            this.CurrentTxFlowState.AuthCodeSent("Submitting Auth Code " + authCode);
            this._send(new AuthCodeAdvice(this.CurrentTxFlowState.PosRefId, authCode).ToMessage());

            document.dispatchEvent(new CustomEvent('TxFlowStateChanged', { detail: this.CurrentTxFlowState }));
            return new SubmitAuthCodeResult(true, "Valid Code.");
        }

        // <summary>
        // Attempts to cancel a Transaction. 
        // Be subscribed to TxFlowStateChanged event to see how it goes.
        // Wait for the transaction to be finished and then see whether cancellation was successful or not.
        // </summary>
        // <returns>MidTxResult - false only if you called it in the wrong state</returns>

    }, {
        key: "CancelTransaction",
        value: function CancelTransaction() {
            if (this.CurrentFlow != SpiFlow.Transaction || this.CurrentTxFlowState.Finished) {
                this._log.info("Asked to cancel transaction but I was not in the middle of one.");
                return new MidTxResult(false, "Asked to cancel transaction but I was not in the middle of one.");
            }

            // TH-1C, TH-3C - Merchant pressed cancel
            if (this.CurrentTxFlowState.RequestSent) {
                var cancelReq = new CancelTransactionRequest();
                this.CurrentTxFlowState.Cancelling("Attempting to Cancel Transaction...");
                this._send(cancelReq.ToMessage());
            } else {
                // We Had Not Even Sent Request Yet. Consider as known failed.
                this.CurrentTxFlowState.Failed(null, "Transaction Cancelled. Request Had not even been sent yet.");
            }

            document.dispatchEvent(new CustomEvent('TxFlowStateChanged', { detail: this.CurrentTxFlowState }));
            return new MidTxResult(true, "");
        }

        // <summary>
        // Initiates a cashout only transaction. Be subscribed to TxFlowStateChanged event to get updates on the process.
        // </summary>
        // <param name="posRefId">Alphanumeric Identifier for your transaction.</param>
        // <param name="amountCents">Amount in Cents to cash out</param>
        // <returns>InitiateTxResult</returns>

    }, {
        key: "InitiateCashoutOnlyTx",
        value: function InitiateCashoutOnlyTx(posRefId, amountCents) {
            if (this.CurrentStatus == SpiStatus.Unpaired) return new InitiateTxResult(false, "Not Paired");

            if (this.CurrentFlow != SpiFlow.Idle) return new InitiateTxResult(false, "Not Idle");
            var cashoutOnlyRequest = new CashoutOnlyRequest(amountCents, posRefId);
            cashoutOnlyRequest.Config = this.Config;
            var cashoutMsg = cashoutOnlyRequest.ToMessage();
            this.CurrentFlow = SpiFlow.Transaction;
            this.CurrentTxFlowState = new TransactionFlowState(posRefId, TransactionType.CashoutOnly, amountCents, cashoutMsg, "Waiting for EFTPOS connection to send cashout request for " + (amountCents / 100).toFixed(2));
            if (this._send(cashoutMsg)) {
                this.CurrentTxFlowState.Sent("Asked EFTPOS to do cashout for " + (amountCents / 100).toFixed(2));
            }

            document.dispatchEvent(new CustomEvent('TxFlowStateChanged', { detail: this.CurrentTxFlowState }));
            return new InitiateTxResult(true, "Cashout Initiated");
        }

        // <summary>
        // Initiates a Mail Order / Telephone Order Purchase Transaction
        // </summary>
        // <param name="posRefId">Alphanumeric Identifier for your transaction.</param>
        // <param name="amountCents">Amount in Cents</param>
        // <returns>InitiateTxResult</returns>

    }, {
        key: "InitiateMotoPurchaseTx",
        value: function InitiateMotoPurchaseTx(posRefId, amountCents) {
            if (this.CurrentStatus == SpiStatus.Unpaired) return new InitiateTxResult(false, "Not Paired");

            if (this.CurrentFlow != SpiFlow.Idle) return new InitiateTxResult(false, "Not Idle");
            var motoPurchaseRequest = new MotoPurchaseRequest(amountCents, posRefId);
            motoPurchaseRequest.Config = this.Config;
            var cashoutMsg = motoPurchaseRequest.ToMessage();
            this.CurrentFlow = SpiFlow.Transaction;
            this.CurrentTxFlowState = new TransactionFlowState(posRefId, TransactionType.MOTO, amountCents, cashoutMsg, "Waiting for EFTPOS connection to send MOTO request for " + (amountCents / 100).toFixed(2));
            if (this._send(cashoutMsg)) {
                this.CurrentTxFlowState.Sent("Asked EFTPOS do MOTO for " + (amountCents / 100).toFixed(2));
            }

            document.dispatchEvent(new CustomEvent('TxFlowStateChanged', { detail: this.CurrentTxFlowState }));
            return new InitiateTxResult(true, "MOTO Initiated");
        }

        // <summary>
        // Initiates a settlement transaction.
        // Be subscribed to TxFlowStateChanged event to get updates on the process.
        // </summary>

    }, {
        key: "InitiateSettleTx",
        value: function InitiateSettleTx(posRefId) {
            if (this.CurrentStatus == SpiStatus.Unpaired) {
                return new InitiateTxResult(false, "Not Paired");
            }

            if (this.CurrentFlow != SpiFlow.Idle) {
                return new InitiateTxResult(false, "Not Idle");
            }

            var settleRequestMsg = new SettleRequest(RequestIdHelper.Id("settle")).ToMessage();
            this.CurrentFlow = SpiFlow.Transaction;
            this.CurrentTxFlowState = new TransactionFlowState(posRefId, TransactionType.Settle, 0, settleRequestMsg, "Waiting for EFTPOS connection to make a settle request");

            if (this._send(settleRequestMsg)) {
                this.CurrentTxFlowState.Sent("Asked EFTPOS to settle.");
            }

            document.dispatchEvent(new CustomEvent('TxFlowStateChanged', { detail: this.CurrentTxFlowState }));
            return new InitiateTxResult(true, "Settle Initiated");
        }

        // <summary>
        // </summary>

    }, {
        key: "InitiateSettlementEnquiry",
        value: function InitiateSettlementEnquiry(posRefId) {
            if (this.CurrentStatus == SpiStatus.Unpaired) return new InitiateTxResult(false, "Not Paired");

            if (this.CurrentFlow != SpiFlow.Idle) return new InitiateTxResult(false, "Not Idle");
            var stlEnqMsg = new SettlementEnquiryRequest(RequestIdHelper.Id("stlenq")).ToMessage();
            this.CurrentFlow = SpiFlow.Transaction;
            this.CurrentTxFlowState = new TransactionFlowState(posRefId, TransactionType.SettlementEnquiry, 0, stlEnqMsg, "Waiting for EFTPOS connection to make a settlement enquiry");
            if (this._send(stlEnqMsg)) {
                this.CurrentTxFlowState.Sent("Asked EFTPOS to make a settlement enquiry.");
            }

            document.dispatchEvent(new CustomEvent('TxFlowStateChanged', { detail: this.CurrentTxFlowState }));
            return new InitiateTxResult(true, "Settle Initiated");
        }

        // <summary>
        // Initiates a Get Last Transaction. Use this when you want to retrieve the most recent transaction
        // that was processed by the Eftpos.
        // Be subscribed to TxFlowStateChanged event to get updates on the process.
        // </summary>

    }, {
        key: "InitiateGetLastTx",
        value: function InitiateGetLastTx() {
            if (this.CurrentStatus == SpiStatus.Unpaired) {
                return new InitiateTxResult(false, "Not Paired");
            }

            if (this.CurrentFlow != SpiFlow.Idle) {
                return new InitiateTxResult(false, "Not Idle");
            }

            var gltRequestMsg = new GetLastTransactionRequest().ToMessage();
            this.CurrentFlow = SpiFlow.Transaction;
            var posRefId = gltRequestMsg.Id; // GetLastTx is not trying to get anything specific back. So we just use the message id.
            this.CurrentTxFlowState = new TransactionFlowState(posRefId, TransactionType.GetLastTransaction, 0, gltRequestMsg, "Waiting for EFTPOS connection to make a Get-Last-Transaction request.");

            if (this._send(gltRequestMsg)) {
                this.CurrentTxFlowState.Sent("Asked EFTPOS for last transaction.");
            }

            document.dispatchEvent(new CustomEvent('TxFlowStateChanged', { detail: this.CurrentTxFlowState }));
            return new InitiateTxResult(true, "GLT Initiated");
        }

        // <summary>
        // This is useful to recover from your POS crashing in the middle of a transaction.
        // When you restart your POS, if you had saved enough state, you can call this method to recover the client library state.
        // You need to have the posRefId that you passed in with the original transaction, and the transaction type.
        // This method will return immediately whether recovery has started or not.
        // If recovery has started, you need to bring up the transaction modal to your user a be listening to TxFlowStateChanged.
        // </summary>
        // <param name="posRefId">The is that you had assigned to the transaction that you are trying to recover.</param>
        // <param name="txType">The transaction type.</param>
        // <returns></returns>

    }, {
        key: "InitiateRecovery",
        value: function InitiateRecovery(posRefId, txType) {
            if (this.CurrentStatus == SpiStatus.Unpaired) return new InitiateTxResult(false, "Not Paired");

            if (this.CurrentFlow != SpiFlow.Idle) return new InitiateTxResult(false, "Not Idle");

            this.CurrentFlow = SpiFlow.Transaction;

            var gltRequestMsg = new GetLastTransactionRequest().ToMessage();
            this.CurrentTxFlowState = new TransactionFlowState(posRefId, txType, 0, gltRequestMsg, "Waiting for EFTPOS connection to attempt recovery.");

            if (this._send(gltRequestMsg)) {
                this.CurrentTxFlowState.Sent("Asked EFTPOS to recover state.");
            }

            document.dispatchEvent(new CustomEvent('TxFlowStateChanged', { detail: this.CurrentTxFlowState }));
            return new InitiateTxResult(true, "Recovery Initiated");
        }

        // <summary>
        // GltMatch attempts to conclude whether a gltResponse matches an expected transaction and returns
        // the outcome. 
        // If Success/Failed is returned, it means that the gtlResponse did match, and that transaction was succesful/failed.
        // If Unknown is returned, it means that the gltResponse does not match the expected transaction. 
        // </summary>
        // <param name="gltResponse">The GetLastTransactionResponse message to check</param>
        // <param name="posRefId">The Reference Id that you passed in with the original request.</param>

        // <returns></returns>

    }, {
        key: "GltMatch",
        value: function GltMatch(gltResponse, posRefId) {
            // Obsolete method call check
            // Old interface: GltMatch(GetLastTransactionResponse gltResponse, TransactionType expectedType, int expectedAmount, DateTime requestTime, string posRefId)
            if (arguments.length <= 2 ? 0 : arguments.length - 2) {
                if ((arguments.length <= 2 ? 0 : arguments.length - 2) == 2) {
                    this._log.info("Obsolete method call detected: Use GltMatch(gltResponse, posRefId)");
                    return this.GltMatch(gltResponse, arguments.length <= 4 ? undefined : arguments[4]);
                } else {
                    throw new Error("Obsolete method call with unknown args: Use GltMatch(GetLastTransactionResponse gltResponse, string posRefId)");
                }
            }

            this._log.info("GLT CHECK: PosRefId: " + posRefId + "->" + gltResponse.GetPosRefId());

            if (!posRefId == gltResponse.GetPosRefId()) {
                return SuccessState.Unknown;
            }

            return gltResponse.GetSuccessState();
        }
        // endregion

        // region Internals for Pairing Flow

        // <summary>
        // Handling the 2nd interaction of the pairing process, i.e. an incoming KeyRequest.
        // </summary>
        // <param name="m">incoming message</param>

    }, {
        key: "_handleKeyRequest",
        value: function _handleKeyRequest(m) {
            this.CurrentPairingFlowState.Message = "Negotiating Pairing...";
            document.dispatchEvent(new CustomEvent('PairingFlowStateChanged', { detail: this.CurrentPairingFlowState }));

            // Use the helper. It takes the incoming request, and generates the secrets and the response.
            var ph = new PairingHelper();
            var result = ph.GenerateSecretsAndKeyResponse(new KeyRequest(m));
            this._secrets = result.Secrets; // we now have secrets, although pairing is not fully finished yet.
            this._spiMessageStamp.Secrets = this._secrets; // updating our stamp with the secrets so can encrypt messages later.
            this._send(result.KeyResponse.ToMessage()); // send the key_response, i.e. interaction 3 of pairing.
        }

        // <summary>
        // Handling the 4th interaction of the pairing process i.e. an incoming KeyCheck.
        // </summary>
        // <param name="m"></param>

    }, {
        key: "_handleKeyCheck",
        value: function _handleKeyCheck(m) {
            var keyCheck = new KeyCheck(m);
            this.CurrentPairingFlowState.ConfirmationCode = keyCheck.ConfirmationCode;
            this.CurrentPairingFlowState.AwaitingCheckFromEftpos = true;
            this.CurrentPairingFlowState.AwaitingCheckFromPos = true;
            this.CurrentPairingFlowState.Message = "Confirm that the following Code is showing on the Terminal";
            document.dispatchEvent(new CustomEvent('PairingFlowStateChanged', { detail: this.CurrentPairingFlowState }));
        }

        // <summary>
        // Handling the 5th and final interaction of the pairing process, i.e. an incoming PairResponse
        // </summary>
        // <param name="m"></param>

    }, {
        key: "_handlePairResponse",
        value: function _handlePairResponse(m) {
            var pairResp = new PairResponse(m);

            this.CurrentPairingFlowState.AwaitingCheckFromEftpos = false;
            if (pairResp.Success) {
                if (this.CurrentPairingFlowState.AwaitingCheckFromPos) {
                    // Still Waiting for User to say yes on POS
                    this._log.info("Got Pair Confirm from Eftpos, but still waiting for use to confirm from POS.");
                    this.CurrentPairingFlowState.Message = "Confirm that the following Code is what the EFTPOS showed";
                    document.dispatchEvent(new CustomEvent('PairingFlowStateChanged', { detail: this.CurrentPairingFlowState }));
                } else {
                    this._log.info("Got Pair Confirm from Eftpos, and already had confirm from POS. Now just waiting for first pong.");
                    this._onPairingSuccess();
                }
                // I need to ping/login even if the pos user has not said yes yet, 
                // because otherwise within 5 seconds connectiong will be dropped by eftpos.
                this._startPeriodicPing();
            } else {
                this._onPairingFailed();
            }
        }
    }, {
        key: "_handleDropKeysAdvice",
        value: function _handleDropKeysAdvice(m) {
            this._log.Info("Eftpos was Unpaired. I shall unpair from my end as well.");
            this._doUnpair();
        }
    }, {
        key: "_onPairingSuccess",
        value: function _onPairingSuccess() {
            this.CurrentPairingFlowState.Successful = true;
            this.CurrentPairingFlowState.Finished = true;
            this.CurrentPairingFlowState.Message = "Pairing Successful!";
            this.CurrentStatus = SpiStatus.PairedConnected;
            document.dispatchEvent(new CustomEvent('SecretsChanged', { detail: this._secrets }));
            document.dispatchEvent(new CustomEvent('PairingFlowStateChanged', { detail: this.CurrentPairingFlowState }));
        }
    }, {
        key: "_onPairingFailed",
        value: function _onPairingFailed() {
            this._secrets = null;
            this._spiMessageStamp.Secrets = null;
            this._conn.Disconnect();

            this.CurrentStatus = SpiStatus.Unpaired;
            this.CurrentPairingFlowState.Message = "Pairing Failed";
            this.CurrentPairingFlowState.Finished = true;
            this.CurrentPairingFlowState.Successful = false;
            this.CurrentPairingFlowState.AwaitingCheckFromPos = false;
            document.dispatchEvent(new CustomEvent('PairingFlowStateChanged', { detail: this.CurrentPairingFlowState }));
        }
    }, {
        key: "_doUnpair",
        value: function _doUnpair() {
            this.CurrentStatus = SpiStatus.Unpaired;
            this._conn.Disconnect();
            this._secrets = null;
            this._spiMessageStamp.Secrets = null;
            document.dispatchEvent(new CustomEvent('SecretsChanged', { detail: this._secrets }));
        }

        // <summary>
        // Sometimes the server asks us to roll our secrets.
        // </summary>
        // <param name="m"></param>

    }, {
        key: "_handleKeyRollingRequest",
        value: function _handleKeyRollingRequest(m) {
            // we calculate the new ones...
            var krRes = KeyRollingHelper.PerformKeyRolling(m, this._secrets);
            this._secrets = krRes.NewSecrets; // and update our secrets with them
            this._spiMessageStamp.Secrets = this._secrets; // and our stamp
            this._send(krRes.KeyRollingConfirmation); // and we tell the server that all is well.
            document.dispatchEvent(new CustomEvent('SecretsChanged', { detail: this._secrets }));
        }

        // <summary>
        // The PinPad server will send us this message when a customer signature is reqired.
        // We need to ask the customer to sign the incoming receipt.
        // And then tell the pinpad whether the signature is ok or not.
        // </summary>
        // <param name="m"></param>

    }, {
        key: "_handleSignatureRequired",
        value: function _handleSignatureRequired(m) {
            var incomingPosRefId = m.Data.pos_ref_id;
            if (this.CurrentFlow != SpiFlow.Transaction || this.CurrentTxFlowState.Finished || !this.CurrentTxFlowState.PosRefId == incomingPosRefId) {
                this._log.info("Received Signature Required but I was not waiting for one. Incoming Pos Ref ID: " + incomingPosRefId);
                return;
            }
            this.CurrentTxFlowState.SignatureRequired(new SignatureRequired(m), "Ask Customer to Sign the Receipt");

            document.dispatchEvent(new CustomEvent('TxFlowStateChanged', { detail: this.CurrentTxFlowState }));
        }

        // <summary>
        // The PinPad server will send us this message when an auth code is required.
        // </summary>
        // <param name="m"></param>

    }, {
        key: "_handleAuthCodeRequired",
        value: function _handleAuthCodeRequired(m) {
            var incomingPosRefId = m.Data.pos_ref_id;
            if (this.CurrentFlow != SpiFlow.Transaction || this.CurrentTxFlowState.Finished || !this.CurrentTxFlowState.PosRefId == incomingPosRefId) {
                _log.Info("Received Auth Code Required but I was not waiting for one. Incoming Pos Ref ID: " + incomingPosRefId);
                return;
            }
            var phoneForAuthRequired = new PhoneForAuthRequired(m);
            var msg = "Auth Code Required. Call " + phoneForAuthRequired.GetPhoneNumber() + " and quote merchant id " + phoneForAuthRequired.GetMerchantId();
            this.CurrentTxFlowState.PhoneForAuthRequired(phoneForAuthRequired, msg);

            document.dispatchEvent(new CustomEvent('TxFlowStateChanged', { detail: this.CurrentTxFlowState }));
        }

        // <summary>
        // The PinPad server will reply to our PurchaseRequest with a PurchaseResponse.
        // </summary>
        // <param name="m"></param>

    }, {
        key: "_handlePurchaseResponse",
        value: function _handlePurchaseResponse(m) {
            var incomingPosRefId = m.Data.pos_ref_id;
            if (this.CurrentFlow != SpiFlow.Transaction || this.CurrentTxFlowState.Finished || !this.CurrentTxFlowState.PosRefId == incomingPosRefId) {
                this._log.info("Received Purchase response but I was not waiting for one. Incoming Pos Ref ID: " + incomingPosRefId + "\"");
                return;
            }
            // TH-1A, TH-2A

            this.CurrentTxFlowState.Completed(m.GetSuccessState(), m, "Purchase Transaction Ended.");
            // TH-6A, TH-6E

            document.dispatchEvent(new CustomEvent('TxFlowStateChanged', { detail: this.CurrentTxFlowState }));
        }

        // <summary>
        // The PinPad server will reply to our CashoutOnlyRequest with a CashoutOnlyResponse.
        // </summary>
        // <param name="m"></param>

    }, {
        key: "_handleCashoutOnlyResponse",
        value: function _handleCashoutOnlyResponse(m) {
            var incomingPosRefId = m.Data.pos_ref_id;
            if (this.CurrentFlow != SpiFlow.Transaction || this.CurrentTxFlowState.Finished || !this.CurrentTxFlowState.PosRefId == incomingPosRefId) {
                this._log.info("Received Cashout Response but I was not waiting for one. Incoming Pos Ref ID: " + incomingPosRefId);
                return;
            }
            // TH-1A, TH-2A

            this.CurrentTxFlowState.Completed(m.GetSuccessState(), m, "Cashout Transaction Ended.");
            // TH-6A, TH-6E

            document.dispatchEvent(new CustomEvent('TxFlowStateChanged', { detail: this.CurrentTxFlowState }));
        }

        // <summary>
        // The PinPad server will reply to our MotoPurchaseRequest with a MotoPurchaseResponse.
        // </summary>
        // <param name="m"></param>

    }, {
        key: "_handleMotoPurchaseResponse",
        value: function _handleMotoPurchaseResponse(m) {
            var incomingPosRefId = m.Data.pos_ref_id;
            if (this.CurrentFlow != SpiFlow.Transaction || this.CurrentTxFlowState.Finished || !this.CurrentTxFlowState.PosRefId == incomingPosRefId) {
                this._log.info("Received Moto Response but I was not waiting for one. Incoming Pos Ref ID: " + incomingPosRefId);
                return;
            }
            // TH-1A, TH-2A

            this.CurrentTxFlowState.Completed(m.GetSuccessState(), m, "Moto Transaction Ended.");
            // TH-6A, TH-6E

            document.dispatchEvent(new CustomEvent('TxFlowStateChanged', { detail: this.CurrentTxFlowState }));
        }

        // <summary>
        // The PinPad server will reply to our RefundRequest with a RefundResponse.
        // </summary>
        // <param name="m"></param>

    }, {
        key: "_handleRefundResponse",
        value: function _handleRefundResponse(m) {
            var incomingPosRefId = m.Data.pos_ref_id;
            if (this.CurrentFlow != SpiFlow.Transaction || this.CurrentTxFlowState.Finished | !this.CurrentTxFlowState.PosRefId == incomingPosRefId) {
                this._log.info("Received Refund response but I was not waiting for this one. Incoming Pos Ref ID: " + incomingPosRefId);
                return;
            }
            // TH-1A, TH-2A

            this.CurrentTxFlowState.Completed(m.GetSuccessState(), m, "Refund Transaction Ended.");
            // TH-6A, TH-6E

            document.dispatchEvent(new CustomEvent('TxFlowStateChanged', { detail: this.CurrentTxFlowState }));
        }

        // <summary>
        // TODO: Handle the Settlement Response received from the PinPad
        // </summary>
        // <param name="m"></param>

    }, {
        key: "HandleSettleResponse",
        value: function HandleSettleResponse(m) {
            if (this.CurrentFlow != SpiFlow.Transaction || this.CurrentTxFlowState.Finished) {
                this._log.info("Received Settle response but I was not waiting for one. " + m.DecryptedJson);
                return;
            }
            // TH-1A, TH-2A

            this.CurrentTxFlowState.Completed(m.GetSuccessState(), m, "Settle Transaction Ended.");
            // TH-6A, TH-6E

            document.dispatchEvent(new CustomEvent('TxFlowStateChanged', { detail: this.CurrentTxFlowState }));
        }

        // <summary>
        // Handle the Settlement Enquiry Response received from the PinPad
        // </summary>
        // <param name="m"></param>

    }, {
        key: "_handleSettlementEnquiryResponse",
        value: function _handleSettlementEnquiryResponse(m) {
            if (this.CurrentFlow != SpiFlow.Transaction || this.CurrentTxFlowState.Finished) {
                this._log.info("Received Settlement Enquiry response but I was not waiting for one. " + m.DecryptedJson);
                return;
            }
            // TH-1A, TH-2A

            this.CurrentTxFlowState.Completed(m.GetSuccessState(), m, "Settlement Enquiry Ended.");
            // TH-6A, TH-6E

            document.dispatchEvent(new CustomEvent('TxFlowStateChanged', { detail: this.CurrentTxFlowState }));
        }

        // <summary>
        // Sometimes we receive event type "error" from the server, such as when calling cancel_transaction and there is no transaction in progress.
        // </summary>
        // <param name="m"></param>

    }, {
        key: "_handleErrorEvent",
        value: function _handleErrorEvent(m) {
            if (this.CurrentFlow == SpiFlow.Transaction && !this.CurrentTxFlowState.Finished && this.CurrentTxFlowState.AttemptingToCancel && m.GetError() == "NO_TRANSACTION") {
                // TH-2E
                this._log.info("Was trying to cancel a transaction but there is nothing to cancel. Calling GLT to see what's up");
                this._callGetLastTransaction();
            } else {
                this._log.info("Received Error Event But Don't know what to do with it. " + m.DecryptedJson);
            }
        }

        // <summary>
        // When the PinPad returns to us what the Last Transaction was.
        // </summary>
        // <param name="m"></param>

    }, {
        key: "_handleGetLastTransactionResponse",
        value: function _handleGetLastTransactionResponse(m) {
            var txState = this.CurrentTxFlowState;
            if (this.CurrentFlow != SpiFlow.Transaction || txState.Finished) {
                // We were not in the middle of a transaction, who cares?
                return;
            }

            // TH-4 We were in the middle of a transaction.
            // Let's attempt recovery. This is step 4 of Transaction Processing Handling
            this._log.info("Got Last Transaction..");
            txState.GotGltResponse();
            var gtlResponse = new GetLastTransactionResponse(m);
            if (!gtlResponse.WasRetrievedSuccessfully()) {
                if (gtlResponse.IsStillInProgress(txState.PosRefId)) {
                    // TH-4E - Operation In Progress

                    if (gtlResponse.IsWaitingForSignatureResponse() && !txState.AwaitingSignatureCheck) {
                        this._log.info("Eftpos is waiting for us to send it signature accept/decline, but we were not aware of this. " + "The user can only really decline at this stage as there is no receipt to print for signing.");
                        this.CurrentTxFlowState.SignatureRequired(new SignatureRequired(txState.PosRefId, m.Id, "MISSING RECEIPT\n DECLINE AND TRY AGAIN."), "Recovered in Signature Required but we don't have receipt. You may Decline then Retry.");
                    } else if (gtlResponse.IsWaitingForAuthCode() && !txState.AwaitingPhoneForAuth) {
                        this._log.info("Eftpos is waiting for us to send it auth code, but we were not aware of this. " + "We can only cancel the transaction at this stage as we don't have enough information to recover from this.");
                        this.CurrentTxFlowState.PhoneForAuthRequired(new PhoneForAuthRequired(txState.PosRefId, m.Id, "UNKNOWN", "UNKNOWN"), "Recovered mid Phone-For-Auth but don't have details. You may Cancel then Retry.");
                    } else {
                        this._log.info("Operation still in progress... stay waiting.");
                        // No need to publish txFlowStateChanged. Can return;
                        return;
                    }
                } else {
                    // TH-4X - Unexpected Response when recovering
                    this._log.info("Unexpected Response in Get Last Transaction during - Received posRefId:" + gtlResponse.GetPosRefId() + " Error:" + m.GetError());
                    txState.UnknownCompleted("Unexpected Error when recovering Transaction Status. Check EFTPOS. ");
                }
            } else {
                if (txState.Type == TransactionType.GetLastTransaction) {
                    // THIS WAS A PLAIN GET LAST TRANSACTION REQUEST, NOT FOR RECOVERY PURPOSES.
                    this._log.info("Retrieved Last Transaction as asked directly by the user.");
                    gtlResponse.CopyMerchantReceiptToCustomerReceipt();
                    txState.Completed(m.GetSuccessState(), m, "Last Transaction Retrieved");
                } else {
                    // TH-4A - Let's try to match the received last transaction against the current transaction
                    var successState = this.GltMatch(gtlResponse, txState.PosRefId);
                    if (successState == SuccessState.Unknown) {
                        // TH-4N: Didn't Match our transaction. Consider Unknown State.
                        this._log.info("Did not match transaction.");
                        txState.UnknownCompleted("Failed to recover Transaction Status. Check EFTPOS. ");
                    } else {
                        // TH-4Y: We Matched, transaction finished, let's update ourselves
                        gtlResponse.CopyMerchantReceiptToCustomerReceipt();
                        txState.Completed(successState, m, "Transaction Ended.");
                    }
                }
            }
            document.dispatchEvent(new CustomEvent('TxFlowStateChanged', { detail: txState }));
        }
    }, {
        key: "_startTransactionMonitoringThread",
        value: function _startTransactionMonitoringThread() {
            var _this = this;

            var needsPublishing = false;

            var txState = this.CurrentTxFlowState;
            if (this.CurrentFlow == SpiFlow.Transaction && !txState.Finished) {
                var state = txState;
                if (state.AttemptingToCancel && Date.now() > state.CancelAttemptTime + this._maxWaitForCancelTx) {
                    // TH-2T - too long since cancel attempt - Consider unknown
                    this._log.info("Been too long waiting for transaction to cancel.");
                    txState.UnknownCompleted("Waited long enough for Cancel Transaction result. Check EFTPOS. ");
                    needsPublishing = true;
                } else if (state.RequestSent && Date.now() > state.LastStateRequestTime + this._checkOnTxFrequency) {
                    // TH-1T, TH-4T - It's been a while since we received an update, let's call a GLT
                    this._log.info("Checking on our transaction. Last we asked was at " + state.LastStateRequestTime + "...");
                    txState.CallingGlt();
                    this._callGetLastTransaction();
                }
            }

            if (needsPublishing) {
                document.dispatchEvent(new CustomEvent('TxFlowStateChanged', { detail: this.CurrentTxFlowState }));
            }

            setTimeout(function () {
                return _this._startTransactionMonitoringThread();
            }, this._txMonitorCheckFrequency);
        }

        // endregion

        // region Internals for Connection Management

    }, {
        key: "_resetConn",
        value: function _resetConn() {
            var _this2 = this;

            // Setup the Connection
            this._conn = new Connection();
            this._conn.Address = this._eftposAddress;

            // Register our Event Handlers
            document.addEventListener('ConnectionStatusChanged', function (e) {
                return _this2._onSpiConnectionStatusChanged(e.detail);
            });
            document.addEventListener('MessageReceived', function (e) {
                return _this2._onSpiMessageReceived(e.detail);
            });
            document.addEventListener('ErrorReceived', function (e) {
                return _this2._onWsErrorReceived(e.detail);
            });
        }

        // <summary>
        // This method will be called when the connection status changes.
        // You are encouraged to display a PinPad Connection Indicator on the POS screen.
        // </summary>
        // <param name="state"></param>

    }, {
        key: "_onSpiConnectionStatusChanged",
        value: function _onSpiConnectionStatusChanged(state) {
            var _this3 = this;

            switch (state.ConnectionState) {
                case ConnectionState.Connecting:
                    this._log.info("I'm Connecting to the Eftpos at " + this._eftposAddress + "...");
                    break;

                case ConnectionState.Connected:
                    if (this.CurrentFlow == SpiFlow.Pairing) {
                        this.CurrentPairingFlowState.Message = "Requesting to Pair...";
                        document.dispatchEvent(new CustomEvent('PairingFlowStateChanged', { detail: this.CurrentPairingFlowState }));
                        var pr = PairingHelper.NewPairRequest();
                        this._send(pr.ToMessage());
                    } else {
                        this._log.info("I'm Connected to " + this._eftposAddress + "...");
                        this._spiMessageStamp.Secrets = this._secrets;
                        this._startPeriodicPing();
                    }
                    break;

                case ConnectionState.Disconnected:
                    // Let's reset some lifecycle related to connection state, ready for next connection
                    this._log.info("I'm disconnected from " + this._eftposAddress + "...");
                    this._mostRecentPingSent = null;
                    this._mostRecentPongReceived = null;
                    this._missedPongsCount = 0;
                    this._stopPeriodicPing();

                    if (this.CurrentStatus != SpiStatus.Unpaired) {
                        this.CurrentStatus = SpiStatus.PairedConnecting;

                        if (this.CurrentFlow == SpiFlow.Transaction && !this.CurrentTxFlowState.Finished) {
                            // we're in the middle of a transaction, just so you know!
                            // TH-1D
                            this._log.info("Lost connection in the middle of a transaction...");
                        }

                        if (this._conn == null) return; // This means the instance has been disposed. Aborting.
                        this._log.info("Will try to reconnect in 5s...");
                        setTimeout(function () {
                            if (_this3.CurrentStatus != SpiStatus.Unpaired) {
                                // This is non-blocking
                                _this3._conn.Connect();
                            }
                        }, 5000);
                    } else if (this.CurrentFlow == SpiFlow.Pairing) {
                        this._log.info("Lost Connection during pairing.");
                        this.CurrentPairingFlowState.Message = "Could not Connect to Pair. Check Network and Try Again...";
                        this._onPairingFailed();
                        document.dispatchEvent(new CustomEvent('PairingFlowStateChanged', { detail: this.CurrentPairingFlowState }));
                    }
                    break;
                default:
                    throw new Exception('Unknown state: ' + state);
            }
        }

        // <summary>
        // This is an important piece of the puzzle. It's a background thread that periodically
        // sends Pings to the server. If it doesn't receive Pongs, it considers the connection as broken
        // so it disconnects. 
        // </summary>

    }, {
        key: "_startPeriodicPing",
        value: function _startPeriodicPing() {
            var _this4 = this;

            this._stopPeriodicPing();
            this._periodicPingThread = setInterval(function () {
                return _this4._periodicPing();
            }, this._pingFrequency);
            this._periodicPing();
        }
    }, {
        key: "_periodicPing",
        value: function _periodicPing() {
            var _this5 = this;

            // while i'm still connected AND paired...
            if (this._conn.Connected && this._secrets != null) {
                this._doPing();

                setTimeout(function () {
                    if (_this5._mostRecentPingSent != null && (_this5._mostRecentPongReceived == null || _this5._mostRecentPongReceived.Id != _this5._mostRecentPingSent.Id)) {
                        _this5._missedPongsCount += 1;

                        _this5._log.info("Eftpos didn't reply to my Ping. Missed Count: " + _this5._missedPongsCount + "/" + _this5._missedPongsToDisconnect + ".");

                        if (_this5._missedPongsCount < _this5._missedPongsToDisconnect) {
                            _this5._log.info("Trying another ping...");
                            _this5._startPeriodicPing();
                            return;
                        }

                        // This means that we have not received a pong for our most recent ping.
                        // We consider this connection as broken.
                        // Let's Disconnect.
                        _this5._log.info("Disconnecting...");
                        _this5._conn.Disconnect();
                        _this5._stopPeriodicPing();
                    }

                    _this5._missedPongsCount = 0;
                }, this._pongTimeout);
            } else {
                this._stopPeriodicPing();
                this._log.info("Cancelling periodic ping as were disconnected or not paired");
            }
        }

        // <summary>
        // We call this ourselves as soon as we're ready to transact with the PinPad after a connection is established.
        // This function is effectively called after we received the first Login Response from the PinPad.
        // </summary>

    }, {
        key: "_onReadyToTransact",
        value: function _onReadyToTransact() {
            this._log.info("On Ready To Transact!");

            // So, we have just made a connection, pinged and logged in successfully.
            this.CurrentStatus = SpiStatus.PairedConnected;

            if (this.CurrentFlow == SpiFlow.Transaction && !this.CurrentTxFlowState.Finished) {
                if (this.CurrentTxFlowState.RequestSent) {
                    // TH-3A - We've just reconnected and were in the middle of Tx.
                    // Let's get the last transaction to check what we might have missed out on.
                    this.CurrentTxFlowState.CallingGlt();
                    this._callGetLastTransaction();
                } else {
                    // TH-3AR - We had not even sent the request yet. Let's do that now
                    this._send(this.CurrentTxFlowState.Request);
                    this.CurrentTxFlowState.Sent("Sending Request Now...");
                    document.dispatchEvent(new CustomEvent('TxFlowStateChanged', { detail: this.CurrentTxFlowState }));
                }
            } else {
                // let's also tell the eftpos our latest table configuration.
                if (this._spiPat) {
                    this._spiPat.PushPayAtTableConfig();
                }
            }
        }

        // <summary>
        // When we disconnect, we should also stop the periodic ping.
        // </summary>

    }, {
        key: "_stopPeriodicPing",
        value: function _stopPeriodicPing() {
            if (this._periodicPingThread) {
                // If we were already set up, clean up before restarting.
                clearInterval(this._periodicPingThread);
                this._periodicPingThread = null;
            }
        }

        // Send a Ping to the Server

    }, {
        key: "_doPing",
        value: function _doPing() {
            var ping = PingHelper.GeneratePingRequest();
            this._mostRecentPingSent = ping;
            this._send(ping);
            this._mostRecentPingSentTime = Date.now();
        }

        // <summary>
        // Received a Pong from the server
        // </summary>
        // <param name="m"></param>

    }, {
        key: "_handleIncomingPong",
        value: function _handleIncomingPong(m) {
            // We need to maintain this time delta otherwise the server will not accept our messages.
            this._spiMessageStamp.ServerTimeDelta = m.GetServerTimeDelta();

            if (this._mostRecentPongReceived == null) {
                // First pong received after a connection, and after the pairing process is fully finalised.
                if (this.CurrentStatus != SpiStatus.Unpaired) {
                    this._log.info("First pong of connection and in paired state.");
                    this._onReadyToTransact();
                } else {
                    this._log.info("First pong of connection but pairing process not finalised yet.");
                }
            }

            this._mostRecentPongReceived = m;
            this._log.debug("PongLatency:" + (Date.now() - this._mostRecentPingSentTime));
        }

        // <summary>
        // The server will also send us pings. We need to reply with a pong so it doesn't disconnect us.
        // </summary>
        // <param name="m"></param>

    }, {
        key: "_handleIncomingPing",
        value: function _handleIncomingPing(m) {
            var pong = PongHelper.GeneratePongRessponse(m);
            this._send(pong);
        }

        // <summary>
        // Ask the PinPad to tell us what the Most Recent Transaction was
        // </summary>

    }, {
        key: "_callGetLastTransaction",
        value: function _callGetLastTransaction() {
            var gltRequest = new GetLastTransactionRequest();
            this._send(gltRequest.ToMessage());
        }

        // <summary>
        // This method will be called whenever we receive a message from the Connection
        // </summary>
        // <param name="messageJson"></param>

    }, {
        key: "_onSpiMessageReceived",
        value: function _onSpiMessageReceived(messageJson) {
            // First we parse the incoming message
            var m = Message.FromJson(messageJson.Message, this._secrets);
            this._log.info("Received:" + m.DecryptedJson);

            if (SpiPreauth.IsPreauthEvent(m.EventName)) {
                this._spiPreauth._handlePreauthMessage(m);
                return;
            }

            // And then we switch on the event type.
            switch (m.EventName) {
                case Events.KeyRequest:
                    this._handleKeyRequest(m);
                    break;
                case Events.KeyCheck:
                    this._handleKeyCheck(m);
                    break;
                case Events.PairResponse:
                    this._handlePairResponse(m);
                    break;
                case Events.DropKeysAdvice:
                    this._handleDropKeysAdvice(m);
                    break;
                case Events.PurchaseResponse:
                    this._handlePurchaseResponse(m);
                    break;
                case Events.RefundResponse:
                    this._handleRefundResponse(m);
                    break;
                case Events.CashoutOnlyResponse:
                    this._handleCashoutOnlyResponse(m);
                    break;
                case Events.MotoPurchaseResponse:
                    this._handleMotoPurchaseResponse(m);
                    break;
                case Events.SignatureRequired:
                    this._handleSignatureRequired(m);
                    break;
                case Events.AuthCodeRequired:
                    this._handleAuthCodeRequired(m);
                    break;
                case Events.GetLastTransactionResponse:
                    this._handleGetLastTransactionResponse(m);
                    break;
                case Events.SettleResponse:
                    this.HandleSettleResponse(m);
                    break;
                case Events.SettlementEnquiryResponse:
                    this._handleSettlementEnquiryResponse(m);
                    break;
                case Events.Ping:
                    this._handleIncomingPing(m);
                    break;
                case Events.Pong:
                    this._handleIncomingPong(m);
                    break;
                case Events.KeyRollRequest:
                    this._handleKeyRollingRequest(m);
                    break;
                case Events.PayAtTableGetTableConfig:
                    if (this._spiPat == null) {
                        this._send(PayAtTableConfig.FeatureDisableMessage(RequestIdHelper.Id("patconf")));
                        break;
                    }
                    this._spiPat._handleGetTableConfig(m);
                    break;
                case Events.PayAtTableGetBillDetails:
                    this._spiPat._handleGetBillDetailsRequest(m);
                    break;
                case Events.PayAtTableBillPayment:
                    this._spiPat._handleBillPaymentAdvice(m);
                    break;
                case Events.Error:
                    this._handleErrorEvent(m);
                    break;
                case Events.InvalidHmacSignature:
                    this._log.info("I could not verify message from Eftpos. You might have to Un-pair Eftpos and then reconnect.");
                    break;
                default:
                    this._log.info("I don't Understand Event: " + m.EventName + ", " + m.Data + ". Perhaps I have not implemented it yet.");
                    break;
            }
        }
    }, {
        key: "_onWsErrorReceived",
        value: function _onWsErrorReceived(error) {
            this._log.warn("Received WS Error: " + error.Message);
        }
    }, {
        key: "_send",
        value: function _send(message) {
            var json = message.ToJson(this._spiMessageStamp);
            if (this._conn.Connected) {
                this._log.info("Sending: " + message.DecryptedJson);
                this._conn.Send(json);
                return true;
            } else {
                this._log.info("Asked to send, but not connected: " + message.DecryptedJson);
                return false;
            }
        }
    }], [{
        key: "GetVersion",
        value: function GetVersion() {
            return '2.1.0';
        }
    }]);

    return Spi;
}();
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// <summary>
// Represents the 3 Pairing statuses that the Spi instanxce can be in.
// </summary>
var SpiStatus = {
    // <summary>
    // Paired and Connected
    // </summary>
    PairedConnected: 'PairedConnected',

    // <summary>
    // Paired but trying to establish a connection 
    // </summary>
    PairedConnecting: 'PairedConnecting',

    // <summary>
    // Unpaired
    // </summary>
    Unpaired: 'Unpaired'
};

// <summary>
// The Spi instance can be in one of these flows at any point in time.
// </summary>
var SpiFlow = {
    // <summary>
    // Currently going through the Pairing Process Flow.
    // Happens during the Unpaired SpiStatus.
    // </summary>
    Pairing: 'Pairing',

    // <summary>
    // Currently going through the transaction Process Flow.
    // Cannot happen in the Unpaired SpiStatus.
    // </summary>
    Transaction: 'Transaction',

    // <summary>
    // Not in any of the other states.
    // </summary>
    Idle: 'Idle'
};

// <summary>
// Represents the Pairing Flow State during the pairing process 
// </summary>

var PairingFlowState = function PairingFlowState(state) {
    _classCallCheck(this, PairingFlowState);

    // <summary>
    // Some text that can be displayed in the Pairing Process Screen
    // that indicates what the pairing process is up to.
    // </summary>
    this.Message = null;

    // <summary>
    // When true, it means that the EFTPOS is shoing the confirmation code,
    // and your user needs to press YES or NO on the EFTPOS.
    // </summary>
    this.AwaitingCheckFromEftpos = null;

    // <summary>
    // When true, you need to display the YES/NO buttons on you pairing screen
    // for your user to confirm the code.
    // </summary>
    this.AwaitingCheckFromPos = null;

    // <summary>
    // This is the confirmation code for the pairing process.
    // </summary>
    this.ConfirmationCode = null;

    // <summary>
    // Indicates whether the Pairing Flow has finished its job.
    // </summary>
    this.Finished = null;

    // <summary>
    // Indicates whether pairing was successful or not.
    // </summary>
    this.Successful = null;

    if (state) {
        Object.assign(this, state);
    }
};

var TransactionType = {
    Purchase: 'Purchase',
    Refund: 'Refund',
    CashoutOnly: 'CashoutOnly',
    MOTO: 'MOTO',
    Settle: 'Settle',
    SettlementEnquiry: 'SettlementEnquiry',
    GetLastTransaction: 'GetLastTransaction',

    Preauth: 'Preauth',
    AccountVerify: 'AccountVerify'
};

// <summary>
// Used as a return in the InitiateTx methods to signify whether 
// the transaction was initiated or not, and a reason to go with it.
// </summary>

var InitiateTxResult = function InitiateTxResult(initiated, message) {
    _classCallCheck(this, InitiateTxResult);

    // <summary>
    // Whether the tx was initiated.
    // When true, you can expect updated to your registered callback.
    // When false, you can retry calling the InitiateX method.
    // </summary>
    this.Initiated = initiated;

    // <summary>
    // Text that gives reason for the Initiated flag, especially in case of false. 
    // </summary>
    this.Message = message;
};

// <summary>
// Used as a return in calls mid transaction to let you know
// whether the call was valid or not.
// These attributes work for COM interop.
// </summary>


var MidTxResult =
// <summary>
// This default stucture works for COM interop.
// </summary>
function MidTxResult(valid, message) {
    _classCallCheck(this, MidTxResult);

    this.Valid = valid;
    this.Message = message;
};

// <summary>
// Represents the State during a TransactionFlow
// </summary>


var TransactionFlowState = function () {
    function TransactionFlowState(posRefId, type, amountCents, message, msg) {
        _classCallCheck(this, TransactionFlowState);

        // <summary>
        //  The id given to this transaction
        // </summary>
        this.PosRefId = posRefId;
        this.Id = posRefId; // obsolete, but let's maintain it for now, to mean same as PosRefId.

        // <summary>
        // Purchase/Refund/Settle/...
        // </summary>
        this.Type = type;

        // <summary>
        // A text message to display on your Transaction Flow Screen
        // </summary>
        this.DisplayMessage = msg;

        // <summary>
        // Amount in cents for this transaction
        // </summary>
        this.AmountCents = amountCents;

        // <summary>
        // Whther the request has been sent to the EFTPOS yet or not.
        // In the PairedConnecting state, the transaction is initiated
        // but the request is only sent once the connection is recovered.
        // </summary>
        this.RequestSent = false;

        // <summary>
        // The time when the request was sent to the EFTPOS.
        // </summary>
        this.RequestTime = null;

        // <summary>
        // The time when we last asked for an update, including the original request at first
        // </summary>
        this.LastStateRequestTime = null;

        // <summary>
        // Whether we're currently attempting to Cancel the transaction.
        // </summary>
        this.AttemptingToCancel = null;

        // <summary>
        // When this flag is on, you need to display the dignature accept/decline buttons in your 
        // transaction flow screen.
        // </summary>
        this.AwaitingSignatureCheck = false;

        // <summary>
        // When this flag is on, you need to show your user the phone number to call to get the authorisation code.
        // Then you need to provide your user means to enter that given code and submit it via SubmitAuthCode().
        // </summary>
        this.AwaitingPhoneForAuth = null;

        // <summary>
        // Whether this transaction flow is over or not.
        // </summary>
        this.Finished = false;

        // <summary>
        // The success state of this transaction. Starts off as Unknown.
        // When finished, can be Success, Failed OR Unknown.
        // </summary>
        this.Success = SuccessState.Unknown;

        // <summary>
        // The response at the end of the transaction. 
        // Might not be present in all edge cases.
        // You can then turn this Message into the appropriate structure,
        // such as PurchaseResponse, RefundResponse, etc
        // </summary>
        this.Response = null;

        // <summary>
        // The message the we received from EFTPOS that told us that signature is required.
        // </summary>
        this.SignatureRequiredMessage = null;

        // <summary>
        // The message the we received from EFTPOS that told us that Phone For Auth is required.
        // </summary>
        this.PhoneForAuthRequiredMessage = null;

        // <summary>
        // The time when the cancel attempt was made.
        // </summary>
        this.CancelAttemptTime = null;

        // <summary>
        // The request message that we are sending/sent to the server.
        // </summary>
        this.Request = message;

        // <summary>
        // Whether we're currently waiting for a Get Last Transaction Response to get an update. 
        // </summary>
        this.AwaitingGltResponse = null;
    }

    _createClass(TransactionFlowState, [{
        key: 'Sent',
        value: function Sent(msg) {
            this.RequestSent = true;
            this.RequestTime = Date.now();
            this.LastStateRequestTime = Date.now();
            this.DisplayMessage = msg;
        }
    }, {
        key: 'Cancelling',
        value: function Cancelling(msg) {
            this.AttemptingToCancel = true;
            this.CancelAttemptTime = Date.now();
            this.DisplayMessage = msg;
        }
    }, {
        key: 'CallingGlt',
        value: function CallingGlt() {
            this.AwaitingGltResponse = true;
            this.LastStateRequestTime = Date.now();
        }
    }, {
        key: 'GotGltResponse',
        value: function GotGltResponse() {
            this.AwaitingGltResponse = false;
        }
    }, {
        key: 'Failed',
        value: function Failed(response, msg) {
            this.Success = SuccessState.Failed;
            this.Finished = true;
            this.Response = response;
            this.DisplayMessage = msg;
        }
    }, {
        key: 'SignatureRequired',
        value: function SignatureRequired(spiMessage, msg) {
            this.SignatureRequiredMessage = spiMessage;
            this.AwaitingSignatureCheck = true;
            this.DisplayMessage = msg;
        }
    }, {
        key: 'SignatureResponded',
        value: function SignatureResponded(msg) {
            this.AwaitingSignatureCheck = false;
            this.DisplayMessage = msg;
        }
    }, {
        key: 'PhoneForAuthRequired',
        value: function PhoneForAuthRequired(spiMessage, msg) {
            this.PhoneForAuthRequiredMessage = spiMessage;
            this.AwaitingPhoneForAuth = true;
            this.DisplayMessage = msg;
        }
    }, {
        key: 'AuthCodeSent',
        value: function AuthCodeSent(msg) {
            this.AwaitingPhoneForAuth = false;
            this.DisplayMessage = msg;
        }
    }, {
        key: 'Completed',
        value: function Completed(state, response, msg) {
            this.Success = state;
            this.Response = response;
            this.Finished = true;
            this.AttemptingToCancel = false;
            this.AwaitingGltResponse = false;
            this.AwaitingSignatureCheck = false;
            this.AwaitingPhoneForAuth = false;
            this.DisplayMessage = msg;
        }
    }, {
        key: 'UnknownCompleted',
        value: function UnknownCompleted(msg) {
            this.Success = SuccessState.Unknown;
            this.Response = null;
            this.Finished = true;
            this.AttemptingToCancel = false;
            this.AwaitingGltResponse = false;
            this.AwaitingSignatureCheck = false;
            this.AwaitingPhoneForAuth = false;
            this.DisplayMessage = msg;
        }
    }]);

    return TransactionFlowState;
}();

// <summary>
// Used as a return in the SubmitAuthCode method to signify whether Code is valid
// </summary>


var SubmitAuthCodeResult = function () {
    function SubmitAuthCodeResult() {
        _classCallCheck(this, SubmitAuthCodeResult);
    }

    _createClass(SubmitAuthCodeResult, [{
        key: 'SubmitAuthCodeResult',
        value: function SubmitAuthCodeResult(validFormat, message) {
            this.ValidFormat = validFormat;

            // <summary>
            // Text that gives reason for Invalidity
            // </summary>
            this.Message = message;
        }
    }]);

    return SubmitAuthCodeResult;
}();

var SpiConfig = function () {
    function SpiConfig() {
        _classCallCheck(this, SpiConfig);

        this.PromptForCustomerCopyOnEftpos = false;
        this.SignatureFlowOnEftpos = false;
    }

    _createClass(SpiConfig, [{
        key: 'addReceiptConfig',
        value: function addReceiptConfig(messageData) {
            if (this.PromptForCustomerCopyOnEftpos) {
                messageData.prompt_for_customer_copy = this.PromptForCustomerCopyOnEftpos;
            }
            if (this.SignatureFlowOnEftpos) {
                messageData.print_for_signature_required_transactions = this.SignatureFlowOnEftpos;
            }

            return messageData;
        }
    }, {
        key: 'ToString',
        value: function ToString() {
            return 'PromptForCustomerCopyOnEftpos:' + this.PromptForCustomerCopyOnEftpos + ' SignatureFlowOnEftpos:' + this.SignatureFlowOnEftpos;
        }
    }]);

    return SpiConfig;
}();
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SpiPayAtTable = function () {
    function SpiPayAtTable(spi) {
        _classCallCheck(this, SpiPayAtTable);

        this._spi = spi;
        this._log = console;

        this.Config = Object.assign(new PayAtTableConfig(), {
            OperatorIdEnabled: true,
            AllowedOperatorIds: [],
            EqualSplitEnabled: true,
            SplitByAmountEnabled: true,
            SummaryReportEnabled: true,
            TippingEnabled: true,
            LabelOperatorId: "Operator ID",
            LabelPayButton: "Pay at Table",
            LabelTableId: "Table Number"
        });
    }

    // <summary>
    // This delegate will be called when the Eftpos needs to know the current state of a bill for a table. 
    // <para />
    // Parameters:<para />
    // billId - The unique identifier of the bill. If empty, it means that the PayAtTable flow on the Eftpos is just starting, and the lookup is by tableId.<para />
    // tableId - The identifier of the table that the bill is for. <para />
    // operatorId - The id of the operator entered on the eftpos. <para />
    // <para />
    // Return:<para />
    // You need to return the current state of the bill.
    // </summary>


    _createClass(SpiPayAtTable, [{
        key: "GetBillStatus",
        value: function GetBillStatus(billId, tableId, operatorId) {
            throw new Exception('Method not implemented. Please overwrite this method in your POS');
        }

        // Abstract method, must implement in POS system

    }, {
        key: "BillPaymentReceived",
        value: function BillPaymentReceived(billPayment, updatedBillData) {
            throw new Exception('Method not implemented. Please overwrite this method in your POS');
        }
    }, {
        key: "PushPayAtTableConfig",
        value: function PushPayAtTableConfig() {
            this._spi._send(this.Config.ToMessage(RequestIdHelper.Id("patconf")));
        }
    }, {
        key: "_handleGetBillDetailsRequest",
        value: function _handleGetBillDetailsRequest(m) {
            var operatorId = m.Data["operator_id"];
            var tableId = m.Data["table_id"];

            // Ask POS for Bill Details for this tableId, inluding encoded PaymentData
            var billStatus = this.GetBillStatus(null, tableId, operatorId);
            billStatus.TableId = tableId;
            if (billStatus.TotalAmount <= 0) {
                this._log.info("Table has 0 total amount. not sending it to eftpos.");
                billStatus.Result = BillRetrievalResult.INVALID_TABLE_ID;
            }

            this._spi._send(billStatus.ToMessage(m.Id));
        }
    }, {
        key: "_handleBillPaymentAdvice",
        value: function _handleBillPaymentAdvice(m) {
            var billPayment = new BillPayment(m);

            // Ask POS for Bill Details, inluding encoded PaymentData
            var existingBillStatus = this.GetBillStatus(billPayment.BillId, billPayment.TableId, billPayment.OperatorId);
            if (existingBillStatus.Result != BillRetrievalResult.SUCCESS) {
                this._log.warn("Could not retrieve Bill Status for Payment Advice. Sending Error to Eftpos.");
                this._spi._send(existingBillStatus.ToMessage(m.Id));
            }

            var existingPaymentHistory = existingBillStatus.getBillPaymentHistory();

            var foundExistingEntry = existingPaymentHistory.find(function (phe) {
                return phe.GetTerminalRefId() == billPayment.PurchaseResponse.GetTerminalReferenceId();
            });
            if (foundExistingEntry) {
                // We have already processed this payment.
                // perhaps Eftpos did get our acknowledgement.
                // Let's update Eftpos.
                this._log.warn("Had already received this bill_paymemnt advice from eftpos. Ignoring.");
                this._spi._send(existingBillStatus.ToMessage(m.Id));
                return;
            }

            // Let's add the new entry to the history
            var updatedHistoryEntries = existingPaymentHistory;
            updatedHistoryEntries.push(new PaymentHistoryEntry(billPayment.PaymentType.toLowerCase(), billPayment.PurchaseResponse.ToPaymentSummary()));

            var updatedBillData = BillStatusResponse.ToBillData(updatedHistoryEntries);

            // Advise POS of new payment against this bill, and the updated BillData to Save.
            var updatedBillStatus = this.BillPaymentReceived(billPayment, updatedBillData);

            // Just in case client forgot to set these:
            updatedBillStatus.BillId = billPayment.BillId;
            updatedBillStatus.TableId = billPayment.TableId;

            if (updatedBillStatus.Result != BillRetrievalResult.SUCCESS) {
                this._log.warn("POS Errored when being Advised of Payment. Letting EFTPOS know, and sending existing bill data.");
                updatedBillStatus.BillData = existingBillStatus.BillData;
            } else {
                updatedBillStatus.BillData = updatedBillData;
            }

            this._spi._send(updatedBillStatus.ToMessage(m.Id));
        }
    }, {
        key: "_handleGetTableConfig",
        value: function _handleGetTableConfig(m) {
            this._spi._send(this.Config.ToMessage(m.Id));
        }
    }]);

    return SpiPayAtTable;
}();
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SpiPreauth = function () {
    function SpiPreauth(spi) {
        _classCallCheck(this, SpiPreauth);

        this._spi = spi;
        this._log = console;
    }

    _createClass(SpiPreauth, [{
        key: "InitiateAccountVerifyTx",
        value: function InitiateAccountVerifyTx(posRefId) {
            var verifyMsg = new AccountVerifyRequest(posRefId).ToMessage();
            var tfs = new TransactionFlowState(posRefId, TransactionType.AccountVerify, 0, verifyMsg, "Waiting for EFTPOS connection to make account verify request");
            var sentMsg = "Asked EFTPOS to verify account";
            return this._initiatePreauthTx(tfs, sentMsg);
        }
    }, {
        key: "InitiateOpenTx",
        value: function InitiateOpenTx(posRefId, amountCents) {
            var msg = new PreauthOpenRequest(amountCents, posRefId).ToMessage();
            var tfs = new TransactionFlowState(posRefId, TransactionType.Preauth, amountCents, msg, "Waiting for EFTPOS connection to make preauth request for " + (amountCents / 100.0).toFixed(2));
            var sentMsg = "Asked EFTPOS to create preauth for " + (amountCents / 100.0).toFixed(2);
            return this._initiatePreauthTx(tfs, sentMsg);
        }
    }, {
        key: "InitiateTopupTx",
        value: function InitiateTopupTx(posRefId, preauthId, amountCents) {
            var msg = new PreauthTopupRequest(preauthId, amountCents, posRefId).ToMessage();
            var tfs = new TransactionFlowState(posRefId, TransactionType.Preauth, amountCents, msg, "Waiting for EFTPOS connection to make preauth topup request for " + (amountCents / 100.0).toFixed(2));
            var sentMsg = "Asked EFTPOS to make preauth topup for " + (amountCents / 100.0).toFixed(2);
            return this._initiatePreauthTx(tfs, sentMsg);
        }
    }, {
        key: "InitiatePartialCancellationTx",
        value: function InitiatePartialCancellationTx(posRefId, preauthId, amountCents) {
            var msg = new PreauthPartialCancellationRequest(preauthId, amountCents, posRefId).ToMessage();
            var tfs = new TransactionFlowState(posRefId, TransactionType.Preauth, amountCents, msg, "Waiting for EFTPOS connection to make preauth partial cancellation request for " + (amountCents / 100.0).toFixed(2));
            var sentMsg = "Asked EFTPOS to make preauth partial cancellation for " + (amountCents / 100.0).toFixed(2);
            return this._initiatePreauthTx(tfs, sentMsg);
        }
    }, {
        key: "InitiateExtendTx",
        value: function InitiateExtendTx(posRefId, preauthId) {
            var msg = new PreauthExtendRequest(preauthId, posRefId).ToMessage();
            var tfs = new TransactionFlowState(posRefId, TransactionType.Preauth, 0, msg, "Waiting for EFTPOS connection to make preauth Extend request");
            var sentMsg = "Asked EFTPOS to make preauth Extend request";
            return this._initiatePreauthTx(tfs, sentMsg);
        }
    }, {
        key: "InitiateCompletionTx",
        value: function InitiateCompletionTx(posRefId, preauthId, amountCents) {
            var msg = new PreauthCompletionRequest(preauthId, amountCents, posRefId).ToMessage();
            var tfs = new TransactionFlowState(posRefId, TransactionType.Preauth, amountCents, msg, "Waiting for EFTPOS connection to make preauth completion request for " + (amountCents / 100.0).toFixed(2));
            var sentMsg = "Asked EFTPOS to make preauth completion for " + (amountCents / 100.0).toFixed(2);
            return this._initiatePreauthTx(tfs, sentMsg);
        }
    }, {
        key: "InitiateCancelTx",
        value: function InitiateCancelTx(posRefId, preauthId) {
            var msg = new PreauthCancelRequest(preauthId, posRefId).ToMessage();
            var tfs = new TransactionFlowState(posRefId, TransactionType.Preauth, 0, msg, "Waiting for EFTPOS connection to make preauth cancellation request");
            var sentMsg = "Asked EFTPOS to make preauth cancellation request";
            return this._initiatePreauthTx(tfs, sentMsg);
        }
    }, {
        key: "_initiatePreauthTx",
        value: function _initiatePreauthTx(tfs, sentMsg) {
            if (this._spi.CurrentStatus == SpiStatus.Unpaired) return new InitiateTxResult(false, "Not Paired");

            if (this._spi.CurrentFlow != SpiFlow.Idle) return new InitiateTxResult(false, "Not Idle");

            this._spi.CurrentFlow = SpiFlow.Transaction;
            this._spi.CurrentTxFlowState = tfs;
            if (this._spi._send(tfs.Request)) {
                this._spi.CurrentTxFlowState.Sent(sentMsg);
            }

            document.dispatchEvent(new CustomEvent('TxFlowStateChanged', { detail: this._spi.CurrentTxFlowState }));
            return new InitiateTxResult(true, "Preauth Initiated");
        }
    }, {
        key: "_handlePreauthMessage",
        value: function _handlePreauthMessage(m) {
            switch (m.EventName) {
                case PreauthEvents.AccountVerifyResponse:
                    this._handleAccountVerifyResponse(m);
                    break;
                case PreauthEvents.PreauthOpenResponse:
                case PreauthEvents.PreauthTopupResponse:
                case PreauthEvents.PreauthPartialCancellationResponse:
                case PreauthEvents.PreauthExtendResponse:
                case PreauthEvents.PreauthCompleteResponse:
                case PreauthEvents.PreauthCancellationResponse:
                    this._handlePreauthResponse(m);
                    break;
                default:
                    this._log.info("I don't Understand Preauth Event: " + m.EventName + ", " + m.Data + ". Perhaps I have not implemented it yet.");
                    break;
            }
        }
    }, {
        key: "_handleAccountVerifyResponse",
        value: function _handleAccountVerifyResponse(m) {
            var incomingPosRefId = m.Data.pos_ref_id;
            var currentTxFlowState = this._spi.CurrentTxFlowState;
            if (this._spi.CurrentFlow != SpiFlow.Transaction || currentTxFlowState.Finished || !currentTxFlowState.PosRefId === incomingPosRefId) {
                this._log.info("Received Account Verify response but I was not waiting for one. Incoming Pos Ref ID: " + incomingPosRefId);
                return;
            }
            // TH-1A, TH-2A

            currentTxFlowState.Completed(m.GetSuccessState(), m, "Account Verify Transaction Ended.");
            // TH-6A, TH-6E

            document.dispatchEvent(new CustomEvent('TxFlowStateChanged', { detail: this._spi.CurrentTxFlowState }));
        }
    }, {
        key: "_handlePreauthResponse",
        value: function _handlePreauthResponse(m) {
            var incomingPosRefId = m.Data.pos_ref_id;
            var currentTxFlowState = this._spi.CurrentTxFlowState;
            if (this._spi.CurrentFlow != SpiFlow.Transaction || currentTxFlowState.Finished || !currentTxFlowState.PosRefId === incomingPosRefId) {
                this._log.info("Received Preauth response but I was not waiting for one. Incoming Pos Ref ID: " + incomingPosRefId);
                return;
            }
            // TH-1A, TH-2A

            currentTxFlowState.Completed(m.GetSuccessState(), m, "Preauth Transaction Ended.");
            // TH-6A, TH-6E

            document.dispatchEvent(new CustomEvent('TxFlowStateChanged', { detail: this._spi.CurrentTxFlowState }));
        }
    }], [{
        key: "IsPreauthEvent",
        value: function IsPreauthEvent(eventName) {
            return eventName.lastIndexOf("preauth", 0) === 0 || eventName == PreauthEvents.PreauthCompleteResponse || eventName == PreauthEvents.PreauthCompleteRequest || eventName == PreauthEvents.AccountVerifyRequest || eventName == PreauthEvents.AccountVerifyResponse;
        }
    }]);

    return SpiPreauth;
}();
