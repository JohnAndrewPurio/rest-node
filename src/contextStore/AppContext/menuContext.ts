import { createContext, Dispatch, SetStateAction } from 'react';

type MenuContext =
  | [boolean, Dispatch<SetStateAction<boolean>>]
  | [boolean, null];

const MenuContext = createContext<MenuContext>([false, null]);

export default MenuContext;
