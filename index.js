import {Spi} from "./src/Spi";
import {Logger} from './src/Logger';
import {Printer} from './src/Printing';

// Re-exported modules required for POS vendors
export {Spi} from './src/Spi';
export {Logger} from './src/Logger';
export {Secrets} from './src/Secrets';
export {SuccessState} from './src/Messages';
export {TransactionOptions, TransactionType, SpiFlow, SpiStatus} from './src/SpiModels';
export {PrintingResponse} from './src/Printing';
export {RefundResponse, PurchaseResponse, GetLastTransactionResponse, MotoPurchaseResponse} from './src/Purchase';
export {TerminalStatusResponse, TerminalBattery} from './src/TerminalStatus';
export {CashoutOnlyResponse} from './src/Cashout';
export {Settlement} from './src/Settlement';
export {RequestIdHelper} from './src/RequestIdHelper';
export {BillStatusResponse, BillRetrievalResult} from './src/PayAtTable';
window.Spi = Spi;
window.Logger = Logger;
window.Printer = Printer;
