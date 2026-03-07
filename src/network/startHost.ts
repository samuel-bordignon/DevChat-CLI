import { Room } from "../core/Room.js"
import { User } from "../core/User.js"
import { randomUUID } from "crypto"
import { WebSocketServer } from "ws"
import { getLocalIP } from "../utils/network.js"
import { startDiscovery } from "./startDiscovery.js"

export function startHost(roomName: string, port: number, key?: string) {
    const room = new Room(roomName, key)
    const wss = new WebSocketServer({ port })

    startDiscovery(room, port, key != undefined)

    //tratamento de erros
    wss.on("error", (err: NodeJS.ErrnoException) => {
        if (err.message.includes("EADDRINUSE")) {
            console.log(`\n❌ A porta ${port} já está em uso. Escolha outra porta com --port <numero>.`)
            return
        }
        console.log(`\n❌ Erro no servidor: ${err.message}`)

        process.exit(1)
    })

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
                    room.broadcast({ type: "message", nick: user.nick, content: msg.content })
                }
            } catch (err) {
                console.log(err)
            }
        })

        socket.on("close", () => {
            room.broadcast({ type: "system", content: `${user.nick} saiu da sala` })
        })
    })

    console.log(`\n✅ Criando sala "${roomName}" na porta ${port}\n`)
    console.log(`🌍 Sala aberta em ws://localhost:${port}`)
    console.log(`➡️ Outros entram com: devchat join ${getLocalIP()} --port ${port} --nick<nome> --key <chave>\n`)
}
