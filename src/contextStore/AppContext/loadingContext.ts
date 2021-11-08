import { createContext, Dispatch, SetStateAction } from 'react';

type LoadingContext = [Boolean, Dispatch< SetStateAction<Boolean> >] | null

const LoadingContext = createContext<LoadingContext>(null);

export default LoadingContext;