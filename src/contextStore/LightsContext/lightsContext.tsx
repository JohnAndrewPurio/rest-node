import moment from 'moment';
import React, { createContext, useReducer } from 'react';

interface State {
  nightLight: boolean;
  nightLightBrightness: number;
  nightLightStart: null | moment.Moment;
  nightLightEnd: null | moment.Moment;
  wakeLight: boolean;
  wakeLightBrightness: number;
  wakeLightStart: null | moment.Moment;
  wakeLightEnd: null | moment.Moment;
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
  nightLight: false,
  nightLightBrightness: 50,
  nightLightStart: null,
  nightLightEnd: null,
  wakeLight: false,
  wakeLightBrightness: 50,
  wakeLightStart: null,
  wakeLightEnd: null,
};

const initialContext = {
  state: initialState,
  dispatch: () => undefined,
};

const LightsContext = createContext<Context>(initialContext);

const reducer = (state: State = initialState, action: Action) => {
  switch (action.type) {
    default:
      return state;
  }
};

interface Props {
  children: React.ReactNode;
}

export const LightsContextProvider = (props: Props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <LightsContext.Provider value={{ state, dispatch }}>
      {props.children}
    </LightsContext.Provider>
  );
};

export default LightsContext;
