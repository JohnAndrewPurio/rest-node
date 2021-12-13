import { createContext } from 'react';

type SocketContextType = WebSocket | null;

const SocketContext = createContext<SocketContextType>(null);

export default SocketContext;
