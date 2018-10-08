class PurchaseHelper
{
    static CreatePurchaseRequest(amountCents, purchaseId)
    {
        return new PurchaseRequest(amountCents, purchaseId);
    }
    
    static CreatePurchaseRequestV2(posRefId, purchaseAmount, tipAmount, cashoutAmount, promptForCashout, surchargeAmount)
    {
        var pr = Object.assign(new PurchaseRequest(purchaseAmount, posRefId),
        {
            CashoutAmount: cashoutAmount,
            TipAmount: tipAmount,
            PromptForCashout: promptForCashout,
            SurchargeAmount: surchargeAmount
        });

        return pr;
    }

    static CreateRefundRequest(amountCents, purchaseId, isSuppressMerchantPassword)
    {
        return new RefundRequest(amountCents, purchaseId, isSuppressMerchantPassword);
    }

}
