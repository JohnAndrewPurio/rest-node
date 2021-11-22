import moment from 'moment';
import { RestNodeStateType } from '../../types';

export const getStartEnd = (
  states: RestNodeStateType
): { start: moment.Moment; end: moment.Moment } => {
  let start = moment(states.bedtime.time, 'H:mm');
  let end = moment(states.waketime.time, 'H:mm');
  if (start.isAfter(end) && moment().isBefore(end)) {
    start = moment(start).subtract(1, 'days');
  } else if (start.isAfter(end)) {
    end = moment(end).add(1, 'days');
  } else if (start.isBefore(moment()) && end.isBefore(moment())) {
    start = moment(start).add(1, 'days');
    end = moment(end).add(1, 'days');
  }
  return { start, end };
};
