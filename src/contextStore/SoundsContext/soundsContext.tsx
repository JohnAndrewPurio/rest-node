import moment from 'moment';
import React, { createContext, useReducer } from 'react';
import { Action } from './soundsActions';

interface State {
  sound: { [key: string]: boolean };
  volume: { [key: string]: number };
  audio: { [key: string]: any };
  nightSoundSchedule: {
    start: null | moment.Moment;
    end: null | moment.Moment;
  };
  wakeSoundSchedule: { start: null | moment.Moment; end: null | moment.Moment };
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
};

const initialContext = {
  state: initialState,
  dispatch: () => undefined,
};

const SoundsContext = createContext<Context>(initialContext);

const reducer = (state: State = initialState, action: Action) => {
  switch (action.type) {
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
