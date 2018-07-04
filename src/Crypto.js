class Crypto {
    
    constructor() {
        if(typeof jsSHA === 'undefined') {
            throw new Error('jsSHA hash lib requried')
        }

        if(typeof aesjs === 'undefined') {
            throw new Error('aes lib requried')
        }
    }

    // <summary>
    // Encrypt a block using CBC and PKCS7.
    // </summary>
    // <param name="key">The key value</param>
    // <param name="data">The message to encrypt</param>
    // <returns>Returns the resulting encrypted string data as HEX.</returns>
    static AesEncrypt (key, data) {
        let bytes = aesjs.utils.hex.toBytes(key);
        const iv = [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00 ];
        const textBytes = aesjs.padding.pkcs7.pad(aesjs.utils.utf8.toBytes(data));
        const aesCbc = new aesjs.ModeOfOperation.cbc(bytes, iv);
        const encryptedBytes = aesCbc.encrypt(textBytes);
        const encryptedString = aesjs.utils.hex.fromBytes(encryptedBytes);

        return encryptedString;
    }
    
    // <summary>
    // Decrypt a block using a CBC and PKCS7.
    // </summary>
    // <param name="key">The key value</param>
    // <param name="data">the data to decrypt</param>
    // <returns>Returns the resulting data decrypted in plaintext.</returns>
    static AesDecrypt(key, data) {
        let bytes = aesjs.utils.hex.toBytes(key);
        const iv = [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00 ];
        const encryptedBytes = aesjs.utils.hex.toBytes(data);
        const aesCbc = new aesjs.ModeOfOperation.cbc(bytes, iv);
        const decryptedBytes = aesCbc.decrypt(encryptedBytes);
        const decrypted = aesjs.utils.utf8.fromBytes(aesjs.padding.pkcs7.strip(decryptedBytes));
    
        return decrypted;
    }

    // <summary>
    // Calculates the HMACSHA256 signature of a message.
    // </summary>
    // <param name="key">The Hmac Key as HEX</param>
    // <param name="messageToSign">The message to sign</param>
    // <returns>The HMACSHA256 signature as a hex string</returns>
    static HmacSignature(key, messageToSign) {
        let shaObj = new jsSHA("SHA-256", "TEXT");

        shaObj.setHMACKey(key,'HEX');
        shaObj.update(messageToSign);
        
        return shaObj.getHMAC("HEX");
    }


    /**
     * This utility function calculates the SHA-256 value in hexadecimal format
     * @param {String} value the value to be hashed
     */
    static GenerateHash(value) {
        let shaObj = new jsSHA('SHA-256', 'HEX');
        shaObj.update(value);
        const shaHash = shaObj.getHash('HEX');
        return shaHash;
    }
}
