import {Spi} from '../src/Spi';
import {DeviceIpAddressRequest} from '../src/Device';

describe('AutoIpResolution', function() {
    'use strict';
  
    // it('should resolve IP address', function() {
    //     var deviceConfig = Object.assign(new DeviceIpAddressRequest(), {
    //         ApiKey: 'TEST-API-KEY',
    //         SerialNumber: '123-456-789',
    //         ApiUrl: '/api/v1/ip'
    //     });

    //     var apiSpy = spyOn(window,'fetch').and.returnValue(Promise.resolve({Ip: '1.1.1.1'}));

    //     var updatedIp = '';

    //     var spi = new Spi('TESTPOS1', '', null);
        
    //     spi.AutoIpResolutionEnable = true;

    //     document.addEventListener('DeviceIpChanged', (e) => {
    //         updatedIp = e.detail.Ip;
    //     });

    //     spi.GetDeviceIpAddress(deviceConfig);

    //    // expect(updatedIp).toBe('192.168.1.1');
    // });
  


});
