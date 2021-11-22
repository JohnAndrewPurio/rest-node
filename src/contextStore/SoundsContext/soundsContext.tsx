import moment from 'moment';
import React, { createContext, useReducer } from 'react';
import { Action, SoundsActionTypes } from './soundsActions';

export interface State {
  isPlaying: { [key: string]: boolean };
  volume: { [key: string]: number };
  audio_file: { [key: string]: any };
  nightSoundSchedule: {
    start: null | moment.Moment;
    end: null | moment.Moment;
  };
  wakeSoundSchedule: { start: null | moment.Moment; end: null | moment.Moment };
  sample: { playing: boolean; audio: null | string };
}

interface Context {
  state: State;
  dispatch: React.Dispatch<Action>;
}

const initialState = {
  isPlaying: { night: false, wake: false },
  volume: { night: 50, wake: 50 },
  audio_file: { night: null, wake: null },
  nightSoundSchedule: { start: null, end: null },
  wakeSoundSchedule: { start: null, end: null },
  sample: { playing: false, audio: null },
};

const initialContext = {
  state: initialState,
  dispatch: () => undefined,
};

const SoundsContext = createContext<Context>(initialContext);

const reducer = (state: State = initialState, action: Action) => {
  switch (action.type) {
    case SoundsActionTypes.TOGGLE_SOUND: {
      const sound = { night: false, wake: false };
      if (action.payload) {
        sound.night = !state.isPlaying.night;
      } else {
        sound.wake = !state.isPlaying.wake;
      }
      return { ...state, sound, sample: { audio: null, playing: false } };
    }
    case SoundsActionTypes.ADJUST_VOLUME: {
      if (action.payload.isNight) {
        return {
          ...state,
          volume: { ...state.volume, night: action.payload.val },
        };
      }

      return {
        ...state,
        volume: { ...state.volume, wake: action.payload.val },
      };
    }
    case SoundsActionTypes.PLAY_SAMPLE:
      console.log('reducer');
      return {
        ...state,
        sample: { audio: action.payload, playing: !state.sample.playing },
        sound: { night: false, wake: false },
      };
    case SoundsActionTypes.SET_STATE:
      return action.payload;
    default:
      return state;
  }
};

interface Props {
  children: React.ReactNode;
}

export const SoundsContextProvider = (props: Props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <SoundsContext.Provider value={{ state, dispatch }}>
      {props.children}
    </SoundsContext.Provider>
  );
};

export default SoundsContext;
