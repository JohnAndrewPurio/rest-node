import { IonPage, IonRouterOutlet } from '@ionic/react';
import { Redirect, Route, RouteComponentProps } from 'react-router';
import { BedTimeContextProvider } from '../../contextStore/BedTimeContext/bedtimeContext';
import Bedtime from './Bedtime';
import Lights from './Lights';
import Relaxation from './RelaxationTechniques';
import Sounds from './Sounds';

const SettingsRouter: React.FC<RouteComponentProps> = () => {
  return (
    <BedTimeContextProvider>
      <IonPage>
        <IonRouterOutlet>
          <Route path="/settings/bedtime" component={Bedtime} />
          <Route path="/settings/sounds" component={Sounds} />
          <Route path="/settings/lights" component={Lights} />
          <Route path="/settings/relaxation" component={Relaxation} />
          <Route render={() => <Redirect to="/restnode/dashboard" />} />
        </IonRouterOutlet>
      </IonPage>
    </BedTimeContextProvider>
  );
};

export default SettingsRouter;
