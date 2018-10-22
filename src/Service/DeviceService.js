export class DeviceAddressStatus
{
    constructor(address, lastUpdated) 
    {
        this.Address = address;
        this.LastUpdated = lastUpdated;
    }
}

export class DeviceAddressService
{
    RetrieveService(serialNumber, apiKey = 'spi-sample-pos1', isTestMode)
    {
        // TODO: Replace with sandbox and prod urls
        var deviceAddressUri = isTestMode ? `/api/v1/ip?serial=${serialNumber}` : `https://device-address-api-dev.nonprod-wbc.msp.assemblypayments.com/v1/${serialNumber}/ip`;

        return fetch(deviceAddressUri, {
            method: 'GET',
            headers: {
                "ASM-MSP-DEVICE-ADDRESS-API-KEY": apiKey
            }
        })
        .then(response => response.json())
        .catch((response) => {
            console.error(`Status code ${response.StatusCode} received from ${deviceAddressUri} - Exception ${response.ErrorException}`);
        })
    }
}
