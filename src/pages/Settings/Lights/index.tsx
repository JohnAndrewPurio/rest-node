import { FC } from 'react';
import { IonPage } from '@ionic/react';
import { LightsContextProvider } from '../../../contextStore/LightsContext/lightsContext';

import SettingsHeader from '../../../components/SettingsHeader';
import Content from './Content';

import './styles.css';

const Lights: FC = () => {
  return (
    <IonPage>
      <LightsContextProvider>
        <SettingsHeader title="Lights Settings" />
        <Content />
      </LightsContextProvider>
    </IonPage>
  );
};

export default Lights;
