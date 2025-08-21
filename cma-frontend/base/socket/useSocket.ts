import React, { useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import { SocketStatusEnum } from "../uitls";
import { getSocket } from "./socket";



export function useSocket(token: string) {
  const [client, setClient] = useState<Socket | null>(null);
  const [status, setStatus] = useState<SocketStatusEnum>(SocketStatusEnum.INIT)

  useEffect(() => {
    if (!token) setClient(null)
    const socketInstance = getSocket(token);
    setStatus(SocketStatusEnum.CONNECTING)
    if (!socketInstance.connected) socketInstance.connect();

    setClient(socketInstance);
    console.log('on socket connected:',socketInstance, client);

    socketInstance.on('connect', onSocketConnected)
    socketInstance.on('connect_error', onSocketError)
    socketInstance.on('reconnect_attempt', onSocketReconnecting)
    socketInstance.on('reconnect_fail', onSocketReconnectingFail)
    socketInstance.on('reconnect', onSocketReconnected)
    socketInstance.on('disconnect', onSocketDisconnected)

    return () => {
      socketInstance.off('connect')
      socketInstance.off('connect_error')
      socketInstance.off('reconnect_attempt')
      socketInstance.off('reconnect_fail')
      socketInstance.off('reconnect')
      socketInstance.off('disconnect')
      socketInstance.disconnect()
    }
  }, [token])

  const onSocketConnected = () => {
    setStatus(SocketStatusEnum.CONNECTED)
    console.log('on socket connected:', client);
  }
  const onSocketError = () => {
    setStatus(SocketStatusEnum.ERR)
    console.log('on socket error:', client);
  }
  const onSocketDisconnected = () => {
    setStatus(SocketStatusEnum.DISCONNECTED)
    console.log('on socket disconnect:', client);
  }
  const onSocketReconnecting = () => {
    setStatus(SocketStatusEnum.RECONNECTING)
    console.log('on socket reconnecting:', client);
  }
  const onSocketReconnectingFail = () => {
    setStatus(SocketStatusEnum.RECONNECTING)
    console.log('on socket reconnecting:', client);
  }
  const onSocketReconnected = () => {
    setStatus(SocketStatusEnum.RECONNECTED)
    console.log('on socket reconnected:', client);
  }
  return {socketClient: client, socketStatus: status}

}