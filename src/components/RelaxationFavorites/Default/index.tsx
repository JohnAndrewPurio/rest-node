import {
  IonButton,
  IonCol,
  IonGrid,
  IonIcon,
  IonImg,
  IonRow,
  IonSlide,
} from '@ionic/react';
import { pause, play } from 'ionicons/icons';
import _styles from '../styles';

interface DefaultProps {
  showPlay: (i: number) => void;
  playingIndex: number | null;
  playSong: () => void;
  playing: boolean;
}

const DefaultSlide: React.FC<DefaultProps> = ({
  showPlay,
  playingIndex,
  playSong,
  playing,
}) => {
  return (
    <IonSlide key="default-slide" style={_styles.slide}>
      <IonCol style={_styles.card}>
        <IonRow
          style={_styles.sliderPictureContainer}
          onClick={() => showPlay(-1)}
        >
          <IonImg
            style={_styles.sliderIonImage}
            src="https://picsum.photos/200"
          />
          <div style={_styles.lengthIndicator}>05:14</div>
          {playingIndex === -1 && (
            <div style={_styles.cardPlayBtn}>
              <IonButton
                onClick={playSong}
                style={_styles.playBtn}
                fill="clear"
              >
                {playing ? (
                  <IonIcon
                    style={_styles.playIcon}
                    slot="icon-only"
                    icon={pause}
                  />
                ) : (
                  <IonIcon
                    style={_styles.playIcon}
                    slot="icon-only"
                    icon={play}
                  />
                )}
              </IonButton>
            </div>
          )}
        </IonRow>
        <IonGrid style={_styles.detailsGrid}>
          <IonCol style={_styles.paddingZero}>
            <IonGrid style={_styles.paddingZero}>
              <IonRow style={{ fontWeight: 700 }}>Title title</IonRow>
              <IonRow style={{ fontSize: '.7rem' }}>Creator</IonRow>
            </IonGrid>
          </IonCol>
          <IonCol style={_styles.paddingZero} size="auto">
            <IonRow style={{ fontSize: '.7rem' }}>Default</IonRow>
          </IonCol>
        </IonGrid>
      </IonCol>
    </IonSlide>
  );
};

export default DefaultSlide;
