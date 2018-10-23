import {SPI_URI_SCHEME} from '../Connection';

export class DeviceAddressStatus
{
    get Address()
    {
        if(SPI_URI_SCHEME === 'wss') 
        {
            return this.Fqdn;
        } 
        else
        {
            return this.Ip;
        }
    }

    set Address(address)
    {
        if(SPI_URI_SCHEME === 'wss') 
        {
            this.fqdn = addreses;
        } 
        else
        {
            this.ip = address;
        }
    }

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
        .then(response => {
            return Object.assign(new DeviceAddressStatus(),response.json());
        })
        .catch((response) => {
            console.error(`Status code ${response.StatusCode} received from ${deviceAddressUri} - Exception ${response.ErrorException}`);
        })
    }
}
