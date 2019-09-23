import { Secrets } from '../../src/Secrets';

export class SpiClientUtils {
  static SetTestSecrets(encKey = '', hmacKey = '') {
    if (!encKey || !hmacKey) {
      encKey = '81CF9E6A14CDAF244A30B298D4CECB505C730CE352C6AF6E1DE61B3232E24D3F';
      hmacKey = 'D35060723C9EECDB8AEA019581381CB08F64469FC61A5A04FE553EBDB5CD55B9';
    }

    return new Secrets(encKey, hmacKey);
  }
}
