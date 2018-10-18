import {Events, SuccessState} from './Messages';

export class SetPosInfoRequest
{
    constructor(version, vendorId, libraryLanguage, libraryVersion, otherInfo)
    {
        this._version = version;
        this._vendorId = vendorId;
        this._libraryLanguage = libraryLanguage;
        this._libraryVersion = libraryVersion;
        this._otherInfo = otherInfo;
    }

    toMessage()
    {
        var data = {
            pos_version: this._version,
            pos_vendor_id: this._vendorId,
            library_language: this._libraryLanguage,
            library_version: this._libraryVersion,
            other_info: this._otherInfo
        };

        return new Message(RequestIdHelper.Id("prav"), Events.SetPosInfoRequest, data, true);
    }
}

export class SetPosInfoResponse
{
    constructor(m)
    {
        this._success = m.GetSuccessState() == SuccessState.Success;
        this._m = m;
    }
    isSuccess()
    {
        return this._success;
    }
    getErrorReason()
    {
        return this._m.Data.error_reason;
    }
    getErrorDetail()
    {
        return this._m.Data.error_detail;
    }
    getResponseValueWithAttribute(attribute)
    {
        return this._m.Data[attribute];
    }
}

export class DeviceInfo
{
    static GetAppDeviceInfo()
    {
        var deviceInfo = {};
        deviceInfo['device_system'] = navigator.userAgent;
        // deviceInfo.Add("device_system", Environment.OSVersion.Platform.ToString() + " " + Environment.OSVersion.Version.ToString());
        return deviceInfo;
    }
}
