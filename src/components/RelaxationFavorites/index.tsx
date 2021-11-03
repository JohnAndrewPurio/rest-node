import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonImg,
  IonLabel,
  IonRow,
  IonSlide,
  IonSlides,
} from '@ionic/react';
import { heart, pause, play } from 'ionicons/icons';
import { useState } from 'react';
import { techniques } from '../../pages/Settings/RelaxationTechniques/techniques.json';

const RelaxationFavorites: React.FC = () => {
  const _styles = {
    container: {
      margin: '1em .5em',
    },
    label: {
      fontSize: '1.1rem',
      fontWeight: 700,
    },
    slider: {
      height: '22vh',
      marginTop: '1em',
    },
    slide: {
      width: '150px',
    },
    card: {
      height: '100%',
      width: '100%',
      borderRadius: '10px',
      padding: '0em .3em',
    },
    detailsGrid: {
      fontSize: '.8rem',
      display: 'flex',
    },
    paddingZero: {
      padding: 0,
    },
    favBtn: {
      '--padding-start': '0px',
      '--padding-end': '0px',
      '--padding-top': '0px',
      '--padding-bottom': '0px',
    },
    fullHeight: {
      height: '100%',
    },
    playIcon: {
      fontSize: '4rem',
    },
    playBtn: {
      width: '100%',
      height: '100%',
      '--padding-start': '0px',
      '--padding-end': '0px',
      '--padding-top': '0px',
      '--padding-bottom': '0px',
    },
  };

  const slideOpt = {
    initialSlide: 0,
    speed: 600,
    slidesPerView: 'auto',
    zoom: false,
    grabCursor: true,
  };

  const [playingIndex, setPlayingIndex] = useState<null | number>(null);
  const [playing, setPlaying] = useState(false);

  const showPlay = (index: number) => {
    console.log('showplay');
    if (index !== playingIndex) {
      console.log('showplay inside');
      setPlaying(false);
      setPlayingIndex(index);
    }
  };

  const playSong = () => {
    console.log('click playing');
    setPlaying((p) => !p);
  };

  return (
    <IonRow style={_styles.container}>
      <IonGrid>
        <IonRow>
          <IonLabel style={_styles.label}>Favorites</IonLabel>
        </IonRow>
        <IonRow style={_styles.slider}>
          <IonContent style={_styles.fullHeight}>
            <IonSlides options={slideOpt} style={_styles.fullHeight}>
              {techniques.map((el, i) => (
                <IonSlide style={_styles.slide}>
                  <IonCol style={_styles.card}>
                    <IonRow
                      className="slider-picture"
                      onClick={() => showPlay(i)}
                    >
                      <IonImg
                        className="slider-ion-image"
                        src="https://picsum.photos/200"
                      />
                      <div className="length-indicator">05:14</div>
                      {i === playingIndex && (
                        <div className="card-play-btn">
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
                          <IonRow style={{ fontWeight: 700 }}>
                            Title title
                          </IonRow>
                          <IonRow style={{ fontSize: '.7rem' }}>Creator</IonRow>
                        </IonGrid>
                      </IonCol>
                      <IonCol style={_styles.paddingZero} size="auto">
                        <IonButton
                          shape="round"
                          fill="clear"
                          size="small"
                          style={_styles.favBtn}
                        >
                          <IonIcon slot="icon-only" icon={heart} />
                        </IonButton>
                      </IonCol>
                    </IonGrid>
                  </IonCol>
                </IonSlide>
              ))}
            </IonSlides>
          </IonContent>
        </IonRow>
      </IonGrid>
    </IonRow>
  );
};

export default RelaxationFavorites;
