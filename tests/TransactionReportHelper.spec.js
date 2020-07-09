import { TransactionReportHelper } from "../src/TransactionReportHelper";

describe("TransactionReportHelper", () => {
  describe("TransactionReportHelper()", () => {
    it("should create a TransactionReport", () => {
      // arrange
      const posVendorId = "mx51";
      const posVersion = "1.0.0";
      const libraryLanguage = "js";
      const libraryVersion = "1.0.0";
      const serialNumber = "321-321-321";

      // act
      const transactionReportEnvelope = TransactionReportHelper.CreateTransactionReportEnvelope(
        posVendorId,
        posVersion,
        libraryLanguage,
        libraryVersion,
        serialNumber
      );

      // assert
      expect(transactionReportEnvelope.PosVendorId).toEqual(posVendorId);
      expect(transactionReportEnvelope.PosVersion).toEqual(posVersion);
      expect(transactionReportEnvelope.LibraryLanguage).toEqual(
        libraryLanguage
      );
      expect(transactionReportEnvelope.LibraryVersion).toEqual(libraryVersion);
      expect(transactionReportEnvelope.SerialNumber).toEqual(serialNumber);
    });
  });
});
