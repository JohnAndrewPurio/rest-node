import { createContext } from 'react';
import { filesListInterface } from '../../api/RestNode/POST/sendAudioFilesMetadata';

export type AudioFilesContextType =  filesListInterface | null;

const AudioFilesContext = createContext<AudioFilesContextType>(null);

export default AudioFilesContext;
