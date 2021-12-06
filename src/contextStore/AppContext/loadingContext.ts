import { createContext, Dispatch, SetStateAction } from 'react';

type LoadingContext = [
    boolean,
    Dispatch<SetStateAction<boolean>>?
];

const LoadingContext = createContext<LoadingContext>([false]);

export default LoadingContext;
