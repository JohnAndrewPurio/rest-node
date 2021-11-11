import moment from 'moment';
import React, { createContext, useReducer } from 'react';
import { Action, BedtimeActionTypes } from './bedtimeActions';

export interface State {
  bedtimeStart: moment.Moment;
  bedtimeHours: number;
  wakeUpTime: moment.Moment;
  started: boolean;
}

interface Context {
  state: State;
  dispatch: React.Dispatch<Action>;
}

const initialState = {
  started:
    moment().isSameOrAfter(moment('20:00', 'HH:mm')) &&
    moment().isSameOrBefore(moment('20:00', 'HH:mm').add(8, 'h')),
  bedtimeStart: moment('20:00', 'HH:mm'),
  bedtimeHours: 8,
  wakeUpTime: moment('20:00', 'HH:mm').add(8, 'h'),
};

const initialContext = {
  state: initialState,
  dispatch: () => undefined,
};

const BedTimeContext = createContext<Context>(initialContext);

const reducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case BedtimeActionTypes.SET_BEDTIME_HOURS: {
      if (action.payload && state.bedtimeHours < 24) {
        const bedtimeStart = moment(state.wakeUpTime).subtract(
          state.bedtimeHours + 1,
          'h'
        );
        if (!moment().isSameOrAfter(bedtimeStart)) {
          return {
            ...state,
            bedtimeHours: state.bedtimeHours + 1,
            bedtimeStart,
          };
        }
        return {
          ...state,
          bedtimeHours: state.bedtimeHours + 1,
          wakeUpTime: moment().add(state.bedtimeHours + 1, 'h'),
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
    }
    case BedtimeActionTypes.SET_WAKE_UP_TIME: {
      const bedtimeStart = moment(action.payload).subtract(
        state.bedtimeHours,
        'h'
      );
      if (!moment().isSameOrAfter(bedtimeStart)) {
        return {
          ...state,
          wakeUpTime: action.payload,
          bedtimeStart,
        };
      }
      return {
        ...state,
        wakeUpTime: action.payload,
        bedtimeHours: action.payload.diff(moment(), 'hours') + 1,
      };
    }
    case BedtimeActionTypes.START_BEDTIME_NOW:
      return {
        ...state,
        bedtimeStart: moment(),
        wakeUpTime: moment().add(state.bedtimeHours, 'h'),
        started: true,
      };
    case BedtimeActionTypes.STOP_BEDTIME_NOW:
      return {
        ...state,
        bedtimeStart: moment().add(1, 'h'),
        wakeUpTime: moment().add(1 + state.bedtimeHours, 'h'),
        started: false,
      };
    case BedtimeActionTypes.BEDTIME_STARTED:
      return {
        ...state,
        started: true,
      };
    case BedtimeActionTypes.SET_STATE:
      return action.payload
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
