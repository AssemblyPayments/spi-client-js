class DeviceIpAddressStatus
{
    constructor(ip, last_updated) 
    {
        this.Ip = ip;
        this.Last_updated = last_updated;
    }
}

class DeviceIpAddressService
{
    RetrieveService(serialNumber, apiKey = 'spi-sample-pos1')
    {
        var deviceIpUrl =
            `https://device-address-api-dev.nonprod-wbc.msp.assemblypayments.com/v1/${serialNumber}/ip`;

        return fetch(deviceIpUrl, {
            method: 'GET',
            headers: {
                "ASM-MSP-DEVICE-ADDRESS-API-KEY": apiKey
            }
        })
        .then(response => response.json())
        .catch((response) => {
            console.error(`Status code ${response.StatusCode} received from ${deviceIpUrl} - Exception ${response.ErrorException}`);
        })
    }
}

export {DeviceIpAddressStatus, DeviceIpAddressService};