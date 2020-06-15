import {Events, Message} from './Messages';
import {RequestIdHelper} from './RequestIdHelper';

export class TerminalConfigurationRequest
{
    ToMessage()
    {
        const data = {};

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
      return this._m.GetDataStringValue("comms_selected");
    }

    GetMerchantId()
    {
      return this._m.GetDataStringValue("merchant_id");
    }

    GetPAVersion()
    {
      return this._m.GetDataStringValue("pa_version");
    }

    GetPaymentInterfaceVersion()
    {
      return this._m.GetDataStringValue("payment_interface_version");
    }

    GetPluginVersion()
    {
      return this._m.GetDataStringValue("plugin_version");
    }

    GetSerialNumber()
    {
      return this._m.GetDataStringValue("serial_number");
    }

    GetTerminalId()
    {
      return this._m.GetDataStringValue("terminal_id ");
    }

    GetTerminalModel()
    {
      return this._m.GetDataStringValue("terminal_model");
    }

    GetSuccessState() {
      return this._m.GetSuccessState();
    }
}
