import TelegramBot from 'node-telegram-bot-api';
import { ITgMessage, PositionType } from './interface';

export class TgClient {
    chatId: number ;
    tgBotToken: string;
    bot;

    constructor(polling = false) {

        if ( process.env.TG_BOT_TOKEN === undefined || process.env.TG_CHAT_ID === undefined ) {
            throw new Error('TG_BOT_TOKEN is not set! Check your .env file.');
        }
        this.chatId = Number(process.env.TG_CHAT_ID)
        this.tgBotToken = process.env.TG_BOT_TOKEN
        this.bot = new TelegramBot(this.tgBotToken, { polling });
    }

    sendMessageToGroup = async (message: ITgMessage) => {
            const text = `
📌 ${message.symbol}
📍 Entry Point: ${message.entry}
📈 Position Type: ${message.positionType}
💰 Actual price: ${message.priceWhenSignalGenerated}

━━━━━━━━━━━━━━━━━━
🔴Stop-Loss: ${message.sl.value} (${message.sl.percent}%)
🟢 Take-Profit: ${message.tp.value} (${message.tp.percent}%)
${message.risk ? `💎 Risk: \`${message.risk}\`\n` : ''}${message.leverage ? `⚖️ Leverage: ${message.leverage}` : ''}
`.trim();

        try {
            await this.bot.sendMessage(this.chatId, text);
        } catch (error: any) {
            console.error('Failed to send tg message', error.message);
        }
    };
}