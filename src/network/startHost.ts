import { Room } from "../core/Room.js"
import { User } from "../core/User.js"
import { randomUUID } from "crypto"
import { WebSocketServer } from "ws"
import { getLocalIP } from "../utils/network.js"
import { startDiscovery } from "./startDiscovery.js"
import { waitForMessage } from "../utils/waitForMessage.js"

export function startHost(roomName: string, port: number, key?: string) {
    const room = new Room(roomName, key)
    const wss = new WebSocketServer({ port })

    startDiscovery(room, port, key != undefined)

    //tratamento de erros
    wss.on("error", (err: NodeJS.ErrnoException) => {
        if (err.message.includes("EADDRINUSE")) {
            console.log(`\n\x1b[31m❌ A porta ${port} já está em uso. Escolha outra porta com --port <numero>.\x1b[0m`)
            return
        }
        console.log(`\n\x1b[31m❌ Erro no servidor: ${err.message}\x1b[0m`)

        process.exit(1)
    })

    // Quando alguém conecta
    wss.on("connection", async (socket) => {
        const user = new User(randomUUID(), "anon", socket)

        // ── FASE 1: HANDSHAKE ──
        try {
            const res = await waitForMessage(socket)

            if (res.type === "join") {
                user.nick = res.nick
                room.addUser(user, res.key ?? null)
            }

            socket.send(JSON.stringify({ type: "join_ok" }))
        } catch (err) {
            socket.send(JSON.stringify({ type: "error", content: (err as Error).message }))
            socket.close()
            return
        }
        // ── FASE 2: CHAT ──
        socket.on("message", (data) => {
            try {
                const msg = JSON.parse(data.toString())
                room.broadcast({ type: "message", nick: user.nick, content: msg.content })
            } catch {
                socket.send(JSON.stringify({ type: "error", content: "Mensagem inválida" }))
            }
        })
    })

    console.log(`\n\x1b[33m✅ Criando sala "${roomName}" na porta ${port}\x1b[0m`)
    console.log(`\x1b[36m🌍 Sala aberta em ws://localhost:${port}`)
    console.log(`➡️  Outros entram com: devchat join ${getLocalIP()} --port ${port} --nick <nome> --key <chave>\n\x1b[0m`)
}
