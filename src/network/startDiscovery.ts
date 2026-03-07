import dgram from "dgram"
import type { Room } from "../core/Room.js"

export function startDiscovery(room: Room, roomPort: number, roomIsClose: boolean) {
  const udp = dgram.createSocket({ type: "udp4", reuseAddr: true })

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

  udp.on("error", (err: NodeJS.ErrnoException) => {
    if (err.code === "EADDRINUSE") {
      console.log(`❌ Porta UDP ${4000} já está em uso. O discovery não será iniciado.`)
      return
    }
    console.log(`❌ Erro no discovery: ${err.message}`)

    udp.close()
  })

  udp.bind(4000)
}
