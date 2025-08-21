import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;
export const getSocket = (token: string) => {
    if (!socket) {
        socket = io(process.env.NEXT_PUBLIC_SOCKET_SERVER, {
            auth(cb) {
                cb({ token })
            },
            autoConnect: true,
        })
        console.log('connecting socket...',)
    }
    return socket
}