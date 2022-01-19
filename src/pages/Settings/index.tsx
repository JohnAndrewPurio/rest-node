import { IonPage, IonRouterOutlet } from '@ionic/react';
import { Redirect, Route, RouteComponentProps } from 'react-router';
import Bedtime from './Bedtime';
import Lights from './Lights';
import Relaxation from './RelaxationTechniques';
import Sounds from './Sounds';
import { LIGHTS, SOUNDS, BEDTIME, RELAXATION } from './paths.json';
import { DASHBOARD } from '../Tabs/paths.json';
import { useRef } from 'react';

const SettingsRouter: React.FC<RouteComponentProps> = () => {
  const routerRef = useRef<HTMLIonRouterOutletElement | null>(null);

  return (
    <IonPage>
      <IonRouterOutlet ref={routerRef}>
        <Route path={BEDTIME} component={Bedtime} />
        <Route path={SOUNDS} component={Sounds} />
        <Route path={LIGHTS} component={Lights} />
        <Route
          path={RELAXATION}
          render={() => <Relaxation router={routerRef.current} />}
        />
        <Route render={() => <Redirect to={DASHBOARD} />} />
      </IonRouterOutlet>
    </IonPage>
  );
};

export default SettingsRouter;
