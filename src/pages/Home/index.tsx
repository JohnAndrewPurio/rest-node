import {
  IonAvatar,
  IonButton,
  IonButtons,
  IonContent,
  IonGrid,
  IonHeader,
  IonImg,
  IonMenuButton,
  IonPage,
  IonSearchbar,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { useContext, useEffect, useState } from 'react';
import CompanyLogo from '../../components/CompanyLogo';
import MenuContext from '../../contextStore/AppContext/menuContext';
import UserContext from '../../contextStore/UserContext/userContext';
import './styles.css';

const Home: React.FC = () => {

  const _style = {
    content: {
      paddingTop: "3em",
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    },
    search: {
      padding: "0em .5em 0em 0em",
      flex: 1
    },
    avatarBtn: {
      height: "100%",
      '--padding-start': '0px',
      '--padding-end': '0px',
      '--padding-top': '0px',
      '--padding-bottom': '0px',
    },
    avatar: {
      width: "40px",
      height: "40px"
    },
    grid: {
      display: "flex",
      alignItems: "center",
      backgroundColor: "var(--ion-color-light-shade)",
      margin: ".5em .5em .5em 0em",
      borderRadius: "50px",
      padding: "0em .5em"
    }
  }

  const user = useContext(UserContext);

  const [searchText, setSearchText] = useState("")

  const [, setSwiper] = useContext(MenuContext)

  useEffect(() => {
    if (setSwiper) {
      setSwiper(true)
    }
    return () => { if (setSwiper) setSwiper(false) }
  }, [])

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonGrid style={_style.grid}>
            <IonSearchbar mode="ios" color="light" style={_style.search} value={searchText} onIonChange={e => setSearchText(e.detail.value!)}>
            </IonSearchbar>
            <IonButton style={_style.avatarBtn} shape="round" size="small" fill="clear">
              <IonAvatar slot="icon-only" style={_style.avatar}>
                <img src={user?.picture} />
              </IonAvatar>
            </IonButton>
          </IonGrid>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonGrid style={_style.content}>
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
