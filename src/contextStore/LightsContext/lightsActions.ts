import moment from 'moment';

export enum LightsActionTypes {
  TOGGLE_LIGHT = 'TOGGLE_LIGHT',
  ADJUST_BRIGHTNESS = 'ADJUST_BRIGHTNESS',
  SET_SCHEDULE = 'SET_SCHEDULE',
}

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

export type Action = toggleLightType | adjustBrightnessType | setScheduleType;
