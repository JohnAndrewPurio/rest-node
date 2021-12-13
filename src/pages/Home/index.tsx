import {
  IonAvatar,
  IonButton,
  IonButtons,
  IonContent,
  IonGrid,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonSearchbar,
  IonToolbar,
} from '@ionic/react';
import { FC, useContext, useEffect, useState } from 'react';
import CompanyLogo from '../../components/CompanyLogo';
import MenuContext from '../../contextStore/AppContext/menuContext';
import UserContext from '../../contextStore/UserContext/userContext';
import _styles from './styles';
import './styles.css';

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
            <IonSearchbar
              mode="ios"
              color="light"
              style={_styles.search}
              value={searchText}
              onIonChange={(e) => setSearchText(e.detail.value!)}
            />
            <IonButton
              style={_styles.avatarBtn}
              shape="round"
              size="small"
              fill="clear"
            >
              <IonAvatar slot="icon-only" style={_styles.avatar}>
                <img src={user?.picture} alt="User Avatar" />
              </IonAvatar>
            </IonButton>
          </IonGrid>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonGrid style={_styles.content}>
          <CompanyLogo />
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Home;
