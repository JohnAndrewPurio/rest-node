import {
  IonTabBar,
  IonTabs,
  IonTabButton,
  IonLabel,
  IonRouterOutlet,
  IonIcon,
} from '@ionic/react';
import { Redirect, Route, RouteComponentProps } from 'react-router';

import { home, informationCircle, time } from 'ionicons/icons';
import Dashboard from './Dashboard';
import History from './History';
import Help from './Help';

const BottomNavigationTabs: React.FC<RouteComponentProps> = ({ match }) => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route path="/restnode/:tab(history)" component={History} />
        <Route path="/restnode/:tab(help)" component={Help} />
        <Route path="/restnode/:tab(dashboard)" component={Dashboard} />
        <Route render={() => <Redirect to="/restnode/dashboard" />} />
      </IonRouterOutlet>

      <IonTabBar slot="bottom">
        <IonTabButton tab="history" href="/restnode/history">
          <IonIcon icon={time} />
          <IonLabel>History</IonLabel>
        </IonTabButton>

        <IonTabButton tab="dashboard" href="/restnode/dashboard">
          <IonIcon icon={home} />
          <IonLabel>Dashboard</IonLabel>
        </IonTabButton>

        <IonTabButton tab="help" href="/restnode/help">
          <IonIcon icon={informationCircle} />
          <IonLabel>Help</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default BottomNavigationTabs;
