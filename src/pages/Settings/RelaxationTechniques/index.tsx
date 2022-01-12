import { IonPage } from '@ionic/react';
import RelaxationFooter from '../../../components/RelaxationPlayer';
import SettingsHeader from '../../../components/SettingsHeader';
import { RelaxationContextProvider } from '../../../contextStore/RelaxationContext/relaxationContext';
import Content from './Content';

interface Props {
  router: HTMLIonRouterOutletElement | null;
}

const Relaxation: React.FC<Props> = ({ router }) => {
  return (
    <RelaxationContextProvider>
      <IonPage>
        <SettingsHeader title="Relaxation Techniques" />
        <Content router={router} />
        <RelaxationFooter />
      </IonPage>
    </RelaxationContextProvider>
  );
};

export default Relaxation;
