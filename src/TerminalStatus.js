export class TerminalStatusRequest
{
    ToMessage()
    {
        var data = {};

        return new Message(RequestIdHelper.Id("trmnl"), Events.TerminalStatusRequest, data, true);
    }
}

export class TerminalStatusResponse
{
    constructor(m)
    {
        this._m = m;
    }
    GetStatus()
    {
        return this._m.Data.status;
    }
    GetBatteryLevel()
    {
        return this._m.Data.battery_level;
    }
    IsCharging()
    {
        return !!this._m.Data.charging;
    }
}

export class TerminalBattery
{
    constructor(m)
    {
        this.BatteryLevel = m.Data.battery_level;
    }
}
