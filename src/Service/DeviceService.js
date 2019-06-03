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
            this.fqdn = addreses;
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
        this.last_updated = null;

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
}

export class DeviceAddressService
{
    // RetrieveService(serialNumber, apiKey = 'spi-sample-pos1', acquirerCode, useSecureWebSockets, isTestMode)
    RetrieveService(serialNumber, apiKey = 'spi-sample-pos1', acquirerCode, isSecureConnection, isTestMode, log)    
    {
        var path = isSecureConnection ? 'fqdn' : 'ip';
        var deviceAddressUri = isTestMode ? `https://device-address-api-sb.${acquirerCode}.msp.assemblypayments.com/v1/${serialNumber}/${path}` : `https://device-address-api.${acquirerCode}.msp.assemblypayments.com/v1/${serialNumber}/${path}`;

        log.info('device address uri', deviceAddressUri)
        return fetch(deviceAddressUri, {
            method: 'GET',
            headers: {
                "ASM-MSP-DEVICE-ADDRESS-API-KEY": apiKey
            }
        })
        .then(response => response.json())
        .catch((response) => {
            log.error(`Status code ${response.StatusCode} received from ${deviceAddressUri} - Exception ${response.error}`);
        })
    }
}
