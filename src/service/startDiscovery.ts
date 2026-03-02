import dgram from "dgram";

export function startDiscovery(roomName: string, roomtPort: number, roomIsClose: boolean) {
  const udp = dgram.createSocket("udp4");

  udp.on("message", (msg, rinfo) => {
    const text = msg.toString();
    // cliente está procurando salas
    if (text === "DEVCHAT_DISCOVER") {
      const response = JSON.stringify({
        room: roomName,
        port: roomtPort,
        isClose: roomIsClose
      });

      udp.send(response, rinfo.port, rinfo.address);
    }
  });

  udp.bind(4000);
}
