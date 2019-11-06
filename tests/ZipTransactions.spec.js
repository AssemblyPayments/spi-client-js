import { Message } from '../src/Messages';
import { Secrets } from '../src/Secrets';
import { TransactionOptions } from '../src/SpiModels';
import { ZipPurchaseRequest, ZipPurchaseResponse, ZipRefundRequest, ZipRefundResponse } from '../src/ZipTransactions';

const purchaseAmount = 1000;
const refundAmount = 1000;
const posRefId = 'test';
const encKey = '81CF9E6A14CDAF244A30B298D4CECB505C730CE352C6AF6E1DE61B3232E24D3F';
const hmacKey = 'D35060723C9EECDB8AEA019581381CB08F64469FC61A5A04FE553EBDB5CD55B9';

describe('ZipTransactions', () => {
    it('AccountSummary_ZipPurchaseFor1000Cents_PurchaseStringFor10Dollars', () => {
        const zipPurchaseRequest = new ZipPurchaseRequest(purchaseAmount, posRefId);
        const amountSummary = zipPurchaseRequest.AmountSummary();

        expect(amountSummary).toBe(`Purchase: ${(purchaseAmount / 100.0).toFixed(2)}`);
    });

    it('ToMessage_ZipPurchaseFor1000CentsWithPosRefId_MessageWithPurchaseAmountAndPosRefId', () => {
        const zipPurchaseRequest = new ZipPurchaseRequest(purchaseAmount, posRefId);
        const message = zipPurchaseRequest.ToMessage();

        expect(message.Data.purchase_amount).toBe(purchaseAmount);
        expect(message.Data.pos_ref_id).toBe(posRefId);
    });

    it('ToMessage_ZipPurchaseWithoutReceiptOptions_MessageWithoutReceiptOptions', () => {
        const zipPurchaseRequest = new ZipPurchaseRequest(purchaseAmount, posRefId);
        const message = zipPurchaseRequest.ToMessage();

        expect(message.Data.merchant_receipt_header).toBe('');
        expect(message.Data.merchant_receipt_footer).toBe('');
        expect(message.Data.customer_receipt_header).toBe('');
        expect(message.Data.customer_receipt_footer).toBe('');
    });

    it('ToMessage_ZipPurchaseWithReceiptOptions_MessageWithReceiptOptions', () => {
        const merchantReceiptHeader = '';
        const merchantReceiptFooter = 'merchantfooter';
        const customerReceiptHeader = 'customerHeader';
        const customerReceiptFooter = '';

        const options = new TransactionOptions();
        options.SetMerchantReceiptFooter(merchantReceiptFooter);
        options.SetCustomerReceiptHeader(customerReceiptHeader);

        const zipPurchaseRequest = new ZipPurchaseRequest(purchaseAmount, posRefId);
        zipPurchaseRequest.Options = options;
        const message = zipPurchaseRequest.ToMessage();

        expect(message.Data.merchant_receipt_header).toBe(merchantReceiptHeader);
        expect(message.Data.merchant_receipt_footer).toBe(merchantReceiptFooter);
        expect(message.Data.customer_receipt_header).toBe(customerReceiptHeader);
        expect(message.Data.customer_receipt_footer).toBe(customerReceiptFooter);
    });

    it('ToMessage_ZipPurchaseWithStoreCodeAndDescription_MessageWithStoreCodeAndDescription', () => {
        const storeCode = 'sc';
        const description = 'desc';

        const zipPurchaseRequest = Object.assign(new ZipPurchaseRequest(purchaseAmount, posRefId), {
            StoreCode: storeCode,
            Description: description,
        });
        const message = zipPurchaseRequest.ToMessage();

        const zipData = message.Data.zip_data;
        const { basket } = message.Data;
        expect(zipData.store_code).toBe(storeCode);
        expect(basket.description).toBe(description);
    });

    it('ZipPurchaseResponse_ZipPurchaseResponseMessage_ValidDataFromMessageGetters', () => {
        const secrets = new Secrets(encKey, hmacKey);
        const message = Message.FromJson(JSON.stringify(__fixtures__.ZipPurchaseResponse), secrets);
        const response = new ZipPurchaseResponse(message);

        expect(message.EventName).toBe('purchase_zip_response');
        expect(response.PosRefId).toBe('POS_REF_ID_1');
        expect(response.Success).toBeTruthy();

        expect(response.GetPurchaseAmount()).toBe(purchaseAmount);
        expect(response.GetCustomerReceipt()).not.toBeNull();
        expect(response.GetMerchantReceipt()).not.toBeNull();
        expect(response.GetResponseText()).toBe('TRANS APPROVED');
        expect(response.GetResponseCode()).toBe('000');
        expect(response.GetBankDate()).toBe('11012019');
        expect(response.GetBankTime()).toBe('091304');

        const zipDataEntry = response.GetZipData();
        expect(zipDataEntry.location_id).toBe('1234');
        expect(zipDataEntry.receipt_number).toBe('123456');
        expect(zipDataEntry.store_code).toBe('ABC');

        expect(response.WasMerchantReceiptPrinted()).toBeTruthy();
        expect(response.WasCustomerReceiptPrinted()).toBeTruthy();
    });

    it('ToMessage_ZipRefundAmountWithPosRefId_MessageWithRefundAmountAndPosRefId', () => {
        const zipRefundRequest = new ZipRefundRequest(refundAmount, posRefId);
        const message = zipRefundRequest.ToMessage();

        expect(message.Data.refund_amount).toBe(refundAmount);
        expect(message.Data.pos_ref_id).toBe(posRefId);
    });

    it('ToMessage_ZipRefundWithoutReceiptOptions_MessageWithoutReceiptOptions', () => {
        const zipRefundRequest = new ZipRefundRequest(refundAmount, posRefId);
        const message = zipRefundRequest.ToMessage();

        expect(message.Data.merchant_receipt_header).toBe('');
        expect(message.Data.merchant_receipt_footer).toBe('');
        expect(message.Data.customer_receipt_header).toBe('');
        expect(message.Data.customer_receipt_footer).toBe('');
    });

    it('ToMessage_ZipRefundWithReceiptOptions_MessageWithReceiptOptions', () => {
        const merchantReceiptHeader = '';
        const merchantReceiptFooter = 'merchantfooter';
        const customerReceiptHeader = 'customerHeader';
        const customerReceiptFooter = '';

        const options = new TransactionOptions();
        options.SetMerchantReceiptFooter(merchantReceiptFooter);
        options.SetCustomerReceiptHeader(customerReceiptHeader);

        const zipRefundRequest = Object.assign(new ZipRefundRequest(refundAmount, posRefId), {
            Options: options,
        });
        const message = zipRefundRequest.ToMessage();

        expect(merchantReceiptHeader).toBe(message.Data.merchant_receipt_header);
        expect(merchantReceiptFooter).toBe(message.Data.merchant_receipt_footer);
        expect(customerReceiptHeader).toBe(message.Data.customer_receipt_header);
        expect(customerReceiptFooter).toBe(message.Data.customer_receipt_footer);
    });

    it('ToMessage_ZipRefundWithReceiptNumber_MessageWithReceiptNumber', () => {
        const originalReceiptNumber = '123456';

        const zipRefundRequest = Object.assign(new ZipRefundRequest(refundAmount, posRefId), {
            OriginalReceiptNumber: originalReceiptNumber,
        });
        const message = zipRefundRequest.ToMessage();
        const zipData = message.Data.zip_data;

        expect(zipData.original_receipt_number).toBe(originalReceiptNumber);
    });

    it('ZipRefundResponse_ZipRefundResponseMessageValidDataFromMessageGetters', () => {
        const secrets = new Secrets(encKey, hmacKey);
        const message = Message.FromJson(JSON.stringify(__fixtures__.ZipRefundResponse), secrets);
        const response = new ZipRefundResponse(message);

        expect(message.EventName).toBe('refund_zip_response');
        expect(response.PosRefId).toBe('POS_REF_ID_2');
        expect(response.Success).toBeTruthy();

        expect(response.GetRefundAmount()).toBe(refundAmount);
        expect(response.GetCustomerReceipt()).not.toBeNull();
        expect(response.GetMerchantReceipt()).not.toBeNull();
        expect(response.GetResponseText()).toBe('TRANS APPROVED');
        expect(response.GetResponseCode()).toBe('000');
        expect(response.GetBankDate()).toBe('11012019');
        expect(response.GetBankTime()).toBe('091304');

        const zipDataEntry = response.GetZipData();
        expect(zipDataEntry.location_id).toBe('1234');
        expect(zipDataEntry.receipt_number).toBe('123456');
        expect(zipDataEntry.original_receipt_number).toBe('12345');

        expect(response.WasMerchantReceiptPrinted()).toBeTruthy();
        expect(response.WasCustomerReceiptPrinted()).toBeTruthy();
    });
});
