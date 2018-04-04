class PurchaseHelper
{
    static CreatePurchaseRequest(amountCents, purchaseId)
    {
        return new PurchaseRequest(amountCents, purchaseId);
    }
    
    static CreateRefundRequest(amountCents, purchaseId)
    {
        return new RefundRequest(amountCents, purchaseId);
    }

}
