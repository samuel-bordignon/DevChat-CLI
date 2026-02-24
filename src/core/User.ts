import WebSocket from "ws"

export type Message = {
    type: "join"
    nick: string
    key: string
} | {
    type: "message"
    content: string
    nick: string
}

export class User {
    constructor(
        public id: string,
        public nick: string,
        private socket: WebSocket,
    ) { }

    send(data: Message) {
        this.socket.send(JSON.stringify(data))
    }
}
