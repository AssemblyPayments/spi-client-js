class PurchaseHelper
{
    static CreatePurchaseRequest(amountCents, purchaseId)
    {
        return new PurchaseRequest(amountCents, purchaseId);
    }
    
    static CreatePurchaseRequestV2(posRefId, purchaseAmount, tipAmount, cashoutAmount, promptForCashout)
    {
        var pr = Object.assign(new PurchaseRequest(purchaseAmount, posRefId),
        {
            CashoutAmount: cashoutAmount,
            TipAmount: tipAmount,
            PromptForCashout: promptForCashout
        });

        return pr;
    }

    static CreateRefundRequest(amountCents, purchaseId)
    {
        return new RefundRequest(amountCents, purchaseId);
    }

}
