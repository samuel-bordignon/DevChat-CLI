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
        if (nickTaken) throw new Error("Nome de usuário já presente na sala")
        return true
    }

    checkKey(key: string | null = null) {
        if (key !== null && this.key !== key) throw new Error("Senha incorreta")
        return true
    }

    addUser(user: User, key: string | null = null) {
        if (this.checkNick(user.nick) && this.checkKey(key)) {
            this.users.set(user.id, user)
            this.broadcast({ type: "system", content: `${user.nick} entrou na sala` }, { excludeUserId: user.id });
        }
    }

    removeUser(user: User) {
        this.users.delete(user.id);

        this.broadcast({ type: "system", content: `${user.nick} saiu da sala` });
    }

    broadcast(msg: ServerMessage, options: { excludeUserId?: string } = {}) {
        for (const user of this.users.values()) {
            if (options.excludeUserId && user.id === options.excludeUserId) continue
            user.send(msg);
        }

        console.log(
            msg.type === "system" && messageFormatter("SISTEM", msg.content) ||
            msg.type === "message" && messageFormatter(msg.nick, msg.content)
        )

    }
}
