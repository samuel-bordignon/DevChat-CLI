import WebSocket from "ws"
import { TerminalInput } from "../utils/terminalInput.js"
import { messageFormatter } from "../utils/messageFormater.js"

export const startClient = async (url: string) => {
    const terminal = new TerminalInput("")

    const nick = await terminal.question("Digite seu nick: ")
    terminal.setNick(nick)

    const key = await terminal.question("Digite a chave de acesso: ")
    terminal.setNick(nick)

    const ws = new WebSocket(url)

    ws.on("open", () => {
        ws.send(JSON.stringify({ type: "join", nick: nick, key: key }))
        console.log("✅ Conectado ao DevChat! ✅")
        terminal.show()
    })

    terminal.onLine((line) => {
        ws.send(JSON.stringify({ type: "message", nick, content: line }))
        terminal.show()
    })

    ws.on("message", (data) => {
        try {
            const msg = JSON.parse(data.toString())

            if (msg.nick === nick) return

            terminal.clearLine()
            if (msg.type === "message") console.log(messageFormatter(msg.nick, msg.content))
            terminal.show()
        } catch {
            console.log("Mensagem inválida recebida")
        }
    })

    ws.on("close", () => {
        console.log("❌ Sala encerrada ❌")
    })

}