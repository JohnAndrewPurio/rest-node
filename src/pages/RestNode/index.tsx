import { IonContent, IonPage, IonRouterOutlet, useIonAlert, useIonLoading } from '@ionic/react';
import { Redirect, Route, RouteComponentProps } from 'react-router';
import { BedTimeContextProvider } from '../../contextStore/BedTimeContext/bedtimeContext';
import SettingsRouter from '../Settings';
import { DASHBOARD } from '../Tabs/paths.json'

import Tabs from '../Tabs';
import { useEffect, useState } from 'react';
import { RestnodeService } from '../../services/restnodeServices';

const RestNode: React.FC<RouteComponentProps> = (props) => {

  const [startLoading, stopLoading] = useIonLoading()
  const [loading, setLoading] = useState<null | boolean>(false)
  const [loaded, setLoaded] = useState(false)
  const [present] = useIonAlert();

  const getInitialValues = async () => {
    try {
      setLoading(true)
      await RestnodeService.getLastValues()
      setLoaded(true)
      setLoading(false)
    }
    catch (e) {
      setLoading(false)
      present({
        cssClass: 'my-css',
        header: 'Error',
        message: 'Cannot connect to REST Node',
        buttons: [
          'Ok'
        ],
        onDidDismiss: (e) => props.history.replace('/profile'),
      })
    }
  }

  useEffect(() => {
    if (loading) {
      startLoading({
        showBackdrop: true,
        message: "Loading..."
      })
    }
    else {
      stopLoading()
    }
  }, [loading])

  useEffect(() => {
    getInitialValues()
  }, [])

  return (
    <BedTimeContextProvider>
      <IonPage>
        {loaded && !loading &&
          <IonContent>
            <IonRouterOutlet>
              <Route path="/restnode/tabs/:tab" render={() => <Tabs {...props} />} />
              <Route path="/restnode/settings/:page" render={() => <SettingsRouter {...props} />} />
              <Redirect exact from="/restnode" to={DASHBOARD} />
            </IonRouterOutlet>
          </IonContent>
        }
      </IonPage>
    </BedTimeContextProvider >
  );
};

export default RestNode;
