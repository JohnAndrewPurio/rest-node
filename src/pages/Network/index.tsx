import { FC } from 'react';
import { IonContent, IonGrid, IonPage, IonRow } from '@ionic/react';
import { page } from './styles';
import NetworkContext from '../../contextStore/NetworkContext';
import WifiList from './WifiList';

const Network: FC = () => {
  return (
    <IonPage
      style={page}
    >
      <NetworkContext>
        <IonContent className="ion-padding" fullscreen>
          <IonGrid>

            <IonRow className="ion-justify-content-center">
              <WifiList />
            </IonRow>

          </IonGrid>
        </IonContent>
      </NetworkContext>
    </IonPage>
  );
};

export default Network;