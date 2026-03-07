import { Command } from "commander";
import { startClient } from "../../network/startClient.js";

export const joinCommand = new Command("join")
    .argument("<ip>", "IP do host")
    .description("Entrar em uma sala existente")
    .option("--p, --port <number>", "Porta do servidor")
    .option("--n, --nick <string>", "Nome de usuário")
    .option("--k, --key <string>", "Nome de usuário")
    .action((ip, options) => {
        const port = Number(options.port);
        const url = `ws://${ip}:${port}`;

        startClient(url, options.nick, options.key); // 🔥 chama a função
    });