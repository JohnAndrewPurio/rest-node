import moment from 'moment';
import React, { createContext, useReducer } from 'react';

interface State {
  nightSound: boolean;
  nightSoundVolume: number;
  nightAudio: null | any;
  nightSoundStart: null | moment.Moment;
  nightSoundEnd: null | moment.Moment;
  wakeSound: boolean;
  wakeSoundVolume: number;
  wakeAudio: null | any;
  wakeSoundStart: null | moment.Moment;
  wakeSoundEnd: null | moment.Moment;
}

interface Action {
  payload: any;
  type: string;
}

interface Context {
  state: State;
  dispatch: React.Dispatch<Action>;
}

const initialState = {
  nightSound: false,
  nightSoundVolume: 50,
  nightAudio: null,
  wakeSoundStart: null,
  wakeSoundEnd: null,
  wakeSound: false,
  wakeSoundVolume: 50,
  wakeAudio: null,
  nightSoundStart: null,
  nightSoundEnd: null,
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
