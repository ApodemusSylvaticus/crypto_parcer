import WebSocket from 'ws';
import crypto from 'crypto';
import { AuthMessage, OkxOrder, SubscriptionMessage, WebSocketResponse } from './interface/okx';
import { AddMsgToStackFunc } from './interface';
import { calculatePercent } from './helpers';



export class OkxClientConnector {
    private readonly apiKey: string;
    private secretKey: string;
    private readonly passphrase: string;
    private readonly wsUrl: string;
    private ws: WebSocket;
    private readonly addMsgToStack: AddMsgToStackFunc;

    constructor(addMsgToStack: AddMsgToStackFunc) {
        if (!process.env.OKX_API_KEY || !process.env.OKX_SECRET_KEY || !process.env.OKX_PASSPHRASE) {
            throw new Error('OKX API credentials not found');
        }
        this.apiKey = process.env.OKX_API_KEY;
        this.secretKey = process.env.OKX_SECRET_KEY;
        this.passphrase = process.env.OKX_PASSPHRASE;
        this.addMsgToStack = addMsgToStack;
        this.wsUrl = 'wss://ws.okx.com:8443/ws/v5/private';
        this.ws = new WebSocket(this.wsUrl);
        this.connect();
        this.startHeartbeat();
    }

    private signMessage(timestamp: string, method: string, path: string, body: string = ''): string {
        const message = timestamp + method + path + body;
        return crypto.createHmac('sha256', this.secretKey).update(message).digest('base64');
    }

    private connect(): void {
        this.ws.on('open', () => {
            console.log('Connected to OKX WebSocket');
            this.authenticate();
        });

        this.ws.on('message', (data: WebSocket.RawData) => {
            this.handleMessage(data.toString());
        });

        this.ws.on('error', (error: Error) => {
            console.error('OKX webSocket error:', error);
        });

        this.ws.on('close', () => {
            console.log('OKX webSocket disconnected. Reconnecting...');
            setTimeout(() => this.connect(), 5000);
        });
    }

    private authenticate(): void {
        const timestamp = Math.floor(Date.now() / 1000).toString();
        const sign = this.signMessage(timestamp, 'GET', '/users/self/verify');

        const authMessage: AuthMessage = {
            op: 'login',
            args: [{ apiKey: this.apiKey, passphrase: this.passphrase, timestamp, sign }],
        };

        this.ws.send(JSON.stringify(authMessage));
    }

    private subscribeOrders(): void {
        const subscriptionMessage: SubscriptionMessage = {
            op: 'subscribe',
            args: [{ channel: 'orders', instType: 'ANY' }],
        };

        this.ws.send(JSON.stringify(subscriptionMessage));
    }

    private handleMessage(data: string): void {
        try {
            const response: WebSocketResponse = JSON.parse(data);

            if (response.event === 'login' && response.code === '0') {
                console.log('OKX Authenticated successfully');
                this.subscribeOrders();
            } else if (response.arg?.channel === 'orders' && response.data) {
                const order: OkxOrder = response.data[0];

                if (order.state === 'live' && order.attachAlgoOrds !== undefined && order.attachAlgoOrds.length > 0) {
                    const insId = order.instId.split('-');
                    const symbol = `${insId[0]}/${insId[1]}`;
                    const tpValue = order.attachAlgoOrds[0].tpOrdPx ? Number(order.attachAlgoOrds[0].tpOrdPx) : 0;
                    const slValue = order.attachAlgoOrds[0].slTriggerPx
                        ? Number(order.attachAlgoOrds[0].slTriggerPx)
                        : 0;
                    const priceWhenSignalGenerated = order.lastPx ? Number(order.lastPx) : 0;
                    const entry = Number(order.px);
                    const leverage = order.lever ? Number(order.lever) : undefined;
                    const positionType = order.posSide === 'long' ? 'Long' : 'Short';

                    this.addMsgToStack({
                        symbol,
                        tp: { value: tpValue, percent: calculatePercent(tpValue, entry) },
                        entry,
                        risk: undefined,
                        leverage,
                        positionType,
                        sl: { percent: calculatePercent(slValue, entry), value: slValue },
                        priceWhenSignalGenerated,
                    });
                }
            }
        } catch (error) {
            console.error('Failed to parsing message OKX:', error);
        }
    }

    private startHeartbeat(): void {
        setInterval(() => {
            if (this.ws.readyState === WebSocket.OPEN) {
                this.ws.ping();
            }
        }, 20000); // Send ping every 20 seconds
    }
}
