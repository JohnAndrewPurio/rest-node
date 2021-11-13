import { useEffect, FC } from 'react';
import { IonHeader, IonPage, IonText } from '@ionic/react';

const Network: FC = () => {
  return (
    <IonPage
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <IonHeader>
        <IonText
          style={{
            color: 'white',
            overflowY: 'auto',
          }}
        >
          Network
        </IonText>
      </IonHeader>
    </IonPage>
  );
};

export default Network;
