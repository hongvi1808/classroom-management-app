import 'reflect-metadata';
import Container, { Inject, Service } from "typedi";
import * as dotenv from "dotenv";
import http from "http";
import { Socket, Server } from "socket.io";
import { RealtimeDBService } from '../firebase/realtime.service';
import { authSocket } from './socket-server';
dotenv.config();

@Service({ multiple: true, global: true })
export class SocketService {
    private socketServer: Server | null = null;
    private firebaseService: RealtimeDBService
        constructor() {
            this.firebaseService = Container.get(RealtimeDBService)
        }
    public register (socketServer: Server) {
        this.socketServer = socketServer;
        // check auth
        this.socketServer.use(authSocket)
        this.socketServer.on('connection', (socket) => {
            if (socket.handshake?.auth?.user) {
                const room = `cma/${socket.handshake?.auth?.user.phoneNumber}`;
                socket.join(room)
                socket.to(room).emit('CONNECTED');
                console.log("Client connected:", socket.id, "join:", room);
                // this.firebaseService.subcriber('messages', (data) => {
                //     this.emitMessage(socket.handshake?.auth?.user.phoneNumber, 'chating', data)
                // })
            }
            socket.on('disconnect', (reason) => console.log(`SOCKET_CONN_DISCONNECTED reason: ${reason} `))
        })
    }
    emitMessage(userId: string, channel: string, payload: any) {
        this.socketServer?.to(`cma/${userId}`).emit(channel, payload)
    }
}