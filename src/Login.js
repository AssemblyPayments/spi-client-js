class LoginRequest
{
    ToMessage()
    {
        return new Message(RequestIdHelper.Id("l"), Events.LoginRequest, null, true);
    }
}

class LoginResponse
{    
    constructor(m)
    {
        this.Success = m.Data.success;
        this.Expires = m.Data.expires_datetime;
    }

    ExpiringSoon(serverTimeDelta)
    {
        let now = Date.now();
        let nowServerTime = new Date(Date.now() + serverTimeDelta);
        let expiresAt = Date.parse(this.Expires);
        let tenMinInMs = 10 * 60 * 1000;
        let nowServerTimePlusTenMin = new Date(nowServerTime.getTime() + tenMinInMs);

        return expiresAt < nowServerTimePlusTenMin.getTime();
    }
}
