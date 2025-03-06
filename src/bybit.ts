import { WebsocketClient } from 'bybit-api';
import {AddMsgToStackFunc, ITgMessage} from "../interface";
import {BybitOrderMessage, IBybitPositionMessage} from "../interface/bybit";


export class BybitClientConnector {
    ws: WebsocketClient;
    constructor(addMsgToStack: AddMsgToStackFunc) {
        this.ws = new WebsocketClient({
            key: process.env.BYBIT_API_KEY,
            secret: process.env.BYBIT_API_KEY_SECRET,
            market: 'v5', // API V5
        });
        this.setEventsHandlers(addMsgToStack);

    this.ws.subscribe(['order'/* 'position'*/]);
    }

    setEventsHandlers(addMsgToStack: AddMsgToStackFunc) {
        this.ws.on('open', () => {
            console.log('✅ Подключено к WebSocket Bybit');
        });

        this.ws.on('response', (message) => {
            console.log('📩 Ответ сервера:', message);
        });

        this.ws.on('update', (message) => {
            if (message.topic && message.topic.includes('order')) {
              this.handleResponse(addMsgToStack, message)
            }
        });

        // @ts-ignore
        this.ws.on('error', (error) => {
            console.error('🚨 Ошибка WebSocket:', error);
        });

        this.ws.on('close', () => {
            console.log('❌ Соединение закрыто');
        });
    }

    handleResponse(addMsgToStack: AddMsgToStackFunc, msg: BybitOrderMessage) {
        if (!msg.data || msg.data.length === 0) {
            console.log('Pusto');
            return;
        }

        const index = msg.data.findIndex(el => el.orderStatus === 'New')

        if(index === -1) {
            console.log('new order not found')
            return;
        }

        const { price, stopLoss, takeProfit, lastPriceOnCreated, symbol, side } = msg.data[index];

        console.log('msg.data[index]', msg.data[index])
        const parsedPrice = Number(price);
        const parsedStopLoss = Number(stopLoss);
        const parsedTakeProfit = Number(takeProfit);
        const parsedLastPrice = Number(lastPriceOnCreated);

        const calculatePercent = (target: number, base: number) =>
            Number((Math.abs((target - base)) / base).toFixed(3)) * 100;

        const parsedMsg: ITgMessage = {
            sl: { percent: calculatePercent(parsedStopLoss, parsedPrice), value: parsedStopLoss },
            entry: parsedPrice,
            positionType: side === "Buy" ? "Long" : "Short",
            risk: undefined,
            tp: { percent: calculatePercent(parsedTakeProfit, parsedPrice), value: parsedTakeProfit },
            priceWhenSignalGenerated: parsedLastPrice,
            leverage: undefined,
            symbol
        };

        addMsgToStack(parsedMsg);
    }

}
