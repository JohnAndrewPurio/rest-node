import { Storage } from '@capacitor/storage';
import axios from 'axios';
import { BASE_URL, storage } from './constants';
import { RestNodeStateType } from '../types';

export type initializeWebsocketConnectionType = (url: string, protocol?: string) => WebSocket

export const initializeWebsocketConnection: initializeWebsocketConnectionType = (url, protocol = "wss") => {
  const socket_endpoint = `${protocol}://${url}/restnode`;
  const socket = new WebSocket(socket_endpoint);

  const socketOnOpen = (event: Event) => {
    console.log('Websocket Started:', event);
  }

  const socketOnClose = (event: Event) => {
    console.log('Websocket Ended:', event)
  }

  const socketOnError = (event: Event) => {
    console.log('Websocket Error:', event)
  }

  const socketOnMessage = (event: Event) => {
    console.log('Websocket Message:', event)
  }

  socket.addEventListener('open', socketOnOpen);
  socket.addEventListener('close', socketOnClose)
  socket.addEventListener('error', socketOnError)
  socket.addEventListener('message', socketOnMessage)

  return socket
}

type closeWebsocketConnectionType = (socket: WebSocket) => void

export const closeWebsocketConnection: closeWebsocketConnectionType = (socket) => {
  socket.close()
}

export type getLastValuesType = (url: string, protocol?: string) => Promise<RestNodeStateType>

export const getLastValues: getLastValuesType = async (url = BASE_URL, protocol = "https") => {
  const bedtimeURL = `${protocol}://${url}/restnode/event/bedtime`;
  const waketimeURL = `${protocol}://${url}/restnode/event/waketime`;

  const bedtimeResponse = await axios.get(bedtimeURL);
  const waketimeResponse = await axios.get(waketimeURL);
  console.log('service', bedtimeResponse.data)
  const bedtime = bedtimeResponse.data;
  const waketime = waketimeResponse.data;

  await Storage.set({
    key: storage.RED_NODE_STATES,
    value: JSON.stringify({ bedtime, waketime }),
  });

  return { bedtime, waketime };
}

export type updateValuesType = (url: string, protocol: string, data: RestNodeStateType) => Promise<RestNodeStateType>

export const updateValues: updateValuesType = async (url, protocol, data) => {
  console.log('update', data);
  const URL = `${protocol}://${url}/restnode/event`;

  await axios.post(URL, data.bedtime);
  await axios.post(URL, data.waketime);
  await Storage.set({
    key: storage.RED_NODE_STATES,
    value: JSON.stringify(data),
  });

  return data;
}

export type sendSocketEventType = (socket: WebSocket, data: RestNodeStateType) => Promise<RestNodeStateType>

export const sendSocketEvent: sendSocketEventType = async (socket, data) => {
  const strData = JSON.stringify(data)

  socket.send(strData);

  await Storage.set({
    key: storage.RED_NODE_STATES,
    value: strData,
  });

  return data;
}
