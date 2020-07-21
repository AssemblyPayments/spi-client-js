import { TerminalHelper } from "../src/TerminalHelper";

describe("TerminalHelper", function () {
  describe("IsPrinterAvailable", function () {
    it("should return true if terminal has a printer", () => {
      // arrange

      // act
      const result = TerminalHelper.IsPrinterAvailable("VX690");

      // assert
      expect(result).toBeTrue();
    });

    it("should return false if terminal does not have a printer", () => {
      // arrange

      // act
      const result = TerminalHelper.IsPrinterAvailable("E355");

      // assert
      expect(result).toBeFalse();
    });

    it("should return true if terminal model is not known", () => {
      // arrange

      // act
      const result = TerminalHelper.IsPrinterAvailable();

      // assert
      expect(result).toBeTrue();
    });
  });
});
