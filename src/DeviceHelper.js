import { DeviceAddressResponseCode, DeviceAddressStatus, HttpStatusCode } from './Service/DeviceService';

export class DeviceHelper {
  static GenerateDeviceAddressStatus(serviceResponse, currentEftposAddress, isSecureWebsockets) {
    const deviceAddressStatus = new DeviceAddressStatus(isSecureWebsockets);

    if (serviceResponse.StatusCode === HttpStatusCode.NotFound) {
      deviceAddressStatus.DeviceAddressResponseCode = DeviceAddressResponseCode.INVALID_SERIAL_NUMBER;
      return deviceAddressStatus;
    }

    if ((serviceResponse && serviceResponse.Data === null) || serviceResponse.StatusCode !== HttpStatusCode.OK) {
      deviceAddressStatus.DeviceAddressResponseCode = DeviceAddressResponseCode.DEVICE_SERVICE_ERROR;
      return deviceAddressStatus;
    }

    if (serviceResponse.Data.Address === currentEftposAddress.replace(/^w[s]?s:\/\//, '')) {
      deviceAddressStatus.DeviceAddressResponseCode = DeviceAddressResponseCode.ADDRESS_NOT_CHANGED;
      return deviceAddressStatus;
    }

    deviceAddressStatus.DeviceAddressResponseCode = DeviceAddressResponseCode.SUCCESS;
    deviceAddressStatus.ResponseStatusDescription = serviceResponse.StatusDescription;
    deviceAddressStatus.Address = serviceResponse.Data.fqdn || serviceResponse.Data.ip;
    deviceAddressStatus.LastUpdated = serviceResponse.Data.last_updated;

    return deviceAddressStatus;
  }
}
