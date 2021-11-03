import { IonContent, IonGrid, IonPage } from '@ionic/react';
import SettingsHeader from '../../../components/SettingsHeader';
import TimeBar from '../../../components/TimeBar';
import SunSyncToggle from '../../../components/SunSyncToggle';
import './styles.css';
import LightControl from '../../../components/LightControl';
import { LightsContextProvider } from '../../../contextStore/LightsContext/lightsContext';

const Lights: React.FC = () => {
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
