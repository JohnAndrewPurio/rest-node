import moment from 'moment';

export enum SoundsActionTypes {
  TOGGLE_SOUND = 'TOGGLE_SOUND',
  ADJUST_VOLUME = 'ADJUST_VOLUME',
  SET_SCHEDULE = 'SET_SCHEDULE',
  CHOOSE_AUDIO = 'CHOOSE_AUDIO',
}

interface toggleSoundType {
  type: SoundsActionTypes.TOGGLE_SOUND;
  payload: boolean;
}

export const toggleSound = (isNight: boolean): toggleSoundType => ({
  type: SoundsActionTypes.TOGGLE_SOUND,
  payload: isNight,
});

interface adjustVolumeType {
  type: SoundsActionTypes.ADJUST_VOLUME;
  payload: { isNight: boolean; val: number };
}

export const adjustVolume = (
  isNight: boolean,
  val: number
): adjustVolumeType => ({
  type: SoundsActionTypes.ADJUST_VOLUME,
  payload: { isNight, val },
});

interface setScheduleType {
  type: SoundsActionTypes.SET_SCHEDULE;
  payload: { bedtime: moment.Moment; waketime: moment.Moment };
}

export const setSchedule = (
  bedtime: moment.Moment,
  waketime: moment.Moment
): setScheduleType => ({
  type: SoundsActionTypes.SET_SCHEDULE,
  payload: { bedtime, waketime },
});

interface chooseAudioType {
  type: SoundsActionTypes.CHOOSE_AUDIO;
  payload: { isNight: boolean; filename: string }; // not sure what audio type yet, probably a string for filename
}

export const chooseAudio = (
  isNight: boolean,
  filename: string
): chooseAudioType => ({
  type: SoundsActionTypes.CHOOSE_AUDIO,
  payload: { isNight, filename },
});

export type Action =
  | toggleSoundType
  | adjustVolumeType
  | setScheduleType
  | chooseAudioType;
