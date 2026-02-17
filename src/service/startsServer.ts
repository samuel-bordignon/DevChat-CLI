import { WebSocketServer } from "ws";
import { getLocalIP } from "../utils/network.js";
import { PromptManager } from "../utils/promptManeger.js";
import { messageFormatter } from "../utils/messageFormater.js";
import { startDiscovery } from "./startDiscovery.js";

export function startServer(port: number, roomName: string, key: string) {
    const wss = new WebSocketServer({
        port,
        host: "0.0.0.0",
    });
    const hostNick = "HOST 👑"
    const prompt = new PromptManager(hostNick)
    const ip = getLocalIP();

    console.log("\n✅ DevChat Host iniciado!");
    console.log(`📡 IP da sala: ${ip}`);
    console.log(`🔌 Porta: ${port}`);
    // console.log(`🔑 Chave de acesso: ${key}`);
    console.log(`➡️ Outros entram com: devchat join ${ip} --port ${port}\n`);

    // ---------------- BROADCAST ----------------
    function broadcast(msg: any, sender?: any) {
        for (const client of wss.clients) {
            if (client.readyState === client.OPEN && client !== sender) {
                client.send(JSON.stringify(msg));
            }
        }
    }
    //---------------- DISCOVERY LAN ----------------
    startDiscovery(roomName, port, key != null)
    // ---------------- HOST INPUT ----------------
    prompt.onLine((line) => {
        prompt.show();
        const msg = { hostNick, content: line };
        broadcast(msg);
    });

    prompt.show();
    // ---------------- CLIENT CONNECTION ----------------
    wss.on("connection", (ws) => {
        console.log("👤 Novo cliente conectado!");
        ws.on("message", (data) => {
            const msg = JSON.parse(data.toString());

            prompt.clearLine();
            console.log(messageFormatter(msg.nick, msg.content));

            broadcast(msg, ws);
            prompt.show();
        });

        ws.on("close", () => {
            console.log("❌ Cliente saiu");
        });
    });
}
