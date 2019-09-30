import { Events, Message, SuccessState } from './Messages';
import { RequestIdHelper } from './RequestIdHelper';
import { SpiConfig, TransactionOptions } from './SpiModels';

export class ZipPurchaseRequest {
    constructor(purchaseAmount, posRefId) {
        this.PosRefId = posRefId;
        this.PurchaseAmount = purchaseAmount;
        this.StoreCode = '';
        this.Description = '';
        this.Config = new SpiConfig();
        this.Options = new TransactionOptions();
    }

    AmountSummary() {
        return `Purchase: ${(this.PurchaseAmount / 100.0).toFixed(2)}`;
    }

    ToMessage() {
        const data = {
            pos_ref_id: this.PosRefId,
            purchase_amount: this.PurchaseAmount,
            zip_data: {
                store_code: this.StoreCode,
            },
            basket: {
                description: this.Description,
            },
        };

        this.Config = Object.assign(this.Config, {
            EnabledPrintMerchantCopy: true,
            EnabledPromptForCustomerCopyOnEftpos: true,
            EnabledSignatureFlowOnEftpos: false,
        });

        this.Config.AddReceiptConfig(data);
        this.Options.AddOptions(data);
        return new Message(RequestIdHelper.Id('zprchs'), Events.ZipPurchaseRequest, data, true);
    }
}

export class ZipPurchaseResponse {
    constructor(m) {
        this._m = m;
        this.PosRefId = this._m.Data.pos_ref_id;
        this.Success = m.GetSuccessState() === SuccessState.Success;
    }

    GetPurchaseAmount() {
        return this._m.Data.purchase_amount;
    }

    GetCustomerReceipt() {
        return this._m.Data.customer_receipt;
    }

    GetMerchantReceipt() {
        return this._m.Data.merchant_receipt;
    }

    GetResponseText() {
        return this._m.Data.host_response_text;
    }

    GetResponseCode() {
        return this._m.Data.host_response_code;
    }

    GetBankDate() {
        return this._m.Data.bank_date;
    }

    GetBankTime() {
        return this._m.Data.bank_time;
    }

    GetZipData() {
        return this._m.Data.zip_data;
    }

    WasMerchantReceiptPrinted() {
        return this._m.Data.merchant_receipt_printed;
    }

    WasCustomerReceiptPrinted() {
        return this._m.Data.customer_receipt_printed;
    }
}

export class ZipRefundRequest {
    constructor(refundAmount, posRefId) {
        this.PosRefId = posRefId;
        this.RefundAmount = refundAmount;
        this.OriginalReceiptNumber = '';

        this.Config = new SpiConfig();
        this.Options = new TransactionOptions();
    }

    ToMessage() {
        const data = {
            pos_ref_id: this.PosRefId,
            refund_amount: this.RefundAmount,
            zip_data: {
                original_receipt_number: this.OriginalReceiptNumber,
            },
        };

        this.Config = Object.assign(this.Config, {
            EnabledPrintMerchantCopy: true,
            EnabledPromptForCustomerCopyOnEftpos: true,
            EnabledSignatureFlowOnEftpos: false,
        });

        this.Config.AddReceiptConfig(data);
        this.Options.AddOptions(data);
        return new Message(RequestIdHelper.Id('zrefund'), Events.ZipRefundRequest, data, true);
    }
}

export class ZipRefundResponse {
    constructor(m) {
        this._m = m;
        this.PosRefId = this._m.Data.pos_ref_id;
        this.Success = m.GetSuccessState() === SuccessState.Success;
    }

    GetRefundAmount() {
        return this._m.Data.refund_amount;
    }

    GetCustomerReceipt() {
        return this._m.Data.customer_receipt;
    }

    GetMerchantReceipt() {
        return this._m.Data.merchant_receipt;
    }

    GetResponseText() {
        return this._m.Data.host_response_text;
    }

    GetResponseCode() {
        return this._m.Data.host_response_code;
    }

    GetBankDate() {
        return this._m.Data.bank_date;
    }

    GetBankTime() {
        return this._m.Data.bank_time;
    }

    GetZipData() {
        return this._m.Data.zip_data;
    }

    WasMerchantReceiptPrinted() {
        return this._m.Data.merchant_receipt_printed;
    }

    WasCustomerReceiptPrinted() {
        return this._m.Data.customer_receipt_printed;
    }
}

export class ZipDataEntry {
    constructor() {
        this.StoreCode = '';
        this.LocationId = '';
        this.ReceiptNumber = 0;
        this.OriginalReceiptNumber = 0;
    }
}
