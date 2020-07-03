import { TransactionReport } from './Service/AnalyticsService';

export class TransactionReportHelper
{
    static CreateTransactionReportEnvelope(posVendorId, posVersion, libraryLanguage, libraryVersion, serialNumber) {
        const transactionReport = Object.assign(new TransactionReport(),
        {
            PosVendorId: posVendorId,
            PosVersion: posVersion,
            LibraryLanguage: libraryLanguage,
            LibraryVersion: libraryVersion,
            SerialNumber: serialNumber,
        });

        return transactionReport;
    }
}