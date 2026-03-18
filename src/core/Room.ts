import { messageFormatter } from "../utils/messageFormater.js";
import { User, type ServerMessage } from "./User.js";

export class Room {
    constructor(
        public name: string,
        private key: string | null = null,
        private users: Map<string, User> = new Map()
    ) { }

    hasKey() {
        return this.key !== null
    }

    checkNick(nick: string) {
        const nickTaken = [...this.users.values()].some(u => u.nick === nick)
        if (nickTaken) throw new Error("\x1b[31mNome de usuário já presente na sala\x1b[0m")
        return true
    }

    checkKey(key: string | null = null) {
        if (key !== null && this.key !== key) throw new Error("\x1b[31mSenha incorreta\x1b[0m")
        return true
    }

    addUser(user: User, key: string | null = null) {
        if (this.checkNick(user.nick) && this.checkKey(key)) {
            this.users.set(user.id, user)
            this.broadcast({ type: "system", content: `\x1b[33m${user.nick} Entrou na sala\x1b[0m` }, { excludeUserId: user.id });
        }
    }

    removeUser(user: User) {
        this.users.delete(user.id);

        this.broadcast({ type: "system", content: `\x1b[33m${user.nick} Saiu da sala\x1b[0m` });
    }

    broadcast(msg: ServerMessage, options: { excludeUserId?: string } = {}) {
        for (const user of this.users.values()) {
            if (options.excludeUserId && user.id === options.excludeUserId) continue
            user.send(msg);
        }

        if (msg.type === "system") {
            console.log(`\x1b[33mMensagem-Sistema: ${msg.content}\x1b[0m\n`)
        }
        else if (msg.type === "message") {
            console.log(`\x1b[32m${messageFormatter(msg.nick, msg.content)}\x1b[0m`)
        }


    }
}
