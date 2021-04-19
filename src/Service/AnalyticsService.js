export class TransactionReport {
  constructor() {
    this.PosVendorId = null;
    this.PosVersion = null;
    this.LibraryLanguage = null;
    this.LibraryVersion = null;
    this.PosRefId = null;
    this.SerialNumber = null;
    this.Event = null;
    this.TxType = null;
    this.TxResult = null;
    this.TxStartTime = null;
    this.TxEndTime = null;
    this.DurationMs = null;
    this.CurrentFlow = null;
    this.CurrentTxFlowState = null;
    this.CurrentStatus = null;
  }

  ToMessage() {
    const message = {
      pos_vendor_id: this.PosVendorId,
      pos_version: this.PosVersion,
      library_language: this.LibraryLanguage,
      library_version: this.LibraryVersion,
      pos_ref_id: this.PosRefId,
      serial_number: this.SerialNumber,
      event: this.Event,
      tx_type: this.TxType,
      tx_result: this.TxResult,
      tx_start_ts_ms: this.TxStartTime,
      tx_end_ts_ms: this.TxEndTime,
      duration_ms: this.DurationMs,
      current_flow: this.CurrentFlow,
      current_tx_flow_state: this.CurrentTxFlowState,
      current_status: this.CurrentStatus,
    };

    return message;
  }
}

export class AnalyticsService {
  static async ReportTransaction(
    transactionReport,
    apiKey = "spi-sample-pos1",
    tenantCode,
    isTestMode
  ) {
    const transactionServiceUri = isTestMode
      ? `https://spi-analytics-api-sb.${tenantCode}.mspenv.io/v1/report-transaction`
      : `https://spi-analytics-api.${tenantCode}.mspenv.io/v1/report-transaction`;

    const message = transactionReport.ToMessage();

    const response = await fetch(transactionServiceUri, {
      method: "POST",
      headers: {
        "ASM-MSP-DEVICE-ADDRESS-API-KEY": apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });

    if (!response.ok) {
      const responseJSON = await response.json();
      throw Error(
        `Status code ${
          response.status
        } received from ${transactionServiceUri} - Error ${
          responseJSON.error && responseJSON.error.message
        }`
      );
    }
  }
}
