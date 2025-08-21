import 'reflect-metadata';

import Container from "typedi";
import { initSocketServerInternal } from "./socket-server";
import { SocketService } from './socket.service';

export const initSocketServer = async (server: any) => {
  const socketSv = await initSocketServerInternal(server);
  Container.get(SocketService).register(socketSv);
};