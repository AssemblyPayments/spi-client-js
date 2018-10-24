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
    RetrieveService(serialNumber, apiKey = 'spi-sample-pos1', acquirerCode, useSecureWebSockets, isTestMode)
    {
        var path = useSecureWebSockets ? 'fqdn' : 'ip';
        // https://device-address-api-dev.nonprod-${acquirerCode}.msp.assemblypayments.com/v1/${serialNumber}/${path}
        var deviceAddressUri = isTestMode ? `/api/v1/${path}?serial=${serialNumber}&acquirerCode=${acquirerCode}` : `https://device-address-api.${acquirerCode}.msp.assemblypayments.com/v1/${serialNumber}/${path}`;

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
