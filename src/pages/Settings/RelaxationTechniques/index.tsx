import { IonContent, IonGrid, IonPage } from '@ionic/react';
import { useContext, useEffect, useState } from 'react';
import SettingsHeader from '../../../components/SettingsHeader';
import TimeBar from '../../../components/TimeBar';
import RelaxationList from '../../../components/RelaxationList';
import './styles.css';
import RelaxationFilter from '../../../components/RelaxationFilter';
import RelaxationFavorites from '../../../components/RelaxationFavorites';
import { RelaxationContextProvider } from '../../../contextStore/RelaxationContext/relaxationContext';
import RelaxationFooter from '../../../components/RelaxationPlayer';
import BedTimeContext from '../../../contextStore/BedTimeContext/bedtimeContext';
import moment from 'moment';
import { bedtimeStarted } from '../../../contextStore/BedTimeContext/bedtimeActions';

const Relaxation: React.FC = () => {
  const [selected, setSelected] = useState('All');

  const onSelect = (time: string) => {
    setSelected(time);
  };

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
    <RelaxationContextProvider>
      <IonPage>
        <SettingsHeader title="Relaxation Techniques" />
        <IonContent>
          <IonGrid>
            <TimeBar />
            <RelaxationFilter selected={selected} onSelect={onSelect} />
            <RelaxationFavorites />
            <RelaxationList />
          </IonGrid>
        </IonContent>
        <RelaxationFooter />
      </IonPage>
    </RelaxationContextProvider>
  );
};

export default Relaxation;
