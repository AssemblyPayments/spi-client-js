import {Events, SuccessState, Message} from './Messages';
import {RequestIdHelper} from './RequestIdHelper';
import {SpiConfig, TransactionOptions} from './SpiModels';

export class PurchaseRequest {
    constructor(amountCents, posRefId) {
        this.PosRefId = posRefId;
        this.PurchaseAmount = amountCents;
        this.TipAmount = 0;
        this.CashoutAmount = 0;
        this.PromptForCashout = false;
        this.SurchargeAmount = 0;
        this.Config = new SpiConfig();
        this.Options = new TransactionOptions();

        // Library Backwards Compatibility
        this.Id = posRefId;
        this.AmountCents = amountCents;
    }

    AmountSummary()
    {
        const purchaseAmount = ((this.PurchaseAmount || 0) / 100.0).toFixed(2);
        const tipAmount = ((this.TipAmount || 0) / 100.0).toFixed(2);
        const cashoutAmount = ((this.CashoutAmount || 0) / 100.0).toFixed(2);

        return `Purchase: ${purchaseAmount}; Tip: ${tipAmount}; Cashout: ${cashoutAmount};`;
    }

    ToMessage() {
        let data = {
            pos_ref_id: this.PosRefId,
            purchase_amount: this.PurchaseAmount,
            tip_amount: this.TipAmount,
            cash_amount: this.CashoutAmount,
            prompt_for_cashout: this.PromptForCashout, 
            surcharge_amount: this.SurchargeAmount
        };

        this.Config.EnabledPrintMerchantCopy = true;
        this.Config.EnabledPromptForCustomerCopyOnEftpos = true;
        this.Config.EnabledSignatureFlowOnEftpos = true;
        this.Config.AddReceiptConfig(data);
        this.Options.AddOptions(data);
        return new Message(RequestIdHelper.Id("prchs"), Events.PurchaseRequest, data, true);
    }
}

export class PurchaseResponse
{
    constructor(m)
    {
        this._m = m;
        this.RequestId = m.Id;
        this.PosRefId = m.Data.pos_ref_id;
        this.SchemeName = m.Data.scheme_name;
        this.SchemeAppName = m.Data.scheme_name;
        this.Success = m.GetSuccessState() == SuccessState.Success;
    }

    GetRRN()
    {
        return this._m.Data.rrn;
    }

    GetPurchaseAmount()
    {
        return this._m.Data.purchase_amount;
    }

    GetTipAmount()
    {
        return this._m.Data.tip_amount || 0;
    }

    GetSurchargeAmount()
    {
        return this._m.Data.surcharge_amount || 0;
    }

    GetCashoutAmount()
    {
        return this._m.Data.cash_amount;
    }

    GetBankNonCashAmount()
    {
        return this._m.Data.bank_noncash_amount;
    }

    GetBankCashAmount()
    {
        return this._m.Data.bank_cash_amount;
    }

    GetCustomerReceipt()
    {
        return this._m.Data.customer_receipt || "";
    }

    GetMerchantReceipt()
    {
        return this._m.Data.merchant_receipt || "";
    }

    GetResponseText()
    {
        return this._m.Data.host_response_text || "";
    }

    GetResponseCode()
    {
        return this._m.Data.host_response_code;
    }
    
    GetTerminalReferenceId()
    {
        return this._m.Data.terminal_ref_id;
    }

    GetCardEntry()
    {
        return this._m.Data.card_entry;
    }
    
    GetAccountType()
    {
        return this._m.Data.account_type;
    }

    GetAuthCode()
    {
        return this._m.Data.auth_code;
    }

    GetBankDate()
    {
        return this._m.Data.bank_date;
    }

    GetBankTime()
    {
        return this._m.Data.bank_time;
    }
    
    GetMaskedPan()
    {
        return this._m.Data.masked_pan;
    }
    
    GetTerminalId()
    {
        return this._m.Data.terminal_id;
    }

    WasMerchantReceiptPrinted()
    {
        return this._m.Data.merchant_receipt_printed;
    }

    WasCustomerReceiptPrinted()
    {
        return this._m.Data.customer_receipt_printed;
    }
    
    GetSettlementDate()
    {
        //"bank_settlement_date":"20042018"
        var dateStr = this._m.Data.bank_settlement_date;
        if (!dateStr) return null;
        return Message.ParseBankDate(dateStr);
    }

    GetResponseValue(attribute)
    {
        return this._m.Data[attribute];
    }

    ToPaymentSummary()
    {
        return {
            account_type: this.GetAccountType(),
            auth_code: this.GetAuthCode(),
            bank_date: this.GetBankDate(),
            bank_time: this.GetBankTime(),
            host_response_code: this.GetResponseCode(),
            host_response_text: this.GetResponseText(),
            masked_pan: this.GetMaskedPan(),
            purchase_amount: this.GetPurchaseAmount(),
            rrn: this.GetRRN(),
            scheme_name: this.SchemeName,
            terminal_id: this.GetTerminalId(),
            terminal_ref_id: this.GetTerminalReferenceId(),
            tip_amount: this.GetTipAmount(),
            surcharge_amount: this.GetSurchargeAmount()
        };
    }
}

export class CancelTransactionRequest
{
    
    ToMessage()
    {
        return new Message(RequestIdHelper.Id("ctx"), Events.CancelTransactionRequest, null, true);
    }
}

export class CancelTransactionResponse
{
    constructor(m)
    {
        this._m = m;
        this.PosRefId = this._m.Data.pos_ref_id;
        this.Success = this._m.GetSuccessState() == SuccessState.Success;
    }

    GetErrorReason()
    {
        return this._m.Data.error_reason;
    }

    GetErrorDetail()
    {
        return this._m.Data.error_detail;
    }

    WasTxnPastPointOfNoReturn()
    {
        return this._m.GetError().startsWith("TXN_PAST_POINT_OF_NO_RETURN");
    }

    GetResponseValueWithAttribute(attribute)
    {
        return this._m.Data[attribute];
    }
}

export class GetTransactionRequest
{
    constructor(posRefId) {
        this.PosRefId = posRefId
    }

    ToMessage()
    {

        const data = {
            "pos_ref_id": this.PosRefId,
        };

        return new Message(RequestIdHelper.Id("gt"), Events.GetTransactionRequest, data, true);
    }
}

export class GetTransactionResponse
{
    constructor (m)
    {
        this._m = m;
        this.Success = false;
    }

    GetPosRefId()
    {
        return this._m.Data.pos_ref_id;
    }

    GetError()
    {
        const error = this._m.Data.error_reason;
        if (error) return error;
        return null;
    }

    /// <summary>
    /// Tx is a sub object of the payload, so we will copy this into a message for convenience. 
    /// </summary>
    GetTxMessage()
    {
        const tx = this._m.Data.tx;
        if (tx) {
            return new Message(this._m.Id, "gt", tx, false);
        }

        return null;
    }

    PosRefIdNotFound()
    {
        if (this._m.GetError() !== null)
            return  this._m.GetError().startsWith("POS_REF_ID_NOT_FOUND");

        return false;
    }

    PosRefIdInvalid()
    {
        if (this._m.GetError() !== null)
            return this._m.GetError().startsWith("INVALID_ARGUMENTS");

        return false;
    }

    PosRefIdMissing()
    {
        if (this._m.GetError() !== null)
            return this._m.GetError().startsWith("MISSING_ARGUMENTS");

        return false;
    }

    WasRetrievedSuccessfully()
    {
        return this._m.GetSuccessState() === SuccessState.Success;
    }

    IsTransactionInProgress()
    {
        return this._m.GetError().startsWith("TRANSACTION_IN_PROGRESS");
    }

    IsWaitingForSignatureResponse()
    {
        return this._m.GetError().startsWith("TRANSACTION_IN_PROGRESS_AWAITING_SIGNATURE");
    }

    IsWaitingForAuthCode()
    {
        return this._m.GetError().startsWith("TRANSACTION_IN_PROGRESS_AWAITING_PHONE_AUTH_CODE");
    }

    IsSomethingElseBlocking()
    {
        return this._m.GetError().startsWith("OPERATION_IN_PROGRESS");
    }

    CopyMerchantReceiptToCustomerReceipt()
    {
        const customerReceipt = this._m.Data.customer_receipt;
        const merchantReceipt = this._m.Data.merchant_receipt;
        if (merchantReceipt !== "" && customerReceipt === "") {
            this._m.Data.customer_receipt = merchantReceipt;
        }
    }
}

export class GetLastTransactionRequest
{
    ToMessage()
    {
        return new Message(RequestIdHelper.Id("glt"), Events.GetLastTransactionRequest, null, true);
    }
}

export class GetLastTransactionResponse
{
    constructor(m)
    {
        this._m = m;
    }

    WasRetrievedSuccessfully()
    {
        // We can't rely on checking "success" flag or "error" fields here,
        // as retrieval may be successful, but the retrieved transaction was a fail.
        // So we check if we got back an ResponseCode.
        // (as opposed to say an operation_in_progress_error)
        return !!this.GetResponseCode();
    }

    WasOperationInProgressError()
    {
        return this._m.GetError().startsWith("OPERATION_IN_PROGRESS");
    }

    IsWaitingForSignatureResponse()
    {
        return this._m.GetError().startsWith("OPERATION_IN_PROGRESS_AWAITING_SIGNATURE");
    }

    IsWaitingForAuthCode()
    {
        return this._m.GetError().startsWith("OPERATION_IN_PROGRESS_AWAITING_PHONE_AUTH_CODE");
    }
    
    IsStillInProgress(posRefId)
    {
        return this.WasOperationInProgressError() && (this.GetPosRefId() == posRefId || this.GetPosRefId() == null);
    }

    GetSuccessState()
    {
        return this._m.GetSuccessState();
    }

    WasSuccessfulTx()
    {
        return this._m.GetSuccessState() == SuccessState.Success;
    }

    GetTxType()
    {
        return this._m.Data.transaction_type;
    }

    GetPosRefId()
    {
        return this._m.Data.pos_ref_id;
    }

    GetBankNonCashAmount()
    {
        return this._m.Data.bank_noncash_amount;
    }

    GetSchemeApp()
    {
        return this._m.Data.scheme_name;
    }

    GetSchemeName()
    {
        return this._m.Data.scheme_name;
    }

    GetAmount()
    {
        return this._m.Data.amount_purchase;
    }

    GetTransactionAmount()
    {
        return this._m.Data.amount_transaction_type;
    }

    GetBankDateTimeString()
    {
        var ds = this._m.Data.bank_date + this._m.Data.bank_time;
        return ds;
    }

    GetRRN()
    {
        return this._m.Data.rrn;
    }
    
    GetResponseText()
    {
        return this._m.Data.host_response_text || "";
    }

    GetResponseCode()
    {
        return this._m.Data.host_response_code;
    }

    // <summary>
    // There is a bug, VSV-920, whereby the customer_receipt is missing from a glt response.
    // The current recommendation is to use the merchant receipt in place of it if required.
    // This method modifies the underlying incoming message data by copying
    // the merchant receipt into the customer receipt only if there 
    // is a merchant_receipt and there is not a customer_receipt.   
    // </summary>
    CopyMerchantReceiptToCustomerReceipt()
    {
        var cr = this._m.Data.customer_receipt;
        var mr = this._m.Data.merchant_receipt;
        if (mr != "" && !(cr))
        {
            this._m.Data.customer_receipt = mr;
        }
    }
}

export class RefundRequest
{
    constructor(amountCents, posRefId, suppressMerchantPassword)
    {
        this.AmountCents = amountCents;
        this.Id = RequestIdHelper.Id("refund");
        this.PosRefId = posRefId;
        this.SuppressMerchantPassword = suppressMerchantPassword;
        this.Config = new SpiConfig();
        this.Options = new TransactionOptions();
    }
    
    ToMessage()
    {
        let data = {
            refund_amount: this.AmountCents, 
            pos_ref_id: this.PosRefId,
            suppress_merchant_password: this.SuppressMerchantPassword
        };
        
        this.Config.EnabledPrintMerchantCopy = true;
        this.Config.EnabledPromptForCustomerCopyOnEftpos = true;
        this.Config.EnabledSignatureFlowOnEftpos = true;
        this.Config.AddReceiptConfig(data);
        this.Options.AddOptions(data);
        return new Message(RequestIdHelper.Id("refund"), Events.RefundRequest, data, true);
    }
}

export class RefundResponse
{
    constructor(m)
    {
        this._m = m;
        this.RequestId = m.Id;
        this.PosRefId = m.Data.pos_ref_id;
        this.SchemeName = m.Data.scheme_name;
        this.SchemeAppName = m.Data.scheme_name;
        this.Success = m.GetSuccessState() == SuccessState.Success;
    }

    GetRefundAmount()
    {
        return this._m.Data.refund_amount;
    }

    GetRRN()
    {
        return this._m.Data.rrn;
    }

    GetCustomerReceipt()
    {
        return this._m.Data.customer_receipt || "";
    }

    GetMerchantReceipt()
    {
        return this._m.Data.merchant_receipt;
    }
    
    GetResponseText()
    {
        return this._m.Data.host_response_text || "";
    }

    GetResponseCode()
    {
        return this._m.Data.host_response_code || "";
    }


    GetTerminalReferenceId()
    {
        return this._m.Data.terminal_ref_id || "";
    }
    GetCardEntry()
    {
        return this._m.Data.card_entry || "";
    }
    GetAccountType()
    {
        return this._m.Data.account_type || "";
    }
    GetAuthCode()
    {
        return this._m.Data.auth_code || "";
    }
    GetBankDate()
    {
        return this._m.Data.bank_date || "";
    }
    GetBankTime()
    {
        return this._m.Data.bank_time || "";
    }
    GetMaskedPan()
    {
        return this._m.Data.masked_pan || "";
    }
    GetTerminalId()
    {
        return this._m.Data.terminal_id || "";
    }
    WasMerchantReceiptPrinted()
    {
        return this._m.Data.merchant_receipt_printed;
    }
    WasCustomerReceiptPrinted()
    {
        return this._m.Data.customer_receipt_printed;
    }
    GetSettlementDate()
    {
        //"bank_settlement_date":"20042018"
        var dateStr = this._m.Data.bank_settlement_date;
        if (!dateStr) return null;
        return Message.ParseBankDate(dateStr);
    }

    GetResponseValue(attribute)
    {
        return this._m.Data[attribute];
    }
}

export class SignatureRequired
{
    constructor(m)
    {
        this.RequestId = m.Id;
        this.PosRefId = m.Data.pos_ref_id;
        this._receiptToSign = m.Data.merchant_receipt;
    }
    
    SignatureRequired(posRefId, requestId, receiptToSign)
    {
        this.RequestId = requestId;
        this.PosRefId = posRefId;
        this._receiptToSign = receiptToSign;
    }

    GetMerchantReceipt()
    {
        return this._receiptToSign;
    }
}

export class SignatureDecline
{
    constructor(posRefId)
    {
        this.PosRefId = posRefId;
    }

    ToMessage()
    {
        var data = {
            pos_ref_id: this.PosRefId
        };
        return new Message(RequestIdHelper.Id("sigdec"), Events.SignatureDeclined, data, true);
    }
}

export class SignatureAccept
{
    constructor(posRefId)
    {
        this.PosRefId = posRefId;
    }

    ToMessage()
    {
        var data = {
            pos_ref_id: this.PosRefId
        };
        return new Message(RequestIdHelper.Id("sigacc"), Events.SignatureAccepted, data, true);
    }
}

export class MotoPurchaseRequest
{
    constructor(amountCents, posRefId, surchargeAmount, SuppressMerchantPassword)
    {
        this.PosRefId = posRefId;
        this.PurchaseAmount = amountCents;
        this.SurchargeAmount = surchargeAmount;
        this.SuppressMerchantPassword = SuppressMerchantPassword;
        this.Config = new SpiConfig();
        this.Options = new TransactionOptions();
    }

    ToMessage()
    {
        var data = {
            pos_ref_id: this.PosRefId,
            purchase_amount: this.PurchaseAmount,
            surcharge_amount: this.SurchargeAmount,
            suppress_merchant_password: this.SuppressMerchantPassword
        };

        this.Config.EnabledPrintMerchantCopy = true;
        this.Config.EnabledPromptForCustomerCopyOnEftpos = true;
        this.Config.EnabledSignatureFlowOnEftpos = true;
        this.Config.AddReceiptConfig(data);
        this.Options.AddOptions(data);
        return new Message(RequestIdHelper.Id("moto"), Events.MotoPurchaseRequest, data, true);
    }
}

export class MotoPurchaseResponse
{
    constructor(m)
    {
        this.PurchaseResponse = new PurchaseResponse(m);
        this.PosRefId = PurchaseResponse.PosRefId;
    }
}

export class PhoneForAuthRequired
{
    constructor(...args)
    {
        if(args.length === 4) {
            this.PosRefId = args[0];
            this.RequestId = args[1];
            this._phoneNumber = args[2];
            this._merchantId = args[3];
        } else if(args.length === 1) {
            this.RequestId = args[0].Id;
            this.PosRefId = args[0].Data.pos_ref_id;
            this._phoneNumber = args[0].Data.auth_centre_phone_number;
            this._merchantId = args[0].Data.merchant_id;
        } else {
            throw new Error('Invalid call sig for Phone auth required class');
        }
    }
    
    GetPhoneNumber()
    {
        return this._phoneNumber;
    }
    
    GetMerchantId()
    {
        return this._merchantId;
    }
}

export class AuthCodeAdvice
{
    constructor(posRefId, authCode)
    {
        this.PosRefId = posRefId;
        this.AuthCode = authCode;
    }

    ToMessage()
    {
        var data = {
            pos_ref_id: this.PosRefId,
            auth_code: this.AuthCode
        };
        return new Message(RequestIdHelper.Id("authad"), Events.AuthCodeAdvice, data, true);
    }
}

export class TransactionUpdate
{
    constructor(m) 
    {
        this.DisplayMessageCode = m.Data.display_message_code;
        this.DisplayMessageText = m.Data.display_message_text;
    }

    GetDisplayMessageCode() {
        return this.DisplayMessageCode;
    }

    GetDisplayMessageText() {
        return this.DisplayMessageText;
    }
}