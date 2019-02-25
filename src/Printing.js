import {Events, Message, SuccessState} from './Messages';
import {RequestIdHelper} from './RequestIdHelper';

export class PrintingRequest
{
    constructor(key, payload)
    {
        this._key = key;
        this._payload = payload;
    }

    toMessage()
    {
        var data = {
            "key": this._key,
            "payload": this._payload
        };

        return new Message(RequestIdHelper.Id("print"), Events.PrintingRequest, data, true);
    }
}

export class PrintingResponse
{
    constructor(m)
    {
        this._success = m.GetSuccessState() == SuccessState.Success;
        this._m = m;
    }
    isSuccess()
    {
        return this._success;
    }
    getErrorReason()
    {
        return this._m.Data.error_reason;
    }
    getErrorDetail()
    {
        return this._m.Data.error_detail;
    }
    getResponseValueWithAttribute(attribute)
    {
        return this._m.Data[attribute];
    }
}

/**
 * This class is a mock printer for the terminal to print Receipts
 */
export class Printer {
    constructor(element) {
        this.buffer     = [];
        this.element    = element;
    }

    print(...args) {
        this.buffer.push(args.join(' '));
        this._render();
    }

    _render() {
        this.element.innerText = this.buffer.join(`\n\n \\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/ \n\n`);
        this.element.scrollTop = this.element.scrollHeight;
    }

    Clear() {
        this.buffer = [];
        this._render();
    }
}