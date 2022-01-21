import { Storage } from '@capacitor/storage';
import moment from 'moment';
import React, { createContext, useReducer } from 'react';
import { storageSet } from '../../api/CapacitorStorage';
import { RELAXATION_FAVORITES_KEY } from '../../api/CapacitorStorage/keys';
import { Action, RelaxationActionTypes } from './relaxationActions';

export interface State {
  relaxationAudio: { [key: string]: string | null };
  relaxationFilter: string;
  relaxationPlaying: { [key: string]: boolean };
  nightRelaxationSchedule: { [key: string]: moment.Moment | null };
  wakeRelaxationSchedule: { [key: string]: moment.Moment | null };
  relaxationVolume: number;
  sample: { playing: boolean; audio: null | string };
  favorites: string[];
}

interface Context {
  state: State;
  dispatch: React.Dispatch<Action>;
}

const initialState = {
  relaxationAudio: { night: null, wake: null },
  relaxationFilter: 'All',
  relaxationPlaying: { night: false, wake: false },
  nightRelaxationSchedule: { start: null, end: null },
  wakeRelaxationSchedule: { start: null, end: null },
  relaxationVolume: 50,
  sample: { playing: false, audio: null },
  favorites: [],
};

const initialContext = {
  state: initialState,
  dispatch: () => undefined,
};

const RelaxationContext = createContext<Context>(initialContext);

const reducer = (state: State = initialState, action: Action) => {
  switch (action.type) {
    case RelaxationActionTypes.TOGGLE_RELAXATION:
      return {
        ...state,
        relaxationPlaying: {
          night: !state.relaxationPlaying.night,
          wake: !state.relaxationPlaying.wake,
        },
      };
    case RelaxationActionTypes.TOGGLE_FAVORITE: {
      let favorites = [];
      if (state.favorites.includes(action.payload)) {
        favorites = state.favorites.filter((el) => el !== action.payload);
      } else {
        favorites = state.favorites.slice();
        favorites.push(action.payload);
      }
      storageSet(favorites, RELAXATION_FAVORITES_KEY);
      return {
        ...state,
        favorites,
      };
    }
    case RelaxationActionTypes.ADJUST_VOLUME: {
      return {
        ...state,
        relaxationVolume: action.payload,
      };
    }
    case RelaxationActionTypes.SET_FILTER:
      return { ...state, relaxationFilter: action.payload }
    case RelaxationActionTypes.SET_STATE:
      return action.payload;
    case RelaxationActionTypes.PLAY_SAMPLE:
      return {
        ...state,
        sample: { playing: !state.sample.playing, audio: action.payload },
        relaxationPlaying: { night: false, wake: false },
      }
    default:
      return state;
  }
};

interface Props {
  children: React.ReactNode;
}

export const RelaxationContextProvider = (props: Props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <RelaxationContext.Provider value={{ state, dispatch }}>
      {props.children}
    </RelaxationContext.Provider>
  );
};

export default RelaxationContext;
