let __RequestIdHelperCounter = 1;

class RequestIdHelper {
    static Id(prefix) {
        return prefix + __RequestIdHelperCounter++;
    }
}
