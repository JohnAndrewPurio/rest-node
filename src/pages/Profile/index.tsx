import { FC, useContext, useEffect } from 'react';
import {
  IonAvatar,
  IonBackButton,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonItem,
  IonItemGroup,
  IonLabel,
  IonList,
  IonListHeader,
  IonPage,
  IonRow,
  IonTitle,
  IonToggle,
  useIonLoading,
} from '@ionic/react';
import { Browser } from '@capacitor/browser';
import { useAuth0 } from '@auth0/auth0-react';
import {
  helpCircle,
  logOutOutline,
  mail,
  moon,
  navigate,
} from 'ionicons/icons';
import UserContext, { geoip } from '../../contextStore/userContext';
import LoadingContext from '../../contextStore/loadingContext';

import logOut from '../../utils/logOut';
import { logoutUri } from '../../auth0.config';
import { getAddress } from '../../utils/userGeoIP';
import { REST_NODE } from '../paths.json';

const Profile: FC = () => {
  const user = useContext(UserContext);
  const [loading, setIsLoading] = useContext(LoadingContext) || [null, null];
  const { buildLogoutUrl, isLoading, logout } = useAuth0();
  const [startLoading, stopLoading] = useIonLoading();
  const address = getAddress(user);

  const logoutHandler = () => {
    logOut(Browser, buildLogoutUrl, logout, logoutUri);
  };

  useEffect(() => {
    if (setIsLoading) setIsLoading(isLoading);
  }, [isLoading]);

  useEffect(() => {
    if (loading) {
      startLoading('Loading', undefined, 'dots');

      return;
    }

    stopLoading();
  }, [loading]);

  if (!user) return null;

  return (
    <IonPage>
      <IonHeader>
        <IonItem>
          <IonBackButton defaultHref={REST_NODE} />
          <IonTitle>Profile</IonTitle>
        </IonItem>
      </IonHeader>
      <IonContent className="ion-padding" fullscreen>
        <IonGrid>
          <IonRow className="ion-justify-content-center">
            <IonAvatar>
              <img src={user.picture} alt={user.name} />
            </IonAvatar>
          </IonRow>

          <IonRow className="ion-justify-content-center">
            <h2>{user.name}</h2>
          </IonRow>

          <IonRow>
            <IonList
              style={{
                width: '100%',
              }}
            >
              <IonItem button onClick={logoutHandler}>
                <IonIcon icon={moon} slot="start" />
                <IonLabel>Dark Mode</IonLabel>
                <IonToggle />
              </IonItem>
            </IonList>
          </IonRow>

          <IonRow>
            <IonList
              lines="full"
              style={{
                width: '100%',
              }}
            >
              <IonItemGroup>
                <IonListHeader>
                  <h4>Basic Info</h4>
                </IonListHeader>

                <IonItem>
                  <IonIcon icon={mail} slot="start" />
                  <IonLabel>
                    <h5>Email:</h5>
                    <p>{user.email}</p>
                  </IonLabel>
                </IonItem>
                <IonItem>
                  <IonIcon icon={navigate} slot="start" />
                  <IonLabel>
                    <h5>Address:</h5>
                    <p>{address}</p>
                  </IonLabel>
                </IonItem>
              </IonItemGroup>
            </IonList>
          </IonRow>

          <IonRow>
            <IonList
              lines="full"
              style={{
                width: '100%',
              }}
            >
              <IonListHeader>
                <h4>Account</h4>
              </IonListHeader>

              <IonItem href="#">
                <IonIcon icon={helpCircle} slot="start" />
                <IonLabel>
                  <h5>Help</h5>
                  <p>Product Manual</p>
                </IonLabel>
              </IonItem>
              <IonItem button onClick={logoutHandler}>
                <IonIcon icon={logOutOutline} slot="start" />
                <IonLabel>
                  <h5>Log Out</h5>
                  <p>{user.email}</p>
                </IonLabel>
              </IonItem>
            </IonList>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Profile;
