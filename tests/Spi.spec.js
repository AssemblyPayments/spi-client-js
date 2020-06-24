import { Message, SuccessState } from '../src/Messages';
import { Spi } from '../src/Spi';
import { SpiFlow, SpiStatus, TransactionFlowState, TransactionType } from '../src/SpiModels';
import { getLastConsoleCallArgs } from './utils/TestHelpers';

describe('Spi,', () => {
    const eftposAddress = '10.20.30.40';
    const posId = 'DummyPos';
    const posVendorId = 'mx51';
    const posVersion = '2.8.0';

    beforeEach(() => {
        spyOn(console, 'info');
    });

    it('should set PosId correctly when SetPosId is passed a PosId that is valid', () => {
        // arrange
        const spi = new Spi(posId, '', eftposAddress, null);
        spi.CurrentStatus = SpiStatus.Unpaired;

        // act
        spi.SetPosId(posId);

        // assert
        expect(spi._posId).toBe(posId);
    });

    it('should set PosId correctly when Start is called after instantiating with a PosId that is valid', () => {
        // arrange
        const spi = new Spi(posId, '', eftposAddress, null);
        spi.CurrentStatus = SpiStatus.Unpaired;
        spi.SetPosInfo(posVendorId, posVersion);

        // act
        spi.Start();

        // assert
        expect(spi._posId).toBe(posId);
    });

    it('should set PosId to empty when SetPosId is passed a PosId that is empty', () => {
        // arrange
        const invalidPosId = '';
        const spi = new Spi(invalidPosId, '', eftposAddress, null);
        spi.CurrentStatus = SpiStatus.Unpaired;

        // act
        spi.SetPosId(invalidPosId);

        // assert
        expect(spi._posId).toBe('');
    });

    it('should set PosId to empty when Start is called after instantiating with a PosId that is empty', () => {
        // arrange
        const invalidPosId = '';
        const spi = new Spi(invalidPosId, '', eftposAddress, null);
        spi.CurrentStatus = SpiStatus.Unpaired;
        spi.SetPosInfo(posVendorId, posVersion);

        // act
        spi.Start();

        // assert
        expect(spi._posId).toBe('');
    });

    it('should set PosId to empty when SetPosId is passed a PosId that is too long', () => {
        // arrange
        const invalidPosId = '12345678901234567';
        const spi = new Spi(invalidPosId, '', eftposAddress, null);
        spi.CurrentStatus = SpiStatus.Unpaired;

        // act
        spi.SetPosId(invalidPosId);

        // assert
        expect(spi._posId).toBe('');
    });

    it('should set PosId to empty when Start is called after instantiating with a PosId that is too long', () => {
        // arrange
        const invalidPosId = '12345678901234567';
        const spi = new Spi(invalidPosId, '', eftposAddress, null);
        spi.CurrentStatus = SpiStatus.Unpaired;
        spi.SetPosInfo(posVendorId, posVersion);

        // act
        spi.Start();

        // assert
        expect(spi._posId).toBe('');
    });

    it('should set PosId to empty when SetPosId is passed a PosId that has invalid characters', () => {
        // arrange
        const invalidPosId = 'RamenPos@';
        const spi = new Spi(invalidPosId, '', eftposAddress, null);
        spi.CurrentStatus = SpiStatus.Unpaired;

        // act
        spi.SetPosId(invalidPosId);

        // assert
        expect(spi._posId).toBe('');
    });

    it('should set PosId to empty when Start is called after instantiating with a PosId that has invalid characters', () => {
        // arrange
        const invalidPosId = 'RamenPos@';
        const spi = new Spi(invalidPosId, '', eftposAddress, null);
        spi.CurrentStatus = SpiStatus.Unpaired;
        spi.SetPosInfo(posVendorId, posVersion);

        // act
        spi.Start();

        // assert
        expect(spi._posId).toBe('');
    });

    it('should set EftposAddress correctly when SetEftposAddress is passed an EftposAddress that is valid', () => {
        // arrange
        const spi = new Spi('', '', '', null);
        spi.CurrentStatus = SpiStatus.Unpaired;

        // act
        spi.SetEftposAddress(eftposAddress);
        const spiEftposAddress = spi._eftposAddress.replace('ws://', '');

        // assert
        expect(spiEftposAddress).toBe(eftposAddress);
    });

    it('should set EftposAddress correctly when Start is called after instantiating with an EftposAddress that is valid', () => {
        // arrange
        const spi = new Spi(posId, '', eftposAddress, null);
        spi.CurrentStatus = SpiStatus.Unpaired;
        spi.SetPosInfo(posVendorId, posVersion);

        // act
        spi.Start();
        const spiEftposAddress = spi._eftposAddress.replace('ws://', '');

        // assert
        expect(spiEftposAddress).toBe(eftposAddress);
    });

    it('should set EftposAddress to empty when SetEftposAddress is passed an EftposAddress that is empty', () => {
        // arrange
        const invalidEftposAddress = '';
        const spi = new Spi(posId, '', '', null);
        spi.CurrentStatus = SpiStatus.Unpaired;

        // act
        spi.SetEftposAddress(invalidEftposAddress);
        const spiEftposAddress = spi._eftposAddress.replace('ws://', '');

        // assert
        expect(spiEftposAddress).toBe('');
    });

    it('should set EftposAddress to empty when Start is called after instantiating with an EftposAddress that is empty', () => {
        // arrange
        const invalidEftposAddress = '';
        const spi = new Spi(posId, '', invalidEftposAddress, null);
        spi.CurrentStatus = SpiStatus.Unpaired;
        spi.SetPosInfo(posVendorId, posVersion);

        // act
        spi.Start();

        // assert
        expect(spi._eftposAddress).toBe('');
    });

    it('should set EftposAddress to empty when SetEftposAddress is passed an EftposAddress that is invalid', () => {
        // arrange
        const invalidEftposAddress = '10.20.30';
        const spi = new Spi('', '', '', null);
        spi.CurrentStatus = SpiStatus.Unpaired;

        // act
        spi.SetEftposAddress(invalidEftposAddress);
        const spiEftposAddress = spi._eftposAddress.replace('ws://', '');

        // assert
        expect(spiEftposAddress).toBe('');
    });

    it('should set EftposAddress to empty when Start is called after instantiating with an EftposAddress that is invalid', () => {
        // arrange
        const invalidEftposAddress = '10.20.30';
        const spi = new Spi(posId, '', invalidEftposAddress, null);
        spi.CurrentStatus = SpiStatus.Unpaired;
        spi.SetPosInfo(posVendorId, posVersion);

        // act
        spi.Start();

        // assert
        expect(spi._eftposAddress).toBe('');
    });

    it('should handle a GLT response that is outside of a TX', () => {
        // arrange
        const spi = new Spi(posId, '', eftposAddress, null);
        spi.CurrentFlow = SpiFlow.Idle;

        // act
        spi._handleGetLastTransactionResponse();

        // assert
        expect(getLastConsoleCallArgs()).toMatch(/not in .* tx/);
    });

    it('should handle a GLT response that was received inside a TX but is unsolicited', () => {
        // arrange
        const spi = new Spi(posId, '', eftposAddress, null);
        spi.CurrentFlow = SpiFlow.Transaction;
        spi.CurrentTxFlowState = new TransactionFlowState();

        // act
        spi._handleGetLastTransactionResponse();

        // assert
        expect(getLastConsoleCallArgs()).toMatch(/leftover/);
        expect(spi.CurrentTxFlowState.Finished).toBeFalsy();
    });

    it('should handle a GLT response that is mismatched with the GLT Id that was expected', () => {
        // arrange
        const spi = new Spi(posId, '', eftposAddress, null);
        spi.CurrentFlow = SpiFlow.Transaction;
        spi.CurrentTxFlowState = new TransactionFlowState();
        spi.CurrentTxFlowState.CallingGlt();
        const message = Message.FromJson(JSON.stringify(__fixtures__.GetLastTransactionResponse_PurchaseSuccess));

        // act
        spi._handleGetLastTransactionResponse(message);

        // assert
        expect(getLastConsoleCallArgs()).toMatch(/strange/);
        expect(spi.CurrentTxFlowState.Finished).toBeFalsy();
    });

    it('should handle a GLT response where a signature is currently being requested on the terminal', () => {
        // arrange
        const {
            message: {
                data: { pos_ref_id: posRefId },
                id: lastGltRequestId,
            },
        } = __fixtures__.GetLastTransactionResponse_SignatureRequired;
        const spi = new Spi(posId, '', eftposAddress, null);
        spi.CurrentFlow = SpiFlow.Transaction;
        spi.CurrentTxFlowState = new TransactionFlowState(posRefId, TransactionType.Purchase);
        spi.CurrentTxFlowState.CallingGlt(lastGltRequestId);
        const message = Message.FromJson(JSON.stringify(__fixtures__.GetLastTransactionResponse_SignatureRequired));

        // act
        spi._handleGetLastTransactionResponse(message);

        // assert
        expect(spi.CurrentTxFlowState.AwaitingSignatureCheck).toBeTruthy();
        expect(spi.CurrentTxFlowState.Finished).toBeFalsy();
    });

    it('should handle a GLT response where a phone authorisation code is currently being requested on the terminal', () => {
        // arrange
        const {
            message: {
                data: { pos_ref_id: posRefId },
                id: lastGltRequestId,
            },
        } = __fixtures__.GetLastTransactionResponse_AuthCodeRequired;
        const spi = new Spi(posId, '', eftposAddress, null);
        spi.CurrentFlow = SpiFlow.Transaction;
        spi.CurrentTxFlowState = new TransactionFlowState(posRefId, TransactionType.Purchase);
        spi.CurrentTxFlowState.CallingGlt(lastGltRequestId);
        const message = Message.FromJson(JSON.stringify(__fixtures__.GetLastTransactionResponse_AuthCodeRequired));

        // act
        spi._handleGetLastTransactionResponse(message);

        // assert
        expect(spi.CurrentTxFlowState.AwaitingPhoneForAuth).toBeTruthy();
        expect(spi.CurrentTxFlowState.Finished).toBeFalsy();
    });

    it('should handle a GLT response where an operation is currently in progress on the terminal', () => {
        // arrange
        const {
            message: {
                data: { pos_ref_id: posRefId },
                id: lastGltRequestId,
            },
        } = __fixtures__.GetLastTransactionResponse_OpInProgress;
        const spi = new Spi(posId, '', eftposAddress, null);
        spi.CurrentFlow = SpiFlow.Transaction;
        spi.CurrentTxFlowState = new TransactionFlowState(posRefId, TransactionType.Purchase);
        spi.CurrentTxFlowState.CallingGlt(lastGltRequestId);
        const message = Message.FromJson(JSON.stringify(__fixtures__.GetLastTransactionResponse_OpInProgress));

        // act
        spi._handleGetLastTransactionResponse(message);

        // assert
        expect(getLastConsoleCallArgs()).toMatch(/in progress/);
        expect(spi.CurrentTxFlowState.Finished).toBeFalsy();
    });

    it('should handle a GLT response where the time being sent from the Library is substantially different to the terminal (time out of sync)', () => {
        // arrange
        const {
            message: {
                data: { pos_ref_id: posRefId },
                id: lastGltRequestId,
            },
        } = __fixtures__.GetLastTransactionResponse_TimeOutOfSync;
        const spi = new Spi(posId, '', eftposAddress, null);
        spi.CurrentFlow = SpiFlow.Transaction;
        spi.CurrentTxFlowState = new TransactionFlowState(posRefId, TransactionType.Purchase);
        spi.CurrentTxFlowState.CallingGlt(lastGltRequestId);
        const message = Message.FromJson(JSON.stringify(__fixtures__.GetLastTransactionResponse_TimeOutOfSync));

        // act
        spi._handleGetLastTransactionResponse(message);

        // assert
        expect(getLastConsoleCallArgs()).toMatch(/time-out-of-sync/);
        expect(spi.CurrentTxFlowState.Finished).toBeFalsy();
    });

    it('should handle a GLT response where there is no case that handles this response', () => {
        // arrange
        const {
            message: {
                data: { pos_ref_id: posRefId },
                id: lastGltRequestId,
            },
        } = __fixtures__.GetLastTransactionResponse_Unexpected;
        const spi = new Spi(posId, '', eftposAddress, null);
        spi.CurrentFlow = SpiFlow.Transaction;
        spi.CurrentTxFlowState = new TransactionFlowState(posRefId, TransactionType.Purchase);
        spi.CurrentTxFlowState.CallingGlt(lastGltRequestId);
        const message = Message.FromJson(JSON.stringify(__fixtures__.GetLastTransactionResponse_Unexpected));

        // act
        spi._handleGetLastTransactionResponse(message);

        // assert
        expect(getLastConsoleCallArgs()).toMatch(/unexpected/);
        expect(spi.CurrentTxFlowState.Finished).toBeFalsy();
    });

    it('should handle a GLT response that was explicitely requested by the user (completed independent of a TX)', () => {
        // arrange
        const {
            message: {
                data: { pos_ref_id: posRefId },
                id: lastGltRequestId,
            },
        } = __fixtures__.GetLastTransactionResponse_PurchaseSuccess;
        const spi = new Spi(posId, '', eftposAddress, null);
        spi.CurrentFlow = SpiFlow.Transaction;
        spi.CurrentTxFlowState = new TransactionFlowState(posRefId, TransactionType.GetLastTransaction); // User requested GLT
        spi.CurrentTxFlowState.CallingGlt(lastGltRequestId);
        const message = Message.FromJson(JSON.stringify(__fixtures__.GetLastTransactionResponse_PurchaseSuccess));

        // act
        spi._handleGetLastTransactionResponse(message);

        // assert
        expect(getLastConsoleCallArgs()).toMatch(/user/);
        expect(spi.CurrentTxFlowState.Finished).toBeTruthy();
        expect(spi.CurrentTxFlowState.AwaitingGltResponse).toBeFalsy();
    });

    it('should handle a GLT response where the POS reference of the last TX on the terminal does not match the last recorded TX of the Library', () => {
        // arrange
        const {
            message: {
                id: lastGltRequestId,
            },
        } = __fixtures__.GetLastTransactionResponse_PurchaseSuccess;
        const spi = new Spi(posId, '', eftposAddress, null);
        spi.CurrentFlow = SpiFlow.Transaction;
        spi.CurrentTxFlowState = new TransactionFlowState(1234567890, TransactionType.Purchase); // Trigger a POS reference mis-match between the GLT
        spi.CurrentTxFlowState.CallingGlt(lastGltRequestId);
        const message = Message.FromJson(JSON.stringify(__fixtures__.GetLastTransactionResponse_PurchaseSuccess));

        // act
        spi._handleGetLastTransactionResponse(message);

        // assert
        expect(spi.CurrentTxFlowState.Finished).toBeTruthy();
        expect(spi.CurrentTxFlowState.AwaitingGltResponse).toBeFalsy();
        expect(spi.CurrentTxFlowState.Success).toBe(SuccessState.Unknown);
        expect(getLastConsoleCallArgs()).toMatch(/did not match/);
    });

    it('should handle a GLT response where the request time of the last TX on the terminal does not match the last recorded TX of the Library', () => {
        // arrange
        const {
            message: {
                data: { pos_ref_id: posRefId },
                id: lastGltRequestId,
            },
        } = __fixtures__.GetLastTransactionResponse_PurchaseSuccess;
        const spi = new Spi(posId, '', eftposAddress, null);
        spi.CurrentFlow = SpiFlow.Transaction;
        spi.CurrentTxFlowState = new TransactionFlowState(posRefId, TransactionType.Purchase);
        spi.CurrentTxFlowState.CallingGlt(lastGltRequestId);
        spi.CurrentTxFlowState.RequestTime = Date.now() // Trigger a RequestTime mis-match between the GLT
        const message = Message.FromJson(JSON.stringify(__fixtures__.GetLastTransactionResponse_PurchaseSuccess));

        // act
        spi._handleGetLastTransactionResponse(message);

        // assert
        expect(spi.CurrentTxFlowState.Finished).toBeTruthy();
        expect(spi.CurrentTxFlowState.AwaitingGltResponse).toBeFalsy();
        expect(spi.CurrentTxFlowState.Success).toBe(SuccessState.Unknown);
        expect(getLastConsoleCallArgs()).toMatch(/did not match/);
    });

    it('should handle a GLT response where the last TX on the terminal was cancelled', () => {
        // arrange
        const {
            message: {
                data: { pos_ref_id: posRefId },
                id: lastGltRequestId,
            },
        } = __fixtures__.GetLastTransactionResponse_CancelledOnTerminal;
        const spi = new Spi(posId, '', eftposAddress, null);
        spi.CurrentFlow = SpiFlow.Transaction;
        spi.CurrentTxFlowState = new TransactionFlowState(posRefId, TransactionType.Purchase, 10);
        spi.CurrentTxFlowState.CallingGlt(lastGltRequestId);
        const message = Message.FromJson(JSON.stringify(__fixtures__.GetLastTransactionResponse_CancelledOnTerminal));

        // act
        spi._handleGetLastTransactionResponse(message);

        // assert
        expect(spi.CurrentTxFlowState.Finished).toBeTruthy();
        expect(spi.CurrentTxFlowState.AwaitingGltResponse).toBeFalsy();
        expect(spi.CurrentTxFlowState.Success).toBe(SuccessState.Failed);
        expect(spi.CurrentTxFlowState.DisplayMessage.toLowerCase()).toMatch(/ended/);
    });

    it('should handle a GLT response where the last TX of the terminal matches the last recorded TX of the library and it successfully completed', () => {
        // arrange
        const {
            message: {
                data: { pos_ref_id: posRefId },
                id: lastGltRequestId,
            },
        } = __fixtures__.GetLastTransactionResponse_PurchaseSuccess;
        const spi = new Spi(posId, '', eftposAddress, null);
        spi.CurrentFlow = SpiFlow.Transaction;
        spi.CurrentTxFlowState = new TransactionFlowState(posRefId, TransactionType.Purchase, 10);
        spi.CurrentTxFlowState.CallingGlt(lastGltRequestId);
        const message = Message.FromJson(JSON.stringify(__fixtures__.GetLastTransactionResponse_PurchaseSuccess));

        // act
        spi._handleGetLastTransactionResponse(message);

        // assert
        expect(spi.CurrentTxFlowState.Finished).toBeTruthy();
        expect(spi.CurrentTxFlowState.AwaitingGltResponse).toBeFalsy();
        expect(spi.CurrentTxFlowState.Success).toBe(SuccessState.Success);
        expect(spi.CurrentTxFlowState.DisplayMessage.toLowerCase()).toMatch(/ended/);
    });
});
