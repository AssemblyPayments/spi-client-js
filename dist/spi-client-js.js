'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ConnectionState = {
    Disconnected: 'Disconnected',
    Connecting: 'Connecting',
    Connected: 'Connected'
};

var SPI_PROTOCOL = 'spi.2.0.0';

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

            document.dispatchEvent(new CustomEvent('ConnectionStatusChanged', { detail: this.State }));
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
            document.dispatchEvent(new CustomEvent('ConnectionStatusChanged', { detail: this.State }));
        }
    }, {
        key: 'onClosed',
        value: function onClosed() {
            this.Connected = false;
            this.State = ConnectionState.Disconnected;
            this._ws = null;
            document.dispatchEvent(new CustomEvent('ConnectionStatusChanged', { detail: this.State }));
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
            document.dispatchEvent(new CustomEvent('MessageReceived', { detail: message }));
        }
    }, {
        key: 'onError',
        value: function onError(err) {
            document.dispatchEvent(new CustomEvent('ErrorReceived', { detail: err }));
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

    /// <summary>
    /// Encrypt a block using CBC and PKCS7.
    /// </summary>
    /// <param name="key">The key value</param>
    /// <param name="data">The message to encrypt</param>
    /// <returns>Returns the resulting encrypted string data as HEX.</returns>


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

        /// <summary>
        /// Decrypt a block using a CBC and PKCS7.
        /// </summary>
        /// <param name="key">The key value</param>
        /// <param name="data">the data to decrypt</param>
        /// <returns>Returns the resulting data decrypted in plaintext.</returns>

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

        /// <summary>
        /// Calculates the HMACSHA256 signature of a message.
        /// </summary>
        /// <param name="key">The Hmac Key as HEX</param>
        /// <param name="messageToSign">The message to sign</param>
        /// <returns>The HMACSHA256 signature as a hex string</returns>

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

/// <summary>
/// This class implements the Diffie-Hellman algorithm using BigIntegers.
/// It can do the 3 main things:
/// 1. Generate a random Private Key for you.
/// 2. Generate your Public Key based on your Private Key.
/// 3. Generate the Secret given their Public Key and your Private Key
/// p and g are the shared constants for the algorithm, aka primeP and primeG.
/// </summary>
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

    /// <summary>
    /// Generates a random Private Key that you can use.
    /// </summary>
    /// <param name="p"></param>
    /// <returns>Random Private Key</returns>


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

        /// <summary>
        /// Calculates the Public Key from a Private Key.
        /// </summary>
        /// <param name="p"></param>
        /// <param name="g"></param>
        /// <param name="privateKey"></param>
        /// <returns>Public Key (Hex)</returns>

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

        /// <summary>
        /// Calculates the shared secret given their Public Key (A) and your Private Key (b)
        /// </summary>
        /// <param name="p"></param>
        /// <param name="theirPublicKey"></param>
        /// <param name="yourPrivateKey"></param>
        /// <returns></returns>

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

var LoginRequest = function () {
    function LoginRequest() {
        _classCallCheck(this, LoginRequest);
    }

    _createClass(LoginRequest, [{
        key: "ToMessage",
        value: function ToMessage() {
            return new Message(RequestIdHelper.Id("l"), Events.LoginRequest, null, true);
        }
    }]);

    return LoginRequest;
}();

var LoginResponse = function () {
    function LoginResponse(m) {
        _classCallCheck(this, LoginResponse);

        this.Success = m.Data.success;
        this.Expires = m.Data.expires_datetime;
    }

    _createClass(LoginResponse, [{
        key: "ExpiringSoon",
        value: function ExpiringSoon(serverTimeDelta) {
            var now = Date.now();
            var nowServerTime = new Date(Date.now() + serverTimeDelta);
            var expiresAt = Date.parse(this.Expires);
            var tenMinInMs = 10 * 60 * 1000;
            var nowServerTimePlusTenMin = new Date(nowServerTime.getTime() + tenMinInMs);

            return expiresAt < nowServerTimePlusTenMin.getTime();
        }
    }]);

    return LoginResponse;
}();
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LoginHelper = function () {
    function LoginHelper() {
        _classCallCheck(this, LoginHelper);
    }

    _createClass(LoginHelper, null, [{
        key: "NewLoginRequest",
        value: function NewLoginRequest() {
            return new LoginRequest();
        }
    }]);

    return LoginHelper;
}();
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/// <summary>
/// Events statically declares the various event names in messages.
/// </summary>
var Events = {
    PairRequest: "pair_request",
    KeyRequest: "key_request",
    KeyResponse: "key_response",
    KeyCheck: "key_check",
    PairResponse: "pair_response",

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

    SettleRequest: "settle",
    SettleResponse: "settle_response",

    KeyRollRequest: "request_use_next_keys",
    KeyRollResponse: "response_use_next_keys",

    Error: "error",

    InvalidHmacSignature: "_INVALID_SIGNATURE_"
};

var SuccessState = {
    Unknown: 'Unknown', Success: 'Success', Failed: 'Failed'
};

/// <summary>
/// MessageStamp represents what is required to turn an outgoing Message into Json
/// including encryption and date setting.
/// </summary>

var MessageStamp = function MessageStamp(posId, secrets, serverTimeDelta) {
    _classCallCheck(this, MessageStamp);

    this.PosId = posId;
    this.Secrets = secrets;
    this.ServerTimeDelta = serverTimeDelta;
};

/// <summary>
/// MessageEnvelope represents the outer structure of any message that is exchanged
/// between the Pos and the PinPad and vice-versa.
/// See http://www.simplepaymentapi.com/#/api/message-encryption
/// </summary>


var MessageEnvelope = function () {
    function MessageEnvelope(message, enc, hmac, posId) {
        _classCallCheck(this, MessageEnvelope);

        /// <summary>
        /// The Message field is set only when in Un-encrypted form.
        /// In fact it is the only field in an envelope in the Un-Encrypted form.
        /// </summary>
        this.Message = message;

        /// <summary>
        /// The enc field is set only when in Encrypted form.
        /// It contains the encrypted Json of another MessageEnvelope 
        /// </summary>
        this.Enc = enc;

        /// <summary>
        /// The hmac field is set only when in Encrypted form.
        /// It is the signature of the "enc" field.
        /// </summary>
        this.Hmac = hmac;

        /// <summary>
        /// The pos_id field is only filled for outgoing Encrypted messages.
        /// </summary>
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

/// <summary>
/// Message represents the contents of a Message.
/// See http://www.simplepaymentapi.com/#/api/message-encryption
/// </summary>


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
            return this.Data.error_reason ? this.Data.error_reason : "NONE";
        }
    }, {
        key: "GetServerTimeDelta",
        value: function GetServerTimeDelta() {
            var now = Date.now();
            var msgTime = Date.parse(this.DateTimeStamp);
            // let tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
            return msgTime - now;
        }
    }, {
        key: "ToJson",
        value: function ToJson(stamp) {
            var now = Date.now();
            var tzoffset = new Date().getTimezoneOffset() * 60000; //offset in milliseconds
            var adjustedTime = new Date(Date.now() - tzoffset + stamp.ServerTimeDelta);

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
        key: "FromJson",
        value: function FromJson(msgJson, secrets) {
            var env = JSON.parse(msgJson);

            if (env.message != null) {
                var message = new Message(env.message.id, env.message.event, env.message.data, false);
                message.DecryptedJson = msgJson;
                return message;
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
                return new Message("Unknown", "unparseable", { "msg": decryptedJson }, false);
            }
        }
    }]);

    return Message;
}();
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/// <summary>
/// Pairing Interaction 1: Outgoing
/// </summary>
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

/// Pairing Interaction 2: Incoming


var KeyRequest = function KeyRequest(m) {
    _classCallCheck(this, KeyRequest);

    this.RequestId = m.Id;
    this.Aenc = m.Data.enc.A;
    this.Ahmac = m.Data.hmac.A;
};

/// Pairing Interaction 3: Outgoing


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

/// Pairing Interaction 4: Incoming


var KeyCheck = function KeyCheck(m) {
    _classCallCheck(this, KeyCheck);

    this.ConfirmationCode = m.IncomingHmac.substring(0, 6);
};

/// Pairing Interaction 5: Incoming


var PairResponse = function PairResponse(m) {
    _classCallCheck(this, PairResponse);

    this.Success = m.Data.success;
};

/// Holder class for Secrets and KeyResponse, so that we can use them together in method signatures.


var SecretsAndKeyResponse = function SecretsAndKeyResponse(secrets, keyResponse) {
    _classCallCheck(this, SecretsAndKeyResponse);

    this.Secrets = secrets;
    this.KeyResponse = keyResponse;
};
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// This is the generator used for diffie-hellman in 2048-bit MODP Group 14 as per (https://tools.ietf.org/html/rfc3526#section-3)
var GENERATOR = 2;

// This is the prime used for diffie-hellman using 2048-bit MODP Group 14 as per (https://tools.ietf.org/html/rfc3526#section-3)
var GROUP14_2048_BIT_MODP = 'FFFFFFFFFFFFFFFFC90FDAA22168C234C4C6628B80DC1CD129024E088A67CC74020BBEA63B139B22514A08798E3404DDEF9519B3CD3A431B302B0A6DF25F14374FE1356D6D51C245E485B576625E7EC6F44C42E9A637ED6B0BFF5CB6F406B7EDEE386BFB5A899FA5AE9F24117C4B1FE649286651ECE45B3DC2007CB8A163BF0598DA48361C55D39A69163FA8FD24CF5F83655D23DCA3AD961C62F356208552BB9ED529077096966D670C354E4ABC9804F1746C08CA18217C32905E462E36CE3BE39E772C180E86039B2783A2EC07A28FB5C55DF06F4C52C9DE2BCBF6955817183995497CEA956AE515D2261898FA051015728E5A8AACAA68FFFFFFFFFFFFFFFF';

/// <summary>
/// This static class helps you with the pairing process as documented here:
/// http://www.simplepaymentapi.com/#/api/pairing-process
/// </summary>

var PairingHelper = function () {
    function PairingHelper() {
        _classCallCheck(this, PairingHelper);
    }

    _createClass(PairingHelper, [{
        key: 'GenerateSecretsAndKeyResponse',


        /// <summary>
        /// Calculates/Generates Secrets and KeyResponse given an incoming KeyRequest.
        /// </summary>
        /// <param name="keyRequest"></param>
        /// <returns>Secrets and KeyResponse to send back.</returns>
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

        /// <summary>
        /// Turns an incoming "A" value from the PinPad into the outgoing "B" value 
        /// and the secret value using DiffieHelmman helper.
        /// </summary>
        /// <param name="theirPublicKey">The incoming A value</param>
        /// <returns>Your B value and the Secret</returns>

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

        /// <summary>
        /// Converts the DH secret BigInteger into the hex-string to be used as the secret.
        /// There are some "gotchyas" here which is why this piece of work is abstracted so it can be tested separately.
        /// See: http://www.simplepaymentapi.com/#/api/pairing-process
        /// </summary>
        /// <param name="secretBI">Secret as BigInteger</param>
        /// <returns>Secret as Hex-String</returns>

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

        /// <summary>
        /// Generates a pairing Request.
        /// </summary>
        /// <returns>New PairRequest</returns>
        value: function NewPairRequest() {
            return new PairRequest();
        }
    }]);

    return PairingHelper;
}();

/// <summary>
/// Internal Holder class for Public and Secret, so that we can use them together in method signatures. 
/// </summary>


var PublicKeyAndSecret = function PublicKeyAndSecret(myPublicKey, sharedSecretKey) {
    _classCallCheck(this, PublicKeyAndSecret);

    this.MyPublicKey = myPublicKey;
    this.SharedSecretKey = sharedSecretKey;
};
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
    function PurchaseRequest(amountCents, id) {
        _classCallCheck(this, PurchaseRequest);

        this.AmountCents = amountCents;
        this.Id = id;
    }

    _createClass(PurchaseRequest, [{
        key: "ToMessage",
        value: function ToMessage() {
            var data = {
                amount_purchase: this.AmountCents
            };

            return new Message(this.Id, Events.PurchaseRequest, data, true);
        }
    }]);

    return PurchaseRequest;
}();

var PurchaseResponse = function () {
    function PurchaseResponse(m) {
        _classCallCheck(this, PurchaseResponse);

        this.RequestId = m.Id;
        this._m = m;
        this.SchemeName = m.Data.scheme_name;
        this.Success = m.GetSuccessState() == SuccessState.Success;
    }

    _createClass(PurchaseResponse, [{
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
            return this._m.Data.merchant_receipt || "";
        }
    }, {
        key: "GetResponseText",
        value: function GetResponseText() {
            return this._m.Data.host_response_text || "";
        }
    }, {
        key: "GetResponseValue",
        value: function GetResponseValue(attribute) {
            return this._m.Data[attribute];
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
    function GetLastTransactionRequest(id) {
        _classCallCheck(this, GetLastTransactionRequest);

        this.Id = id;
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
        this.Success = m.GetSuccessState() === SuccessState.Success;
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
        key: "GetSuccessState",
        value: function GetSuccessState() {
            return this._m.GetSuccessState();
        }
    }, {
        key: "GetResponseText",
        value: function GetResponseText() {
            return this._m.Data.host_response_text | "";
        }
    }, {
        key: "GetMerchantReceipt",
        value: function GetMerchantReceipt() {
            return this._m.Data.merchant_receipt || "";
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
        key: "GetSchemeApp",
        value: function GetSchemeApp() {
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
        key: "GetResponseValue",
        value: function GetResponseValue(attribute) {
            return this._m.Data[attribute];
        }

        /// <summary>
        /// There is a bug, VSV-920, whereby the customer_receipt is missing from a glt response.
        /// The current recommendation is to use the merchant receipt in place of it if required.
        /// This method modifies the underlying incoming message data by copying
        /// the merchant receipt into the customer receipt only if there 
        /// is a merchant_receipt and there is not a customer_receipt.   
        /// </summary>

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
    function RefundRequest(amountCents, id) {
        _classCallCheck(this, RefundRequest);

        this.AmountCents = amountCents;
        this.Id = id;
    }

    _createClass(RefundRequest, [{
        key: "ToMessage",
        value: function ToMessage() {
            var data = { amount_purchase: this.AmountCents };
            return new Message(this.Id, Events.RefundRequest, data, true);
        }
    }]);

    return RefundRequest;
}();

var RefundResponse = function () {
    function RefundResponse(m) {
        _classCallCheck(this, RefundResponse);

        this.RequestId = m.Id;
        this._m = m;
        this.SchemeName = m.Data.scheme_name;
        this.Success = m.GetSuccessState() == SuccessState.Success;
    }

    _createClass(RefundResponse, [{
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
        this._m = m;
    }

    _createClass(SignatureRequired, [{
        key: "GetMerchantReceipt",
        value: function GetMerchantReceipt() {
            return this._m.Data.merchant_receipt;
        }
    }]);

    return SignatureRequired;
}();

var SignatureDecline = function () {
    function SignatureDecline(signatureRequiredRequestId) {
        _classCallCheck(this, SignatureDecline);

        this.SignatureRequiredRequestId = signatureRequiredRequestId;
    }

    _createClass(SignatureDecline, [{
        key: "ToMessage",
        value: function ToMessage() {
            return new Message(this.SignatureRequiredRequestId, Events.SignatureDeclined, null, true);
        }
    }]);

    return SignatureDecline;
}();

var SignatureAccept = function () {
    function SignatureAccept(signatureRequiredRequestId) {
        _classCallCheck(this, SignatureAccept);

        this.SignatureRequiredRequestId = signatureRequiredRequestId;
    }

    _createClass(SignatureAccept, [{
        key: "ToMessage",
        value: function ToMessage() {
            return new Message(this.SignatureRequiredRequestId, Events.SignatureAccepted, null, true);
        }
    }]);

    return SignatureAccept;
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
            return new Message(RequestIdHelper.Id("stl"), Events.SettleRequest, null, true);
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
        key: "GetResponseText",
        value: function GetResponseText() {
            return this._m.Data.host_response_text;
        }
    }, {
        key: "GetReceipt",
        value: function GetReceipt() {
            return this._m.Data.merchant_receipt;
        }
    }]);

    return Settlement;
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

    function Spi(posId, eftposAddress, secrets, log) {
        _classCallCheck(this, Spi);

        this._posId = posId;
        this._secrets = secrets;
        this._eftposAddress = "ws://" + eftposAddress;
        this._log = console;

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

        this._resetConn();
    }

    _createClass(Spi, [{
        key: "Start",
        value: function Start() {

            this._startTransactionMonitoringThread();

            this.CurrentFlow = SpiFlow.Idle;
            if (this._secrets != null) {
                this._currentStatus = SpiStatus.PairedConnecting;
                this._conn.Connect(); // This is non-blocking
            } else {
                this._currentStatus = SpiStatus.Unpaired;
            }
        }

        /// <summary>
        /// Allows you to set the PosId which identifies this instance of your POS.
        /// Can only be called in thge Unpaired state. 
        /// </summary>

    }, {
        key: "SetPosId",
        value: function SetPosId(posId) {
            if (this.CurrentStatus != SpiStatus.Unpaired) return false;

            this._posId = posId;
            this._spiMessageStamp.PosId = posId;
            return true;
        }

        /// <summary>
        /// Allows you to set the PinPad address. Sometimes the PinPad might change IP address 
        /// (we recommend reserving static IPs if possible).
        /// Either way you need to allow your User to enter the IP address of the PinPad.
        /// </summary>

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

        /// <summary>
        /// Call this one when a flow is finished and you want to go back to idle state.
        /// Typically when your user clicks the "OK" bubtton to acknowldge that pairing is
        /// finished, or that transaction is finished.
        /// When true, you can dismiss the flow screen and show back the idle screen.
        /// </summary>
        /// <returns>true means we have moved back to the Idle state. false means current flow was not finished yet.</returns>

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

        /// <summary>
        /// This will connect to the Eftpos and start the pairing process.
        /// Only call this if you are in the Unpaired state.
        /// Subscribe to the PairingFlowStateChanged event to get updates on the pairing process.
        /// </summary>

    }, {
        key: "Pair",
        value: function Pair() {
            if (this.CurrentStatus != SpiStatus.Unpaired) {
                return;
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
        }

        /// <summary>
        /// Call this when your user clicks yes to confirm the pairing code on your 
        /// screen matches the one on the Eftpos.
        /// </summary>

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
                this.CurrentPairingFlowState.Message = "Click YES on EFTPOS if code is: " + this.CurrentPairingFlowState.ConfirmationCode;
            } else {
                // Already confirmed from Eftpos - So all good now. We're Paired also from the POS perspective.
                this.CurrentPairingFlowState.Message = "Pairing Successful";
                this._onPairingSuccess();
                this._onReadyToTransact();
            }
            document.dispatchEvent(new CustomEvent('PairingFlowStateChanged', { detail: this.CurrentPairingFlowState }));
        }

        /// <summary>
        /// Call this if your user clicks CANCEL or NO during the pairing process.
        /// </summary>

    }, {
        key: "PairingCancel",
        value: function PairingCancel() {
            if (this.CurrentFlow != SpiFlow.Pairing || this.CurrentPairingFlowState.Finished) {
                return;
            }

            this.CurrentPairingFlowState.Message = "Pairing Canelled";
            this._onPairingFailed();

            document.dispatchEvent(new CustomEvent('PairingFlowStateChanged', { detail: this.CurrentPairingFlowState }));
        }

        /// <summary>
        /// Call this when your uses clicks the Unpair button.
        /// This will disconnect from the Eftpos and forget the secrets.
        /// The CurrentState is then changed to Unpaired.
        /// Call this only if you are not yet in the Unpaired state.
        /// </summary>

    }, {
        key: "Unpair",
        value: function Unpair() {
            if (this.CurrentStatus == SpiStatus.Unpaired) {
                return false;
            }

            if (this.CurrentFlow != SpiFlow.Idle) {
                return false;
            }

            this.CurrentStatus = SpiStatus.Unpaired;

            this._conn.Disconnect();
            this._secrets = null;
            this._spiMessageStamp.Secrets = null;
            document.dispatchEvent(new CustomEvent('SecretsChanged', { detail: this._secrets }));
            return true;
        }

        /// <summary>
        /// Initiates a purchase transaction. Be subscribed to TxFlowStateChanged event to get updates on the process.
        /// </summary>
        /// <param name="id">Alphanumeric Identifier for your purchase.</param>
        /// <param name="amountCents">Amount in Cents to charge</param>
        /// <returns>InitiateTxResult</returns>

    }, {
        key: "InitiatePurchaseTx",
        value: function InitiatePurchaseTx(id, amountCents) {
            if (this.CurrentStatus == SpiStatus.Unpaired) {
                return new InitiateTxResult(false, "Not Paired");
            }

            if (this.CurrentFlow != SpiFlow.Idle) {
                return new InitiateTxResult(false, "Not Idle");
            }

            var purchase = PurchaseHelper.CreatePurchaseRequest(amountCents, id);
            this.CurrentFlow = SpiFlow.Transaction;
            this.CurrentTxFlowState = new TransactionFlowState(id, TransactionType.Purchase, amountCents, purchase.ToMessage(), "Waiting for EFTPOS connection to make payment request for " + amountCents / 100.0);
            if (this._send(purchase.ToMessage())) {
                this.CurrentTxFlowState.Sent("Asked EFTPOS to accept payment for " + amountCents / 100.0);
            }

            document.dispatchEvent(new CustomEvent('TxFlowStateChanged', { detail: this.CurrentTxFlowState }));
            return new InitiateTxResult(true, "Purchase Initiated");
        }

        /// <summary>
        /// Initiates a refund transaction. Be subscribed to TxFlowStateChanged event to get updates on the process.
        /// </summary>
        /// <param name="id">Alphanumeric Identifier for your refund.</param>
        /// <param name="amountCents">Amount in Cents to charge</param>
        /// <returns>InitiateTxResult</returns>

    }, {
        key: "InitiateRefundTx",
        value: function InitiateRefundTx(id, amountCents) {
            if (this.CurrentStatus == SpiStatus.Unpaired) {
                return new InitiateTxResult(false, "Not Paired");
            }

            if (this.CurrentFlow != SpiFlow.Idle) {
                return new InitiateTxResult(false, "Not Idle");
            }

            var purchase = PurchaseHelper.CreateRefundRequest(amountCents, id);
            this.CurrentFlow = SpiFlow.Transaction;
            this.CurrentTxFlowState = new TransactionFlowState(id, TransactionType.Refund, amountCents, purchase.ToMessage(), "Waiting for EFTPOS connection to make refund request for " + amountCents / 100.0);
            if (this._send(purchase.ToMessage())) {
                this.CurrentTxFlowState.Sent("Asked EFTPOS to refund " + amountCents / 100.0);
            }

            document.dispatchEvent(new CustomEvent('TxFlowStateChanged', { detail: this.CurrentTxFlowState }));
            return new InitiateTxResult(true, "Refund Initiated");
        }

        /// <summary>
        /// Let the EFTPOS know whether merchant accepted or declined the signature
        /// </summary>
        /// <param name="accepted">whether merchant accepted the signature from customer or not</param>

    }, {
        key: "AcceptSignature",
        value: function AcceptSignature(accepted) {

            if (this.CurrentFlow != SpiFlow.Transaction || this.CurrentTxFlowState.Finished || !this.CurrentTxFlowState.AwaitingSignatureCheck) {
                this._log.info("Asked to accept signature but I was not waiting for one.");
                return;
            }

            this.CurrentTxFlowState.SignatureResponded(accepted ? "Accepting Signature..." : "Declining Signature...");
            var sigReqMsg = this.CurrentTxFlowState.SignatureRequiredMessage;
            this._send(accepted ? new SignatureAccept(sigReqMsg.RequestId).ToMessage() : new SignatureDecline(sigReqMsg.RequestId).ToMessage());

            document.dispatchEvent(new CustomEvent('TxFlowStateChanged', { detail: this.CurrentTxFlowState }));
        }

        /// <summary>
        /// Attempts to cancel a Transaction. 
        /// Be subscribed to TxFlowStateChanged event to see how it goes.
        /// Wait for the transaction to be finished and then see whether cancellation was successful or not.
        /// </summary>

    }, {
        key: "CancelTransaction",
        value: function CancelTransaction() {
            if (this.CurrentFlow != SpiFlow.Transaction || this.CurrentTxFlowState.Finished) {
                this._log.info("Asked to cancel transaction but I was not in the middle of one.");
                return;
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
        }

        /// <summary>
        /// Initiates a settlement transaction.
        /// Be subscribed to TxFlowStateChanged event to get updates on the process.
        /// </summary>

    }, {
        key: "InitiateSettleTx",
        value: function InitiateSettleTx(id) {
            if (this.CurrentStatus == SpiStatus.Unpaired) {
                return new InitiateTxResult(false, "Not Paired");
            }

            if (this.CurrentFlow != SpiFlow.Idle) {
                return new InitiateTxResult(false, "Not Idle");
            }

            var settleRequest = new SettleRequest(RequestIdHelper.Id("settle"));
            this.CurrentFlow = SpiFlow.Transaction;
            this.CurrentTxFlowState = new TransactionFlowState(id, TransactionType.Settle, 0, settleRequest.ToMessage(), "Waiting for EFTPOS connection to make a settle request");

            if (this._send(settleRequest.ToMessage())) {
                this.CurrentTxFlowState.Sent("Asked EFTPOS to settle.");
            }

            document.dispatchEvent(new CustomEvent('TxFlowStateChanged', { detail: this.CurrentTxFlowState }));
            return new InitiateTxResult(true, "Settle Initiated");
        }

        /// <summary>
        /// Initiates a Get Last Transaction. Use this when you want to retrieve the most recent transaction
        /// that was processed by the Eftpos.
        /// Be subscribed to TxFlowStateChanged event to get updates on the process.
        /// </summary>

    }, {
        key: "InitiateGetLastTx",
        value: function InitiateGetLastTx(id) {
            if (this.CurrentStatus == SpiStatus.Unpaired) {
                return new InitiateTxResult(false, "Not Paired");
            }

            if (this.CurrentFlow != SpiFlow.Idle) {
                return new InitiateTxResult(false, "Not Idle");
            }

            var gltRequestMsg = new GetLastTransactionRequest(id);
            this.CurrentFlow = SpiFlow.Transaction;

            this.CurrentTxFlowState = new TransactionFlowState(gltRequestMsg.Id, TransactionType.GetLastTx, 0, gltRequestMsg, "Waiting for EFTPOS connection to make a Get-Last-Transaction request.");

            if (this._send(gltRequestMsg.ToMessage())) {
                this.CurrentTxFlowState.Sent("Asked EFTPOS for last transaction.");
            }

            document.dispatchEvent(new CustomEvent('TxFlowStateChanged', { detail: this.CurrentTxFlowState }));
            return new InitiateTxResult(true, "GLT Initiated");
        }

        /// <summary>
        /// Handling the 2nd interaction of the pairing process, i.e. an incoming KeyRequest.
        /// </summary>
        /// <param name="m">incoming message</param>

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

        /// <summary>
        /// Handling the 4th interaction of the pairing process i.e. an incoming KeyCheck.
        /// </summary>
        /// <param name="m"></param>

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

        /// <summary>
        /// Handling the 5th and final interaction of the pairing process, i.e. an incoming PairResponse
        /// </summary>
        /// <param name="m"></param>

    }, {
        key: "_handlePairResponse",
        value: function _handlePairResponse(m) {
            var pairResp = new PairResponse(m);

            this.CurrentPairingFlowState.AwaitingCheckFromEftpos = false;
            if (pairResp.Success) {
                if (this.CurrentPairingFlowState.AwaitingCheckFromPos) {
                    // Still Waiting for User to say yes on POS
                    this.CurrentPairingFlowState.Message = "Confirm that the following Code is what the EFTPOS showed";
                } else {
                    this.CurrentPairingFlowState.Message = "Pairing Successful";
                    this._onPairingSuccess();
                }
                // I need to ping/login even if the pos user has not said yes yet, 
                // because otherwise within 5 seconds connectiong will be dropped by eftpos.
                this._startPeriodicPing();
            } else {
                this.CurrentPairingFlowState.Message = "Pairing Failed";
                this._onPairingFailed();
            }

            document.dispatchEvent(new CustomEvent('PairingFlowStateChanged', { detail: this.CurrentPairingFlowState }));
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

        /// <summary>
        /// Sometimes the server asks us to roll our secrets.
        /// </summary>
        /// <param name="m"></param>

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

        /// <summary>
        /// The PinPad server will send us this message when a customer signature is reqired.
        /// We need to ask the customer to sign the incoming receipt.
        /// And then tell the pinpad whether the signature is ok or not.
        /// </summary>
        /// <param name="m"></param>

    }, {
        key: "_handleSignatureRequired",
        value: function _handleSignatureRequired(m) {

            if (this.CurrentFlow != SpiFlow.Transaction || this.CurrentTxFlowState.Finished) {
                this._log.info("Received Signature Required but I was not waiting for one. " + m.DecryptedJson);
                return;
            }
            this.CurrentTxFlowState.SignatureRequired(new SignatureRequired(m), "Ask Customer to Sign the Receipt");

            document.dispatchEvent(new CustomEvent('TxFlowStateChanged', { detail: this.CurrentTxFlowState }));
        }

        /// <summary>
        /// The PinPad server will reply to our PurchaseRequest with a PurchaseResponse.
        /// </summary>
        /// <param name="m"></param>

    }, {
        key: "_handlePurchaseResponse",
        value: function _handlePurchaseResponse(m) {

            if (this.CurrentFlow != SpiFlow.Transaction || this.CurrentTxFlowState.Finished) {
                this._log.info("Received Purchase response but I was not waiting for one. " + m.DecryptedJson);
                return;
            }
            // TH-1A, TH-2A

            this.CurrentTxFlowState.Completed(m.GetSuccessState(), m, "Purchase Transaction Ended.");
            // TH-6A, TH-6E

            document.dispatchEvent(new CustomEvent('TxFlowStateChanged', { detail: this.CurrentTxFlowState }));
        }

        /// <summary>
        /// The PinPad server will reply to our RefundRequest with a RefundResponse.
        /// </summary>
        /// <param name="m"></param>

    }, {
        key: "_handleRefundResponse",
        value: function _handleRefundResponse(m) {
            if (this.CurrentFlow != SpiFlow.Transaction || this.CurrentTxFlowState.Finished) {
                this._log.info("Received Refund response but I was not waiting for one. " + m.DecryptedJson);
                return;
            }
            // TH-1A, TH-2A

            this.CurrentTxFlowState.Completed(m.GetSuccessState(), m, "Refund Transaction Ended.");
            // TH-6A, TH-6E

            document.dispatchEvent(new CustomEvent('TxFlowStateChanged', { detail: this.CurrentTxFlowState }));
        }

        /// <summary>
        /// TODO: Handle the Settlement Response received from the PinPad
        /// </summary>
        /// <param name="m"></param>

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

        /// <summary>
        /// Sometimes we receive event type "error" from the server, such as when calling cancel_transaction and there is no transaction in progress.
        /// </summary>
        /// <param name="m"></param>

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
        /// <summary>
        /// GltMatch attempts to conclude whether a gltResponse matches an expected transaction and returns
        /// the outcome. 
        /// If Success/Failed is returned, it means that the gtlResponse did match, and that transaction was succesful/failed.
        /// If Unknown is returned, it means that the gtlResponse does not match the expected transaction. 
        /// </summary>
        /// <param name="gltResponse">The GetLastTransactionResponse message to check</param>
        /// <param name="expectedType">The expected Type, Purchase/Refund/...</param>
        /// <param name="expectedAmount">The expected Amount in cents</param>
        /// <param name="requestTime">The time you made your request.</param>
        /// <param name="posRefId">The Reference Id that you passed in with the original request. Currently not used. 
        /// But will be used in the future for abetter conclusion.</param>
        /// <returns></returns>

    }, {
        key: "GltMatch",
        value: function GltMatch(gltResponse, expectedType, expectedAmount, requestTime, posRefId) {

            // adjust request time for serverTime and also give 5 seconds slack.
            var reqServerTime = new Date(requestTime + this._spiMessageStamp.ServerTimeDelta - 5000);

            /* Transformat into  ISO format */
            var bankDateTime = gltResponse.GetBankDateTimeString();
            var gtlBankTime = new Date(bankDateTime.substring(4, 8) + "-" + bankDateTime.substring(2, 4) + "-" + bankDateTime.substring(0, 2) + "T" + bankDateTime.substring(8, 10) + ":" + bankDateTime.substring(10, 12) + ":" + bankDateTime.substring(12, 14));

            // For now we use amount and date to match as best we can.
            // In the future we will be able to pass our own pos_ref_id in the tx request that will be returned here.
            this._log.info("Amount: " + expectedAmount + "->" + gltResponse.GetTransactionAmount() + ", Date: " + reqServerTime + "->" + gtlBankTime);

            if (gltResponse.GetTransactionAmount() != expectedAmount) {
                return SuccessState.Unknown;
            }

            switch (gltResponse.GetTxType()) {
                case "PURCHASE":
                    if (expectedType != TransactionType.Purchase) return SuccessState.Unknown;
                    break;
                case "REFUND":
                    if (expectedType != TransactionType.Refund) return SuccessState.Unknown;
                    break;
                default:
                    return SuccessState.Unknown;
            }

            if (reqServerTime > gtlBankTime) {
                return SuccessState.Unknown;
            }

            // For now we use amount and date to match as best we can.
            // In the future we will be able to pass our own pos_ref_id in the tx request that will be returned here.
            return gltResponse.GetSuccessState();
        }

        /// <summary>
        /// When the PinPad returns to us what the Last Transaction was.
        /// </summary>
        /// <param name="m"></param>

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
            this._log.info("Got Last Transaction.. Attempting Recovery.");
            txState.GotGltResponse();

            var gtlResponse = new GetLastTransactionResponse(m);
            if (!gtlResponse.WasRetrievedSuccessfully()) {
                if (gtlResponse.WasOperationInProgressError()) {
                    // TH-4E - Operation In Progress
                    this._log.info("Operation still in progress... stay waiting.");
                } else {
                    // TH-4X - Unexpected Error when recovering
                    this._log.info("Unexpected error in Get Last Transaction Response during Transaction Recovery: " + m.GetError());
                    txState.UnknownCompleted("Unexpected Error when recovering Transaction Status. Check EFTPOS.");
                }
            } else {
                if (txState.Type === TransactionType.GetLastTx) {
                    // THIS WAS A PLAIN GET LAST TRANSACTION REQUEST, NOT FOR RECOVERY PURPOSES.
                    this._log.info("Retrieved Last Transaction as asked directly by the user.");
                    gtlResponse.CopyMerchantReceiptToCustomerReceipt();
                    txState.Completed(m.GetSuccessState(), m, "Last Transaction Retrieved");
                } else {
                    var successState = this.GltMatch(gtlResponse, txState.Type, txState.AmountCents, txState.RequestTime, "_NOT_IMPL_YET");
                    if (successState == SuccessState.Unknown) {
                        // TH-4N: Didn't Match our transaction. Consider Unknown State.
                        this._log.info("Did not match transaction.");
                        txState.UnknownCompleted("Failed to recover Transaction Status. Check EFTPOS. ");
                    } else {
                        // TH-4Y: We Matched, transaction finished, let's update ourselves
                        gtlResponse.CopyMerchantReceiptToCustomerReceipt();
                        txState.Completed(m.GetSuccessState(), m, "GLT Transaction Ended.");
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
                return _this2._onSpiMessageReceived(e.detail.data);
            });
            document.addEventListener('ErrorReceived', function (e) {
                return _this2._onWsErrorReceived(e.detail);
            });
        }

        /// <summary>
        /// This method will be called when the connection status changes.
        /// You are encouraged to display a PinPad Connection Indicator on the POS screen.
        /// </summary>
        /// <param name="state"></param>

    }, {
        key: "_onSpiConnectionStatusChanged",
        value: function _onSpiConnectionStatusChanged(state) {
            var _this3 = this;

            switch (state) {
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
                    this._mostRecentLoginResponse = null;
                    this._readyToTransact = false;
                    this._stopPeriodicPing();

                    if (this.CurrentStatus != SpiStatus.Unpaired) {
                        this.CurrentStatus = SpiStatus.PairedConnecting;

                        if (this.CurrentFlow == SpiFlow.Transaction && !this.CurrentTxFlowState.Finished) {
                            // we're in the middle of a transaction, just so you know!
                            // TH-1D
                            this._log.info("Lost connection in the middle of a transaction...");
                        }

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
                        _this5._readyToTransact = false;
                        _this5._stopPeriodicPing();
                    }

                    _this5._missedPongsCount = 0;
                }, this._pongTimeout);
            } else {
                this._stopPeriodicPing();
                this._log.info("Cancelling periodic ping as were disconnected or not paired");
            }
        }

        /// <summary>
        /// We call this ourselves as soon as we're ready to transact with the PinPad after a connection is established.
        /// This function is effectively called after we received the first Login Response from the PinPad.
        /// </summary>

    }, {
        key: "_onReadyToTransact",
        value: function _onReadyToTransact() {
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
                    this.CurrentTxFlowState.Sent("Asked EFTPOS to accept payment for " + this.CurrentTxFlowState.AmountCents / 100.0);
                    document.dispatchEvent(new CustomEvent('TxFlowStateChanged', { detail: this.CurrentTxFlowState }));
                }
            }
        }

        /// <summary>
        /// When we disconnect, we should also stop the periodic ping.
        /// </summary>

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
        }

        /// <summary>
        /// Received a Pong from the server
        /// </summary>
        /// <param name="m"></param>

    }, {
        key: "_handleIncomingPong",
        value: function _handleIncomingPong(m) {
            // We need to maintain this time delta otherwise the server will not accept our messages.
            this._spiMessageStamp.ServerTimeDelta = m.GetServerTimeDelta();

            if (this._mostRecentLoginResponse == null || this._mostRecentLoginResponse.ExpiringSoon(this._spiMessageStamp.ServerTimeDelta)) {
                // We have not logged in yet, or login expiring soon.
                this._doLogin();
            }
            this._mostRecentPongReceived = m;
        }

        /// <summary>
        /// Login is a mute thing but is required. 
        /// </summary>

    }, {
        key: "_doLogin",
        value: function _doLogin() {
            var lr = LoginHelper.NewLoginRequest();
            this._send(lr.ToMessage());
        }

        /// <summary>
        /// When the server replied to our LoginRequest with a LoginResponse, we take note of it.
        /// </summary>
        /// <param name="m"></param>

    }, {
        key: "_handleLoginResponse",
        value: function _handleLoginResponse(m) {
            var lr = new LoginResponse(m);
            if (lr.Success) {
                this._mostRecentLoginResponse = lr;

                if (!this._readyToTransact) {
                    // We are finally ready to make transactions.
                    // Let's notify ourselves so we can take some actions.
                    this._readyToTransact = true;
                    this._log.info("Logged in Successfully. Expires: " + lr.Expires);
                    if (this.CurrentStatus != SpiStatus.Unpaired) {
                        this._onReadyToTransact();
                    }
                } else {
                    this._log.info("I have just refreshed my Login. Now Expires: " + lr.Expires);
                }
            } else {
                this._log.info("Logged in Failure.");
                this._conn.Disconnect();
            }
        }

        /// <summary>
        /// The server will also send us pings. We need to reply with a pong so it doesn't disconnect us.
        /// </summary>
        /// <param name="m"></param>

    }, {
        key: "_handleIncomingPing",
        value: function _handleIncomingPing(m) {
            var pong = PongHelper.GeneratePongRessponse(m);
            this._send(pong);
        }

        /// <summary>
        /// Ask the PinPad to tell us what the Most Recent Transaction was
        /// </summary>

    }, {
        key: "_callGetLastTransaction",
        value: function _callGetLastTransaction() {
            var gltRequest = new GetLastTransactionRequest();
            this._send(gltRequest.ToMessage());
        }

        /// <summary>
        /// This method will be called whenever we receive a message from the Connection
        /// </summary>
        /// <param name="messageJson"></param>

    }, {
        key: "_onSpiMessageReceived",
        value: function _onSpiMessageReceived(messageJson) {
            // First we parse the incoming message
            var m = Message.FromJson(messageJson, this._secrets);
            this._log.info("Received:" + m.DecryptedJson);
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
                case Events.LoginResponse:
                    this._handleLoginResponse(m);
                    break;
                case Events.PurchaseResponse:
                    this._handlePurchaseResponse(m);
                    break;
                case Events.RefundResponse:
                    this._handleRefundResponse(m);
                    break;
                case Events.SignatureRequired:
                    this._handleSignatureRequired(m);
                    break;
                case Events.GetLastTransactionResponse:
                    this._handleGetLastTransactionResponse(m);
                    break;
                case Events.SettleResponse:
                    this.HandleSettleResponse(m);
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
            this._log.warn("Received WS Error: " + error);
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
    }]);

    return Spi;
}();
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/// <summary>
/// Represents the 3 Pairing statuses that the Spi instanxce can be in.
/// </summary>
var SpiStatus = {
    /// <summary>
    /// Paired and Connected
    /// </summary>
    PairedConnected: 'PairedConnected',

    /// <summary>
    /// Paired but trying to establish a connection 
    /// </summary>
    PairedConnecting: 'PairedConnecting',

    /// <summary>
    /// Unpaired
    /// </summary>
    Unpaired: 'Unpaired'
};

/// <summary>
/// The Spi instance can be in one of these flows at any point in time.
/// </summary>
var SpiFlow = {
    /// <summary>
    /// Currently going through the Pairing Process Flow.
    /// Happens during the Unpaired SpiStatus.
    /// </summary>
    Pairing: 'Pairing',

    /// <summary>
    /// Currently going through the transaction Process Flow.
    /// Cannot happen in the Unpaired SpiStatus.
    /// </summary>
    Transaction: 'Transaction',

    /// <summary>
    /// Not in any of the other states.
    /// </summary>
    Idle: 'Idle'
};

/// <summary>
/// Represents the Pairing Flow State during the pairing process 
/// </summary>

var PairingFlowState = function PairingFlowState(state) {
    _classCallCheck(this, PairingFlowState);

    /// <summary>
    /// Some text that can be displayed in the Pairing Process Screen
    /// that indicates what the pairing process is up to.
    /// </summary>
    this.Message = null;

    /// <summary>
    /// When true, it means that the EFTPOS is shoing the confirmation code,
    /// and your user needs to press YES or NO on the EFTPOS.
    /// </summary>
    this.AwaitingCheckFromEftpos = null;

    /// <summary>
    /// When true, you need to display the YES/NO buttons on you pairing screen
    /// for your user to confirm the code.
    /// </summary>
    this.AwaitingCheckFromPos = null;

    /// <summary>
    /// This is the confirmation code for the pairing process.
    /// </summary>
    this.ConfirmationCode = null;

    /// <summary>
    /// Indicates whether the Pairing Flow has finished its job.
    /// </summary>
    this.Finished = null;

    /// <summary>
    /// Indicates whether pairing was successful or not.
    /// </summary>
    this.Successful = null;

    if (state) {
        Object.assign(this, state);
    }
};

var TransactionType = {
    Purchase: 'Purchase',
    Refund: 'Refund',
    Settle: 'Settle',
    GetLastTx: 'GetLastTx'
};

/// <summary>
/// Used as a return in the InitiateTx methods to signify whether 
/// the transaction was initiated or not, and a reason to go with it.
/// </summary>

var InitiateTxResult = function InitiateTxResult(initiated, message) {
    _classCallCheck(this, InitiateTxResult);

    /// <summary>
    /// Whether the tx was initiated.
    /// When true, you can expect updated to your registered callback.
    /// When false, you can retry calling the InitiateX method.
    /// </summary>
    this.Initiated = initiated;

    /// <summary>
    /// Text that gives reason for the Initiated flag, especially in case of false. 
    /// </summary>
    this.Message = message;
};

/// <summary>
/// Represents the State during a TransactionFlow
/// </summary>


var TransactionFlowState = function () {
    function TransactionFlowState(id, type, amountCents, message, msg) {
        _classCallCheck(this, TransactionFlowState);

        /// <summary>
        ///  The id given to this transaction
        /// </summary>
        this.Id = id;

        /// <summary>
        /// Purchase/Refund/Settle/...
        /// </summary>
        this.Type = type;

        /// <summary>
        /// Amount in cents for this transaction
        /// </summary>
        this.AmountCents = amountCents;

        /// <summary>
        /// Whther the request has been sent to the EFTPOS yet or not.
        /// In the PairedConnecting state, the transaction is initiated
        /// but the request is only sent once the connection is recovered.
        /// </summary>
        this.RequestSent = false;

        /// <summary>
        /// The time when the request was sent to the EFTPOS.
        /// </summary>
        this.RequestTime = null;

        /// <summary>
        /// The time when we last asked for an update, including the original request at first
        /// </summary>
        this.LastStateRequestTime = null;

        /// <summary>
        /// Whether we're currently attempting to Cancel the transaction.
        /// </summary>
        this.AttemptingToCancel = null;

        /// <summary>
        /// When this flag is on, you need to display the dignature accept/decline buttons in your 
        /// transaction flow screen.
        /// </summary>
        this.AwaitingSignatureCheck = false;

        /// <summary>
        /// Whether this transaction flow is over or not.
        /// </summary>
        this.Finished = false;

        /// <summary>
        /// The success state of this transaction. Starts off as Unknown.
        /// When finished, can be Success, Failed OR Unknown.
        /// </summary>
        this.Success = SuccessState.Unknown;

        /// <summary>
        /// The request message that we are sending/sent to the server.
        /// </summary>
        this.Request = message;

        /// <summary>
        /// The response at the end of the transaction. 
        /// Might not be present in all edge cases.
        /// You can then turn this Message into the appropriate structure,
        /// such as PurchaseResponse, RefundResponse, etc
        /// </summary>
        this.Response = null;

        /// <summary>
        /// A text message to display on your Transaction Flow Screen
        /// </summary>
        this.DisplayMessage = msg;

        /// <summary>
        /// The message the we received from EFTPOS that told us that signature is required.
        /// </summary>
        this.SignatureRequiredMessage = null;

        /// <summary>
        /// The time when the cancel attempt was made.
        /// </summary>
        this.CancelAttemptTime = null;

        /// <summary>
        /// Whether we're currently waiting for a Get Last Transaction Response to get an update. 
        /// </summary>
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
        key: 'Completed',
        value: function Completed(state, response, msg) {
            this.Success = state;
            this.Response = response;
            this.Finished = true;
            this.AttemptingToCancel = false;
            this.AwaitingGltResponse = false;
            this.AwaitingSignatureCheck = false;
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
            this.DisplayMessage = msg;
        }
    }]);

    return TransactionFlowState;
}();
