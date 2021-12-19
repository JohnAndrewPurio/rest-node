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

import styles from './styles.module.css';
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
        <IonToolbar
          className={styles.toolbar}
        >
          <IonButtons
            slot="start"
            className={styles.fullHeight}
          >
            <IonMenuButton
              mode="md"
            />
          </IonButtons>
          <IonGrid
            className={styles.grid}
          >
            <IonSearchbar
              mode="ios"
              color="light"
              className={styles.search}
              value={searchText}
              onIonChange={(e) => setSearchText(e.detail.value!)}
            />
            <IonButton
              className={styles.avatarBtn}
              shape="round"
              size="small"
              fill="clear"
            >
              <IonAvatar
                slot="icon-only"
                className={styles.avatar}
              >
                <img src={user?.picture} alt="User Avatar" />
              </IonAvatar>
            </IonButton>
          </IonGrid>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonGrid
          className={styles.content}
        >
          <CompanyLogo />
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Home;
