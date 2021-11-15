import {
  IonContent,
  IonPage,
  IonRouterOutlet,
  useIonAlert,
  useIonLoading,
} from '@ionic/react';
import { Redirect, Route, RouteComponentProps } from 'react-router';
import { useContext, useEffect, useState } from 'react';
import { BedTimeContextProvider } from '../../contextStore/BedTimeContext/bedtimeContext';
import SettingsRouter from '../Settings';
import { DASHBOARD } from '../Tabs/paths.json';

import Tabs from '../Tabs';
import {
  getLastValues,
  initializeWebsocketConnection,
} from '../../services/restnodeServices';
import TargetAddressContext from '../../contextStore/NetworkContext/targetAddress';
import { BASE_URL } from '../../services/constants';
import SocketContext from '../../contextStore/RestNodeContext/socketConnection';

const RestNode: React.FC<RouteComponentProps> = (props) => {
  const [targetAddress] = useContext(TargetAddressContext);
  const [socket] = useState<WebSocket>(
    initializeWebsocketConnection(targetAddress, 'ws')
  );

  const [startLoading, stopLoading] = useIonLoading();
  const [loading, setLoading] = useState<null | boolean>(false);
  const [loaded, setLoaded] = useState(false);
  const [present] = useIonAlert();

  const getInitialValues = async () => {
    const url = targetAddress || BASE_URL;
    const protocol = targetAddress ? 'http' : 'https';

    try {
      setLoading(true);
      await getLastValues(url, protocol);
      setLoaded(true);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      present({
        cssClass: 'my-css',
        header: 'Error',
        message: 'Cannot connect to REST Node',
        buttons: ['Ok'],
        onDidDismiss: (e) => props.history.replace('/profile'),
      });
    }
  };

  useEffect(() => {
    if (loading) {
      startLoading({
        showBackdrop: true,
        message: 'Loading...',
      });
    } else {
      stopLoading();
    }
  }, [loading]);

  useEffect(() => {
    getInitialValues();
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      <BedTimeContextProvider>
        <IonPage>
          {loaded && !loading && (
            <IonContent>
              <IonRouterOutlet>
                <Route
                  path="/restnode/tabs/:tab"
                  render={() => <Tabs {...props} />}
                />
                <Route
                  path="/restnode/settings/:page"
                  render={() => <SettingsRouter {...props} />}
                />
                <Redirect exact from="/restnode" to={DASHBOARD} />
              </IonRouterOutlet>
            </IonContent>
          )}
        </IonPage>
      </BedTimeContextProvider>
    </SocketContext.Provider>
  );
};

export default RestNode;
