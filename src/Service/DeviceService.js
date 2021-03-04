export class DeviceAddressStatus
{
    get Address()
    {
        if(this.UseSecureWebSockets) 
        {
            return this.fqdn;
        } 
        else
        {
            return this.ip;
        }
    }

    set Address(address)
    {
        if(this.UseSecureWebSockets) 
        {
            this.fqdn = address;
        } 
        else
        {
            this.ip = address;
        }
    }

    constructor(useSecureWebSockets) 
    {
        this.UseSecureWebSockets = useSecureWebSockets;

        this.ip = null;
        this.fqdn = null;
        this.LastUpdated = null;

        this.DeviceAddressResponseCode = null;
        this.ResponseStatusDescription = null;
        this.ResponseMessage = null;
    }
}

export const DeviceAddressResponseCode =
{
    SUCCESS: 'SUCCESS',
    INVALID_SERIAL_NUMBER: 'INVALID_SERIAL_NUMBER',
    ADDRESS_NOT_CHANGED: 'ADDRESS_NOT_CHANGED',
    SERIAL_NUMBER_NOT_CHANGED: 'SERIAL_NUMBER_NOT_CHANGED',
    DEVICE_SERVICE_ERROR: 'DEVICE_SERVICE_ERROR'
};

export const HttpStatusCode = 
{
    NotFound: 404,
    OK: 200,
};

export class DeviceAddressService
{
    async RetrieveDeviceAddress(serialNumber, apiKey = 'spi-sample-pos1', tenantCode, isSecureConnection, isTestMode)
    {
        const CONNECTION_TIMEOUT = 8000;
        const path = isSecureConnection ? 'fqdn' : 'ip';
        const deviceAddressUri = isTestMode ? `https://device-address-api-sb.${tenantCode}.mspenv.io/v1/${serialNumber}/${path}` : `https://device-address-api.${tenantCode}.mspenv.io/v1/${serialNumber}/${path}`;

        return Promise.race([
            fetch(deviceAddressUri, {
              method: 'GET',
              headers: {
                'ASM-MSP-DEVICE-ADDRESS-API-KEY': apiKey,
              },
            }),
            new Promise((_, reject) =>
              setTimeout(() => reject(new Error('Timeout while trying to retrieve IP address')), CONNECTION_TIMEOUT)
            ),
          ]);
    }
}
