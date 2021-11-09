import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonHeader,
  IonIcon,
  IonTitle,
  IonToolbar,
  useIonAlert,
  useIonViewWillLeave,
} from '@ionic/react';
import { arrowBack } from 'ionicons/icons';
import { useContext, useEffect } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import BedTimeContext from '../../contextStore/BedTimeContext/bedtimeContext';

interface Props extends RouteComponentProps<{
  id: string;
}> {
  title: string;
}

const SettingsHeader: React.FC<Props> = ({ title, history }) => {

  const { state } = useContext(BedTimeContext)
  const { started } = state

  const [present] = useIonAlert();

  const goBack = (history: any) => {
    if (!started) {
      present({
        cssClass: 'my-css',
        header: 'Save changes?',
        message: '',
        buttons: [
          'No',
          { text: 'Yes', handler: (d) => history.goBack() },
        ]
      })
    }
    else {
      history.goBack()
    }
  }

  const hardwareBackHandlers = (ev: any) => {
    const path = window.location.pathname;

    ev.detail.register(5, (processNextHandler: any) => {
      if (path.includes('settings')) {
        goBack(history)
      }
      else {
        processNextHandler()
      }
    });
  }

  useEffect(() => {
    document.addEventListener('ionBackButton', hardwareBackHandlers)
    return () => document.removeEventListener('ionBackButton', hardwareBackHandlers)
  }, [started])

  return (
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonButton onClick={() => goBack(history)}>
            <IonIcon icon={arrowBack} slot='icon-only' />
          </IonButton>
        </IonButtons>
        <IonTitle>{title}</IonTitle>
      </IonToolbar>
    </IonHeader>
  );
};

export default withRouter(SettingsHeader);
