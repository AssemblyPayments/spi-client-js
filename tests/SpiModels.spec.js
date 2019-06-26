import {SpiConfig} from '../src/SpiModels';

describe('SpiModels', function() {
    'use strict';
  
    it('should add receipt config', function() {
        var config = new SpiConfig();
        config.PromptForCustomerCopyOnEftpos = true;
        config.SignatureFlowOnEftpos = true;

        var data = {};
        var receiptData = config.addReceiptConfig(data);

        expect(receiptData.prompt_for_customer_copy).toBe(true);
        expect(receiptData.print_for_signature_required_transactions).toBe(true);
    });
  


});
