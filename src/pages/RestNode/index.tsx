import { FC, useContext } from 'react';
import { IonContent, IonPage, IonRouterOutlet } from '@ionic/react';
import { Redirect, Route, RouteComponentProps } from 'react-router';
import SettingsRouter from '../Settings';
import { DASHBOARD } from '../Tabs/paths.json';

import Tabs from '../Tabs';
import RestNodeContext from '../../contextStore/RestNodeContext';
import UserContext from '../../contextStore/UserContext/userContext';

const RestNode: FC<RouteComponentProps> = (props) => {

  const user = useContext(UserContext);

  if (!user) 
    return <Redirect to="/login" />;

  return (
    <IonPage>
      <RestNodeContext {...props}>
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
      </RestNodeContext>
    </IonPage>
  );
};

export default RestNode;
