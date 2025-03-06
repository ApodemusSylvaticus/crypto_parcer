import Binance from 'binance-api-node';
import dotenv from 'dotenv';
import fs from 'fs';
dotenv.config();

// Создаём Binance-клиент
const client = Binance({
    apiKey: process.env.BINANCE_API_KEY,
    apiSecret: process.env.BINANCE_API_SECRET,
});


export type PositionType = 'Long' | 'Short';

export interface ITgMessage {
    symbol: string;
    entry: number;
    sl: {
        percent: number;
        value: number;
    };
    tp: {
        percent: number;
        value: number;
    };
    priceWhenSignalGenerated: number;
    risk?: number;
    leverage?: number;
    positionType: PositionType;
}

class BinanceUserStream {
    constructor() {
        this.startWebSocket();
    }

    // 📌 Получаем позиции по фьючерсам
    async getFuturesPosition(symbol: string) {
        try {
            const accountInfo = await client.futuresAccountInfo();
            console.log('---------------------------------');
            console.log('accountInfo', accountInfo);
            const position = accountInfo.positions.find(p => p.symbol === symbol);

            if (!position || parseFloat(position.positionAmt) === 0) return null;

            console.log('--------------------------------');
            console.log('position', position)
            /*return {
                symbol: position.symbol,
                entry: parseFloat(position.entryPrice),
                sl: parseFloat(position.stopLossPrice) || 0,
                tp: parseFloat(position.takeProfitPrice) || 0,
                leverage: parseInt(position.leverage, 10),
                positionType: parseFloat(position.positionAmt) > 0 ? 'Long' : 'Short',
            };*/
        } catch (error) {
            console.error('Error getting futures position:', error);
            return null;
        }
    }

    // 📌 Обрабатываем обновление ордеров
    // @ts-ignore
    async parseOrderUpdate(order: any): Promise<ITgMessage | null> {
        if (!order) return null;


        const positionType: PositionType = order.side === 'BUY' ? 'Long' : 'Short';
        const entryPrice = parseFloat(order.price);
        const currentPrice = parseFloat(order.avgFillPrice) || entryPrice;

        const positionInfo = await this.getFuturesPosition(order.symbol);
        if (!positionInfo) return null;

       /* return {
            symbol: order.symbol,
            entry: entryPrice,
            sl: {
                percent: positionInfo.sl ? ((entryPrice - positionInfo.sl) / entryPrice) * 100 : 0,
                value: positionInfo.sl
            },
            tp: {
                percent: positionInfo.tp ? ((positionInfo.tp - entryPrice) / entryPrice) * 100 : 0,
                value: positionInfo.tp
            },
            priceWhenSignalGenerated: currentPrice,
            leverage: positionInfo.leverage,
            positionType
        };*/
    }

    // 📌 Запускаем WebSocket для ордеров
     startWebSocket() {
        client.ws.futuresUser((data) => {
            console.log('New Order Update:', data);


        })

         setTimeout(() => {
             client.futuresAccountInfo().then((res) => {
                 const filePath = './futures_account_info.json';
                 fs.writeFileSync(filePath, JSON.stringify(res, null, 2));
                 console.log(`Данные сохранены в файл: ${filePath}`);
             })
             client.futuresOpenOrders({symbol: 'BTCUSDT'}).then(r => {
                 const filePath = './futuresOpenOrders.json';
                 fs.writeFileSync(filePath, JSON.stringify(r, null, 2));
             })
             client.futuresPositionRisk({symbol:'BTCUSDT'}).then(r => {
                 const filePath = './futures_positionRisk.json';
                 fs.writeFileSync(filePath, JSON.stringify(r, null, 2));
             })
             client.futuresAllOrders({symbol: 'BTCUSDT'}).then(r => {
                 const filePath = './futuresAllOrders.json';
                 fs.writeFileSync(filePath, JSON.stringify(r, null, 2));
             })
             client.futuresBook({symbol: 'BTCUSDT'}).then(r => {
                 const filePath = './futuresBook.json';
                 fs.writeFileSync(filePath, JSON.stringify(r, null, 2));
             })
         }, 10000)
/*
        client.ws.futuresUser((data) => {
            console.log('New Order Update:', data);
            this.parseOrderUpdate(data).then(parsedMessage => {
                if (parsedMessage) {
                    console.log('Parsed Trade Signal:', parsedMessage);
                    // Здесь можно отправлять в Telegram или обрабатывать дальше
                }
            });

        });
*/

        console.log('WebSocket started');
    }
}

// Запускаем WebSocket Binance
const userStream = new BinanceUserStream();






/*

import {Nullable} from "../interface";
import WebSocket from 'ws';
import axios from 'axios';
import dotenv from "dotenv";
dotenv.config();


class BinanceUserStream {
    private apiKey: any;
    private baseUrl: string;
    private wsBaseUrl: string;
    private listenKey: Nullable<string>;
    private ws: Nullable<WebSocket>;
    constructor() {
        this.apiKey = process.env.BINANCE_API_KEY;
        this.baseUrl = 'https://api.binance.com';
        this.wsBaseUrl = 'wss://stream.binance.com:9443/ws/';
        this.listenKey = null;
        this.ws = null;
    }


    async getListenKey() {
        try {
            //${this.baseUrl}/api/v3/userDataStream
            const response = await axios.post(`https://fapi.binance.com/fapi/v1/listenKey`, null, {
                headers: { 'X-MBX-APIKEY': this.apiKey }
            });
            this.listenKey = response.data.listenKey;
            console.log(`Received listenKey: ${this.listenKey}`);
        } catch (error: any) {
            console.error('Error getting listenKey:', error.response ? error.response.data : error.message);
        }
    }

    async keepAliveListenKey() {
        try {
            await axios.put(`${this.baseUrl}/api/v3/userDataStream`, {}, {
                headers: { 'X-MBX-APIKEY': this.apiKey }
            });
            console.log('ListenKey extended');
        } catch (error: any) {
            console.error('Error keeping listenKey alive:', error.response ? error.response.data : error.message);
        }
    }

    startWebSocket() {
        if (!this.listenKey) {
            console.error('ListenKey is not set. Cannot start WebSocket.');
            return;
        }

/!*
        this.ws = new WebSocket(`${this.wsBaseUrl}${this.listenKey}`);
*!/
        this.ws = new WebSocket(`wss://fstream.binance.com/ws/${this.listenKey}`);

        this.ws.on('open', () => {
            console.log('WebSocket connected');
        });

        this.ws.on('message', (data: any) => {
            const message = JSON.parse(data);
            console.log('New Order Update:', message);
            const order = message.o;

            const positionInfo =  this.getPositionInfo(order.s);
positionInfo.then(e => {
    console.log('--------------------------------------------');
    console.log('positionInfo:', e);
});

            if (message.e === 'executionReport') {
                console.log('New Order Update:', message);
            }
        });

        this.ws.on('close', () => {
            console.log('WebSocket closed. Reconnecting...');
            setTimeout(() => this.startWebSocket(), 5000);
        });

        this.ws.on('error', (error) => {
            console.error('WebSocket error:', error);
        });
    }

    async initialize() {
        await this.getListenKey();
        this.startWebSocket();
        setInterval(() => this.keepAliveListenKey(), 30 * 60 * 1000); // Продление listenKey каждые 30 минут
    }

    async getPositionInfo(symbol: string) {
        try {
            const response = await axios.get(`https://fapi.binance.com/fapi/v2/positionRisk`, {
                headers: { 'X-MBX-APIKEY': this.apiKey }
            });

            console.log('--------------------------------------------------');
            console.log(response.data);
            const position = response.data.find((p: any) => p.symbol === symbol);
            if (!position) return null;

            return {
                sl: parseFloat(position.stopLossPrice) || 0,
                tp: parseFloat(position.takeProfitPrice) || 0,
                leverage: parseInt(position.leverage, 10) || undefined
            };
        } catch (error: any) {
            console.error('Error getting position info:', error.response ? error.response.data : error.message);
            return null;
        }
    }
}

const userStream = new BinanceUserStream();
userStream.initialize();

*/
