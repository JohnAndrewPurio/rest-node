import { createContext } from 'react';
import { availableAudioAssetsInterface } from '../../api/RestNode/POST/sendAudioFilesMetadata';

export type AudioAssetsContextType =  availableAudioAssetsInterface | undefined;

const AudioAssetsContext = createContext<AudioAssetsContextType>(undefined);

export default AudioAssetsContext;