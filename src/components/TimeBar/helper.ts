import moment from 'moment';
import { State as bedtimeState } from '../../contextStore/BedTimeContext/bedtimeContext';
import { State as lightsState } from '../../contextStore/LightsContext/lightsContext';
import { State as relaxationState } from '../../contextStore/RelaxationContext/relaxationContext';
import { State as soundsState } from '../../contextStore/SoundsContext/soundsContext';

export const getBedtimeBars = (bedtimeState: bedtimeState) => {
  return [
    getBarDetails(
      bedtimeState.bedtimeStart,
      bedtimeState.wakeUpTime,
      bedtimeState.bedtimeStart,
      bedtimeState.wakeUpTime
    ),
  ];
};

export const getLightBars = (state: lightsState) => {
  const nightStart = state.nightLightSchedule.start;
  const nightEnd = state.nightLightSchedule.end;
  const wakeStart = state.wakeLightSchedule.start;
  const wakeEnd = state.wakeLightSchedule.end;
  return [
    getBarDetails(nightStart, wakeEnd, nightStart, nightEnd),
    getBarDetails(nightStart, wakeEnd, wakeStart, wakeEnd),
  ];
};

export const getSoundBars = (state: soundsState) => {
  const nightStart = state.nightSoundSchedule.start;
  const nightEnd = state.nightSoundSchedule.end;
  const wakeStart = state.wakeSoundSchedule.start;
  const wakeEnd = state.wakeSoundSchedule.end;
  return [
    getBarDetails(nightStart, wakeEnd, nightStart, nightEnd),
    getBarDetails(nightStart, wakeEnd, wakeStart, wakeEnd),
  ];
};

export const getRelaxationBars = (state: relaxationState) => {
  const nightStart = state.nightRelaxationSchedule.start;
  const nightEnd = state.nightRelaxationSchedule.end;
  const wakeStart = state.wakeRelaxationSchedule.start;
  const wakeEnd = state.wakeRelaxationSchedule.end;
  const start = nightStart || wakeStart;
  const end = wakeEnd || nightEnd;
  const bars = [
    getBarDetails(start, end, nightStart, nightEnd),
    getBarDetails(start, end, wakeStart, wakeEnd),
  ];
  console.log(bars, 'RELAXATION BARS', state);
  return bars;
};

const getBarDetails = (
  min: moment.Moment | null,
  max: moment.Moment | null,
  start: moment.Moment | null,
  end: moment.Moment | null
) => {
  return {
    start: start?.format('HH:mm') || '',
    end: end?.format('HH:mm') || '',
    position: computePosition(min, max, start),
    width: computeWidth(min, max, start, end),
  };
};

const computeWidth = (
  min: moment.Moment | null,
  max: moment.Moment | null,
  start: moment.Moment | null,
  end: moment.Moment | null
) => {
  if (min && max && start && end) {
    const total = max.diff(min, 'hours', true);
    const part = end.diff(start, 'hours', true);
    console.log('total', total, part, min, max);
    return `${(part / total) * 100}%`;
  }
  return '';
};

const computePosition = (
  min: moment.Moment | null,
  max: moment.Moment | null,
  start: moment.Moment | null
) => {
  if (min && max && start) {
    const total = max.diff(min, 'hours', true);
    const startdiff = start.diff(min, 'hours', true);
    const percentage = (startdiff / total) * 100;
    return `${percentage}%`;
  }
  return '';
};
