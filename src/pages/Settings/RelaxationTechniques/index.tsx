import {
  IonButton,
  IonCol,
  IonContent,
  IonFooter,
  IonGrid,
  IonIcon,
  IonPage,
  IonRow,
  IonToolbar,
} from '@ionic/react';
import { pause, play, playBack, playForward } from 'ionicons/icons';
import { useState } from 'react';
import SettingsHeader from '../../../components/SettingsHeader';
import TimeBar from '../../../components/TimeBar';
import RelaxationList from '../../../components/RelaxationList';
import './styles.css';
import RelaxationFilter from '../../../components/RelaxationFilter';
import RelaxationFavorites from '../../../components/RelaxationFavorites';

const Relaxation: React.FC = () => {
  const _styles = {
    playBtn: {
      height: '6vh',
      width: '6vh',
      margin: '1.5vh 0vh',
      '--padding-start': '0px',
      '--padding-end': '0px',
      '--padding-top': '0px',
      '--padding-bottom': '0px',
    },
    icon: {
      margin: 0,
    },
    iconGoBack: {
      margin: 0,
      transform: 'scale(-1, 1) rotate(35deg)',
      transformOrigin: 'center',
    },
    paddingZero: {
      padding: 0,
    },
    footerGrid: {
      display: 'flex',
      alignItems: 'center',
    },
  };

  const [playing, setPlaying] = useState(false);

  return (
    <IonPage>
      <SettingsHeader title="Relaxation Techniques" />
      <IonContent>
        <IonGrid>
          <TimeBar />
          <RelaxationFilter />
          <RelaxationFavorites />
          <RelaxationList />
        </IonGrid>
      </IonContent>
      <IonFooter>
        <IonToolbar>
          <IonGrid style={_styles.footerGrid}>
            <IonCol size="auto">
              <IonButton
                fill="clear"
                shape="round"
                size="small"
                style={_styles.playBtn}
              >
                <IonIcon
                  color="primary"
                  style={_styles.icon}
                  icon={playBack}
                  slot="icon-only"
                />
              </IonButton>
              <IonButton
                onClick={() => setPlaying((p) => !p)}
                shape="round"
                size="small"
                style={_styles.playBtn}
              >
                {playing ? (
                  <IonIcon
                    color="light"
                    style={_styles.icon}
                    icon={pause}
                    slot="icon-only"
                  />
                ) : (
                  <IonIcon
                    color="light"
                    style={_styles.icon}
                    icon={play}
                    slot="icon-only"
                  />
                )}
              </IonButton>
              <IonButton
                fill="clear"
                shape="round"
                size="small"
                style={_styles.playBtn}
              >
                <IonIcon
                  color="primary"
                  style={_styles.icon}
                  icon={playForward}
                  slot="icon-only"
                />
              </IonButton>
            </IonCol>
            <IonCol>
              <IonGrid style={_styles.paddingZero}>
                <IonRow style={{ fontWeight: 700 }}>Title title</IonRow>
                <IonRow style={{ fontSize: '.7rem' }}>Creator</IonRow>
              </IonGrid>
            </IonCol>
          </IonGrid>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default Relaxation;
