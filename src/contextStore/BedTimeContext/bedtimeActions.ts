import moment from 'moment';

export enum BedtimeActionTypes {
  SET_BEDTIME_HOURS = 'SET_BEDTIME_HOURS',
  SET_WAKE_UP_TIME = 'SET_WAKE_UP_TIME',
}

interface setBedtimeHoursType {
  type: BedtimeActionTypes.SET_BEDTIME_HOURS;
  payload: boolean;
}

export const setBedtimeHours = (add: boolean): setBedtimeHoursType => ({
  type: BedtimeActionTypes.SET_BEDTIME_HOURS,
  payload: add,
});

interface setWakeUpTimeType {
  type: BedtimeActionTypes.SET_WAKE_UP_TIME;
  payload: moment.Moment;
}

export const setWakeUpTime = (time: moment.Moment): setWakeUpTimeType => ({
  type: BedtimeActionTypes.SET_WAKE_UP_TIME,
  payload: time,
});

export type Action = setBedtimeHoursType | setWakeUpTimeType;
