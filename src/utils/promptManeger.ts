import readline from "readline";

export class PromptManager {
  private rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  constructor(private nick: string) {}

  show() {
    this.rl.setPrompt(`[${this.nick}]: `);
    this.rl.prompt();
  }

  onLine(handler: (line: string) => void) {
    this.rl.on("line", handler);
  }

  clearLine() {
    process.stdout.clearLine(0);
    process.stdout.cursorTo(0);
  }
}