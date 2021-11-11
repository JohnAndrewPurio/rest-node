import moment from 'moment';
import React, { createContext, useReducer } from 'react';
import { Action, RelaxationActionTypes } from './relaxationActions';

export interface State {
  relaxationAudio: null | any;
  relaxationFilter: string;
  relaxationPlaying: boolean;
  relaxationStart: null | moment.Moment;
  relaxationEnd: null | moment.Moment;
  relaxationVolume: number;
  favorites: string[];
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
  relaxationVolume: 50,
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
      return { ...state, relaxationPlaying: !state.relaxationPlaying };
    case RelaxationActionTypes.TOGGLE_FAVORITE: {
      console.log(state.favorites);
      if (state.favorites.includes(action.payload)) {
        const favorites = state.favorites.filter((el) => el !== action.payload);
        return {
          ...state,
          favorites,
        };
      }
      const favorites = state.favorites.slice();
      favorites.push(action.payload);
      return {
        ...state,
        favorites,
      };
    }
    case RelaxationActionTypes.SET_STATE:
      return action.payload
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
