#!/usr/bin/env node

import { Command } from "commander";
import { startServer } from "./service/startsServer.js";
import { startClient } from "./service/startClient.js";
import { findRooms } from "./service/findRooms.js";

const program = new Command();

program
    .name("devchat")
    .description("Chat via LAN para devs")
    .version("1.0.0");


// ---------------- HOST COMMAND ----------------
program
    .command("host <roomName>")
    .description("Criar uma sala como servidor")
    .option("-p, --port <number>", "Porta do servidor", "3000")
    .option("-k, --key <string>", "Senha da sala")
    .action((roomName, options) => {
        const port = Number(options.port);
        const key = options.key;
        startServer(port, roomName, key); // 🔥 chama a função
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

// ---------------- FIND ROOMS COMMAND ----------------
program
  .command("find")
  .description("Buscar salas na rede local")
  .action(async () => {
    console.log("🔍 Procurando salas...\n");

    const rooms = await findRooms();

    if (rooms.length === 0) {
      console.log("❌ Nenhuma sala encontrada.");
      return;
    }

    // 🔥 separa por tipo
    const publicRooms = rooms.filter(r => !r.isClose);
    const privateRooms = rooms.filter(r => r.isClose);

    // -------- PUBLICAS --------
    if (publicRooms.length > 0) {
      console.log("🌍 Salas públicas:\n");

      publicRooms.forEach((r, i) => {
        console.log(`  [${i + 1}] ${r.room}`);
      });

      console.log(""); // linha em branco
    }

    // -------- PRIVADAS --------
    if (privateRooms.length > 0) {
      console.log("🔒 Salas privadas:\n");

      privateRooms.forEach((r, i) => {
        console.log(`  [${i + 1}] ${r.room} (senha necessária)`);
      });

      console.log("");
    }

    console.log(`✅ Total: ${rooms.length} salas encontradas.`);
  });
// Executa CLI
program.parse(process.argv);
