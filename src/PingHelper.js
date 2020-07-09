import {RequestIdHelper} from './RequestIdHelper';
import {Events, Message} from './Messages';

export class PongHelper
{
    static GeneratePongResponse(ping)
    {
        return new Message(ping.Id, Events.Pong, null, true);
    }
}

export class PingHelper
{
    static GeneratePingRequest()
    {
        return new Message(RequestIdHelper.Id("ping"), Events.Ping, null, true);
    }
}
