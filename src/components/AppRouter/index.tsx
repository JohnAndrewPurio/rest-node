import { IonRouterOutlet, useIonAlert } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import { App as CapApp } from '@capacitor/app';

import Home from '../../pages/Home';
import Login from '../../pages/Login';
import Network from '../../pages/Network';
import Profile from '../../pages/Profile';
import RestNode from '../../pages/RestNode';
import SettingsRouter from '../../pages/Settings';
import { RouteComponentProps, withRouter } from 'react-router'

import {
  DEFAULT,
  LOGIN,
  HOME,
  NETWORK,
  PROFILE,
  REST_NODE,
} from '../../pages/paths.json';
import { useEffect } from 'react';

const AppRouter: React.FC = () => {

  const [present] = useIonAlert();

  const hardwareBackHandlers = (ev: any) => {
    const path = window.location.pathname;

    ev.detail.register(1, () => {
      if (path.includes('tabs')) {
        present({
          cssClass: 'my-css',
          header: 'Exit app?',
          message: '',
          buttons: [
            'No',
            { text: 'Yes', handler: (d) => CapApp.exitApp() },
          ]
        })
      }
    });
  }

  useEffect(() => {
    document.addEventListener('ionBackButton', hardwareBackHandlers)
    return () => document.removeEventListener('ionBackButton', hardwareBackHandlers)
  }, [])

  return (
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path={LOGIN}>
          <Login />
        </Route>
        <Route exact path={HOME}>
          <Home />
        </Route>
        <Route path={REST_NODE} render={(props) => <RestNode {...props} />} />
        <Route path={NETWORK} component={Network} />
        <Route path={PROFILE} component={Profile} />
        <Route render={() => <Redirect to={DEFAULT} />} />
      </IonRouterOutlet>
    </IonReactRouter>
  );
};

export default AppRouter;

