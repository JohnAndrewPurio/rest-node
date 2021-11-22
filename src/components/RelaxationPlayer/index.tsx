import {
  IonButton,
  IonCol,
  IonFooter,
  IonGrid,
  IonIcon,
  IonRange,
  IonRow,
  IonToolbar,
} from '@ionic/react';
import {
  pause,
  play,
  // playBack,
  // playForward,
  volumeHigh,
  volumeLow,
} from 'ionicons/icons';
import { useContext } from 'react';
import {
  adjustVolume,
  toggleRelaxation,
} from '../../contextStore/RelaxationContext/relaxationActions';
import RelaxationContext from '../../contextStore/RelaxationContext/relaxationContext';
import _styles from './styles';

const RelaxationFooter: React.FC = () => {
  const { state, dispatch } = useContext(RelaxationContext);
  const { relaxationPlaying } = state;

  return (
    <IonFooter>
      <IonToolbar>
        <IonGrid style={_styles.footerGrid}>
          <IonCol size="auto">
            {/* <IonButton
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
            </IonButton> */}
            <IonButton
              onClick={() => dispatch(toggleRelaxation())}
              shape="round"
              size="small"
              style={_styles.playBtn}
            >
              {relaxationPlaying.night ? (
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
            {/* <IonButton
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
            </IonButton> */}
          </IonCol>
          <IonCol size="auto" style={_styles.title}>
            <IonGrid>
              <IonRow style={{ fontWeight: 700 }}>
                Title title title title title
              </IonRow>
              <IonRow style={{ fontSize: '.7rem' }}>Creator</IonRow>
            </IonGrid>
          </IonCol>
          <IonCol style={_styles.volume}>
            <IonRange
              style={_styles.range}
              color="primary"
              value={state.relaxationVolume.night}
              onIonChange={(e: any) => {
                const val = e.target.value;
                if (val) {
                  dispatch(adjustVolume(e.target.value));
                }
              }}
            >
              <IonIcon
                size="small"
                color="primary"
                slot="start"
                icon={volumeLow}
              />
              <IonIcon
                size="small"
                color="primary"
                slot="end"
                icon={volumeHigh}
              />
            </IonRange>
          </IonCol>
        </IonGrid>
      </IonToolbar>
    </IonFooter>
  );
};

export default RelaxationFooter;
