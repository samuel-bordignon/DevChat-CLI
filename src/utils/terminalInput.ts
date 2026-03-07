import readline from "readline";

export class TerminalInput {
  private rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  constructor(private nick?: string) { }

  show() {
    if (!this.nick) throw new Error("Nick não definido. Chame setNick() antes.")
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

  setNick(nick: string) {
    this.nick = nick;
  }

  question(text: string): Promise<string> {
    return new Promise((resolve) => {
      this.rl.question(text, (answer) => resolve(answer))
    })
  }
}