import { IonContent, IonGrid, IonPage } from '@ionic/react';
import SettingsHeader from '../../../components/SettingsHeader';
import TimeBar from '../../../components/TimeBar';
import SunSyncToggle from '../../../components/SunSyncToggle';
import './styles.css';
import { useState } from 'react';
import LightControl from '../../../components/LightControl';

const Lights: React.FC = () => {
  const [lightsOpen, setLightsOpen] = useState([false, false]);
  const [rangeValue, setRangeValue] = useState([0, 0]);

  const toggleLight = (index: number) => {
    const newArr = new Array(lightsOpen.length).fill(false);
    newArr[index] = !lightsOpen[index];
    setLightsOpen(newArr);

    const newRangeArr = new Array(rangeValue.length).fill(0);
    newRangeArr[index] = newArr[index] ? 50 : 0;
    setRangeValue(newRangeArr);
  };

  const handleRangeChange = (index: number, e: any) => {
    const val = e.target.value;
    if (val > 0 || lightsOpen[index]) {
      const newArr = new Array(lightsOpen.length).fill(false);
      newArr[index] = val > 0;
      setLightsOpen(newArr);

      const newRangeArr = new Array(rangeValue.length).fill(0);
      newRangeArr[index] = val;
      setRangeValue(newRangeArr);
    }
  };

  return (
    <IonPage>
      <SettingsHeader title="Lights Settings" />
      <IonContent>
        <IonGrid>
          <TimeBar />
          <SunSyncToggle />
        </IonGrid>
        <LightControl
          index={0}
          title="Night Light"
          rangeVal={rangeValue[0]}
          rangeChange={handleRangeChange}
          onclick={toggleLight}
          open={lightsOpen[0]}
        />
        <LightControl
          index={1}
          title="Wake Light"
          rangeVal={rangeValue[1]}
          rangeChange={handleRangeChange}
          onclick={toggleLight}
          open={lightsOpen[1]}
        />
      </IonContent>
    </IonPage>
  );
};

export default Lights;
