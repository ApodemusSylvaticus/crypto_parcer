import { WebsocketClient } from 'bybit-api';
import { AddMsgToStackFunc, ITgMessage } from './interface';
import { BybitOrderMessage } from './interface/bybit';
import { calculatePercent } from './helpers';

export class BybitClientConnector {
    ws: WebsocketClient;

    constructor(addMsgToStack: AddMsgToStackFunc) {
        if (!process.env.BYBIT_API_KEY || !process.env.BYBIT_API_KEY_SECRET) {
            throw new Error('Bybit API credentials not found');
        }
        this.ws = new WebsocketClient({
            key: process.env.BYBIT_API_KEY,
            secret: process.env.BYBIT_API_KEY_SECRET,
            market: 'v5', // API V5
        });
        this.setEventHandlers(addMsgToStack);

        this.ws.subscribe(['order' /* 'position'*/]);
    }

    setEventHandlers(addMsgToStack: AddMsgToStackFunc) {
        this.ws.on('open', () => {
            console.log('Connected to Bybit WebSocket');
        });

        this.ws.on('response', message => {
            console.log('Bybit server response:', message);
        });

        this.ws.on('update', message => {
            if (message.topic && message.topic.includes('order')) {
                this.handleResponse(addMsgToStack, message);
            }
        });

        // @ts-ignore
        this.ws.on('error', error => {
            console.error('Bybit webSocket error:', error);
        });

        this.ws.on('close', () => {
            console.log('Bybit connection closed');
        });
    }

    handleResponse(addMsgToStack: AddMsgToStackFunc, msg: BybitOrderMessage) {
        if (!msg.data || msg.data.length === 0) {
            console.log('Bybit empty response');
            return;
        }

        const index = msg.data.findIndex(el => el.orderStatus === 'New');

        if (index === -1) {
            return;
        }

        const { price, stopLoss, takeProfit, lastPriceOnCreated, symbol, side } = msg.data[index];

        const parsedPrice = Number(price);
        const parsedStopLoss = Number(stopLoss);
        const parsedTakeProfit = Number(takeProfit);
        const parsedLastPrice = Number(lastPriceOnCreated);

        const parsedMsg: ITgMessage = {
            sl: { percent: calculatePercent(parsedStopLoss, parsedPrice), value: parsedStopLoss },
            entry: parsedPrice,
            positionType: side === 'Buy' ? 'Long' : 'Short',
            risk: undefined,
            tp: { percent: calculatePercent(parsedTakeProfit, parsedPrice), value: parsedTakeProfit },
            priceWhenSignalGenerated: parsedLastPrice,
            leverage: undefined,
            symbol,
        };

        addMsgToStack(parsedMsg);
    }
}