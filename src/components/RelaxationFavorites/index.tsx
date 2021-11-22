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
import { useContext, useState } from 'react';
import { toggleFavorite } from '../../contextStore/RelaxationContext/relaxationActions';
import RelaxationContext from '../../contextStore/RelaxationContext/relaxationContext';
import { techniques } from '../../pages/Settings/RelaxationTechniques/techniques.json';
import { _styles } from './styles';

const RelaxationFavorites: React.FC = () => {
  const { state, dispatch } = useContext(RelaxationContext);

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
    if (index !== playingIndex) {
      setPlaying(false);
      setPlayingIndex(index);
    }
  };

  const playSong = () => {
    setPlaying((p) => !p);
  };

  const favorites = techniques.filter((el) => state.favorites.includes(el.id));

  return (
    <IonRow style={_styles.container}>
      <IonGrid>
        <IonRow>
          <IonLabel style={_styles.label}>Favorites</IonLabel>
        </IonRow>
        <IonRow style={_styles.slider}>
          <IonContent style={_styles.fullHeight}>
            <IonSlides
              key={favorites.map((el) => el.id).join('_')}
              options={slideOpt}
              style={_styles.fullHeight}
            >
              <DefaultSlide
                showPlay={showPlay}
                playingIndex={playingIndex}
                playSong={playSong}
                playing={playing}
              />
              {favorites.map((el, i) => (
                <IonSlide key={el.id} style={_styles.slide}>
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
                          onClick={() => dispatch(toggleFavorite(el.id))}
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
        <IonRow className="slider-picture" onClick={() => showPlay(-1)}>
          <IonImg
            className="slider-ion-image"
            src="https://picsum.photos/200"
          />
          <div className="length-indicator">05:14</div>
          {playingIndex === -1 && (
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
