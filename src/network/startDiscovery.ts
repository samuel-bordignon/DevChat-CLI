import dgram from "dgram"
import type { Room } from "../core/Room.js"

export function startDiscovery(room: Room, roomPort:number, roomIsClose: boolean) {
  const udp = dgram.createSocket("udp4")

  udp.on("message", (msg, rinfo) => {
    const text = msg.toString()
    // cliente está procurando salas
    if (text === "DEVCHAT_DISCOVER") {
      const response = JSON.stringify({
        room: room.name,
        port: roomPort,
        isClose: roomIsClose
      })

      udp.send(response, rinfo.port, rinfo.address)
    }
  })

  udp.bind(4000)
}
