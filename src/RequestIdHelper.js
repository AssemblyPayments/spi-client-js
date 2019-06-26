let __RequestIdHelperCounter = 1;

export class RequestIdHelper {
    static Id(prefix) {
        return prefix + __RequestIdHelperCounter++;
    }
}
