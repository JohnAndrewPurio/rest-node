import moment from 'moment';
import { State } from './lightsContext';

export enum LightsActionTypes {
  TOGGLE_LIGHT = 'TOGGLE_LIGHT',
  ADJUST_BRIGHTNESS = 'ADJUST_BRIGHTNESS',
  SET_SCHEDULE = 'SET_SCHEDULE',
  SET_STATE = 'SET_STATE',
}

interface setStateType {
  type: LightsActionTypes.SET_STATE;
  payload: State;
}

export const setState = (state: State): setStateType => ({
  type: LightsActionTypes.SET_STATE,
  payload: state,
});

interface toggleLightType {
  type: LightsActionTypes.TOGGLE_LIGHT;
  payload: boolean;
}

export const toggleLight = (isNight: boolean): toggleLightType => ({
  type: LightsActionTypes.TOGGLE_LIGHT,
  payload: isNight,
});

interface adjustBrightnessType {
  type: LightsActionTypes.ADJUST_BRIGHTNESS;
  payload: { isNight: boolean; val: number };
}

export const adjustBrightness = (
  isNight: boolean,
  val: number
): adjustBrightnessType => ({
  type: LightsActionTypes.ADJUST_BRIGHTNESS,
  payload: { isNight, val },
});

interface setScheduleType {
  type: LightsActionTypes.SET_SCHEDULE;
  payload: { bedtime: moment.Moment; waketime: moment.Moment };
}

export const setSchedule = (
  bedtime: moment.Moment,
  waketime: moment.Moment
): setScheduleType => ({
  type: LightsActionTypes.SET_SCHEDULE,
  payload: { bedtime, waketime },
});

export type Action = 
| setStateType 
| toggleLightType 
| adjustBrightnessType 
| setScheduleType;
