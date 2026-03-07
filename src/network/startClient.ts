import WebSocket from "ws"
import { TerminalInput } from "../utils/terminalInput.js"
import { messageFormatter } from "../utils/messageFormater.js"

export const startClient = async (url: string, nick: string, key?: string) => {
    const terminal = new TerminalInput(nick)
    const ws = new WebSocket(url)

    ws.on("open", () => {
        ws.send(JSON.stringify({ type: "join", nick, key }))
    })

    terminal.onLine((line) => {
        ws.send(JSON.stringify({ type: "message", nick, content: line }))
        terminal.show()
    })

    ws.on("message", (data) => {
        try {
            const msg = JSON.parse(data.toString())

            if (msg.type === "error") {
                console.log(`\n❌ ${msg.content}`)
                ws.close()
                process.exit(1)
            }

            if (msg.type === "join_ok") {
                console.log("✅ Conectado ao DevChat! ✅")
                terminal.show()
                return
            }

            if (msg.type === "message") {
                if (msg.nick === nick) return
                terminal.clearLine()
                console.log(messageFormatter(msg.nick, msg.content))
                terminal.show()
            }

            if (msg.type === "system") {
                terminal.clearLine()
                console.log(messageFormatter("SYSTEM", msg.content))
                terminal.show()
            }
        } catch {
            console.log("Mensagem inválida recebida")
        }
    })

    ws.on("close", () => {
        terminal.clearLine()
        console.log("❌ Sala encerrada ❌")
        process.exit(1)
    })

}