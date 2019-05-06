import {Events, Message} from './Messages';
import {RequestIdHelper} from './RequestIdHelper';

export class TerminalConfigurationRequest
{
    ToMessage()
    {
        var data = {};

        return new Message(RequestIdHelper.Id("trmnl"), Events.TerminalConfigurationRequest, data, true);
    }
}

export class TerminalConfigurationResponse
{
    constructor(m)
    {
        this._m = m;
    }

    GetCommsSelected()
    {
      return _m.GetDataStringValue("comms_selected");
    }

    GetMerchantId()
    {
      return _m.GetDataStringValue("merchant_id");
    }

    GetPAVersion()
    {
      return _m.GetDataStringValue("pa_version");
    }

    GetPaymentInterfaceVersion()
    {
      return _m.GetDataStringValue("payment_interface_version");
    }

    GetPluginVersion()
    {
      return _m.GetDataStringValue("plugin_version");
    }

    GetSerialNumber()
    {
      return _m.GetDataStringValue("serial_number");
    }

    GetTerminalId()
    {
      return _m.GetDataStringValue("terminal_id");
    }

    GetTerminalModel()
    {
      return _m.GetDataStringValue("terminal_model");
    }
}
