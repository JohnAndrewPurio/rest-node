import moment from 'moment';

export enum BedtimeActionTypes {
  SET_BEDTIME_HOURS = 'SET_BEDTIME_HOURS',
  SET_WAKE_UP_TIME = 'SET_WAKE_UP_TIME',
  START_BEDTIME_NOW = 'START_BEDTIME_NOW',
  STOP_BEDTIME_NOW = 'STOP_BEDTIME_NOW',
}

interface setBedtimeHoursType {
  type: BedtimeActionTypes.SET_BEDTIME_HOURS;
  payload: boolean;
}

export const setBedtimeHours = (isAdd: boolean): setBedtimeHoursType => ({
  type: BedtimeActionTypes.SET_BEDTIME_HOURS,
  payload: isAdd,
});

interface setWakeUpTimeType {
  type: BedtimeActionTypes.SET_WAKE_UP_TIME;
  payload: moment.Moment;
}

export const setWakeUpTime = (time: moment.Moment): setWakeUpTimeType => ({
  type: BedtimeActionTypes.SET_WAKE_UP_TIME,
  payload: time,
});

interface startBedTimeNowType {
  type: BedtimeActionTypes.START_BEDTIME_NOW;
  payload: null;
}

export const startBedTimeNow = (): startBedTimeNowType => ({
  type: BedtimeActionTypes.START_BEDTIME_NOW,
  payload: null,
});

interface stopBedTimeNowType {
  type: BedtimeActionTypes.STOP_BEDTIME_NOW;
  payload: null;
}

export const stopBedTimeNow = (): stopBedTimeNowType => ({
  type: BedtimeActionTypes.STOP_BEDTIME_NOW,
  payload: null,
});

export type Action =
  | setBedtimeHoursType
  | setWakeUpTimeType
  | startBedTimeNowType
  | stopBedTimeNowType;
