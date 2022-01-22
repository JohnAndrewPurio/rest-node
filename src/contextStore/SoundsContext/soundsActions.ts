import moment from 'moment';
import { State } from './soundsContext';

export enum SoundsActionTypes {
    TOGGLE_SOUND = 'TOGGLE_SOUND',
    ADJUST_VOLUME = 'ADJUST_VOLUME',
    SET_SCHEDULE = 'SET_SCHEDULE',
    CHOOSE_AUDIO = 'CHOOSE_AUDIO',
    PLAY_SAMPLE = 'PLAY_SAMPLE',
    SET_STATE = 'SET_STATE',
}

interface setStateType {
    type: SoundsActionTypes.SET_STATE;
    payload: State;
}

export const setState = (state: State): setStateType => ({
    type: SoundsActionTypes.SET_STATE,
    payload: state,
});

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

interface playSampleType {
    type: SoundsActionTypes.PLAY_SAMPLE;
    payload: string;
}

export const playSample = (id: string): playSampleType => ({
    type: SoundsActionTypes.PLAY_SAMPLE,
    payload: id,
});

export type Action =
    | setStateType
    | toggleSoundType
    | adjustVolumeType
    | setScheduleType
    | chooseAudioType
    | playSampleType;
