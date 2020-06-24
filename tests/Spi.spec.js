import { Message, SuccessState } from "../src/Messages";
import { Spi } from "../src/Spi";
import {
  SpiFlow,
  SpiStatus,
  TransactionFlowState,
  TransactionType,
} from "../src/SpiModels";
import { getLastConsoleCallArgs } from "./utils/TestHelpers";

describe("Spi,", () => {
  const eftposAddress = "10.20.30.40";
  const posId = "DummyPos";
  const posVendorId = "mx51";
  const posVersion = "2.8.0";

  beforeEach(() => {
    spyOn(console, "info");
  });

  it("should set PosId correctly when SetPosId is passed a PosId that is valid", () => {
    // arrange
    const spi = new Spi(posId, "", eftposAddress, null);
    spi.CurrentStatus = SpiStatus.Unpaired;

    // act
    spi.SetPosId(posId);

    // assert
    expect(spi._posId).toBe(posId);
  });

  it("should set PosId correctly when Start is called after instantiating with a PosId that is valid", () => {
    // arrange
    const spi = new Spi(posId, "", eftposAddress, null);
    spi.CurrentStatus = SpiStatus.Unpaired;
    spi.SetPosInfo(posVendorId, posVersion);

    // act
    spi.Start();

    // assert
    expect(spi._posId).toBe(posId);
  });

  it("should set PosId to empty when SetPosId is passed a PosId that is empty", () => {
    // arrange
    const invalidPosId = "";
    const spi = new Spi(invalidPosId, "", eftposAddress, null);
    spi.CurrentStatus = SpiStatus.Unpaired;

    // act
    spi.SetPosId(invalidPosId);

    // assert
    expect(spi._posId).toBe("");
  });

  it("should set PosId to empty when Start is called after instantiating with a PosId that is empty", () => {
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

  it("should set PosId to empty when SetPosId is passed a PosId that is too long", () => {
    // arrange
    const invalidPosId = "12345678901234567";
    const spi = new Spi(invalidPosId, "", eftposAddress, null);
    spi.CurrentStatus = SpiStatus.Unpaired;

    // act
    spi.SetPosId(invalidPosId);

    // assert
    expect(spi._posId).toBe("");
  });

  it("should set PosId to empty when Start is called after instantiating with a PosId that is too long", () => {
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

  it("should set PosId to empty when SetPosId is passed a PosId that has invalid characters", () => {
    // arrange
    const invalidPosId = "RamenPos@";
    const spi = new Spi(invalidPosId, "", eftposAddress, null);
    spi.CurrentStatus = SpiStatus.Unpaired;

    // act
    spi.SetPosId(invalidPosId);

    // assert
    expect(spi._posId).toBe("");
  });

  it("should set PosId to empty when Start is called after instantiating with a PosId that has invalid characters", () => {
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

  it("should set EftposAddress correctly when SetEftposAddress is passed an EftposAddress that is valid", () => {
    // arrange
    const spi = new Spi("", "", "", null);
    spi.CurrentStatus = SpiStatus.Unpaired;

    // act
    spi.SetEftposAddress(eftposAddress);
    const spiEftposAddress = spi._eftposAddress.replace("ws://", "");

    // assert
    expect(spiEftposAddress).toBe(eftposAddress);
  });

  it("should set EftposAddress correctly when Start is called after instantiating with an EftposAddress that is valid", () => {
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

  it("should set EftposAddress to empty when SetEftposAddress is passed an EftposAddress that is empty", () => {
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

  it("should set EftposAddress to empty when Start is called after instantiating with an EftposAddress that is empty", () => {
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

  it("should set EftposAddress to empty when SetEftposAddress is passed an EftposAddress that is invalid", () => {
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

  it("should set EftposAddress to empty when Start is called after instantiating with an EftposAddress that is invalid", () => {
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

  describe("InitiateGetLastTx()", () => {
    it("should not initiate a GLT when not paired", () => {
      // arrange
      const spi = new Spi(posId, "", eftposAddress, null);
      spi.CurrentStatus = SpiStatus.Unpaired;

      // act
      const initiateTxResult = spi.InitiateGetLastTx();

      // assert
      expect(initiateTxResult.Message).toMatch(/not paired/i);
    });

    it("should not initiate a GLT when not idle", () => {
      // arrange
      const spi = new Spi(posId, "", eftposAddress, null);
      spi.CurrentFlow = SpiFlow.Transaction;

      // act
      const initiateTxResult = spi.InitiateGetLastTx();

      // assert
      expect(initiateTxResult.Message).toMatch(/not idle/i);
    });

    it("should initiate a GLT", () => {
      // arrange
      const spi = new Spi(posId, "", eftposAddress, null);
      spi.CurrentFlow = SpiFlow.Idle;
      spi._send = () => true;

      // act
      const initiateTxResult = spi.InitiateGetLastTx();

      // assert
      expect(initiateTxResult.Message).toMatch(/glt initiated/i);
      expect(spi.CurrentTxFlowState.Type).toBe(
        TransactionType.GetLastTransaction
      );
    });
  });

  describe("InitiateLastTx()", () => {
    it("should not initiate a GT when not paired", () => {
      // arrange
      const spi = new Spi(posId, "", eftposAddress, null);
      spi.CurrentStatus = SpiStatus.Unpaired;

      // act
      const initiateTxResult = spi.InitiateGetTx();

      // assert
      expect(initiateTxResult.Message).toMatch(/not paired/i);
    });

    it("should not initiate a GT when not idle", () => {
      // arrange
      const spi = new Spi(posId, "", eftposAddress, null);
      spi.CurrentFlow = SpiFlow.Transaction;

      // act
      const initiateTxResult = spi.InitiateGetTx();

      // assert
      expect(initiateTxResult.Message).toMatch(/not idle/i);
    });

    it("should initiate a GT", () => {
      // arrange
      const spi = new Spi(posId, "", eftposAddress, null);
      spi.CurrentFlow = SpiFlow.Idle;
      spi._send = () => true;

      // act
      const initiateTxResult = spi.InitiateGetTx();

      // assert
      expect(initiateTxResult.Message).toMatch(/gt initiated/i);
      expect(spi.CurrentTxFlowState.Type).toBe(TransactionType.GetTransaction);
    });
  });

  describe("InitiateRecovery()", () => {
    it("should not initiate a Recovery when not paired", () => {
      // arrange
      const spi = new Spi(posId, "", eftposAddress, null);
      spi.CurrentStatus = SpiStatus.Unpaired;

      // act
      const initiateTxResult = spi.InitiateRecovery();

      // assert
      expect(initiateTxResult.Message).toMatch(/not paired/i);
    });

    it("should not initiate a Recovery when not idle", () => {
      // arrange
      const spi = new Spi(posId, "", eftposAddress, null);
      spi.CurrentFlow = SpiFlow.Transaction;

      // act
      const initiateTxResult = spi.InitiateRecovery();

      // assert
      expect(initiateTxResult.Message).toMatch(/not idle/i);
    });

    it("should initiate a Recovery", () => {
      // arrange
      const spi = new Spi(posId, "", eftposAddress, null);
      spi.CurrentFlow = SpiFlow.Idle;
      spi._send = () => true;

      // act
      const initiateTxResult = spi.InitiateRecovery();

      // assert

      expect(initiateTxResult.Message).toMatch(/recovery initiated/i);
      expect(spi.CurrentTxFlowState.AwaitingGtResponse).toBeTrue;
    });
  });

  describe("_handleGetTransactionResponse()", () => {
    it("should handle a GT response that is outside of a TX", () => {
      // arrange
      const spi = new Spi(posId, "", eftposAddress, null);
      spi.CurrentFlow = SpiFlow.Idle;

      // act
      spi._handleGetTransactionResponse();

      // assert
      expect(getLastConsoleCallArgs()).toMatch(/not in .* tx/);
    });

    it("should handle a GT response that was received inside a TX but is unsolicited", () => {
      // arrange
      const spi = new Spi(posId, "", eftposAddress, null);
      spi.CurrentFlow = SpiFlow.Transaction;
      spi.CurrentTxFlowState = new TransactionFlowState();

      // act
      spi._handleGetTransactionResponse();

      // assert
      expect(getLastConsoleCallArgs()).toMatch(/leftover/);
      expect(spi.CurrentTxFlowState.Finished).toBeFalse();
    });

    it("should handle a GT response that is mismatched with the GT Id that was expected", () => {
      // arrange
      const spi = new Spi(posId, "", eftposAddress, null);
      spi.CurrentFlow = SpiFlow.Transaction;
      spi.CurrentTxFlowState = new TransactionFlowState();
      spi.CurrentTxFlowState.CallingGt();
      const message = Message.FromJson(
        JSON.stringify(__fixtures__.GetTransactionResponse_PurchaseSuccess)
      );

      // act
      spi._handleGetTransactionResponse(message);

      // assert
      expect(getLastConsoleCallArgs()).toMatch(/strange/);
      expect(spi.CurrentTxFlowState.Finished).toBeFalse();
    });

    it("should handle a GT response where a signature is currently being requested on the terminal", () => {
      // arrange
      const {
        message: {
          data: { pos_ref_id: posRefId },
          id: lastGtRequestId,
        },
      } = __fixtures__.GetTransactionResponse_SignatureRequired;
      const spi = new Spi(posId, "", eftposAddress, null);
      spi.CurrentFlow = SpiFlow.Transaction;
      spi.CurrentTxFlowState = new TransactionFlowState(
        posRefId,
        TransactionType.Purchase
      );
      spi.CurrentTxFlowState.CallingGt(lastGtRequestId);
      const message = Message.FromJson(
        JSON.stringify(__fixtures__.GetTransactionResponse_SignatureRequired)
      );

      // act
      spi._handleGetTransactionResponse(message);

      // assert
      expect(spi.CurrentTxFlowState.AwaitingSignatureCheck).toBeTrue();
      expect(spi.CurrentTxFlowState.Finished).toBeFalse();
    });

    it("should handle a GT response where a phone authorisation code is currently being requested on the terminal", () => {
      // arrange
      const {
        message: {
          data: { pos_ref_id: posRefId },
          id: lastGtRequestId,
        },
      } = __fixtures__.GetTransactionResponse_AuthCodeRequired;
      const spi = new Spi(posId, "", eftposAddress, null);
      spi.CurrentFlow = SpiFlow.Transaction;
      spi.CurrentTxFlowState = new TransactionFlowState(
        posRefId,
        TransactionType.Purchase
      );
      spi.CurrentTxFlowState.CallingGt(lastGtRequestId);
      const message = Message.FromJson(
        JSON.stringify(__fixtures__.GetTransactionResponse_AuthCodeRequired)
      );

      // act
      spi._handleGetTransactionResponse(message);

      // assert
      expect(spi.CurrentTxFlowState.AwaitingPhoneForAuth).toBeTrue();
      expect(spi.CurrentTxFlowState.Finished).toBeFalse();
    });

    it("should handle a GT response where a transaction is currently in progress on the terminal", () => {
      // arrange
      const {
        message: {
          data: { pos_ref_id: posRefId },
          id: lastGtRequestId,
        },
      } = __fixtures__.GetTransactionResponse_TransactionInProgress;
      const spi = new Spi(posId, "", eftposAddress, null);
      spi.CurrentFlow = SpiFlow.Transaction;
      spi.CurrentTxFlowState = new TransactionFlowState(
        posRefId,
        TransactionType.Purchase
      );
      spi.CurrentTxFlowState.CallingGt(lastGtRequestId);
      const message = Message.FromJson(
        JSON.stringify(
          __fixtures__.GetTransactionResponse_TransactionInProgress
        )
      );

      // act
      spi._handleGetTransactionResponse(message);

      // assert
      expect(getLastConsoleCallArgs()).toMatch(/in progress/);
      expect(spi.CurrentTxFlowState.Finished).toBeFalse();
    });

    it("should handle a GT response where the PosRefId is not found", () => {
      // arrange
      const {
        message: {
          data: { pos_ref_id: posRefId },
          id: lastGtRequestId,
        },
      } = __fixtures__.GetTransactionResponse_PosRefIdNotFound;
      const spi = new Spi(posId, "", eftposAddress, null);
      spi.CurrentFlow = SpiFlow.Transaction;
      spi.CurrentTxFlowState = new TransactionFlowState(
        posRefId,
        TransactionType.Purchase
      );
      spi.CurrentTxFlowState.CallingGt(lastGtRequestId);
      const message = Message.FromJson(
        JSON.stringify(__fixtures__.GetTransactionResponse_PosRefIdNotFound)
      );

      // act
      spi._handleGetTransactionResponse(message);

      // assert
      expect(getLastConsoleCallArgs()).toMatch(/posrefid is not found/);
      expect(spi.CurrentTxFlowState.Finished).toBeTrue();
    });

    it("should handle a GT response where the PosRefId is invalid", () => {
      // arrange
      const {
        message: {
          data: { pos_ref_id: posRefId },
          id: lastGtRequestId,
        },
      } = __fixtures__.GetTransactionResponse_PosRefIdInvalid;
      const spi = new Spi(posId, "", eftposAddress, null);
      spi.CurrentFlow = SpiFlow.Transaction;
      spi.CurrentTxFlowState = new TransactionFlowState(
        posRefId,
        TransactionType.Purchase
      );
      spi.CurrentTxFlowState.CallingGt(lastGtRequestId);
      const message = Message.FromJson(
        JSON.stringify(__fixtures__.GetTransactionResponse_PosRefIdInvalid)
      );

      // act
      spi._handleGetTransactionResponse(message);

      // assert
      expect(getLastConsoleCallArgs()).toMatch(/posrefid is invalid/);
      expect(spi.CurrentTxFlowState.Finished).toBeTrue();
    });

    it("should handle a GT response where the request is missing a PosRefId", () => {
      // arrange
      const {
        message: {
          data: { pos_ref_id: posRefId },
          id: lastGtRequestId,
        },
      } = __fixtures__.GetTransactionResponse_MissingPosRefId;
      const spi = new Spi(posId, "", eftposAddress, null);
      spi.CurrentFlow = SpiFlow.Transaction;
      spi.CurrentTxFlowState = new TransactionFlowState(
        posRefId,
        TransactionType.Purchase
      );
      spi.CurrentTxFlowState.CallingGt(lastGtRequestId);
      const message = Message.FromJson(
        JSON.stringify(__fixtures__.GetTransactionResponse_MissingPosRefId)
      );

      // act
      spi._handleGetTransactionResponse(message);

      // assert
      expect(getLastConsoleCallArgs()).toMatch(/posrefid is missing/);
      expect(spi.CurrentTxFlowState.Finished).toBeTrue();
    });

    it("should handle a GT response where an operation is currently in progress on the terminal", () => {
      // arrange
      const {
        message: {
          data: { pos_ref_id: posRefId },
          id: lastGtRequestId,
        },
      } = __fixtures__.GetTransactionResponse_OpInProgress;
      const spi = new Spi(posId, "", eftposAddress, null);
      spi.CurrentFlow = SpiFlow.Transaction;
      spi.CurrentTxFlowState = new TransactionFlowState(
        posRefId,
        TransactionType.Purchase
      );
      spi.CurrentTxFlowState.CallingGt(lastGtRequestId);
      const message = Message.FromJson(
        JSON.stringify(__fixtures__.GetTransactionResponse_OpInProgress)
      );

      // act
      spi._handleGetTransactionResponse(message);

      // assert
      expect(getLastConsoleCallArgs()).toMatch(/blocked/);
      expect(spi.CurrentTxFlowState.Finished).toBeFalse();
    });

    it("should handle a GT response where there is no case that handles this response", () => {
      // arrange
      const {
        message: {
          data: { pos_ref_id: posRefId },
          id: lastGtRequestId,
        },
      } = __fixtures__.GetTransactionResponse_Unexpected;
      const spi = new Spi(posId, "", eftposAddress, null);
      spi.CurrentFlow = SpiFlow.Transaction;
      spi.CurrentTxFlowState = new TransactionFlowState(
        posRefId,
        TransactionType.Purchase
      );
      spi.CurrentTxFlowState.CallingGt(lastGtRequestId);
      const message = Message.FromJson(
        JSON.stringify(__fixtures__.GetTransactionResponse_Unexpected)
      );

      // act
      spi._handleGetTransactionResponse(message);

      // assert
      expect(getLastConsoleCallArgs()).toMatch(/unexpected/);
      expect(spi.CurrentTxFlowState.Finished).toBeTrue();
      expect(spi.CurrentTxFlowState.Success).toBe(SuccessState.Failed);
    });

    it("should handle a GT response where the transaction data is missing", () => {
      // arrange
      const {
        message: {
          data: { pos_ref_id: posRefId },
          id: lastGltRequestId,
        },
      } = __fixtures__.GetTransactionResponse_MissingTransactionData;
      const spi = new Spi(posId, "", eftposAddress, null);
      spi.CurrentFlow = SpiFlow.Transaction;
      spi.CurrentTxFlowState = new TransactionFlowState(
        posRefId,
        TransactionType.Purchase
      );
      spi.CurrentTxFlowState.CallingGt(lastGltRequestId);
      const message = Message.FromJson(
        JSON.stringify(
          __fixtures__.GetTransactionResponse_MissingTransactionData
        )
      );

      // act
      spi._handleGetTransactionResponse(message);

      // assert
      expect(getLastConsoleCallArgs()).toMatch(/missing tx payload/);
      expect(spi.CurrentTxFlowState.Finished).toBeFalse();
    });

    it("should handle a GT response that was explicitly requested by the user (completed independent of a TX)", () => {
      // arrange
      const {
        message: {
          data: { pos_ref_id: posRefId },
          id: lastGtRequestId,
        },
      } = __fixtures__.GetTransactionResponse_PurchaseSuccess;
      const spi = new Spi(posId, "", eftposAddress, null);
      spi.CurrentFlow = SpiFlow.Transaction;
      spi.CurrentTxFlowState = new TransactionFlowState(
        posRefId,
        TransactionType.GetTransaction
      ); // User requested GT
      spi.CurrentTxFlowState.CallingGt(lastGtRequestId);
      const message = Message.FromJson(
        JSON.stringify(__fixtures__.GetTransactionResponse_PurchaseSuccess)
      );

      // act
      spi._handleGetTransactionResponse(message);

      // assert
      expect(getLastConsoleCallArgs()).toMatch(/user/);
      expect(spi.CurrentTxFlowState.Finished).toBeTrue();
      expect(spi.CurrentTxFlowState.AwaitingGtResponse).toBeFalse();
    });

    it("should handle a GT response that was requested during a recovery", () => {
      // arrange
      const {
        message: {
          data: { pos_ref_id: posRefId },
          id: lastGtRequestId,
        },
      } = __fixtures__.GetTransactionResponse_PurchaseSuccess;
      const spi = new Spi(posId, "", eftposAddress, null);
      spi.CurrentFlow = SpiFlow.Transaction;
      spi.CurrentTxFlowState = new TransactionFlowState(
        posRefId,
        TransactionType.Purchase
      );
      spi.CurrentTxFlowState.CallingGt(lastGtRequestId);
      const message = Message.FromJson(
        JSON.stringify(__fixtures__.GetTransactionResponse_PurchaseSuccess)
      );

      // act
      spi._handleGetTransactionResponse(message);

      // assert
      expect(getLastConsoleCallArgs()).toMatch(/recovery/);
      expect(spi.CurrentTxFlowState.Finished).toBeTrue();
      expect(spi.CurrentTxFlowState.AwaitingGtResponse).toBeFalse();
    });
  });

  describe("_handleGetLastTransactionResponse()", () => {
    it("should handle a GLT response that was unexpected", () => {
      // arrange
      const spi = new Spi(posId, "", eftposAddress, null);
      spi.CurrentFlow = SpiFlow.Idle;

      // act
      spi._handleGetLastTransactionResponse();

      // assert
      expect(getLastConsoleCallArgs()).toMatch(/ignoring/);
    });

    it("should handle a GLT response where the transaction was cancelled on the terminal", () => {
      // arrange
      const {
        message: {
          data: { pos_ref_id: posRefId },
          id: lastGltRequestId,
        },
      } = __fixtures__.GetLastTransactionResponse_NoTransactions;
      const spi = new Spi(posId, "", eftposAddress, null);
      spi.CurrentFlow = SpiFlow.Transaction;
      spi.CurrentTxFlowState = new TransactionFlowState(
        posRefId,
        TransactionType.GetLastTransaction
      );
      const message = Message.FromJson(
        JSON.stringify(__fixtures__.GetLastTransactionResponse_NoTransactions)
      );

      // act
      spi._handleGetLastTransactionResponse(message);

      // assert
      expect(getLastConsoleCallArgs()).toMatch(/unknown/);
      expect(spi.CurrentTxFlowState.Finished).toBeTrue();
      expect(spi.CurrentTxFlowState.Success).toBe(SuccessState.Unknown);
    });

    it("should handle a GLT response where the GLT was successfully returned", () => {
      // arrange
      const {
        message: {
          data: { pos_ref_id: posRefId },
          id: lastGltRequestId,
        },
      } = __fixtures__.GetLastTransactionResponse_PurchaseSuccess;
      const spi = new Spi(posId, "", eftposAddress, null);
      spi.CurrentFlow = SpiFlow.Transaction;
      spi.CurrentTxFlowState = new TransactionFlowState(
        posRefId,
        TransactionType.GetLastTransaction
      );
      const message = Message.FromJson(
        JSON.stringify(__fixtures__.GetLastTransactionResponse_PurchaseSuccess)
      );

      // act
      spi._handleGetLastTransactionResponse(message);

      // assert
      expect(getLastConsoleCallArgs()).toMatch(/retrieved last transaction/);
      expect(spi.CurrentTxFlowState.Finished).toBeTrue();
    });
  });
});
