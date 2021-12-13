import { createContext, Dispatch, SetStateAction } from 'react';
import { wifiInfo } from './types';

type WifiListContextType = [
    wifiInfo[],
    Dispatch<
        SetStateAction<wifiInfo[]>
    >?
];

const WifiListContext = createContext<WifiListContextType>([[]]);

export default WifiListContext;
