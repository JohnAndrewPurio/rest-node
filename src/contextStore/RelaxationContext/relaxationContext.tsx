import moment from 'moment';
import React, { createContext, useReducer } from 'react';

interface State {
  relaxationAudio: null | any;
  relaxationFilter: string;
  relaxationPlaying: boolean;
  relaxationStart: null | moment.Moment;
  relaxationEnd: null | moment.Moment;
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
  relaxationAudio: null,
  relaxationFilter: 'All',
  relaxationPlaying: false,
  relaxationStart: null,
  relaxationEnd: null,
};

const initialContext = {
  state: initialState,
  dispatch: () => undefined,
};

const RelaxationContext = createContext<Context>(initialContext);

const reducer = (state: State = initialState, action: Action) => {
  switch (action.type) {
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
