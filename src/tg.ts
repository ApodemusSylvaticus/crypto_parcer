import TelegramBot from 'node-telegram-bot-api';
import {ITgMessage, PositionType} from "../interface";


export class TgClient {
    #CHAT_ID = Number(process.env.TG_CHAT_ID);
    #TG_BOT_TOKEN = process.env.TG_BOT_TOKEN;
    bot;

    constructor(polling = false) {
        if (!this.#TG_BOT_TOKEN) {
            throw new Error("❌ TG_BOT_TOKEN не задан! Проверьте .env файл.");
        }
        this.bot = new TelegramBot(this.#TG_BOT_TOKEN, { polling });
    }

    sendMessageToGroup = async (message: ITgMessage) => {
        if (!message) {
            console.warn("⚠️ Пустое сообщение не отправлено.");
            return;
        }

        const text = `
 *Пара:* \`${message.symbol}\`  
 *Точка входа:* \`${message.entry}\`  
 *Стоп-лосс:* \`${message.sl.value}\` (_${message.sl.percent}%_)  
 *Тейк-профит:* \`${message.tp.value}\` (_${message.tp.percent}%_)  
 *Цена при генерации:* \`${message.priceWhenSignalGenerated}\`  
 *Тип позиции:* \`${message.positionType}\`  
${message.risk ? ` *Риск:* \`${message.risk}\`\n` : ''}${message.leverage ? `*Кредитное плечо:* \`${message.leverage}\`\n` : ''}
    `.trim();


        try {
            await this.bot.sendMessage(this.#CHAT_ID, text);
            console.log("✅ Сообщение отправлено:", text);
        } catch (error: any) {
            console.error("❌ Ошибка отправки:", error.message);
        }
    };
}