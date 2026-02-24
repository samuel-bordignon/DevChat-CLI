import { User } from "./User.js";

export class Room {
    constructor(
        public name: string,
        private key: string | null = null,
        private users: Map<string, User> = new Map()
    ) { }

    checkKey(key: string | null) {
        if (this.key === null) return true; // sala aberta
        return this.key === key;
    }

    addUser(user: User, key?: string) {
        this.users.set(user.id, user);
        
        this.broadcast("SYSTEM", `${user.nick} entrou na sala`);
    }

    removeUser(user: User) {
        this.users.delete(user.id);

        this.broadcast("SYSTEM", `${user.nick} saiu`);
    }

    broadcast(nick: string, content: string) {
        for (const user of this.users.values()) {
            user.send({ type: 'message', nick, content });
        }
    }
}
