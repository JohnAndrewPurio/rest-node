import moment from 'moment';
import React, { createContext, useReducer } from 'react';
import { Action, SoundsActionTypes } from './soundsActions';

interface State {
  sound: { [key: string]: boolean };
  volume: { [key: string]: number };
  audio: { [key: string]: any };
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
  sound: { night: false, wake: false },
  volume: { night: 50, wake: 50 },
  audio: { night: null, wake: null },
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
      const audio = { night: false, wake: false };
      if (action.payload) {
        audio.night = !state.audio.night;
      } else {
        audio.wake = !state.audio.wake;
      }
      return { ...state, audio, sample: { audio: null, playing: false } };
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
