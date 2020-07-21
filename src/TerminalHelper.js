export class TerminalHelper {
  static IsPrinterAvailable(terminalModel) {
    // Terminal model strings
    const terminalsWithoutPrinter = ["E355"];

    if (terminalsWithoutPrinter.includes(terminalModel)) {
      return false;
    }

    return true;
  }
}
