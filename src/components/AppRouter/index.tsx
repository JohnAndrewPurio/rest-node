import { IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';

import Home from '../../pages/Home';
import Login from '../../pages/Login';
import Network from '../../pages/Network';
import Profile from '../../pages/Profile';
import RestNode from '../../pages/RestNode';
import SettingsRouter from '../../pages/Settings';

import { DEFAULT, LOGIN, HOME, NETWORK, PROFILE, REST_NODE, SETTINGS } from '../../pages/paths.json';

const AppRouter: React.FC = () => {
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
        <Route
          path={SETTINGS}
          render={(props) => <SettingsRouter {...props} />}
        />
        <Route
          path={NETWORK}
          component={Network}
        />
        <Route
          path={PROFILE}
          component={Profile}
        />
        <Route render={() => <Redirect to={DEFAULT} />} />
      </IonRouterOutlet>
    </IonReactRouter>
  );
};

export default AppRouter;
