import { createContext, Dispatch, SetStateAction } from 'react';

type DarkModeContext = [
    boolean, 
    Dispatch<SetStateAction<boolean>>?
];

const DarkModeContext = createContext<DarkModeContext>([true]);

export default DarkModeContext;
