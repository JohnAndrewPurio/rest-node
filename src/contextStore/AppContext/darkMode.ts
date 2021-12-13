import { createContext, Dispatch, SetStateAction } from 'react';

type DarkModeContextType = [
    boolean, 
    Dispatch<SetStateAction<boolean>>?
];

const DarkModeContext = createContext<DarkModeContextType>([true]);

export default DarkModeContext;
