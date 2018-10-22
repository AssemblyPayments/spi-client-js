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