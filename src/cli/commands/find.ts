import { Command } from "commander";
import { findRooms } from "../../network/findRooms.js";

export const findCommand = new Command("find")
    .description("Buscar salas na rede local")
    .action(async () => {
        process.stdout.write("\x1b[33m🔍 Procurando salas.");
        let dots = 0;

        const interval = setInterval(() => {
            process.stdout.write(".");
            dots++;

            if (dots === 3) {
                clearInterval(interval);
                process.stdout.write("\r\x1b[K");
            }

        }, 550);

        const rooms = await findRooms();

        if (rooms.length === 0) {
            console.log("\n \x1b[31m❌ Nenhuma sala encontrada. ❌\x1b[0m");
            return;
        }

        console.log("\x1b[0m\n\x1b[36m🌍 Salas encontradas:");
        const privateRooms = rooms.filter((r) => r.isClose)
        const publicRooms = rooms.filter((r) => !r.isClose)
        const sortedRooms = [...publicRooms, ...privateRooms]

        sortedRooms.forEach((r, i) => {
            const type = r.isClose ? "🔒 Privada" : "🌍 Pública";
            console.log(`[${i + 1}] Nome da sala: ${r.room}, Porta: ${r.port} (${type})\x1b[0m`);
        });

        console.log("\x1b[0m\x1b[32m✅ Busca concluída! ✅\x1b[0m");
    });