import dgram from "dgram";

export function findRooms(timeout = 1000): Promise<any[]> {
  return new Promise((resolve) => {
    const udp = dgram.createSocket("udp4");
    const rooms: any[] = [];

    udp.bind(() => {
      udp.setBroadcast(true);

      // manda broadcast
      udp.send(
        "DEVCHAT_DISCOVER",
        4000,
        "255.255.255.255"
      );
    });

    udp.on("message", (data, rinfo) => {
      try {
        const msg = JSON.parse(data.toString());

        rooms.push({
          ip: rinfo.address,
          room: msg.room,
          port: msg.port,
          isClose: msg.isClose
        });
      } catch {}
    });

    setTimeout(() => {
      udp.close();
      resolve(rooms);
    }, timeout);
  });
}
