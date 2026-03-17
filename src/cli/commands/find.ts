import { Command } from "commander";
import { findRooms } from "../../network/findRooms.js";

export const findCommand = new Command("find")
    .description("Buscar salas na rede local")
    .action(async () => {
        console.log("🔍 Procurando salas...\n");

        const rooms = await findRooms();

        if (rooms.length === 0) {
            console.log("\x1b[31m❌ Nenhuma sala encontrada.\x1b[0m");
            return;
        }

        console.log("🌍 Salas encontradas:\n");
        const privateRooms = rooms.filter((r) => r.isClose)
        const publicRooms = rooms.filter((r) => !r.isClose)
        const sortedRooms = [...publicRooms,...privateRooms]
        
        sortedRooms.forEach((r, i) => {
            const type = r.isClose ? "🔒 Privada" : "🌍 Pública";
            console.log(`[${i + 1}] Nome da sala: ${r.room}, Porta: ${r.port} (${type})`);
        });
       
    });