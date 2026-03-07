import { Command } from "commander"
import { startHost } from "../../network/startHost.js"

export const hostCommand = new Command("host")
    .argument("<room>", "nome da sala")
    .description("Criar uma sala como servidor")
    .option("--p, --port <number>", "Porta do servidor", "3000")
    .option("--k, --key <string>", "Senha da sala")
    .action((roomName, options) => {
        const port = Number(options.port)
        const key = options.key
        startHost(roomName, port, key)
    })

