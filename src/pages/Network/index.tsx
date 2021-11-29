import { useEffect, FC, useContext } from 'react';
import { IonHeader, IonPage, IonText } from '@ionic/react';
import UserContext from '../../contextStore/UserContext/userContext';
import { Redirect } from 'react-router';

const Network: FC = () => {
  

  const user = useContext(UserContext);

  if (!user) 
    return <Redirect to="/login" />;

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
