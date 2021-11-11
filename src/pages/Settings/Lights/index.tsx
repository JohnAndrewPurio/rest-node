import {
  IonContent,
  IonGrid,
  IonPage,
} from '@ionic/react';
import SettingsHeader from '../../../components/SettingsHeader';
import TimeBar from '../../../components/TimeBar';
import SunSyncToggle from '../../../components/SunSyncToggle';
import './styles.css';
import LightControl from '../../../components/LightControl';
import LightsContext, { LightsContextProvider } from '../../../contextStore/LightsContext/lightsContext';
import { useContext, useEffect } from 'react';
import BedTimeContext from '../../../contextStore/BedTimeContext/bedtimeContext';
import moment from 'moment';
import { bedtimeStarted } from '../../../contextStore/BedTimeContext/bedtimeActions';
import { Storage } from '@capacitor/storage';
import { storage } from '../../../services/constants';
import { setState } from '../../../contextStore/LightsContext/lightsActions';

const Lights: React.FC = () => {

  return (
    <LightsContextProvider>
      <IonPage>
        <SettingsHeader title="Lights Settings" />
        <Content />
      </IonPage >
    </LightsContextProvider>
  );
};

export default Lights;


const Content: React.FC = () => {

  const bedtimeState = useContext(BedTimeContext);
  const lightsState = useContext(LightsContext);
  const { started, bedtimeStart, wakeUpTime } = bedtimeState.state;

  const getState = async () => {
    const { value } = await Storage.get({ key: storage.RED_NODE_STATES })
    if (value) {
      const defaultStates = JSON.parse(value)
      const nightStart = moment(defaultStates.bedtime.time, 'H:mm').add(defaultStates.bedtime.light.onoffset, 'minutes')
      const nightEnd = moment(defaultStates.bedtime.time, 'H:mm').add(defaultStates.bedtime.light.offoffset, 'minutes')
      const wakeStart = moment(defaultStates.waketime.time, 'H:mm').add(defaultStates.waketime.light.onoffset, 'minutes')
      const wakeEnd = moment(defaultStates.waketime.time, 'H:mm').add(defaultStates.waketime.light.offoffset, 'minutes')
      const isNightLightOn = moment().isSameOrAfter(nightStart) && moment().isBefore(nightEnd)
      const isWakeLightOn = moment().isSameOrAfter(wakeStart) && moment().isBefore(wakeEnd)
      const newState = {
        light: { night: isNightLightOn, wake: isWakeLightOn },
        brightness: { night: defaultStates.bedtime.light.onpayload.max_brightness, wake: defaultStates.bedtime.light.onpayload.max_brightness },
        nightLightSchedule: { start: nightStart, end: nightEnd },
        wakeLightSchedule: { start: wakeStart, end: wakeEnd },
      }
      lightsState.dispatch(setState(newState))
    }
  };

  const isBedtime = () => moment().isSameOrAfter(bedtimeStart) && moment().isSameOrBefore(wakeUpTime)

  useEffect(() => {
    const interval = setInterval(() => {
      if (!started && isBedtime()) {
        bedtimeState.dispatch(bedtimeStarted());
      }
    }, 1000);
    getState()
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (started) {
      getState()
    }
  }, [started])

  return (
    <IonContent>
      <IonGrid>
        <TimeBar />
        <SunSyncToggle />
      </IonGrid>
      <LightControl index={0} component="night" />
      <LightControl component="wake" index={1} />
    </IonContent>
  )
}