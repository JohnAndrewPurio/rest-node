import moment from 'moment';
import { RestNodeStateType } from '../../types';

export const getBedtimeArcs = (states: RestNodeStateType) => {
  const { start, end } = convertStartEndToMoment(states);
  const diff = end.diff(start, 'hours', true);
  const placement = 360 * (start.hours() / 24) - 90;
  console.log('diff', diff);
  return [
    {
      percentage: (diff / 24) * 100,
      placement,
    },
  ];
};

export const getLightArcs = (states: RestNodeStateType) => {
  const { start, end } = convertStartEndToMoment(states);
  const arcs = []
  if (states.bedtime.light) {
    const nightLightStart = moment(start).add(
      states.bedtime.light.onoffset,
      'minutes'
    );
    const nightLightEnd = moment(start).add(
      states.bedtime.light.offoffset,
      'minutes'
    );
    const nightDiff = nightLightEnd.diff(nightLightStart, 'hours', true);
    const nightHour = nightLightStart.hours();
    const nightMin = nightLightStart.minutes() / 60;
    arcs.push({
      percentage: (nightDiff / 24) * 100,
      placement: 360 * ((nightHour + nightMin) / 24) - 90,
    })
  }
  if (states.waketime.light) {
    const wakeLightStart = moment(end).add(
      states.waketime.light.onoffset,
      'minutes'
    );
    const wakeLightEnd = moment(end).add(
      states.waketime.light.offoffset,
      'minutes'
    );
    const wakeDiff = wakeLightEnd.diff(wakeLightStart, 'hours', true);

    const wakeHour = wakeLightStart.hours();
    const wakeMin = wakeLightStart.minutes() / 60;
    arcs.push({
      percentage: (wakeDiff / 24) * 100,
      placement: 360 * ((wakeHour + wakeMin) / 24) - 90,
    })
  }
  return arcs
};

export const getSoundsArcs = (states: RestNodeStateType) => {
  const { start, end } = convertStartEndToMoment(states);
  const arcs = []
  if (states.bedtime.sound) {
    const nightSoundStart = moment(start).add(
      states.bedtime.sound.onoffset,
      'minutes'
    );
    const nightSoundEnd = moment(start).add(
      states.bedtime.sound.offoffset,
      'minutes'
    );
    const nightDiff = nightSoundEnd.diff(nightSoundStart, 'hours', true);
    const nightHour = nightSoundStart.hours();
    const nightMin = nightSoundStart.minutes() / 60;
    arcs.push({
      percentage: (nightDiff / 24) * 100,
      placement: 360 * ((nightHour + nightMin) / 24) - 90,
    })
  }
  if (states.waketime.sound) {
    const wakesoundStart = moment(end).add(
      states.waketime.sound.onoffset,
      'minutes'
    );
    const wakesoundEnd = moment(end).add(
      states.waketime.sound.offoffset,
      'minutes'
    );
    const wakeDiff = wakesoundEnd.diff(wakesoundStart, 'hours', true);
    const wakeHour = wakesoundStart.hours();
    const wakeMin = wakesoundStart.minutes() / 60;
    arcs.push({
      percentage: (wakeDiff / 24) * 100,
      placement: 360 * ((wakeHour + wakeMin) / 24) - 90,
    })
  }
  return arcs
};

export const getRelaxationArcs = (states: RestNodeStateType) => {
  const { start, end } = convertStartEndToMoment(states);
  const arcs = []
  if (states.bedtime.relax) {
    const nightRelaxationStart = moment(start).add(
      states.bedtime.relax.onoffset,
      'minutes'
    );
    const nightRelaxationEnd = moment(start).add(
      states.bedtime.relax.offoffset,
      'minutes'
    );
    const nightDiff = nightRelaxationEnd.diff(nightRelaxationStart, 'hours', true);
    const nightHour = nightRelaxationStart.hours();
    const nightMin = nightRelaxationStart.minutes() / 60;
    arcs.push({
      percentage: (nightDiff / 24) * 100,
      placement: 360 * ((nightHour + nightMin) / 24) - 90,
    })
  }
  if (states.waketime.relax) {
    const wakeRelaxationStart = moment(end).add(
      states.waketime.relax.onoffset,
      'minutes'
    );
    const wakeRelaxationEnd = moment(end).add(
      states.waketime.relax.offoffset,
      'minutes'
    );
    const wakeDiff = wakeRelaxationEnd.diff(wakeRelaxationStart, 'hours', true);
    const wakeHour = wakeRelaxationStart.hours();
    const wakeMin = wakeRelaxationStart.minutes() / 60;
    arcs.push({
      percentage: (wakeDiff / 24) * 100,
      placement: 360 * ((wakeHour + wakeMin) / 24) - 90,
    })
  }
  return arcs
};

const convertStartEndToMoment = (states: RestNodeStateType) => {
  let start = moment(states.bedtime.time, 'H:mm');
  let end = moment(states.waketime.time, 'H:mm');
  if (start.isAfter(end) && moment().isBefore(moment())) {
    start = moment(start).subtract(1, 'days');
  }
  else if (end.isSameOrBefore(start)) {
    end = moment(end).add(1, 'days');
  }
  else if (start.isBefore(moment()) && end.isBefore(moment())) {
    start = moment(start).add(1, 'days');
    end = moment(end).add(1, 'days');
  }
  return { start, end };
};
