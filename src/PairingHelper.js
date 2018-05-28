// This is the generator used for diffie-hellman in 2048-bit MODP Group 14 as per (https://tools.ietf.org/html/rfc3526#section-3)
const GENERATOR = 2;

// This is the prime used for diffie-hellman using 2048-bit MODP Group 14 as per (https://tools.ietf.org/html/rfc3526#section-3)
const GROUP14_2048_BIT_MODP = 'FFFFFFFFFFFFFFFFC90FDAA22168C234C4C6628B80DC1CD129024E088A67CC74020BBEA63B139B22514A08798E3404DDEF9519B3CD3A431B302B0A6DF25F14374FE1356D6D51C245E485B576625E7EC6F44C42E9A637ED6B0BFF5CB6F406B7EDEE386BFB5A899FA5AE9F24117C4B1FE649286651ECE45B3DC2007CB8A163BF0598DA48361C55D39A69163FA8FD24CF5F83655D23DCA3AD961C62F356208552BB9ED529077096966D670C354E4ABC9804F1746C08CA18217C32905E462E36CE3BE39E772C180E86039B2783A2EC07A28FB5C55DF06F4C52C9DE2BCBF6955817183995497CEA956AE515D2261898FA051015728E5A8AACAA68FFFFFFFFFFFFFFFF';

// <summary>
// This static class helps you with the pairing process as documented here:
// http://www.simplepaymentapi.com/#/api/pairing-process
// </summary>
class PairingHelper {
    // <summary>
    // Generates a pairing Request.
    // </summary>
    // <returns>New PairRequest</returns>
    static NewPairRequest() {
        return new PairRequest();
    }

    // <summary>
    // Calculates/Generates Secrets and KeyResponse given an incoming KeyRequest.
    // </summary>
    // <param name="keyRequest"></param>
    // <returns>Secrets and KeyResponse to send back.</returns>
    GenerateSecretsAndKeyResponse(keyRequest) {
        let encPubAndSec = this._calculateMyPublicKeyAndSecret(keyRequest.Aenc);
        let Benc = encPubAndSec.MyPublicKey;
        let Senc = encPubAndSec.SharedSecretKey;

        let hmacPubAndSec = this._calculateMyPublicKeyAndSecret(keyRequest.Ahmac);
        let Bhmac = hmacPubAndSec.MyPublicKey;
        let Shmac = hmacPubAndSec.SharedSecretKey;
        
        let secrets = new Secrets(Senc, Shmac);
        let keyResponse = new KeyResponse(keyRequest.RequestId, Benc, Bhmac);

        return new SecretsAndKeyResponse(secrets, keyResponse);
    }

    // <summary>
    // Turns an incoming "A" value from the PinPad into the outgoing "B" value 
    // and the secret value using DiffieHelmman helper.
    // </summary>
    // <param name="theirPublicKey">The incoming A value</param>
    // <returns>Your B value and the Secret</returns>
    _calculateMyPublicKeyAndSecret(theirPublicKey) {

        let diffieHellman = new DiffieHellman();
        let myPrivateBI = diffieHellman.RandomPrivateKey(GROUP14_2048_BIT_MODP);
        let myPublicBI = diffieHellman.PublicKey(GROUP14_2048_BIT_MODP, GENERATOR, myPrivateBI);
        let secretBI = diffieHellman.Secret(GROUP14_2048_BIT_MODP, theirPublicKey, myPrivateBI);

        let secret = this.DHSecretToSPISecret(secretBI);

        return new PublicKeyAndSecret(myPublicBI, secret);
    }

    // <summary>
    // Converts the DH secret BigInteger into the hex-string to be used as the secret.
    // There are some "gotchyas" here which is why this piece of work is abstracted so it can be tested separately.
    // See: http://www.simplepaymentapi.com/#/api/pairing-process
    // </summary>
    // <param name="secretBI">Secret as BigInteger</param>
    // <returns>Secret as Hex-String</returns>
    DHSecretToSPISecret(secret)
    {      
        // If the calculated hexadecimal secret doesn't have an even number of characters, we add an extra 0 to the start. This allows SHA-256 to operate on the hexadecimal secret as if it were a hexadecimal representation of a string.
        if (secret.length % 2 === 1){
            secret = '0' + secret;
        }

        secret = secret.padStart(512, '0');

        // We sha256 that byte array and return the hex string result
        return Crypto.GenerateHash(secret);
    }
}

// <summary>
// Internal Holder class for Public and Secret, so that we can use them together in method signatures. 
// </summary>
class PublicKeyAndSecret {
    constructor(myPublicKey, sharedSecretKey) {
        this.MyPublicKey = myPublicKey;
        this.SharedSecretKey = sharedSecretKey;
    }
}