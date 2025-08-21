import 'reflect-metadata';
import * as dotenv from "dotenv";
import { Server, Socket } from "socket.io";
import jwt from 'jsonwebtoken'
dotenv.config();

export const initSocketServerInternal = async (server: any) => {
  return new Server(server, {
    cors: {
      origin: process.env.SOCKET_CORS_ORIGINS || 'http://localhost:3000',
    },
  });
};


export const authSocket = async (socket: Socket, next: any) => {
const token = socket.handshake.auth?.token || socket.handshake.headers["authorization"];
if (!token) {
    return next(new Error("Authentication error: missing token"));
  }
  try {
    // verify token
    const payload = jwt.verify(token.replace("Bearer ", ""), process.env.ACCESS_TOKEN_SECRET || "");
    socket.handshake.auth.user = payload;
    next();
  } catch (err) {
    next(new Error("Authentication error: invalid token"));
  }
}