import moment from "moment";
import { RestNodeStateType } from "../../types";

export const getStartEnd = (states: RestNodeStateType): { start: moment.Moment, end: moment.Moment } => {
    let start = moment(states.bedtime.time, 'H:mm');
    let end = moment(states.waketime.time, 'H:mm');
    if (start.isAfter(end) && moment().isBefore(moment())) {
      start = moment(start).subtract(1, 'days')
    }
    else if (end.isSameOrBefore(start)) {
      end = moment(end).add(1, 'days');
    }
    else if (start.isBefore(moment()) && end.isBefore(moment())) {
      start = moment(start).add(1, 'days');
      end = moment(end).add(1, 'days');
    }
    console.log("befoooore", start, end)
    return { start, end };
  };