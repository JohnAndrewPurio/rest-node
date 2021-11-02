import { useContext } from 'react';
import {
  IonFab,
  IonGrid,
  IonIcon,
  IonRow,
  IonCol,
  IonFabButton,
} from '@ionic/react';
import {
  logoGoogle,
  logoFacebook,
  logoTwitter,
  logoApple,
} from 'ionicons/icons';
import './styles.css';

import { googleSignIn } from '../../api/firebaseAuth';
import UserContext from '../../contextStore/userContext';

const SigninProviders: React.FC = () => {
  const userData = useContext(UserContext);

  console.log(userData);

  return (
    <IonGrid id="sign-in-provider-grid">
      <IonRow>
        <IonCol id="centered-col">
          <IonFab>
            <IonFabButton onClick={googleSignIn}>
              <IonIcon icon={logoGoogle} />
            </IonFabButton>
          </IonFab>
        </IonCol>

        <IonCol id="centered-col">
          <IonFab>
            <IonFabButton>
              <IonIcon icon={logoTwitter} />
            </IonFabButton>
          </IonFab>
        </IonCol>

        <IonCol id="centered-col">
          <IonFab>
            <IonFabButton>
              <IonIcon icon={logoFacebook} />
            </IonFabButton>
          </IonFab>
        </IonCol>

        <IonCol id="centered-col">
          <IonFab>
            <IonFabButton>
              <IonIcon icon={logoApple} />
            </IonFabButton>
          </IonFab>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};

export default SigninProviders;
