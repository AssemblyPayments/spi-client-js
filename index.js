import {Spi} from "./src/Spi";
import {Logger} from './src/Logger';
import {Printer} from './src/Printing';

// Re-exported modules required for POS vendors
export {Spi} from './src/Spi';
export {Logger} from './src/Logger';
export {Secrets} from './src/Secrets';
export {SuccessState} from './src/Messages';
export {TransactionOptions, TransactionType, SpiFlow, SpiStatus} from './src/SpiModels';
export {RefundResponse, PurchaseResponse, GetLastTransactionResponse, MotoPurchaseResponse} from './src/Purchase';
export {CashoutOnlyResponse} from './src/Cashout';
export {Settlement} from './src/Settlement';

window.Spi = Spi;
window.Logger = Logger;
window.Printer = Printer;