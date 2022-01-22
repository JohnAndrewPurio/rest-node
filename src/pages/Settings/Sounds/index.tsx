import { FC } from 'react';
import { IonPage } from '@ionic/react';

import SettingsHeader from '../../../components/SettingsHeader';
import Content from './Content';

import { SoundsContextProvider } from '../../../contextStore/SoundsContext/soundsContext';

const Sounds: FC = () => (
    <SoundsContextProvider>
        <IonPage>
            <SettingsHeader title="Sounds Settings" />
            <Content />
        </IonPage>
    </SoundsContextProvider>
);

export default Sounds;
