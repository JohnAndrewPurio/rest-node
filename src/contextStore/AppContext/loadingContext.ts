import { createContext, Dispatch, SetStateAction } from 'react';

type LoadingContextType = [boolean, Dispatch<SetStateAction<boolean>>?];

const LoadingContext = createContext<LoadingContextType>([false]);

export default LoadingContext;
