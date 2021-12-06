import { FC } from 'react';
import { IonContent, IonGrid, IonPage, IonRow } from '@ionic/react';
import { page } from './styles';
import NetworkContext from '../../contextStore/NetworkContext';
import WifiList from './WifiList';

const Network: FC = () => {
  return (
    <NetworkContext>
      <IonPage
        style={page}
      >
        <IonContent className="ion-padding" fullscreen>
          <IonGrid>
            
            <IonRow className="ion-justify-content-center">
              <WifiList />
            </IonRow>

          </IonGrid>
        </IonContent>
      </IonPage>
    </NetworkContext>
  );
};

export default Network;