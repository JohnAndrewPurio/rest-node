import moment from 'moment';
import { RestNodeStateType } from '../../types';

export const getBedtimeArcs = (states: RestNodeStateType) => {
  const { start, end } = convertTimeToMoment(states);
  const diff = end.diff(start, 'hours', true);
  const placement = 360 * (start.hours() / 24) - 90;
  return [
    {
      percentage: diff / 24,
      placement,
    },
  ];
};

export const getLightArcs = (states: RestNodeStateType) => {
  const { start, end } = convertTimeToMoment(states);
  const nightLightStart = start.add(states.bedtime.light.onoffset, 'minutes');
  const nightLightEnd = start.add(states.bedtime.light.offoffset, 'minutes');
  const nightDiff = nightLightEnd.diff(nightLightStart, 'hours', true);
  const wakeLightStart = end.add(states.waketime.light.onoffset, 'minutes');
  const wakeLightEnd = end.add(states.waketime.light.offoffset, 'minutes');
  const wakeDiff = wakeLightEnd.diff(wakeLightStart, 'hours', true);
  const nightHour = nightLightStart.hours();
  const nightMin = nightLightStart.minutes() / 60;
  const wakeHour = wakeLightStart.hours();
  const wakeMin = wakeLightStart.minutes() / 60;
  return [
    {
      percentage: nightDiff / 24,
      placement: 360 * ((nightHour + nightMin) / 24) - 90,
    },
    {
      percentage: wakeDiff / 24,
      placement: 360 * ((wakeHour + wakeMin) / 24) - 90,
    },
  ];
};

export const getSoundsArcs = (states: RestNodeStateType) => {
  const { start, end } = convertTimeToMoment(states);
  const nightSoundStart = start.add(states.bedtime.sound.onoffset, 'minutes');
  const nightSoundEnd = start.add(states.bedtime.sound.offoffset, 'minutes');
  const nightDiff = nightSoundEnd.diff(nightSoundStart, 'hours', true);
  const wakesoundStart = end.add(states.waketime.sound.onoffset, 'minutes');
  const wakesoundEnd = end.add(states.waketime.sound.offoffset, 'minutes');
  const wakeDiff = wakesoundEnd.diff(wakesoundStart, 'hours', true);
  const nightHour = nightSoundStart.hours();
  const nightMin = nightSoundStart.minutes() / 60;
  const wakeHour = wakesoundStart.hours();
  const wakeMin = wakesoundStart.minutes() / 60;
  return [
    {
      percentage: nightDiff / 24,
      placement: 360 * ((nightHour + nightMin) / 24) - 90,
    },
    {
      percentage: wakeDiff / 24,
      placement: 360 * ((wakeHour + wakeMin) / 24) - 90,
    },
  ];
};

export const getRelaxationArcs = (states: RestNodeStateType) => {
  return [];
};

const convertTimeToMoment = (states: RestNodeStateType) => {
  let start = moment(states.bedtime.time, 'H:mm');
  let end = moment(states.waketime.time, 'H:mm');
  if (end.isSameOrBefore(start)) {
    end = end.add(1, 'days');
  }
  if (start.isBefore(moment()) && end.isBefore(moment())) {
    start = start.add(1, 'days');
    end = end.add(1, 'days');
  }
  return { start, end };
};
