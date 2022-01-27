import { createContext } from 'react';

export interface DownloadQueueContextInterface {
    [key: string]: boolean;
}

const DownloadQueueContext = createContext<DownloadQueueContextInterface>({});

export default DownloadQueueContext;
