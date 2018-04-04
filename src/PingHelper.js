class PongHelper
{
    static GeneratePongRessponse(ping)
    {
        return new Message(ping.Id, Events.Pong, null, true);
    }
}

class PingHelper
{
    static GeneratePingRequest()
    {
        return new Message(RequestIdHelper.Id("ping"), Events.Ping, null, true);
    }
}
