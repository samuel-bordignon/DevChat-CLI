#!/usr/bin/env node

import { createCLI } from "./cli/createCLI.js";

async function main() {
  const program = createCLI();
  program.parse(process.argv);
}

main();
