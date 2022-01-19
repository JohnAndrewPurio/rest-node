import { Storage } from '@capacitor/storage';
import axios from 'axios';
import { BASE_URL, storage } from './constants';
import { RestNodeStateType } from '../types';
import { storageSet } from '../api/CapacitorStorage';
import { REST_NODE_STATES_KEY } from '../api/CapacitorStorage/keys';

export interface websocketMessageResponse {
  type: string;
  topic: string;
  [key: string]: string;
}

export interface audioFinishedDownloadingResponseInterface {
  type: string;
  message: string;
  name: string;
  fullPath: string;
  source: string;
}

export type socketEventHandlerType = (event: Event) => void;
export type socketMessageHandlerType = (event: MessageEvent<any>) => void;

export type initializeWebsocketConnectionType = (
  url: string,
  protocol: string,
  socketOnOpen: socketEventHandlerType,
  socketOnClose: socketEventHandlerType,
  socketOnError: socketEventHandlerType,
  socketOnMessage: socketMessageHandlerType
) => WebSocket;

export const initializeWebsocketConnection: initializeWebsocketConnectionType =
  (
    url,
    protocol,
    socketOnOpen,
    socketOnClose,
    socketOnError,
    socketOnMessage
  ) => {
    const socket_endpoint = `${protocol}://${url}/restnode`;
    const socket = new WebSocket(socket_endpoint);

    socket.addEventListener('open', socketOnOpen);
    socket.addEventListener('close', socketOnClose);
    socket.addEventListener('error', socketOnError);
    socket.addEventListener('message', socketOnMessage);

    return socket;
  };

type closeWebsocketConnectionType = (socket: WebSocket) => void;

export const closeWebsocketConnection: closeWebsocketConnectionType = (
  socket
) => {
  socket.close();
};

export type sendSocketEventType = (
  socket: WebSocket,
  data: RestNodeStateType
) => Promise<RestNodeStateType>;

export const sendSocketEvent: sendSocketEventType = async (socket, data) => {
  const strData = JSON.stringify(data);

  socket.send(strData);

  await storageSet(data, REST_NODE_STATES_KEY);

  return data;
};
