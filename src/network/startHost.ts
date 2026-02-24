import { WebSocketServer } from "ws"
import { randomUUID } from "crypto"
import { User } from "../core/User.js"
import { getLocalIP } from "../utils/network.js"
import { startDiscovery } from "./startDiscovery.js"
import { Room } from "../core/Room.js"

export function startHost(roomName: string, port: number, key?: string) {
    console.log(`\n✅ Criando sala "${roomName}" na porta ${port}\n`)
    console.log(`🌍 Sala aberta em ws://localhost:${port}`)
    console.log(`➡️ Outros entram com: devchat join ${getLocalIP()} ${port}\n`)

    const room = new Room(roomName, key)
    const wss = new WebSocketServer({ port })
    startDiscovery(room, port, key != undefined)

    // Quando alguém conecta
    wss.on("connection", (socket) => {
        // cria User no Core
        const user = new User(randomUUID(), "anon", socket)
        // mensagens recebidas
        socket.on("message", (data) => {
            try {
                const msg = JSON.parse(data.toString())
                if (msg.type === "join") {
                    user.nick = msg.nick
                    room.addUser(user, msg.key)
                }
                if (msg.type === "message") {
                    room.broadcast(msg.nick, msg.content)
                }
            } catch (err) {
                console.log(err)
            }
        })

        socket.on("close", () => {
            console.log("❌ Cliente desconectou")
        })
    })
}
