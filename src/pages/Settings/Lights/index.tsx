import { IonContent, IonGrid, IonPage, useIonViewWillLeave } from '@ionic/react';
import SettingsHeader from '../../../components/SettingsHeader';
import TimeBar from '../../../components/TimeBar';
import SunSyncToggle from '../../../components/SunSyncToggle';
import './styles.css';
import LightControl from '../../../components/LightControl';
import { LightsContextProvider } from '../../../contextStore/LightsContext/lightsContext';
import { useContext, useEffect } from 'react';
import BedTimeContext from '../../../contextStore/BedTimeContext/bedtimeContext';
import moment from 'moment';
import { bedtimeStarted } from '../../../contextStore/BedTimeContext/bedtimeActions';

const Lights: React.FC = () => {

  const { state, dispatch } = useContext(BedTimeContext)
  const { started, bedtimeStart, wakeUpTime } = state

  useEffect(() => {
    let interval = setInterval(() => {
      if (!started && moment().isSameOrAfter(bedtimeStart) && moment().isSameOrBefore(wakeUpTime)) {
        dispatch(bedtimeStarted())
      }
    }, 1000)
    return () => clearInterval(interval)
  })

  return (
    <LightsContextProvider>
      <IonPage>
        <SettingsHeader title="Lights Settings" />
        <IonContent>
          <IonGrid>
            <TimeBar />
            <SunSyncToggle />
          </IonGrid>
          <LightControl index={0} component="night" />
          <LightControl component="wake" index={1} />
        </IonContent>
      </IonPage>
    </LightsContextProvider>
  );
};

export default Lights;
