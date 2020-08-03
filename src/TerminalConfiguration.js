import {Events, Message, SuccessState} from './Messages';
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
        this._success = m.GetSuccessState() === SuccessState.Success;
        this._m = m;
    }

    isSuccess()
    {
      return this._success;
    }

    GetCommsSelected()
    {
      return this._m.Data.comms_selected;
    }

    GetMerchantId()
    {
      return this._m.Data.merchant_id;
    }

    GetPAVersion()
    {
      return this._m.Data.pa_version;
    }

    GetPaymentInterfaceVersion()
    {
      return this._m.Data.payment_interface_version;
    }

    GetPluginVersion()
    {
      return this._m.Data.plugin_version;
    }

    GetSerialNumber()
    {
      return this._m.Data.serial_number;
    }

    GetTerminalId()
    {
      return this._m.Data.terminal_id;
    }

    GetTerminalModel()
    {
      return this._m.Data.terminal_model;
    }
}
