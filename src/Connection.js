export const ConnectionState = {
    Disconnected: 'Disconnected',
    Connecting: 'Connecting',
    Connected: 'Connected'
};

export const SPI_PROTOCOL   = 'spi.2.4.0';
export const SPI_URI_SCHEME = 'ws'; // wss = secure (https / TLS), ws = non secure (http)

export class ConnectionStateEventArgs
{
    constructor(connectionState) {
        this.ConnectionState = connectionState;
    }
}

export class MessageEventArgs
{
    constructor(message) {
        this.Message = message;
    }
}

export class Connection {
    constructor() {
        this.Address    = null;
        this.Connected  = false;
        this.State      = ConnectionState.Disconnected;
        this.SpiProtocol = SPI_PROTOCOL;
        this._ws        = null;

        if(typeof WebSocket === 'undefined') {
            throw new Error('Environment does not support WebSockets');
        }
    }

    Connect() {
        if(this.State === ConnectionState.Connected || this.State === ConnectionState.Connecting) {
            // already connected or connecting. disconnect first.
            return;
        }

        this.State = ConnectionState.Connecting;

        //Create a new socket instance specifying the url, SPI protocol and Websocket to use.
        //The will create a TCP/IP socket connection to the provided URL and perform HTTP websocket negotiation
        this._ws           = new WebSocket(this.Address, this.SpiProtocol);
        this._ws.onopen    = () => this.pollWebSocketConnection();
        this._ws.onmessage = (payload) => this.onMessageReceived(payload);
        this._ws.onclose   = () => this.onClosed();
        this._ws.onerror   = (err) => this.onError(err);

        document.dispatchEvent(new CustomEvent('ConnectionStatusChanged', {detail: new ConnectionStateEventArgs(ConnectionState.Connecting)}));
    }

    Disconnect() {
        if (this.State == ConnectionState.Disconnected) return;

        if(this._ws && this._ws.readyState != this._ws.CLOSED) {
            this._ws.close();
        }

        if (this._ws) {
            this._ws.onopen    = null;
            this._ws.onmessage = null;
            this._ws.onclose   = null;
            this._ws.onerror   = null;
        }

        this.onClosed();
    }

    Send(message) {
        this._ws.send(message);
    }

    onOpened() {
        this.State = ConnectionState.Connected;
        this.Connected = true;
        document.dispatchEvent(new CustomEvent('ConnectionStatusChanged', {detail: new ConnectionStateEventArgs(ConnectionState.Connected)}));
    }

    onClosed() {
        this.Connected = false;
        this.State = ConnectionState.Disconnected;
        this._ws = null;
        document.dispatchEvent(new CustomEvent('ConnectionStatusChanged', {detail: new ConnectionStateEventArgs(ConnectionState.Disconnected)}));
    }

    pollWebSocketConnection(count = 0) {
        
        if(this._ws.readyState === this._ws.OPEN) {
            this.onOpened();
            return true;
        } else if(count < 25) {
            count++;
            setTimeout(() => this.pollWebSocketConnection(count), 200);
        } else {
            this.Disconnect();
            return false;
        }
    }

    onMessageReceived(message) {
        document.dispatchEvent(new CustomEvent('MessageReceived', {detail: new MessageEventArgs(message.data)}));
    }

    onError(err) {
        document.dispatchEvent(new CustomEvent('ErrorReceived', {detail: new MessageEventArgs(err)}));
    }
}
