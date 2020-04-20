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
    }
}

export class DeviceAddressService
{
    // RetrieveService(serialNumber, apiKey = 'spi-sample-pos1', acquirerCode, useSecureWebSockets, isTestMode)
    RetrieveService(serialNumber, apiKey = 'spi-sample-pos1', acquirerCode, isSecureConnection, isTestMode)    
    {
        var path = isSecureConnection ? 'fqdn' : 'ip';
        var deviceAddressUri = isTestMode ? `https://device-address-api-sb.${acquirerCode}.mspenv.io/v1/${serialNumber}/${path}` : `https://device-address-api.${acquirerCode}.mspenv.io/v1/${serialNumber}/${path}`;

        return fetch(deviceAddressUri, {
            method: 'GET',
            headers: {
                "ASM-MSP-DEVICE-ADDRESS-API-KEY": apiKey
            }
        })
        .then(response => response.json())
        .catch((response) => {
            console.error(`Status code ${response.StatusCode} received from ${deviceAddressUri} - Exception ${response.error}`);
        })
    }
}
