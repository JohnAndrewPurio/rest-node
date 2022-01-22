import moment from 'moment';
import { State } from './relaxationContext';

export enum RelaxationActionTypes {
    TOGGLE_RELAXATION = 'TOGGLE_RELAXATION',
    ADJUST_VOLUME = 'ADJUST_VOLUME',
    SET_SCHEDULE = 'SET_SCHEDULE',
    CHOOSE_AUDIO = 'CHOOSE_AUDIO',
    REWIND_OR_FORWARD = 'REWIND_OR_FORWARD',
    TOGGLE_FAVORITE = 'TOGGLE_FAVORITE',
    SET_STATE = 'SET_STATE',
    SET_FILTER = 'SET_FILTER',
    PLAY_SAMPLE = 'PLAY_SAMPLE',
}

interface setStateType {
    type: RelaxationActionTypes.SET_STATE;
    payload: State;
}

export const setState = (state: State): setStateType => ({
    type: RelaxationActionTypes.SET_STATE,
    payload: state,
});

interface toggleRelaxationType {
    type: RelaxationActionTypes.TOGGLE_RELAXATION;
}

export const toggleRelaxation = (): toggleRelaxationType => ({
    type: RelaxationActionTypes.TOGGLE_RELAXATION,
});

interface adjustVolumeType {
    type: RelaxationActionTypes.ADJUST_VOLUME;
    payload: number;
}

export const adjustVolume = (val: number): adjustVolumeType => ({
    type: RelaxationActionTypes.ADJUST_VOLUME,
    payload: val,
});

interface setScheduleType {
    type: RelaxationActionTypes.SET_SCHEDULE;
    payload: { bedtime: moment.Moment; waketime: moment.Moment };
}

export const setSchedule = (
    bedtime: moment.Moment,
    waketime: moment.Moment
): setScheduleType => ({
    type: RelaxationActionTypes.SET_SCHEDULE,
    payload: { bedtime, waketime },
});

interface chooseAudioType {
    type: RelaxationActionTypes.CHOOSE_AUDIO;
    payload: string; // not sure what audio type yet, probably a string for filename
}

export const chooseAudio = (filename: string): chooseAudioType => ({
    type: RelaxationActionTypes.CHOOSE_AUDIO,
    payload: filename,
});

interface rewindOrForwardType {
    type: RelaxationActionTypes.REWIND_OR_FORWARD;
    payload: boolean;
}

export const rewindOrForward = (isRewind: boolean): rewindOrForwardType => ({
    type: RelaxationActionTypes.REWIND_OR_FORWARD,
    payload: isRewind,
});

interface toggleFavoriteType {
    type: RelaxationActionTypes.TOGGLE_FAVORITE;
    payload: string;
}

export const toggleFavorite = (id: string): toggleFavoriteType => ({
    type: RelaxationActionTypes.TOGGLE_FAVORITE,
    payload: id,
});

interface setFilterType {
    type: RelaxationActionTypes.SET_FILTER;
    payload: string;
}

export const setFilter = (str: string): setFilterType => ({
    type: RelaxationActionTypes.SET_FILTER,
    payload: str,
});

interface playSampleType {
    type: RelaxationActionTypes.PLAY_SAMPLE;
    payload: string;
}

export const playSample = (str: string): playSampleType => ({
    type: RelaxationActionTypes.PLAY_SAMPLE,
    payload: str,
});

export type Action =
    | setStateType
    | toggleRelaxationType
    | adjustVolumeType
    | setScheduleType
    | chooseAudioType
    | rewindOrForwardType
    | toggleFavoriteType
    | setFilterType
    | playSampleType;
