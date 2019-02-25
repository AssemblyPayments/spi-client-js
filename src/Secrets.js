export class Secrets {
    constructor(encKey, hmacKey) {
        this.EncKey     = encKey;
        this.HmacKey    = hmacKey;
    }

    static save(EncKey, HmacKey) {
        localStorage.setItem('EncKey', EncKey);
        localStorage.setItem('HmacKey', HmacKey);
    }

    static restore() {
        return new Secrets(localStorage.getItem('EncKey'), localStorage.getItem('HmacKey'));
    }

    static isSaved() {
        return localStorage.getItem('EncKey') && localStorage.getItem('HmacKey');
    }

    static Reset() {
        localStorage.removeItem('EncKey');
        localStorage.removeItem('HmacKey');
    }
}
