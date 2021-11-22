import { IonRouterOutlet, useIonAlert } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import { App as CapApp } from '@capacitor/app';

import { useEffect } from 'react';
import { isPlatform } from '@ionic/core';
import Home from '../../pages/Home';
import Login from '../../pages/Login';
import Network from '../../pages/Network';
import Profile from '../../pages/Profile';
import RestNode from '../../pages/RestNode';

import {
  DEFAULT,
  LOGIN,
  HOME,
  NETWORK,
  PROFILE,
  REST_NODE,
} from '../../pages/paths.json';
import Menu from '../Menu';

const AppRouter: React.FC = () => {
  const [present] = useIonAlert();

  const hardwareBackHandlers = (ev: any) => {
    const path = window.location.pathname;
    const onRestnodeTabs = path.includes('tabs');
    const isOnHome = path === '/home';
    const isOnProfile = path === '/profile';

    ev.detail.register(1, () => {
      if (onRestnodeTabs || isOnHome || isOnProfile) {
        present({
          cssClass: 'my-css',
          header: 'Exit app?',
          message: '',
          buttons: ['No', { text: 'Yes', handler: (d) => CapApp.exitApp() }],
        });
      }
    });
  };

  useEffect(() => {
    if (isPlatform('android')) {
      document.addEventListener('ionBackButton', hardwareBackHandlers);
    }
    return () => {
      if (isPlatform('android')) {
        document.removeEventListener('ionBackButton', hardwareBackHandlers);
      }
    };
  }, []);

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
        <Route path={NETWORK} component={Network} />
        <Route path={PROFILE} component={Profile} />
        <Route render={() => <Redirect to={DEFAULT} />} />
      </IonRouterOutlet>
    </IonReactRouter>
  );
};

export default AppRouter;
