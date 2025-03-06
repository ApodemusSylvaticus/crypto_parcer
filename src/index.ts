import { BybitClientConnector } from "./bybit";
import { ITgMessage } from "../interface";
import { TgClient } from "./tg";
import dotenv from "dotenv";

dotenv.config();

export class MainApp {
    private bybitClient: BybitClientConnector;
    private msgStack: ITgMessage[] = [];
    private tgClient: TgClient;

    constructor() {
        this.tgClient = new TgClient();
        this.bybitClient = new BybitClientConnector(this.addMsgToStack.bind(this));
    }

    private addMsgToStack(msg: ITgMessage): void {
        this.msgStack.push(msg);
        this.tgClient.sendMessageToGroup(msg);
        console.log("msg:", msg);
    }
}

const app = new MainApp();