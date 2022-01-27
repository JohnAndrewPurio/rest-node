import { createContext, Dispatch, SetStateAction } from 'react';

type MenuContextType =
    | [boolean, Dispatch<SetStateAction<boolean>>]
    | [boolean, null];

const MenuContext = createContext<MenuContextType>([false, null]);

export default MenuContext;
