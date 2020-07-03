import {
  AnalyticsService,
  TransactionReport,
} from "../../src/Service/AnalyticsService";

describe("AnalyticsService", () => {
  describe("TransactionReport", () => {
    it("should create a TransactionReport", () => {
      // arrange
      const transactionReportProperties = [
        "CurrentFlow",
        "CurrentStatus",
        "CurrentTxFlowState",
        "DurationMs",
        "Event",
        "LibraryLanguage",
        "LibraryVersion",
        "PosRefId",
        "PosVendorId",
        "PosVersion",
        "SerialNumber",
        "TxEndTime",
        "TxResult",
        "TxStartTime",
        "TxType",
      ];

      // act
      const transactionReport = new TransactionReport();

      // assert
      expect(Object.keys(transactionReport).sort()).toEqual(
        transactionReportProperties
      );
    });
  });

  it("should correctly convert the internal properties to a message", () => {
    // arrange
    const transactionReport = new TransactionReport();
    transactionReport.CurrentFlow = "CurrentFlow";
    transactionReport.CurrentStatus = "CurrentStatus";
    transactionReport.CurrentTxFlowState = "CurrentTxFlowState";
    transactionReport.DurationMs = "DurationMs";
    transactionReport.Event = "Event";
    transactionReport.LibraryLanguage = "LibraryLanguage";
    transactionReport.LibraryVersion = "LibraryVersion";
    transactionReport.PosRefId = "PosRefId";
    transactionReport.PosVendorId = "PosVendorId";
    transactionReport.PosVersion = "PosVersion";
    transactionReport.SerialNumber = "SerialNumber";
    transactionReport.TxEndTime = "TxEndTime";
    transactionReport.TxResult = "TxResult";
    transactionReport.TxStartTime = "TxStartTime";
    transactionReport.TxType = "TxType";

    // act
    const message = transactionReport.ToMessage();

    // assert
    expect(transactionReport).toEqual(
      jasmine.objectContaining({
        CurrentFlow: "CurrentFlow",
        CurrentStatus: "CurrentStatus",
        CurrentTxFlowState: "CurrentTxFlowState",
        DurationMs: "DurationMs",
        Event: "Event",
        LibraryLanguage: "LibraryLanguage",
        LibraryVersion: "LibraryVersion",
        PosRefId: "PosRefId",
        PosVendorId: "PosVendorId",
        PosVersion: "PosVersion",
        SerialNumber: "SerialNumber",
        TxEndTime: "TxEndTime",
        TxResult: "TxResult",
        TxStartTime: "TxStartTime",
        TxType: "TxType",
      })
    );
  });

  describe("AnalyticsService", () => {
    let fetchHelper;

    beforeEach(() => {
      const fetchPromise = new Promise((resolve, reject) => {
        fetchHelper = { resolve, reject };
      });
      spyOn(window, "fetch").and.returnValue(fetchPromise);
    });

    it("should successfully send a report to sandbox", async () => {
      // arrange
      const transactionReport = new TransactionReport();
      const apiKey = "spi-sample-pos";
      const acquirerCode = "wbc";
      const isTestMode = true;
      fetchHelper.resolve({ ok: true }); // Mock the response from ReportTx

      // act
      await AnalyticsService.ReportTransaction(
        transactionReport,
        apiKey,
        acquirerCode,
        isTestMode
      );

      // assert
      expect(window.fetch).toHaveBeenCalledWith(
        jasmine.stringMatching(/\/spi-analytics-api-sb\./),
        jasmine.anything()
      );
    });

    it("should successfully send a report to production", async () => {
      // arrange
      const transactionReport = new TransactionReport();
      const apiKey = "spi-sample-pos";
      const acquirerCode = "wbc";
      const isTestMode = false;
      fetchHelper.resolve({ ok: true }); // Mock the response from ReportTx

      // act
      await AnalyticsService.ReportTransaction(
        transactionReport,
        apiKey,
        acquirerCode,
        isTestMode
      );

      // assert
      expect(window.fetch).toHaveBeenCalledWith(
        jasmine.stringMatching(/\/spi-analytics-api\./),
        jasmine.anything()
      );
    });

    it("should throw an error when the request returned an status code other than 2xx", async () => {
      // arrange
      const transactionReport = new TransactionReport();
      const apiKey = "spi-sample-pos";
      const acquirerCode = "wbc";
      const isTestMode = false;
      const errorResponse = {
        error: {
          code: 418,
          message: "Still a teapot, not a terminal",
        },
      };
      fetchHelper.resolve({
        ok: false,
        json: () => Promise.resolve(errorResponse),
      }); // Mock the response from ReportTx

      // act
      let errorReturned = null;

      try {
        await AnalyticsService.ReportTransaction(
          transactionReport,
          apiKey,
          acquirerCode,
          isTestMode
        );
      } catch (error) {
        errorReturned = error;
      }

      // assert
      expect(errorReturned).toBeInstanceOf(Error);
      expect(errorReturned.message).toMatch(/teapot/);
    });
  });
});
