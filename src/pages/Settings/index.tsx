import { IonPage, IonRouterOutlet } from '@ionic/react';
import { Redirect, Route, RouteComponentProps } from 'react-router';
import Bedtime from './Bedtime';
import Lights from './Lights';
import Relaxation from './RelaxationTechniques';
import Sounds from './Sounds';
import { LIGHTS, SOUNDS, BEDTIME, RELAXATION } from './paths.json'
import { DASHBOARD } from "../Tabs/paths.json"

const SettingsRouter: React.FC<RouteComponentProps> = () => {
  return (
      <IonPage>
        <IonRouterOutlet>
          <Route path={BEDTIME} component={Bedtime} />
          <Route path={SOUNDS} component={Sounds} />
          <Route path={LIGHTS} component={Lights} />
          <Route path={RELAXATION} component={Relaxation} />
          <Route render={() => <Redirect to={DASHBOARD} />} />
        </IonRouterOutlet>
      </IonPage>
  );
};

export default SettingsRouter;
