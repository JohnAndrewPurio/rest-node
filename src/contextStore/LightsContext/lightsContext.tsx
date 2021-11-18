import moment from 'moment';
import React, { createContext, useReducer } from 'react';
import { Action, LightsActionTypes } from './lightsActions';

export interface State {
  light: { [key: string]: boolean };
  brightness: { [key: string]: number };
  nightLightSchedule: {
    start: null | moment.Moment;
    end: null | moment.Moment;
  };
  wakeLightSchedule: {
    start: null | moment.Moment;
    end: null | moment.Moment;
  };
}

interface Context {
  state: State;
  dispatch: React.Dispatch<Action>;
}

const initialState = {
  light: { night: false, wake: false },
  brightness: { night: 0, wake: 0 },
  nightLightSchedule: { start: null, end: null },
  wakeLightSchedule: { start: null, end: null },
};

const initialContext = {
  state: initialState,
  dispatch: () => undefined,
};

const LightsContext = createContext<Context>(initialContext);

const reducer = (state: State = initialState, action: Action) => {
  switch (action.type) {
    case LightsActionTypes.TOGGLE_LIGHT: {
      const light = { night: false, wake: false };
      if (action.payload) {
        light.night = !state.light.night;
        return {
          ...state,
          light,
        };
      }

      light.wake = !state.light.wake;
      return {
        ...state,
        light,
      };
    }
    case LightsActionTypes.ADJUST_BRIGHTNESS: {
      const brightness = state.brightness;
      if (action.payload.isNight) {
        brightness.night = action.payload.val;
      }
      else {
        brightness.wake = action.payload.val;
      }
      return {
        ...state,
        brightness,
      };
    }
    case LightsActionTypes.SET_STATE:
      console.log('contextlight');
      return action.payload;
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
