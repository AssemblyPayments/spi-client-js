import { TransactionReportHelper } from "../src/TransactionReportHelper";
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
  const posVersion = "2.8.2";
  const serialNumber = "321-321-321";
  let fetchHelper;

  beforeEach(() => {
    spyOn(console, "error");
    spyOn(console, "info");
    spyOn(console, "warn");

    const fetchPromise = new Promise((resolve, reject) => {
      fetchHelper = { resolve, reject };
    });
    spyOn(window, "fetch").and.returnValue(fetchPromise);
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
    const spiEftposAddress = spi._eftposAddress.replace(/^w[s]?s:\/\//, "");

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
    const spiEftposAddress = spi._eftposAddress.replace(/^w[s]?s:\/\//, "");

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
    const spiEftposAddress = spi._eftposAddress.replace(/^w[s]?s:\/\//, "");

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
    const spiEftposAddress = spi._eftposAddress.replace(/^w[s]?s:\/\//, "");

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

  describe("InitiateReversal()", () => {
    it("should not initiate a Reversal when not paired", () => {
      // arrange
      const spi = new Spi(posId, "", eftposAddress, null);
      spi.CurrentStatus = SpiStatus.Unpaired;

      // act
      const initiateReversalResult = spi.InitiateReversal();

      // assert
      expect(initiateReversalResult.Message).toMatch(/not paired/i);
    });

    it("should not initiate a Reversal when not idle", () => {
      // arrange
      const spi = new Spi(posId, "", eftposAddress, null);
      spi.CurrentFlow = SpiFlow.Transaction;

      // act
      const initiateReversalResult = spi.InitiateReversal();

      // assert
      expect(initiateReversalResult.Message).toMatch(/not idle/i);
    });

    it("should initiate a Reversal", () => {
      // arrange
      const spi = new Spi(posId, "", eftposAddress, null);
      spi.CurrentFlow = SpiFlow.Idle;
      spi._send = () => true;

      // act
      const initiateReversalResult = spi.InitiateReversal();

      // assert
      expect(initiateReversalResult.Message).toMatch(/reversal initiated/i);
      expect(spi.CurrentTxFlowState.Type).toBe(TransactionType.Reversal);
    });
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

  describe("InitiateGetTx()", () => {
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

  describe("PrintReceipt()", () => {
    it("should not initiate a PrintReceipt when not paired", () => {
      // arrange
      const spi = new Spi(posId, "", eftposAddress, null);
      spi.CurrentStatus = SpiStatus.Unpaired;
      spi._send = () => true;
      spyOn(spi, "_send");

      // act
      spi.PrintReceipt();

      // assert
      expect(spi._send).not.toHaveBeenCalled();
    });

    it("should initiate a PrintReceipt when paired", () => {
      // arrange
      const spi = new Spi(posId, "", eftposAddress, null);
      spi.CurrentStatus = SpiStatus.PairedConnected;
      spi._send = () => true;
      spyOn(spi, "_send");

      // act
      spi.PrintReceipt();

      // assert
      expect(spi._send).toHaveBeenCalledWith(
        jasmine.objectContaining({ EventName: "print" })
      );
    });
  });

  describe("GetTerminalStatus()", () => {
    it("should not initiate a GetTerminalStatus when not paired", () => {
      // arrange
      const spi = new Spi(posId, "", eftposAddress, null);
      spi.CurrentStatus = SpiStatus.Unpaired;
      spi._send = () => true;
      spyOn(spi, "_send");

      // act
      spi.GetTerminalStatus();

      // assert
      expect(spi._send).not.toHaveBeenCalled();
    });

    it("should initiate a GetTerminalStatus when paired", () => {
      // arrange
      const spi = new Spi(posId, "", eftposAddress, null);
      spi.CurrentStatus = SpiStatus.PairedConnected;
      spi._send = () => true;
      spyOn(spi, "_send");

      // act
      spi.GetTerminalStatus();

      // assert
      expect(spi._send).toHaveBeenCalledWith(
        jasmine.objectContaining({ EventName: "get_terminal_status" })
      );
    });
  });

  describe("GetAvailableTenants()", () => {
    it("should return the available tenants", async () => {
      // arrange
      const spi = new Spi(posId, "", eftposAddress, null);
      fetchHelper.resolve({
        json: () =>
          Promise.resolve({
            data: [
              {
                code: "gko",
                name: "Gecko Demo Bank",
              },
            ],
          }),
      }); // Mock the response from ReportTx

      // act
      const tenants = await Spi.GetAvailableTenants();

      // assert
      expect(tenants.Data[0].code).toBe("gko");
    });

    it("should return empty data when request fails", async () => {
      const spi = new Spi(posId, "", eftposAddress, null);
      fetchHelper.resolve({
        json: () => Promise.reject({}),
      }); // Mock the response from ReportTx

      // act
      const tenants = await Spi.GetAvailableTenants();

      // assert
      expect(tenants.Data.length).toBe(0);
    });
  });

  describe("GetTerminalConfiguration()", () => {
    it("should not initiate a GetTerminalConfiguration when not paired", () => {
      // arrange
      const spi = new Spi(posId, "", eftposAddress, null);
      spi.CurrentStatus = SpiStatus.Unpaired;
      spi._send = () => true;
      spyOn(spi, "_send");

      // act
      spi.GetTerminalConfiguration();

      // assert
      expect(spi._send).not.toHaveBeenCalled();
    });

    it("should initiate a GetTerminalConfiguration when paired", () => {
      // arrange
      const spi = new Spi(posId, "", eftposAddress, null);
      spi.CurrentStatus = SpiStatus.PairedConnected;
      spi._send = () => true;
      spyOn(spi, "_send");

      // act
      spi.GetTerminalConfiguration();

      // assert
      expect(spi._send).toHaveBeenCalledWith(
        jasmine.objectContaining({ EventName: "get_terminal_configuration" })
      );
    });
  });

  describe("_handlePurchaseResponse()", () => {
    it("should handle a purchase response that was unexpected", () => {
      // arrange
      const spi = new Spi(posId, "", eftposAddress, null);
      spi.CurrentFlow = SpiFlow.Idle;
      const message = Message.FromJson(
        JSON.stringify(__fixtures__.PurchaseResponse)
      );

      // act
      spi._handlePurchaseResponse(message);

      // assert
      expect(getLastConsoleCallArgs()).toMatch(/not waiting for one/);
    });

    it("should handle a purchase response where the response was returned", () => {
      // arrange
      const {
        message: {
          data: { pos_ref_id: posRefId },
        },
      } = __fixtures__.PurchaseResponse;
      const spi = new Spi(posId, "", eftposAddress, null);
      spi.CurrentFlow = SpiFlow.Transaction;
      spi.CurrentTxFlowState = new TransactionFlowState(
        posRefId,
        TransactionType.Purchase
      );
      const message = Message.FromJson(
        JSON.stringify(__fixtures__.PurchaseResponse)
      );
      fetchHelper.resolve({ ok: true }); // Mock the response from ReportTx

      // act
      spi._handlePurchaseResponse(message);

      // assert
      expect(spi.CurrentTxFlowState.Finished).toBeTrue();
      expect(spi.CurrentTxFlowState.DisplayMessage).toMatch(
        /purchase .* ended/i
      );
    });
  });

  describe("_handleCashoutOnlyResponse()", () => {
    it("should handle a cashout only response that was unexpected", () => {
      // arrange
      const spi = new Spi(posId, "", eftposAddress, null);
      spi.CurrentFlow = SpiFlow.Idle;
      const message = Message.FromJson(
        JSON.stringify(__fixtures__.CashoutOnlyResponse)
      );

      // act
      spi._handleCashoutOnlyResponse(message);

      // assert
      expect(getLastConsoleCallArgs()).toMatch(/not waiting for one/);
    });

    it("should handle a cashout only response where the response was returned", () => {
      // arrange
      const {
        message: {
          data: { pos_ref_id: posRefId },
        },
      } = __fixtures__.CashoutOnlyResponse;
      const spi = new Spi(posId, "", eftposAddress, null);
      spi.CurrentFlow = SpiFlow.Transaction;
      spi.CurrentTxFlowState = new TransactionFlowState(
        posRefId,
        TransactionType.CashoutOnly
      );
      const message = Message.FromJson(
        JSON.stringify(__fixtures__.CashoutOnlyResponse)
      );
      fetchHelper.resolve({ ok: true }); // Mock the response from ReportTx

      // act
      spi._handleCashoutOnlyResponse(message);

      // assert
      expect(spi.CurrentTxFlowState.Finished).toBeTrue();
      expect(spi.CurrentTxFlowState.DisplayMessage).toMatch(
        /cashout .* ended/i
      );
    });
  });

  describe("_handleMotoPurchaseResponse()", () => {
    it("should handle a MOTO response that was unexpected", () => {
      // arrange
      const spi = new Spi(posId, "", eftposAddress, null);
      spi.CurrentFlow = SpiFlow.Idle;
      const message = Message.FromJson(
        JSON.stringify(__fixtures__.MotoResponse_Phone)
      );

      // act
      spi._handleMotoPurchaseResponse(message);

      // assert
      expect(getLastConsoleCallArgs()).toMatch(/not waiting for one/);
    });

    it("should handle a MOTO response where the response was returned", () => {
      // arrange
      const {
        message: {
          data: { pos_ref_id: posRefId },
        },
      } = __fixtures__.MotoResponse_Phone;
      const spi = new Spi(posId, "", eftposAddress, null);
      spi.CurrentFlow = SpiFlow.Transaction;
      spi.CurrentTxFlowState = new TransactionFlowState(
        posRefId,
        TransactionType.MOTO
      );
      const message = Message.FromJson(
        JSON.stringify(__fixtures__.MotoResponse_Phone)
      );
      fetchHelper.resolve({ ok: true }); // Mock the response from ReportTx

      // act
      spi._handleMotoPurchaseResponse(message);

      // assert
      expect(spi.CurrentTxFlowState.Finished).toBeTrue();
      expect(spi.CurrentTxFlowState.DisplayMessage).toMatch(/moto .* ended/i);
    });
  });

  describe("_handleRefundResponse()", () => {
    it("should handle a refund response that was unexpected", () => {
      // arrange
      const spi = new Spi(posId, "", eftposAddress, null);
      spi.CurrentFlow = SpiFlow.Idle;
      const message = Message.FromJson(
        JSON.stringify(__fixtures__.RefundResponse)
      );

      // act
      spi._handleRefundResponse(message);

      // assert
      expect(getLastConsoleCallArgs()).toMatch(/not waiting for this one/);
    });

    it("should handle a refund response where the response was returned", () => {
      // arrange
      const {
        message: {
          data: { pos_ref_id: posRefId },
        },
      } = __fixtures__.RefundResponse;
      const spi = new Spi(posId, "", eftposAddress, null);
      spi.CurrentFlow = SpiFlow.Transaction;
      spi.CurrentTxFlowState = new TransactionFlowState(
        posRefId,
        TransactionType.Refund
      );
      const message = Message.FromJson(
        JSON.stringify(__fixtures__.RefundResponse)
      );
      fetchHelper.resolve({ ok: true }); // Mock the response from ReportTx

      // act
      spi._handleRefundResponse(message);

      // assert
      expect(spi.CurrentTxFlowState.Finished).toBeTrue();
      expect(spi.CurrentTxFlowState.DisplayMessage).toMatch(/refund .* ended/i);
    });
  });

  describe("_handleSettleResponse()", () => {
    it("should handle a settle response that was unexpected", () => {
      // arrange
      const spi = new Spi(posId, "", eftposAddress, null);
      spi.CurrentFlow = SpiFlow.Idle;
      const message = Message.FromJson(
        JSON.stringify(__fixtures__.SettleResponse)
      );

      // act
      spi._handleSettleResponse(message);

      // assert
      expect(getLastConsoleCallArgs()).toMatch(/not waiting for one/);
    });

    it("should handle a settle response where the response was returned", () => {
      // arrange
      const {
        message: {
          data: { pos_ref_id: posRefId },
        },
      } = __fixtures__.SettleResponse;
      const spi = new Spi(posId, "", eftposAddress, null);
      spi.CurrentFlow = SpiFlow.Transaction;
      spi.CurrentTxFlowState = new TransactionFlowState(
        posRefId,
        TransactionType.Settle
      );
      const message = Message.FromJson(
        JSON.stringify(__fixtures__.SettleResponse)
      );
      fetchHelper.resolve({ ok: true }); // Mock the response from ReportTx

      // act
      spi._handleSettleResponse(message);

      // assert
      expect(spi.CurrentTxFlowState.Finished).toBeTrue();
      expect(spi.CurrentTxFlowState.DisplayMessage).toMatch(/settle .* ended/i);
    });
  });

  describe("_handleSettlementEnquiryResponse()", () => {
    it("should handle a settlement enquiry response that was unexpected", () => {
      // arrange
      const spi = new Spi(posId, "", eftposAddress, null);
      spi.CurrentFlow = SpiFlow.Idle;
      const message = Message.FromJson(
        JSON.stringify(__fixtures__.SettlementEnquiryResponse)
      );

      // act
      spi._handleSettlementEnquiryResponse(message);

      // assert
      expect(getLastConsoleCallArgs()).toMatch(/not waiting for one/);
    });

    it("should handle a settlement enquiry response where the response was returned", () => {
      // arrange
      const {
        message: {
          data: { pos_ref_id: posRefId },
        },
      } = __fixtures__.SettlementEnquiryResponse;
      const spi = new Spi(posId, "", eftposAddress, null);
      spi.CurrentFlow = SpiFlow.Transaction;
      spi.CurrentTxFlowState = new TransactionFlowState(
        posRefId,
        TransactionType.SettlementEnquiry
      );
      const message = Message.FromJson(
        JSON.stringify(__fixtures__.SettlementEnquiryResponse)
      );
      fetchHelper.resolve({ ok: true }); // Mock the response from ReportTx

      // act
      spi._handleSettlementEnquiryResponse(message);

      // assert
      expect(spi.CurrentTxFlowState.Finished).toBeTrue();
      expect(spi.CurrentTxFlowState.DisplayMessage).toMatch(
        /settlement enquiry ended/i
      );
    });
  });

  describe("_handleReversalTransaction()", () => {
    it("should handle a Reversal response that was unexpected", () => {
      // arrange
      const spi = new Spi(posId, "", eftposAddress, null);
      spi.CurrentFlow = SpiFlow.Idle;
      const message = Message.FromJson(
        JSON.stringify(__fixtures__.ReversalResponse_Success)
      );

      // act
      spi._handleReversalTransaction(message);

      // assert
      expect(getLastConsoleCallArgs()).toMatch(/was not waiting/);
    });

    it("should handle a Reversal response where the reversal was successful", () => {
      // arrange
      const {
        message: {
          data: { pos_ref_id: posRefId },
        },
      } = __fixtures__.ReversalResponse_Success;
      const spi = new Spi(posId, "", eftposAddress, null);
      spi.CurrentFlow = SpiFlow.Transaction;
      spi.CurrentTxFlowState = new TransactionFlowState(
        posRefId,
        TransactionType.Reversal
      );
      const message = Message.FromJson(
        JSON.stringify(__fixtures__.ReversalResponse_Success)
      );

      // act
      spi._handleReversalTransaction(message);

      // assert
      expect(spi.CurrentTxFlowState.Finished).toBeTrue();
      expect(spi.CurrentTxFlowState.DisplayMessage).toMatch(
        /reversal .* ended/i
      );
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

    it("should handle a GT response where a signature response is about to be required", () => {
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
      spi.CurrentTxFlowState.SignatureRequired();
      spi.CurrentTxFlowState.CallingGt(lastGtRequestId);
      const message = Message.FromJson(
        JSON.stringify(__fixtures__.GetTransactionResponse_SignatureRequired)
      );

      // act
      spi._handleGetTransactionResponse(message);

      // assert
      expect(getLastConsoleCallArgs()).toMatch(/waiting for signature/);
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
          id: lastGtRequestId,
        },
      } = __fixtures__.GetTransactionResponse_MissingTransactionData;
      const spi = new Spi(posId, "", eftposAddress, null);
      spi.CurrentFlow = SpiFlow.Transaction;
      spi.CurrentTxFlowState = new TransactionFlowState(
        posRefId,
        TransactionType.Purchase
      );
      spi.CurrentTxFlowState.CallingGt(lastGtRequestId);
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
      fetchHelper.resolve({ ok: true }); // Mock the response from ReportTx

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
      fetchHelper.resolve({ ok: true }); // Report TX mock

      // act
      spi._handleGetLastTransactionResponse(message);

      // assert
      expect(getLastConsoleCallArgs()).toMatch(/retrieved last transaction/);
      expect(spi.CurrentTxFlowState.Finished).toBeTrue();
    });
  });

  describe("_sendTransactionReport()", () => {
    it("should handle a successfully sent transaction report", async () => {
      // arrange
      const posRefId = "purchase";
      const spi = new Spi(posId, serialNumber, eftposAddress, null);
      spi.CurrentFlow = SpiFlow.Idle;
      spi.CurrentTxFlowState = new TransactionFlowState(
        posRefId,
        TransactionType.Purchase
      );
      spi.CurrentStatus = SpiStatus.PairedConnected;
      spi.CurrentTxFlowState.Sent();
      spi.CurrentTxFlowState.Completed(SuccessState.Success);
      spi._transactionReport = TransactionReportHelper.CreateTransactionReportEnvelope(
        posVendorId,
        posVersion,
        spi._libraryLanguage,
        Spi.GetVersion(),
        serialNumber
      );

      // act
      fetchHelper.resolve({ ok: true }); // Mock the response from ReportTx
      await spi._sendTransactionReport();

      // assert
      expect(spi._transactionReport).toEqual(
        jasmine.objectContaining({
          PosVendorId: posVendorId,
          PosVersion: posVersion,
          LibraryLanguage: spi._libraryLanguage,
          LibraryVersion: posVersion,
          PosRefId: posRefId,
          SerialNumber: serialNumber,
          TxType: TransactionType.Purchase,
          TxResult: SuccessState.Success,
          CurrentFlow: SpiFlow.Idle,
          CurrentTxFlowState: TransactionType.Purchase,
          CurrentStatus: SpiStatus.PairedConnected,
        })
      );
      expect(spi._transactionReport.Event).toMatch(
        /signature: false.*cancel: false.*finished: true/i
      );
      expect(spi._transactionReport.DurationMs).toEqual(jasmine.any(Number));
      expect(spi._transactionReport.TxStartTime).toEqual(jasmine.any(Number));
      expect(spi._transactionReport.TxEndTime).toEqual(jasmine.any(Number));
      expect(window.fetch).toHaveBeenCalled();
    });

    it("should handle a failed to send transaction report", async () => {
      // arrange
      const spi = new Spi(posId, "", eftposAddress, null);
      spi.CurrentFlow = SpiFlow.Idle;
      spi.CurrentTxFlowState = new TransactionFlowState(
        "purchase",
        TransactionType.Purchase
      );
      const errorResponse = {
        error: {
          code: 418,
          message: "Still a teapot, not a terminal",
        },
      };
      fetchHelper.resolve({
        json: () => Promise.resolve(errorResponse),
        ok: false,
        status: 418,
      }); // Mock the response from ReportTx

      // act
      await spi._sendTransactionReport();

      // assert
      expect(getLastConsoleCallArgs("error")).toMatch(/teapot/i);
      expect(getLastConsoleCallArgs("warn")).toMatch(/error reporting/i);
    });
  });
});
