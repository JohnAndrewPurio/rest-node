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
import { useContext, useEffect, useState } from 'react';
import CompanyLogo from '../../components/CompanyLogo';
import MenuContext from '../../contextStore/AppContext/menuContext';
import UserContext from '../../contextStore/UserContext/userContext';
import _styles from './styles';
import './styles.css';

const Home: React.FC = () => {
  const user = useContext(UserContext);

  const [searchText, setSearchText] = useState('');

  const [, setSwiper] = useContext(MenuContext);

  useEffect(() => {
    if (setSwiper) {
      setSwiper(true);
    }
    return () => {
      if (setSwiper) setSwiper(false);
    };
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
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
                <img src={user?.picture} />
              </IonAvatar>
            </IonButton>
          </IonGrid>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonGrid style={_styles.content}>
          {/* <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Blank</IonTitle>
          </IonToolbar>
        </IonHeader> */}
          <CompanyLogo />
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Home;
