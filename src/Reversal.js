import { Events, Message, SuccessState } from './Messages';
import { RequestIdHelper } from './RequestIdHelper';


export class ReversalRequest
{
    constructor(posRefId)
    {
        this.PosRefId = posRefId;
    }

    ToMessage()
    {
        const data = {
            "pos_ref_id": this.PosRefId,
        };

        return new Message(RequestIdHelper.Id("rev"), Events.ReversalRequest, data, true);
    }
}

export class ReversalResponse
{
    constructor(m)
    {
        this._m = m;
        this.PosRefId = m.Data.pos_ref_id;
        this.Success = m.GetSuccessState() === SuccessState.Success;
    }

    GetErrorReason()
    {
        return this._m.Data.error_reason;
    }

    GetErrorDetail()
    {
        return this._m.Data.error_detail;
    }
}
