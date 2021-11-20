import { createContext } from 'react';

interface AudioPlayerContext {
  currentMusic: string;
  artist?: string;
  state: 'PLAYING' | 'PAUSED' | 'RESUMED' | 'STOPPED';
}

const AudioPlayerContext = createContext<AudioPlayerContext>({
  currentMusic: 'test',
  artist: 'test',
  state: 'STOPPED',
});

export default AudioPlayerContext;
