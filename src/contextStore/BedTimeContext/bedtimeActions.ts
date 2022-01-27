import moment from 'moment';
import { State } from './bedtimeContext';

export enum BedtimeActionTypes {
    SET_BEDTIME_HOURS = 'SET_BEDTIME_HOURS',
    SET_WAKE_UP_TIME = 'SET_WAKE_UP_TIME',
    START_BEDTIME_NOW = 'START_BEDTIME_NOW',
    STOP_BEDTIME_NOW = 'STOP_BEDTIME_NOW',
    BEDTIME_STARTED = 'BEDTIME_STARTED',
    SET_STATE = 'SET_STATE',
}

interface setStateType {
    type: BedtimeActionTypes.SET_STATE;
    payload: State;
}

export const setState = (state: State): setStateType => ({
    type: BedtimeActionTypes.SET_STATE,
    payload: state,
});

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

interface bedtimeStartedType {
    type: BedtimeActionTypes.BEDTIME_STARTED;
    payload: null;
}

export const bedtimeStarted = (): bedtimeStartedType => ({
    type: BedtimeActionTypes.BEDTIME_STARTED,
    payload: null,
});

export type Action =
    | setStateType
    | setBedtimeHoursType
    | setWakeUpTimeType
    | startBedTimeNowType
    | stopBedTimeNowType
    | bedtimeStartedType;
