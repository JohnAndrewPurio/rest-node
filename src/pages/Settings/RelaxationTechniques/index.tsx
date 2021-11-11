import { IonContent, IonGrid, IonPage } from '@ionic/react';
import { useContext, useEffect, useState } from 'react';
import SettingsHeader from '../../../components/SettingsHeader';
import TimeBar from '../../../components/TimeBar';
import RelaxationList from '../../../components/RelaxationList';
import './styles.css';
import RelaxationFilter from '../../../components/RelaxationFilter';
import RelaxationFavorites from '../../../components/RelaxationFavorites';
import RelaxationContext, { RelaxationContextProvider } from '../../../contextStore/RelaxationContext/relaxationContext';
import RelaxationFooter from '../../../components/RelaxationPlayer';
import BedTimeContext from '../../../contextStore/BedTimeContext/bedtimeContext';
import moment from 'moment';
import { bedtimeStarted } from '../../../contextStore/BedTimeContext/bedtimeActions';
import { Storage } from '@capacitor/storage';
import { storage } from '../../../services/constants';
import { setState } from '../../../contextStore/RelaxationContext/relaxationActions';

const Relaxation: React.FC = () => {

  return (
    <RelaxationContextProvider>
      <IonPage>
        <SettingsHeader title="Relaxation Techniques" />
        <Content />
      </IonPage>
    </RelaxationContextProvider>
  );
};

export default Relaxation;


const Content: React.FC = () => {

  const [selected, setSelected] = useState('All');

  const onSelect = (time: string) => {
    setSelected(time);
  };

  const bedtimeState = useContext(BedTimeContext);
  const relaxationState = useContext(RelaxationContext)
  const { started, bedtimeStart, wakeUpTime } = bedtimeState.state;

  const getState = async () => {
    const { value } = await Storage.get({ key: storage.RED_NODE_STATES })
    if (value) {
      const defaultStates = JSON.parse(value)
      const newState = {
        relaxationAudio: null,
        relaxationFilter: 'All',
        relaxationPlaying: false,
        relaxationStart: null,
        relaxationEnd: null,
        relaxationVolume: 50,
        favorites: [],
      }
      relaxationState.dispatch(setState(newState))
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

  return (
    <>
      <IonContent>
        <IonGrid>
          <TimeBar />
          <RelaxationFilter selected={selected} onSelect={onSelect} />
          <RelaxationFavorites />
          <RelaxationList />
        </IonGrid>
      </IonContent>
      <RelaxationFooter />
    </>
  )
}