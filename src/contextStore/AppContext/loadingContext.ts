import { createContext, Dispatch, SetStateAction } from 'react';

type LoadingContext = [boolean, Dispatch<SetStateAction<boolean>>] | null;

const LoadingContext = createContext<LoadingContext>(null);

export default LoadingContext;
