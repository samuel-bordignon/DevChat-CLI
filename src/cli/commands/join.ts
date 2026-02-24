import { Command } from "commander";
import { startClient } from "../../network/startClient.js";

export const joinCommand = new Command("join")
    .argument("<ip>", "IP do host")
    .description("Entrar em uma sala existente")
    .option("-p, --port <number>", "Porta do servidor", "3000")
    .action((ip, options) => {
        const port = Number(options.port);
        const url = `ws://${ip}:${port}`;

        startClient(url); // 🔥 chama a função
    });