class SettleRequest {
    constructor(id) {
        this.Id = id;
    }

    ToMessage() {
        return new Message(RequestIdHelper.Id("stl"), Events.SettleRequest, null, true);
    }
}

class Settlement {
    constructor(m) {
        this.RequestId = m.Id;
        this._m = m;
        this.Success = m.GetSuccessState() == SuccessState.Success;
    }

    GetResponseText()
    {
        return this._m.Data.host_response_text;
    }
    
    GetReceipt()
    {
        return this._m.Data.merchant_receipt;
    }
}