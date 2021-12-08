import { IonPage } from '@ionic/react';
import RelaxationFooter from '../../../components/RelaxationPlayer';
import SettingsHeader from '../../../components/SettingsHeader';
import { RelaxationContextProvider } from '../../../contextStore/RelaxationContext/relaxationContext';
import Content from './Content';

const Relaxation: React.FC = () => {
  return (
    <RelaxationContextProvider>
      <IonPage>
        <SettingsHeader title="Relaxation Techniques" />
        <Content />
        <RelaxationFooter />
      </IonPage>
    </RelaxationContextProvider>
  );
};

export default Relaxation;