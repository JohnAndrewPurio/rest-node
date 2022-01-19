import { IonContent, IonGrid } from '@ionic/react';
import moment from 'moment';
import { FC, useContext, useEffect } from 'react';
import { Storage } from '@capacitor/storage';
import LightControl from '../../../../components/LightControl';
import SunSyncToggle from '../../../../components/SunSyncToggle';
import TimeBar from '../../../../components/TimeBar';
import { bedtimeStarted } from '../../../../contextStore/BedTimeContext/bedtimeActions';
import BedTimeContext from '../../../../contextStore/BedTimeContext/bedtimeContext';
import LightsContext from '../../../../contextStore/LightsContext/lightsContext';
import { RestNodeStateType } from '../../../../types';
import { getStartEnd } from '../../helper';
import { setState } from '../../../../contextStore/LightsContext/lightsActions';
import { storageGet } from '../../../../api/CapacitorStorage';
import { REST_NODE_STATES_KEY } from '../../../../api/CapacitorStorage/keys';

const Content: FC = () => {
  const bedtimeState = useContext(BedTimeContext);
  const lightsState = useContext(LightsContext);
  const { started, bedtimeStart, wakeUpTime } = bedtimeState.state;

  const getState = async () => {
    const { value } = await storageGet(REST_NODE_STATES_KEY);

    if (!value) return;

    const _moment = moment();
    const defaultStates: RestNodeStateType = JSON.parse(value);
    const { start, end } = getStartEnd(defaultStates);
    const _start = start;
    const _end = end;

    const nightStart = _start
      .clone()
      .add(defaultStates.bedtime.light.onoffset, 'minutes');

    const nightEnd = _start
      .clone()
      .add(defaultStates.bedtime.light.offoffset, 'minutes');

    const wakeStart = _end
      .clone()
      .add(defaultStates.waketime.light.onoffset, 'minutes');

    const wakeEnd = _end
      .clone()
      .add(defaultStates.waketime.light.offoffset, 'minutes');

    const isNightLightOn =
      _moment.isSameOrAfter(nightStart) && _moment.isBefore(nightEnd);
    const isWakeLightOn =
      _moment.isSameOrAfter(wakeStart) && _moment.isBefore(wakeEnd);

    const light = {
      night: isNightLightOn,
      wake: isWakeLightOn,
    };

    const brightness = {
      night: defaultStates.bedtime.light.onpayload.max_brightness,
      wake: defaultStates.bedtime.light.onpayload.max_brightness,
    };

    const nightLightSchedule = {
      start: nightStart,
      end: nightEnd,
    };

    const wakeLightSchedule = {
      start: wakeStart,
      end: wakeEnd,
    };

    const newState = {
      light,
      brightness,
      nightLightSchedule,
      wakeLightSchedule,
    };

    lightsState.dispatch(setState(newState));
  };

  const isBedtime = () =>
    moment().isSameOrAfter(bedtimeStart) && moment().isSameOrBefore(wakeUpTime);

  useEffect(() => {
    const bedtimeCheckHandler = () => {
      const bedtime = isBedtime();
      const bedtimeHasStarted = bedtimeStarted();

      if (!started && bedtime) bedtimeState.dispatch(bedtimeHasStarted);
    };

    const interval = setInterval(bedtimeCheckHandler, 1000);

    getState();

    return () => {
      clearInterval(interval);
    };

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (started) getState();

    // eslint-disable-next-line
  }, [started]);

  return (
    <IonContent>
      <IonGrid>
        <TimeBar />
        <SunSyncToggle />
      </IonGrid>
      <LightControl component="night" index={0} />
      <LightControl component="wake" index={1} />
    </IonContent>
  );
};

export default Content;
