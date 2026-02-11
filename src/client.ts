// chatClient.ts
import WebSocket from "ws";
import { PromptManager } from "./utils/promptManeger.js";
import { messageFormatter } from "./utils/messageFormater.js";

export const startClient = (url: string, nick: string) => {
    const ws = new WebSocket(url);
    const prompt = new PromptManager(nick);

    ws.on("open", () => {
        console.log("✅ Conectado ao DevChat!");
        prompt.show();
    });

    prompt.onLine((line) => {
        ws.send(JSON.stringify({ nick: nick, content: line }));
        prompt.show();
    });

    ws.on("message", (data) => {
        try {
            const msg = JSON.parse(data.toString());

            if (msg.nick === nick) return;

            prompt.clearLine();
            console.log(messageFormatter(msg.nick, msg.content));
            prompt.show();
        } catch {
            console.log("Mensagem inválida recebida");
        }
    });

}