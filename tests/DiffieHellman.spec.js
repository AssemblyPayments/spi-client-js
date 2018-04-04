describe('DiffieHellman', function() {
    'use strict';

    var diffieHellman;

    beforeEach(function() {
        diffieHellman = new DiffieHellman();
    });
  
    it('should exchange keys', function() {

        var privateKeyA  = diffieHellman.RandomPrivateKey(GROUP14_2048_BIT_MODP);
        var privateKeyB  = diffieHellman.RandomPrivateKey(GROUP14_2048_BIT_MODP);

        var publicKeyA   = diffieHellman.PublicKey(GROUP14_2048_BIT_MODP, GENERATOR, privateKeyA);
        var publicKeyB   = diffieHellman.PublicKey(GROUP14_2048_BIT_MODP, GENERATOR, privateKeyB);

        var secretA      = diffieHellman.Secret(GROUP14_2048_BIT_MODP, publicKeyB, privateKeyA);
        var secretB      = diffieHellman.Secret(GROUP14_2048_BIT_MODP, publicKeyA, privateKeyB);

        expect(secretA).toEqual(secretB);
    });
  
  });
  