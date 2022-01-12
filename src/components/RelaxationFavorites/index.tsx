import {
  IonContent,
  IonGrid,
  IonLabel,
  IonRow,
  IonSlide,
  IonSlides,
} from '@ionic/react';
import { useContext, useState } from 'react';
import RelaxationContext from '../../contextStore/RelaxationContext/relaxationContext';
import RelaxationCard from '../RelaxationCard';
import _styles from './styles';
import { techniques } from '../../pages/Settings/RelaxationTechniques/techniques.json';

interface Props {
  openModal: (technique: any) => void
}

const RelaxationFavorites: React.FC<Props> = ({ openModal }) => {
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
              <IonSlide key={"default"} style={_styles.slide}>
                <RelaxationCard
                  onClick={openModal}
                  slide
                  item={techniques[0]}
                  defaultCard
                />
              </IonSlide>
              {favorites.map((item, i) => (
                <IonSlide key={item.id} style={_styles.slide}>
                  <RelaxationCard
                    item={item}
                    slide
                    onClick={openModal}
                  />
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
