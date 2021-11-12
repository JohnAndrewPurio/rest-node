import _ from 'lodash';
import { State as BedTimeState } from '../../contextStore/BedTimeContext/bedtimeContext';
import { State as LightsState } from '../../contextStore/LightsContext/lightsContext';
import { State as SoundsState } from '../../contextStore/SoundsContext/soundsContext';
import { RestNodeStateType } from '../../types';

export const bedtimeStateChangeChecker = (
  bedtimeState: BedTimeState,
  states: RestNodeStateType
) => {
  const change = {
    bedtime: {
      time: bedtimeState.bedtimeStart.format('HH:mm'),
    },
    waketime: {
      time: bedtimeState.wakeUpTime.format('HH:mm'),
    },
  };
  return equalityChecker(change, states);
};

export const lightsStateChangeChecker = (
  lightsState: LightsState,
  states: RestNodeStateType
) => {
  const change = {
    bedtime: {
      light: {
        ...states.bedtime.light,
        onpayload: {
          ...states.bedtime.light.onpayload,
          light: 'NIGHT_LIGHT',
          max_brightness: lightsState.brightness.night,
        },
        offpayload: {
          ...states.bedtime.light.offpayload,
          light: 'NIGHT_LIGHT',
          max_brightness: lightsState.brightness.night,
        },
      },
    },
    waketime: {
      light: {
        ...states.waketime.light,
        onpayload: {
          ...states.waketime.light.onpayload,
          light: 'WAKE_LIGHT',
          max_brightness: lightsState.brightness.wake,
        },
        offpayload: {
          ...states.waketime.light.offpayload,
          light: 'WAKE_LIGHT',
          max_brightness: lightsState.brightness.wake,
        },
      },
    },
  };
  return equalityChecker(change, states);
};

export const soundsStateChangeChecker = (
  soundsState: SoundsState,
  states: RestNodeStateType
) => {
  const change = {
    bedtime: {
      sound: {
        ...states.bedtime.sound,
        onpayload: {
          ...states.bedtime.sound.onpayload,
          sound: 'NIGHT_SOUND',
          max_volume: soundsState.volume.night,
          audio_file: soundsState.audio.night,
        },
        offpayload: {
          ...states.bedtime.sound.offpayload,
          sound: 'NIGHT_SOUND',
          max_volume: soundsState.volume.night,
          audio_file: soundsState.audio.night,
        },
      },
    },
    waketime: {
      sound: {
        ...states.waketime.sound,
        onpayload: {
          ...states.waketime.sound.onpayload,
          sound: 'WAKE_SOUND',
          max_volume: soundsState.volume.wake,
          audio_file: soundsState.audio.wake,
        },
        offpayload: {
          ...states.waketime.sound.offpayload,
          sound: 'WAKE_SOUND',
          max_volume: soundsState.volume.wake,
          audio_file: soundsState.audio.wake,
        },
      },
    },
  };
  return equalityChecker(change, states);
};

export const relaxationStateChangeChecker = () => {
  return { status: false };
};

export const equalityChecker = (change: any, states: RestNodeStateType) => {
  const bedtime = { ...states.bedtime, ...change.bedtime };
  const waketime = { ...states.waketime, ...change.waketime };
  const newState = { bedtime, waketime };
  console.log(newState, states);
  if (_.isEqual(newState, states)) {
    return { status: false };
  }
  return { status: true, newState };
};
