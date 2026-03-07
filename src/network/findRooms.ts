import dgram from "dgram";

type RoomInfo = {
  ip: string
  room: string
  port: number
  isClose: boolean
}

export function findRooms(timeout = 1000): Promise<RoomInfo[]> {
  return new Promise((resolve) => {
    const udp = dgram.createSocket("udp4");
    const rooms: RoomInfo[] = [];

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
      } catch (err) {
        console.log(err)
      }
    });

    setTimeout(() => {
      udp.close();
      resolve(rooms);
    }, timeout);
  });
}
