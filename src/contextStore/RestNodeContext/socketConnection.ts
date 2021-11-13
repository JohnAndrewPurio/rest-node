import { createContext } from 'react';

type SocketContext = WebSocket | null;

const SocketContext = createContext<SocketContext>(null);

export default SocketContext;
