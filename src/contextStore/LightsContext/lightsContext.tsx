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
    end: null | moment.Moment
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
          brightness: { night: light.night ? 50 : 0, wake: 0 },
        };
      }

      light.wake = !state.light.wake;
      return {
        ...state,
        light,
        brightness: { night: 0, wake: light.wake ? 50 : 0 },
      };
    }
    case LightsActionTypes.ADJUST_BRIGHTNESS: {
      const brightness = { night: 0, wake: 0 };
      if (action.payload.isNight) {
        brightness.night = action.payload.val;
        return {
          ...state,
          brightness,
          light: { night: action.payload.val > 0, wake: false },
        };
      }

      brightness.wake = action.payload.val;
      return {
        ...state,
        brightness,
        light: { night: false, wake: action.payload.val > 0 },
      };
    }
    case LightsActionTypes.SET_STATE:
      console.log('contextlight')
      return action.payload
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
