import { FC } from 'react';
import {
  IonTabBar,
  IonTabs,
  IonTabButton,
  IonLabel,
  IonRouterOutlet,
  IonIcon,
} from '@ionic/react';
import { Redirect, Route, RouteComponentProps } from 'react-router';

import {
  home,
  // informationCircle, time
} from 'ionicons/icons';
import Dashboard from './Dashboard';
import {
  // HELP, HISTORY,
  DASHBOARD,
} from './paths.json';

const BottomNavigationTabs: FC<RouteComponentProps> = () => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        {/* <Route path={HISTORY} component={History} />
        <Route path={HELP} component={Help} /> */}
        <Route path={DASHBOARD} component={Dashboard} />
        <Redirect exact from="/restnode/tabs" to={DASHBOARD} />
      </IonRouterOutlet>

      <IonTabBar slot="bottom">
        {/* <IonTabButton tab="history" href={HISTORY}>
          <IonIcon icon={time} />
          <IonLabel>History</IonLabel>
        </IonTabButton> */}

        <IonTabButton tab="dashboard" href={DASHBOARD}>
          <IonIcon icon={home} />
          <IonLabel>Dashboard</IonLabel>
        </IonTabButton>

        {/* <IonTabButton tab="help" href={HELP}>
          <IonIcon icon={informationCircle} />
          <IonLabel>Help</IonLabel>
        </IonTabButton> */}
      </IonTabBar>
    </IonTabs>
  );
};

export default BottomNavigationTabs;
