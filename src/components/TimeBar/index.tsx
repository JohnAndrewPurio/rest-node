import { IonRow } from '@ionic/react';
import { useContext, useEffect, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import BedTimeContext from '../../contextStore/BedTimeContext/bedtimeContext';
import './styles.css';
import {
  BEDTIME,
  LIGHTS,
  SOUNDS,
  RELAXATION,
} from '../../pages/Settings/paths.json';
import { TimeBarType } from '../../types';
import moment from 'moment';
import LightsContext from '../../contextStore/LightsContext/lightsContext';
import SoundsContext from '../../contextStore/SoundsContext/soundsContext';
import RelaxationContext from '../../contextStore/RelaxationContext/relaxationContext';

const TimeBar: React.FC<RouteComponentProps> = ({ location }) => {
  const bedtimeState = useContext(BedTimeContext);
  const lightsState = useContext(LightsContext);
  const soundsState = useContext(SoundsContext);
  const relaxationState = useContext(RelaxationContext);

  useEffect(() => {
    const timeBars = updateTimeBar();
    setBars(timeBars);
  }, [
    bedtimeState.state,
    lightsState.state,
    soundsState.state,
    relaxationState.state,
  ]);

  const updateTimeBar = () => {
    switch (location.pathname) {
      case BEDTIME:
        return [
          {
            start: bedtimeState.state.bedtimeStart.format('HH:mm'),
            end: bedtimeState.state.wakeUpTime.format('HH:mm'),
            position: '0%',
            width: '100%',
          },
        ];
      case LIGHTS: {
        const nightStart = lightsState.state.nightLightSchedule.start;
        const nightEnd = lightsState.state.nightLightSchedule.end;
        const wakeStart = lightsState.state.wakeLightSchedule.start;
        const wakeEnd = lightsState.state.wakeLightSchedule.end;
        return [
          {
            start: nightStart?.format('HH:mm') || '',
            end: nightEnd?.format('HH:mm') || '',
            position: computePosition(nightStart, wakeEnd, nightStart),
            width: computeWidth(nightStart, wakeEnd, nightStart, nightEnd),
          },
          {
            start: wakeStart?.format('HH:mm') || '',
            end: wakeEnd?.format('HH:mm') || '',
            position: computePosition(nightStart, wakeEnd, wakeStart),
            width: computeWidth(nightStart, wakeEnd, wakeStart, wakeEnd),
          },
        ];
      }
      case SOUNDS: {
        const nightStart = soundsState.state.nightSoundSchedule.start;
        const nightEnd = soundsState.state.nightSoundSchedule.end;
        const wakeStart = soundsState.state.wakeSoundSchedule.start;
        const wakeEnd = soundsState.state.wakeSoundSchedule.end;
        return [
          {
            start: nightStart?.format('HH:mm') || '',
            end: nightEnd?.format('HH:mm') || '',
            position: computePosition(nightStart, wakeEnd, nightStart),
            width: computeWidth(nightStart, wakeEnd, nightStart, nightEnd),
          },
          {
            start: wakeStart?.format('HH:mm') || '',
            end: wakeEnd?.format('HH:mm') || '',
            position: computePosition(nightStart, wakeEnd, wakeStart),
            width: computeWidth(nightStart, wakeEnd, wakeStart, wakeEnd),
          },
        ];
      }
      case RELAXATION: {
        const nightStart = relaxationState.state.nightRelaxationSchedule.start;
        const nightEnd = relaxationState.state.nightRelaxationSchedule.end;
        const wakeStart = relaxationState.state.wakeRelaxationSchedule.start;
        const wakeEnd = relaxationState.state.wakeRelaxationSchedule.end;
        const start = nightStart ? nightStart : wakeStart
        const end = wakeEnd ? wakeEnd : nightEnd
        return [
          {
            start: nightStart?.format('HH:mm') || '',
            end: nightEnd?.format('HH:mm') || '',
            position: computePosition(start, end, nightStart),
            width: computeWidth(start, end, nightStart, nightEnd),
          },
          {
            start: wakeStart?.format('HH:mm') || '',
            end: wakeEnd?.format('HH:mm') || '',
            position: computePosition(start, end, wakeStart),
            width: computeWidth(start, end, wakeStart, wakeEnd),
          },
        ];
      }
    }
    return [];
  };

  const [bars, setBars] = useState<TimeBarType[]>([]);
  console.log(bars);

  return (
    <IonRow className="sound-time">
      <IonRow className="time-bar">
        {bars.map((bar) => (
          <div
            className="one-bar"
            key={bar.start}
            style={{ width: bar.width, left: bar.position }}
          >
            <div className="bar-time start">{bar.start}</div>
            <div className="bar-time end">{bar.end}</div>
          </div>
        ))}
      </IonRow>
    </IonRow>
  );
};

export default withRouter(TimeBar);

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
