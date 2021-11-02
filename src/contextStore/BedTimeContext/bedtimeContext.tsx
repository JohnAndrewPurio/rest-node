import moment from 'moment';
import React, { createContext, useReducer } from 'react';
import { Action, BedtimeActionTypes } from './bedtimeActions';

interface State {
  bedtimeStart: moment.Moment;
  bedtimeHours: number;
  wakeUpTime: moment.Moment;
}

interface Context {
  state: State;
  dispatch: React.Dispatch<Action>;
}

const initialState = {
  bedtimeStart: moment().add(30, 'm'),
  bedtimeHours: 8,
  wakeUpTime: moment(moment().add(30, 'm')).add(8, 'h'),
};

const initialContext = {
  state: initialState,
  dispatch: () => undefined,
};

const BedTimeContext = createContext<Context>(initialContext);

const reducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case BedtimeActionTypes.SET_BEDTIME_HOURS:
      if (action.payload && state.bedtimeHours < 24) {
        return {
          ...state,
          bedtimeHours: state.bedtimeHours + 1,
          bedtimeStart: moment(state.wakeUpTime).subtract(
            state.bedtimeHours + 1,
            'h'
          ),
        };
      }
      if (!action.payload && state.bedtimeHours > 1) {
        return {
          ...state,
          bedtimeHours: state.bedtimeHours - 1,
          bedtimeStart: moment(state.wakeUpTime).subtract(
            state.bedtimeHours - 1,
            'h'
          ),
        };
      }
      return state;
    case BedtimeActionTypes.SET_WAKE_UP_TIME:
      return {
        ...state,
        wakeUpTime: action.payload,
        bedtimeStart: moment(action.payload).subtract(state.bedtimeHours, 'h'),
      };
    default:
      return state;
  }
};

interface Props {
  children: React.ReactNode;
}

export const BedTimeContextProvider = (props: Props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <BedTimeContext.Provider value={{ state, dispatch }}>
      {props.children}
    </BedTimeContext.Provider>
  );
};

export default BedTimeContext;
