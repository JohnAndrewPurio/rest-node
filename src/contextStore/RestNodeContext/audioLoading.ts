import { createContext } from 'react';

export type AudioLoadingContextType =  boolean;

const AudioLoadingContext = createContext<AudioLoadingContextType>(false);

export default AudioLoadingContext;