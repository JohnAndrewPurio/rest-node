import {
  IonAvatar,
  IonButton,
  IonButtons,
  IonContent,
  IonGrid,
  IonHeader,
  IonLabel,
  IonMenuButton,
  IonPage,
  IonRouterLink,
  IonSearchbar,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { FC, useContext, useEffect, useState } from 'react';
import CompanyLogo from '../../components/CompanyLogo';
import DevicesList from '../../components/DevicesList';
import MenuContext from '../../contextStore/AppContext/menuContext';
import UserContext from '../../contextStore/UserContext/userContext';
import _styles from './styles';
import './styles.css';
import { PROFILE } from "../paths.json"

const Home: FC = () => {
  const user = useContext(UserContext);

  const [searchText, setSearchText] = useState('');

  const [, setSwiper] = useContext(MenuContext);

  useEffect(() => {
    if (!setSwiper)
      return

    setSwiper(true);

    return () => {
      setSwiper(false);
    };

    // eslint-disable-next-line
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar style={_styles.toolbar}>
          <IonButtons slot="start" style={{ height: "100%" }}>
            <IonMenuButton mode="md" />
          </IonButtons>
          <IonGrid style={_styles.grid}>
            {/* <IonSearchbar
              mode="ios"
              color="light"
              style={_styles.search}
              value={searchText}
              onIonChange={(e) => setSearchText(e.detail.value!)}
            /> */}
            <IonTitle style={_styles.headerTitle} size='large'>REST NODE</IonTitle>
            <IonButton
              style={_styles.avatarBtn}
              shape="round"
              size="small"
              fill="clear"
            >
              <IonRouterLink slot="icon-only" routerLink={PROFILE}>
                <IonAvatar style={_styles.avatar}>
                  <img src={user?.picture} alt="User Avatar" />
                </IonAvatar>
              </IonRouterLink>
            </IonButton>
          </IonGrid>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding" fullscreen>
        <IonLabel style={_styles.devices}>Your Devices:</IonLabel>
        <DevicesList />
      </IonContent>
    </IonPage>
  );
};

export default Home;
