import WebSocket from "ws"

export type ClientMessage =
    | { type: "join"; nick: string; key?: string }
    | { type: "message"; content: string }

export type ServerMessage =
    | { type: "system" | "error"; content: string }
    | { type: "message"; nick: string; content: string }

export class User {
    constructor(
        public id: string,
        public nick: string,
        private socket: WebSocket,
    ) { }

    send(data: ServerMessage) {
        this.socket.send(JSON.stringify(data))
    }
}
