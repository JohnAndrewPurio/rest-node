import { FC } from 'react';
import { IonPage } from '@ionic/react';

import SettingsHeader from '../../../components/SettingsHeader';
import Content from './Content';

import { SoundsContextProvider } from '../../../contextStore/SoundsContext/soundsContext';

import { _styles } from './styles';
import './styles.css';

const Sounds: FC = () => {
  return (
    <SoundsContextProvider>
      <IonPage>
        <SettingsHeader title="Sounds Settings" />
        <Content />
      </IonPage>
    </SoundsContextProvider>
  );
};

export default Sounds;
