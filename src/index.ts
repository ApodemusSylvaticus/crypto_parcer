import { BybitClientConnector } from './bybit';
import { ITgMessage } from './interface';
import { TgClient } from './tg';
import dotenv from 'dotenv';
import { OkxClientConnector } from './okx';

dotenv.config();

export class MainApp {
    private bybitClient: BybitClientConnector;
    private tgClient: TgClient;
    private okxClient: OkxClientConnector;

    constructor() {
        this.tgClient = new TgClient();
        this.bybitClient = new BybitClientConnector(this.addMsgToStack.bind(this));
        this.okxClient = new OkxClientConnector(this.addMsgToStack.bind(this));
    }

    addMsgToStack(msg: ITgMessage): void {
        this.tgClient.sendMessageToGroup(msg);
    }
}

const app = new MainApp();
