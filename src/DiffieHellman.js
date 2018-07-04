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
class DiffieHellman {

    constructor () {
        if(typeof BN === 'undefined') {
            throw new Error('Big Number lib required')
        }

        if(typeof jsSHA === 'undefined') {
            throw new Error('jsSHA hash lib requried')
        }
    }

    // <summary>
    // Generates a random Private Key that you can use.
    // </summary>
    // <param name="p"></param>
    // <returns>Random Private Key</returns>
    RandomPrivateKey(maxValue) {
        let maxValueBN      = new BN(maxValue);
        let shiftDistance   = Math.floor((Math.random() * 1000) + 1);
        let randBitInt      = maxValueBN.shrn(shiftDistance); // Right shift divides by a power of 2
        let min             = new BN(2);

        if(randBitInt.cmp(min) == -1) {
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
    PublicKey(p, g, privateKey) {
        const aHex = new BN(privateKey, 16);
        const gHex = new BN(g, 16);
        const montPrime = BN.mont(new BN(p, 16));
        const gRed = gHex.toRed(montPrime);
        const secret = gRed.redPow(aHex).fromRed().toString(16);

        return secret;  
    }

    // <summary>
    // Calculates the shared secret given their Public Key (A) and your Private Key (b)
    // </summary>
    // <param name="p"></param>
    // <param name="theirPublicKey"></param>
    // <param name="yourPrivateKey"></param>
    // <returns></returns>
    Secret(p, theirPublicKey, yourPrivateKey) {
        const bHex = new BN(theirPublicKey, 16);
        const AHex = new BN(yourPrivateKey, 16);
        const montPrime = BN.mont(new BN(p, 16));
        const BRed = bHex.toRed(montPrime);

        return BRed.redPow(AHex).fromRed().toString(16).toUpperCase();
    }

}
