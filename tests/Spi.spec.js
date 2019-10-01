import { Spi } from '../src/Spi';
import { SpiStatus } from '../src/SpiModels';

describe('Spi,', () => {
    const eftposAddress = "10.20.30.40";
    const posId = "DummyPos";
    const posVendorId = "assembly";
    const posVersion = "2.6.3";

    it('should set PosId correctly when SetPosId is passed a PosId that is valid', () => {
        // arrange
        const spi = new Spi(posId, "", eftposAddress, null);
        spi.CurrentStatus = SpiStatus.Unpaired;

        // act
        spi.SetPosId(posId);

        // assert
        expect(spi._posId).toBe(posId);
    });

    it('should set PosId correctly when Start is called after instantiating with a PosId that is valid', () => {
        // arrange
        const spi = new Spi(posId, "", eftposAddress, null);
        spi.CurrentStatus = SpiStatus.Unpaired;
        spi.SetPosInfo(posVendorId, posVersion);

        // act
        spi.Start();

        // assert
        expect(spi._posId).toBe(posId);
    });

    it('should set PosId to empty when SetPosId is passed a PosId that is empty', () => {
        // arrange
        const invalidPosId = "";
        const spi = new Spi(invalidPosId, "", eftposAddress, null);
        spi.CurrentStatus = SpiStatus.Unpaired;

        // act
        spi.SetPosId(invalidPosId);

        // assert
        expect(spi._posId).toBe("");
    });

    it('should set PosId to empty when Start is called after instantiating with a PosId that is empty', () => {
        // arrange
        const invalidPosId = "";
        const spi = new Spi(invalidPosId, "", eftposAddress, null);
        spi.CurrentStatus = SpiStatus.Unpaired;
        spi.SetPosInfo(posVendorId, posVersion);

        // act
        spi.Start();

        // assert
        expect(spi._posId).toBe("");
    });

    it('should set PosId to empty when SetPosId is passed a PosId that is too long', () => {
        // arrange
        const invalidPosId = "12345678901234567";
        const spi = new Spi(invalidPosId, "", eftposAddress, null);
        spi.CurrentStatus = SpiStatus.Unpaired;

        // act
        spi.SetPosId(invalidPosId);

        // assert
        expect(spi._posId).toBe("");
    });

    it('should set PosId to empty when Start is called after instantiating with a PosId that is too long', () => {
        // arrange
        const invalidPosId = "12345678901234567";
        const spi = new Spi(invalidPosId, "", eftposAddress, null);
        spi.CurrentStatus = SpiStatus.Unpaired;
        spi.SetPosInfo(posVendorId, posVersion);

        // act
        spi.Start();

        // assert
        expect(spi._posId).toBe("");
    });

    it('should set PosId to empty when SetPosId is passed a PosId that has invalid characters', () => {
        // arrange
        const invalidPosId = "RamenPos@";
        const spi = new Spi(invalidPosId, "", eftposAddress, null);
        spi.CurrentStatus = SpiStatus.Unpaired;

        // act
        spi.SetPosId(invalidPosId);

        // assert
        expect(spi._posId).toBe("");
    });

    it('should set PosId to empty when Start is called after instantiating with a PosId that has invalid characters', () => {
        // arrange
        const invalidPosId = "RamenPos@";
        const spi = new Spi(invalidPosId, "", eftposAddress, null);
        spi.CurrentStatus = SpiStatus.Unpaired;
        spi.SetPosInfo(posVendorId, posVersion);

        // act
        spi.Start();

        // assert
        expect(spi._posId).toBe("");
    });

    it('should set EftposAddress correctly when SetEftposAddress is passed an EftposAddress that is valid', () => {
        // arrange
        const spi = new Spi("", "", "", null);
        spi.CurrentStatus = SpiStatus.Unpaired;

        // act
        spi.SetEftposAddress(eftposAddress);
        const spiEftposAddress = spi._eftposAddress.replace("ws://", "");

        // assert
        expect(spiEftposAddress).toBe(eftposAddress);
    });

    it('should set EftposAddress correctly when Start is called after instantiating with an EftposAddress that is valid', () => {
        // arrange
        const spi = new Spi(posId, "", eftposAddress, null);
        spi.CurrentStatus = SpiStatus.Unpaired;
        spi.SetPosInfo(posVendorId, posVersion);

        // act
        spi.Start();
        const spiEftposAddress = spi._eftposAddress.replace("ws://", "");

        // assert
        expect(spiEftposAddress).toBe(eftposAddress);
    });

    it('should set EftposAddress to empty when SetEftposAddress is passed an EftposAddress that is empty', () => {
        // arrange
        const invalidEftposAddress = "";
        const spi = new Spi(posId, "", "", null);
        spi.CurrentStatus = SpiStatus.Unpaired;

        // act
        spi.SetEftposAddress(invalidEftposAddress);
        const spiEftposAddress = spi._eftposAddress.replace("ws://", "");

        // assert
        expect(spiEftposAddress).toBe("");
    });

    it('should set EftposAddress to empty when Start is called after instantiating with an EftposAddress that is empty', () => {
        // arrange
        const invalidEftposAddress = "";
        const spi = new Spi(posId, "", invalidEftposAddress, null);
        spi.CurrentStatus = SpiStatus.Unpaired;
        spi.SetPosInfo(posVendorId, posVersion);

        // act
        spi.Start();

        // assert
        expect(spi._eftposAddress).toBe("");
    });

    it('should set EftposAddress to empty when SetEftposAddress is passed an EftposAddress that is invalid', () => {
        // arrange
        const invalidEftposAddress = "10.20.30";
        const spi = new Spi("", "", "", null);
        spi.CurrentStatus = SpiStatus.Unpaired;

        // act
        spi.SetEftposAddress(invalidEftposAddress);
        const spiEftposAddress = spi._eftposAddress.replace("ws://", "");

        // assert
        expect(spiEftposAddress).toBe("");
    });

    it('should set EftposAddress to empty when Start is called after instantiating with an EftposAddress that is invalid', () => {
        // arrange
        const invalidEftposAddress = "10.20.30";
        const spi = new Spi(posId, "", invalidEftposAddress, null);
        spi.CurrentStatus = SpiStatus.Unpaired;
        spi.SetPosInfo(posVendorId, posVersion);

        // act
        spi.Start();

        // assert
        expect(spi._eftposAddress).toBe("");
    });
});
