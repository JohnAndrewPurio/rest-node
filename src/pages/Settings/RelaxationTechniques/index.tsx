import { IonContent, IonGrid, IonPage } from '@ionic/react';
import { useState } from 'react';
import SettingsHeader from '../../../components/SettingsHeader';
import TimeBar from '../../../components/TimeBar';
import RelaxationList from '../../../components/RelaxationList';
import './styles.css';
import RelaxationFilter from '../../../components/RelaxationFilter';
import RelaxationFavorites from '../../../components/RelaxationFavorites';
import { RelaxationContextProvider } from '../../../contextStore/RelaxationContext/relaxationContext';
import RelaxationFooter from '../../../components/RelaxationPlayer';

const Relaxation: React.FC = () => {
  const [selected, setSelected] = useState('All');

  const onSelect = (time: string) => {
    setSelected(time);
  };

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
