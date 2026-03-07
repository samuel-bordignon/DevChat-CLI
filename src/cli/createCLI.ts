import { Command } from "commander";

import { hostCommand } from "./commands/host.js";
import { joinCommand } from "./commands/join.js";
import { findCommand } from "./commands/find.js";

export function createCLI() {
  const program = new Command();

  program
    .name("devchat")
    .description("DevChat CLI — chat LAN para devs")
    .version("0.1.0");

  // comandos separados
  program.addCommand(hostCommand);
  program.addCommand(joinCommand);
  program.addCommand(findCommand);

  return program;
}
