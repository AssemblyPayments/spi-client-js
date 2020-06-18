export const ConnectionState = {
    Disconnected: 'Disconnected',
    Connecting: 'Connecting',
    Connected: 'Connected'
};

export const SPI_PROTOCOL   = 'spi.2.7.0';

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
        this._conectionTimeout = null;

        if(typeof WebSocket === 'undefined') {
            throw new Error('Environment does not support WebSockets');
        }
    }

    _cancelConnectionTimeout() {
        if (this._conectionTimeout) {
            clearTimeout(this._conectionTimeout);
            this._connectionTimeout = null;
        }
    }

    Connect(UseSecureWebSockets) {
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

        const timeoutConnectionAttempt = () => {
            if (this._ws && this.State === ConnectionState.Connecting) {
                this.Disconnect();
            }
        }
        this._conectionTimeout = setTimeout(timeoutConnectionAttempt, 4000);

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
        this._cancelConnectionTimeout();
        this.State = ConnectionState.Connected;
        this.Connected = true;
        document.dispatchEvent(new CustomEvent('ConnectionStatusChanged', {detail: new ConnectionStateEventArgs(ConnectionState.Connected)}));
    }

    onClosed() {
        this._cancelConnectionTimeout();
        if (this.Connected === false && this.State === ConnectionState.Disconnected) return;

        this.Connected = false;
        this.State = ConnectionState.Disconnected;
        this._ws = null;
        document.dispatchEvent(new CustomEvent('ConnectionStatusChanged', {detail: new ConnectionStateEventArgs(ConnectionState.Disconnected)}));
    }

    pollWebSocketConnection(count = 0) {
        // Timeout trying to connect after 20 * 200ms = 4000 ms
        
        if(this._ws.readyState === this._ws.OPEN) {
            this.onOpened();
            return true;
        } else if(count < 20) {
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
        this._cancelConnectionTimeout();
        document.dispatchEvent(new CustomEvent('ErrorReceived', {detail: new MessageEventArgs(err)}));
    }
}
