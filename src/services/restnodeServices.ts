import { Storage } from '@capacitor/storage';
import axios from 'axios';
import { BASE_URL, storage } from './constants';
import { RestNodeStateType } from '../types';

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

export type getLastValuesType = (
  url: string,
  protocol?: string
) => Promise<RestNodeStateType>;

export const getLastValues: getLastValuesType = async (
  url = BASE_URL,
  protocol = 'https'
) => {
  const bedtimeURL = `${protocol}://${url}/restnode/event/bedtime`;
  const waketimeURL = `${protocol}://${url}/restnode/event/waketime`;

  const bedtimeResponse = await axios.get(bedtimeURL);
  const waketimeResponse = await axios.get(waketimeURL);
  const bedtime = bedtimeResponse.data;
  const waketime = waketimeResponse.data;

  await Storage.set({
    key: storage.RED_NODE_STATES,
    value: JSON.stringify({ bedtime, waketime }),
  });

  return { bedtime, waketime };
};

export type updateValuesType = (
  url: string,
  protocol: string,
  data: RestNodeStateType
) => Promise<RestNodeStateType>;

export const updateValues: updateValuesType = async (url, protocol, data) => {
  const URL = `${protocol}://${url}/restnode/event`;

  await axios.post(URL, data.bedtime);
  await axios.post(URL, data.waketime);
  await Storage.set({
    key: storage.RED_NODE_STATES,
    value: JSON.stringify(data),
  });

  return data;
};

export type sendSocketEventType = (
  socket: WebSocket,
  data: RestNodeStateType
) => Promise<RestNodeStateType>;

export const sendSocketEvent: sendSocketEventType = async (socket, data) => {
  const strData = JSON.stringify(data);

  socket.send(strData);

  await Storage.set({
    key: storage.RED_NODE_STATES,
    value: strData,
  });

  return data;
};
