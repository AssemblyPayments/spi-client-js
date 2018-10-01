// <summary>
// Represents the 3 Pairing statuses that the Spi instanxce can be in.
// </summary>
const SpiStatus = 
{
    // <summary>
    // Paired and Connected
    // </summary>
    PairedConnected: 'PairedConnected',
    
    // <summary>
    // Paired but trying to establish a connection 
    // </summary>
    PairedConnecting: 'PairedConnecting',
    
    // <summary>
    // Unpaired
    // </summary>
    Unpaired: 'Unpaired'
};

// <summary>
// The Spi instance can be in one of these flows at any point in time.
// </summary>
const SpiFlow = 
{
    // <summary>
    // Currently going through the Pairing Process Flow.
    // Happens during the Unpaired SpiStatus.
    // </summary>
    Pairing: 'Pairing',
    
    // <summary>
    // Currently going through the transaction Process Flow.
    // Cannot happen in the Unpaired SpiStatus.
    // </summary>
    Transaction: 'Transaction',

    // <summary>
    // Not in any of the other states.
    // </summary>
    Idle: 'Idle'
};

// <summary>
// Represents the Pairing Flow State during the pairing process 
// </summary>
class PairingFlowState
{
    constructor(state) {
        // <summary>
        // Some text that can be displayed in the Pairing Process Screen
        // that indicates what the pairing process is up to.
        // </summary>
        this.Message = null;

        // <summary>
        // When true, it means that the EFTPOS is shoing the confirmation code,
        // and your user needs to press YES or NO on the EFTPOS.
        // </summary>
        this.AwaitingCheckFromEftpos = null;
        
        // <summary>
        // When true, you need to display the YES/NO buttons on you pairing screen
        // for your user to confirm the code.
        // </summary>
        this.AwaitingCheckFromPos = null;
        
        // <summary>
        // This is the confirmation code for the pairing process.
        // </summary>
        this.ConfirmationCode = null;
        
        // <summary>
        // Indicates whether the Pairing Flow has finished its job.
        // </summary>
        this.Finished = null;
        
        // <summary>
        // Indicates whether pairing was successful or not.
        // </summary>
        this.Successful = null;

        if(state) {
            Object.assign(this, state);
        }
    }   
}

const TransactionType = 
{
    Purchase: 'Purchase',
    Refund: 'Refund',
    CashoutOnly: 'CashoutOnly',
    MOTO: 'MOTO',
    Settle: 'Settle',
    SettlementEnquiry: 'SettlementEnquiry',
    GetLastTransaction: 'GetLastTransaction',
    
    Preauth: 'Preauth',
    AccountVerify: 'AccountVerify'
};

// <summary>
// Used as a return in the InitiateTx methods to signify whether 
// the transaction was initiated or not, and a reason to go with it.
// </summary>
class InitiateTxResult
{
    constructor(initiated, message)
    {
        // <summary>
        // Whether the tx was initiated.
        // When true, you can expect updated to your registered callback.
        // When false, you can retry calling the InitiateX method.
        // </summary>
        this.Initiated = initiated;

        // <summary>
        // Text that gives reason for the Initiated flag, especially in case of false. 
        // </summary>
        this.Message = message;
    }
}

// <summary>
// Used as a return in calls mid transaction to let you know
// whether the call was valid or not.
// These attributes work for COM interop.
// </summary>
class MidTxResult
{
    // <summary>
    // This default stucture works for COM interop.
    // </summary>
    constructor(valid, message)
    {
        this.Valid = valid;
        this.Message = message;
    }
}    

// <summary>
// Represents the State during a TransactionFlow
// </summary>
class TransactionFlowState
{
    constructor(posRefId, type, amountCents, message, msg)
    {
        // <summary>
        //  The id given to this transaction
        // </summary>
        this.PosRefId   = posRefId;
        this.Id         = posRefId; // obsolete, but let's maintain it for now, to mean same as PosRefId.

        // <summary>
        // Purchase/Refund/Settle/...
        // </summary>
        this.Type = type;

        // <summary>
        // A text message to display on your Transaction Flow Screen
        // </summary>
        this.DisplayMessage = msg;

        // <summary>
        // Amount in cents for this transaction
        // </summary>
        this.AmountCents = amountCents;

        // <summary>
        // Whther the request has been sent to the EFTPOS yet or not.
        // In the PairedConnecting state, the transaction is initiated
        // but the request is only sent once the connection is recovered.
        // </summary>
        this.RequestSent = false;

        // <summary>
        // The time when the request was sent to the EFTPOS.
        // </summary>
        this.RequestTime = null;
                
        // <summary>
        // The time when we last asked for an update, including the original request at first
        // </summary>
        this.LastStateRequestTime = null;
        
        // <summary>
        // Whether we're currently attempting to Cancel the transaction.
        // </summary>
        this.AttemptingToCancel = null;
    
        // <summary>
        // When this flag is on, you need to display the dignature accept/decline buttons in your 
        // transaction flow screen.
        // </summary>
        this.AwaitingSignatureCheck = false;

        // <summary>
        // When this flag is on, you need to show your user the phone number to call to get the authorisation code.
        // Then you need to provide your user means to enter that given code and submit it via SubmitAuthCode().
        // </summary>
        this.AwaitingPhoneForAuth = null;

        // <summary>
        // Whether this transaction flow is over or not.
        // </summary>
        this.Finished = false;

        // <summary>
        // The success state of this transaction. Starts off as Unknown.
        // When finished, can be Success, Failed OR Unknown.
        // </summary>
        this.Success = SuccessState.Unknown;

        // <summary>
        // The response at the end of the transaction. 
        // Might not be present in all edge cases.
        // You can then turn this Message into the appropriate structure,
        // such as PurchaseResponse, RefundResponse, etc
        // </summary>
        this.Response = null;

        // <summary>
        // The message the we received from EFTPOS that told us that signature is required.
        // </summary>
        this.SignatureRequiredMessage = null;
    
        // <summary>
        // The message the we received from EFTPOS that told us that Phone For Auth is required.
        // </summary>
        this.PhoneForAuthRequiredMessage = null;

        // <summary>
        // The time when the cancel attempt was made.
        // </summary>
        this.CancelAttemptTime = null;

        // <summary>
        // The request message that we are sending/sent to the server.
        // </summary>
        this.Request = message;

        // <summary>
        // Whether we're currently waiting for a Get Last Transaction Response to get an update. 
        // </summary>
        this.AwaitingGltResponse = null;
    }

    Sent(msg)
    {
        this.RequestSent = true;
        this.RequestTime = Date.now();
        this.LastStateRequestTime = Date.now();
        this.DisplayMessage = msg;
    }

    Cancelling(msg)
    {
        this.AttemptingToCancel = true;
        this.CancelAttemptTime = Date.now();
        this.DisplayMessage = msg;
    }

    CancelFailed(msg)
    {
        this.AttemptingToCancel = false;
        this.DisplayMessage = msg;
    }

    CallingGlt()
    {
        this.AwaitingGltResponse = true;
        this.LastStateRequestTime = Date.now();
    }

    GotGltResponse()
    {
        this.AwaitingGltResponse = false;
    }
    
    Failed(response, msg)
    {
        this.Success = SuccessState.Failed;
        this.Finished = true;
        this.Response = response;
        this.DisplayMessage = msg;
    }

    SignatureRequired(spiMessage, msg)
    {
        this.SignatureRequiredMessage = spiMessage;
        this.AwaitingSignatureCheck = true;
        this.DisplayMessage = msg;
    }

    SignatureResponded(msg)
    {
        this.AwaitingSignatureCheck = false;
        this.DisplayMessage = msg;
    }
    
    PhoneForAuthRequired(spiMessage, msg)
    {
        this.PhoneForAuthRequiredMessage = spiMessage;
        this.AwaitingPhoneForAuth = true;
        this.DisplayMessage = msg;
    }
    
    AuthCodeSent(msg)
    {
        this.AwaitingPhoneForAuth = false;
        this.DisplayMessage = msg;
    }

    Completed(state, response, msg)
    {
        this.Success = state;
        this.Response = response;
        this.Finished = true;
        this.AttemptingToCancel = false;
        this.AwaitingGltResponse = false;
        this.AwaitingSignatureCheck = false;
        this.AwaitingPhoneForAuth = false;
        this.DisplayMessage = msg;
    }

    UnknownCompleted(msg)
    {
        this.Success = SuccessState.Unknown;
        this.Response = null;
        this.Finished = true;
        this.AttemptingToCancel = false;
        this.AwaitingGltResponse = false;
        this.AwaitingSignatureCheck = false;
        this.AwaitingPhoneForAuth = false;
        this.DisplayMessage = msg;
    }
}

// <summary>
// Used as a return in the SubmitAuthCode method to signify whether Code is valid
// </summary>
class SubmitAuthCodeResult
{
    constructor(validFormat, message)
    {
        this.ValidFormat = validFormat;

        // <summary>
        // Text that gives reason for Invalidity
        // </summary>
        this.Message = message;
    }
}

class SpiConfig
{
    constructor() {
        this.PromptForCustomerCopyOnEftpos  = false;
        this.SignatureFlowOnEftpos          = false;
        this.PrintMerchantCopy              = false;
    }

    addReceiptConfig(messageData)
    {
        if (this.PromptForCustomerCopyOnEftpos)
        {
            messageData.prompt_for_customer_copy = this.PromptForCustomerCopyOnEftpos;
        }
        if (this.SignatureFlowOnEftpos)
        {
            messageData.print_for_signature_required_transactions = this.SignatureFlowOnEftpos;
        }
        if (this.PrintMerchantCopy)
        {
            messageData.print_merchant_copy = this.PrintMerchantCopy;
        }
        return messageData;
    }

    ToString()
    {
        return `PromptForCustomerCopyOnEftpos:${this.PromptForCustomerCopyOnEftpos} SignatureFlowOnEftpos:${this.SignatureFlowOnEftpos} PrintMerchantCopy: ${this.PrintMerchantCopy}`;
    }
}

class TransactionOptions
{
    constructor() {
        this.CustomerReceiptHeader = null;
        this.CustomerReceiptFooter = null;
        this.MerchantReceiptHeader = null;
        this.MerchantReceiptFooter = null;
    }

    SetCustomerReceiptHeader(customerReceiptHeader)
    {
        this.CustomerReceiptHeader = customerReceiptHeader;
    }

    SetCustomerReceiptFooter(customerReceiptFooter)
    {
        this.CustomerReceiptFooter = customerReceiptFooter;
    }
    SetMerchantReceiptHeader(merchantReceiptHeader)
    {
        this.MerchantReceiptHeader = merchantReceiptHeader;
    }
    SetMerchantReceiptFooter(merchantReceiptFooter)
    {
        this.MerchantReceiptFooter = merchantReceiptFooter;
    }
    AddOptions(messageData)
    {
        messageData.customer_receipt_header = this.CustomerReceiptHeader;
        messageData.customer_receipt_footer = this.CustomerReceiptFooter;
        messageData.merchant_receipt_header = this.MerchantReceiptHeader;
        messageData.merchant_receipt_footer = this.MerchantReceiptFooter;

        return messageData;
    }
}