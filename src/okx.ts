import WebSocket from 'ws';
require('dotenv').config();
import crypto from 'crypto';
import {Nullable} from "../interface";



export class OkxClientConnector {
    private apiKey: string;
    private secretKey: string;
    private passphrase: string;
    private wsUrl: string;
    private ws: Nullable<WebSocket>;
    constructor() {
        this.apiKey = process.env.OKX_API_KEY;
        this.secretKey = process.env.OKX_SECRET_KEY;
        this.passphrase = process.env.OKX_PASSPHRASE;
        this.wsUrl = 'wss://ws.okx.com:8443/ws/v5/private';
        this.ws = null
        this.connect();
    }

    signMessage(timestamp, method, path, body = '') {
        const message = timestamp + method + path + body;
        return crypto.createHmac('sha256', this.secretKey).update(message).digest('base64');
    }

    connect() {
        this.ws = new WebSocket(this.wsUrl);

        this.ws.on('open', () => {
            console.log('Connected to OKX WebSocket');
            this.authenticate();
        });

        this.ws.on('message', (data) => {
            this.handleMessage(data);
        });

        this.ws.on('error', (error) => {
            console.error('WebSocket error:', error);
        });

        this.ws.on('close', () => {
            console.log('WebSocket disconnected. Reconnecting...');
            setTimeout(() => this.connect(), 5000);
        });
    }

    authenticate() {
        const timestamp = Math.floor(Date.now() / 1000).toString();
        const sign = this.signMessage(timestamp, 'GET', '/users/self/verify');

        const authMessage = {
            op: 'login',
            args: [{ apiKey: this.apiKey, passphrase: this.passphrase, timestamp, sign }]
        };
        this.ws.send(JSON.stringify(authMessage));
    }

    subscribeOrders() {
        const subscriptionMessage = {
            op: 'subscribe',
            args: [{ channel: 'orders', instType: 'ANY' }]
        };
        this.ws.send(JSON.stringify(subscriptionMessage));
    }


    handleMessage(data) {
        const response = JSON.parse(data);
        if (response.event === 'login' && response.code === '0') {
            console.log('Authenticated successfully');
            this.subscribeOrders();
        } else if (response.arg && response.arg.channel === 'orders') {
            console.log('New Order:', JSON.stringify(response.data, null, 2));
        }
    }
}

new OkxClientConnector();
