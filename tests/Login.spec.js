describe('Login', function() {
    'use strict';  

    it('should check if a message is expiring soon', function() {

        var tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
        var expires = new Date(Date.now() - tzoffset).toISOString().slice(0,-1);
        var tenMinInMs = 10 * 60 * 1000;

        const mockMessage = {
            Data: {
                success: true,
                expires_datetime: expires
            }
        };

        var lr = new LoginResponse(mockMessage);

        expect(lr.ExpiringSoon(0)).toBe(true);
        expect(lr.ExpiringSoon(-(tenMinInMs + 5000))).toBe(false);
        expect(lr.ExpiringSoon(tenMinInMs)).toBe(true);

    });

});
