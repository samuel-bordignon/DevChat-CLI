#!/usr/bin/env node

import { Command } from "commander";
import { startServer } from "./server.js";
import { startClient } from "./client.js";
import { stringify } from "querystring";

const program = new Command();

program
    .name("devchat")
    .description("Chat via LAN para devs")
    .version("1.0.0");


// ---------------- HOST COMMAND ----------------
program
    .command("host")
    .description("Criar uma sala como servidor")
    .option("-p, --port <number>", "Porta do servidor", "3000")
    .action((options) => {
        const port = Number(options.port);
        startServer(port); // 🔥 chama a função
    });


// ---------------- JOIN COMMAND ----------------
program
    .command("join <ip>")
    .description("Entrar em uma sala existente")
    .option("-p, --port <number>", "Porta do servidor", "3000")
    .option("-n, --nick <string>", "Nome de usuario", "anon")
    .action((ip, options) => {
        const port = Number(options.port);
        const nick = options.nick;
        const url = `ws://${ip}:${port}`;

        startClient(url, nick); // 🔥 chama a função
    });


// Executa CLI
program.parse(process.argv);
