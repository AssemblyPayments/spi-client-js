export default class Logger {
    constructor(element) {
        this.buffer     = [];
        this.element    = element;
    }

    Info(...args) {
        this.buffer.push(args.join(' '));
        this._render();
    }

    Debug(...args) {
        this.buffer.push(args.join(' '));
        this._render();
    }

    Warn(...args) {
        this.buffer.push(args.join(' '));
        this._render();
    }

    Error(...args) {
        this.buffer.push(args.join(' '));
        this._render();
    }

    Console(...args) {
        console.log(args.join(' '));
    }

    _render() {
        this.element.innerText = this.buffer.join('\n');
        this.element.scrollTop = this.element.scrollHeight;
    }

    Clear() {
        this.buffer = [];
        this._render();
    }
}