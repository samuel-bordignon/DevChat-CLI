import WebSocket from "ws"
import type { ClientMessage } from "../core/User.js"

export function waitForMessage(ws: WebSocket): Promise<ClientMessage> {
    return new Promise((resolve) => {
        ws.once("message", (data) => {
            resolve(JSON.parse(data.toString()))
        })
    })
}