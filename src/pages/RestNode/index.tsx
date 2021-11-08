import { IonContent, IonPage } from '@ionic/react';
import { RouteComponentProps } from 'react-router';

import Tabs from '../Tabs';

const RestNode: React.FC<RouteComponentProps> = (props) => {
  return (
    <IonPage>
      <IonContent>
        <Tabs {...props} />
      </IonContent>
    </IonPage>
  );
};

export default RestNode;
