import { createContext, Dispatch, SetStateAction } from 'react';

type DarkModeContext = [boolean, Dispatch<SetStateAction<boolean>>] | null;

const DarkModeContext = createContext<DarkModeContext>(null);

export default DarkModeContext;
