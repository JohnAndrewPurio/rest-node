import { IonRouterOutlet, useIonAlert } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import { App as CapApp } from '@capacitor/app';

import { useEffect } from 'react';
import { isPlatform } from '@ionic/core';
import Home from '../../pages/Home';
import Login from '../../pages/Login';
import Profile from '../../pages/Profile';
import RestNode from '../../pages/RestNode';

import {
  DEFAULT,
  LOGIN,
  HOME,
  PROFILE,
  REST_NODE,
  DEVICE_SETUP
} from '../../pages/paths.json';
import Menu from '../Menu';
import DeviceSetup from '../../pages/DeviceSetup';

const AppRouter: React.FC = () => {
  const [present] = useIonAlert();

  useEffect(() => {
    if (!isPlatform('android'))
      return

    const alertConfig = {
      cssClass: 'my-css',
      header: 'Exit app?',
      message: '',
      buttons: ['No', { text: 'Yes', handler: () => CapApp.exitApp() }],
    }

    const hardwareBackHandlers = (event: any) => {
      const path = window.location.pathname;
      const onRestnodeTabs = path.includes('tabs');
      const isOnHome = path === HOME;
      const isOnProfile = path === PROFILE;

      event.detail.register(1, () => {
        if (!onRestnodeTabs && !isOnHome && !isOnProfile)
          return

        present(alertConfig);
      });
    };

    const cleanup = () => {
      document.removeEventListener('ionBackButton', hardwareBackHandlers);
    }

    document.addEventListener('ionBackButton', hardwareBackHandlers);

    return cleanup
  }, [present]);

  return (
    <IonReactRouter>
      <Menu />
      <IonRouterOutlet id="main">
        <Route exact path={LOGIN}>
          <Login />
        </Route>
        <Route exact path={HOME}>
          <Home />
        </Route>
        <Route path={REST_NODE} render={(props) => <RestNode {...props} />} />
        <Route path={PROFILE} component={Profile} />
        <Route path={DEVICE_SETUP} component={DeviceSetup} />
        <Route render={() => <Redirect to={DEFAULT} />} />
      </IonRouterOutlet>
    </IonReactRouter>
  );
};

export default AppRouter;
