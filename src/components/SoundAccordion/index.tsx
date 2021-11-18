import {
  IonButton,
  IonCol,
  IonContent,
  IonHeader,
  IonIcon,
  IonLabel,
  IonList,
  IonListHeader,
  IonRow,
} from '@ionic/react';
import { chevronUp, pause, play, close } from 'ionicons/icons';
import VolumeSlider from '../VolumeSlider';
import AudioStrip from '../AudioStrip';
import { songs } from '../../pages/Settings/Sounds/songs.json';
import './styles.css';
import { useContext } from 'react';
import SoundsContext from '../../contextStore/SoundsContext/soundsContext';
import { toggleSound } from '../../contextStore/SoundsContext/soundsActions';

interface Props {
  component: string;
  index: number;

  accordionOpen: boolean;
  openAccordion: () => void;
  closeAccordion: () => void;

  sliderOpen: boolean;
  openSlider: () => void;
  closeSlider: () => void;

  activeSong: number;
  chooseSong: (index: number) => void;
}

const SoundAccordion: React.FC<Props> = ({
  component,
  index,
  accordionOpen,
  sliderOpen,
  openAccordion,
  closeAccordion,
  closeSlider,
  openSlider,
  activeSong,
  chooseSong,
}) => {
  const { state } = useContext(SoundsContext);
  const { audio } = state;

  type titlesType = { [key: string]: string };
  const titles: titlesType = { night: 'Night Sounds', wake: 'Wake Sounds' };

  const _styles = {
    titleHead: {
      display: 'flex',
      justifyContent: 'space-between',
      fontWeight: 700,
      fontSize: '1.1rem',
      alignItems: 'center',
      width: '100%',
      padding: '0em .5em',
    },
    accContent: {
      display: 'flex',
      flexDirection: 'column',
      flex: 1,
      width: '100%',
    },
    closeIcon: {
      fontSize: '10vw',
    },
    listHeaderTitle: {
      fontSize: '1.1rem',
    },
  };

  const playing = audio[component];

  const getClassName = () => {
    const classNames = [];
    if (accordionOpen) {
      classNames.push('acc-open');
    } else {
      classNames.push('acc-close');
      if (playing) {
        classNames.push('playing');
      }
    }

    return classNames.join(' ');
  };

  return (
    <IonRow onClick={openAccordion} className={getClassName()}>
      <IonRow className="title-head" style={_styles.titleHead}>
        <IonCol>{titles[component]}</IonCol>
        {accordionOpen && <Chevron index={1} onclick={closeAccordion} />}
      </IonRow>
      {accordionOpen && (
        <IonRow style={_styles.accContent}>
          <IonRow className="play-volume-grid">
            <VolumeSlider
              index={index}
              onclick={openSlider}
              open={sliderOpen}
              component={component}
            />
            {sliderOpen ? (
              <IonCol
                size="auto"
                className="slider-close-btn"
                onClick={closeSlider}
              >
                <IonIcon color="light" style={_styles.closeIcon} icon={close} />
              </IonCol>
            ) : (
              <PlayBtn component={component} />
            )}
          </IonRow>
          <IonRow className="song-list-container">
            <IonHeader>
              <IonListHeader lines="full">
                <IonLabel style={_styles.listHeaderTitle}>
                  Wake Sound Audio
                </IonLabel>
              </IonListHeader>
            </IonHeader>
            <IonContent className="song-list-content" scrollEvents>
              <IonList className="song-list">
                {songs.map((song, index) => (
                  <AudioStrip
                    index={index}
                    onclick={chooseSong}
                    active={index === activeSong}
                    song={song}
                  />
                ))}
              </IonList>
            </IonContent>
          </IonRow>
        </IonRow>
      )}
    </IonRow>
  );
};

interface ChevronProps {
  index: number;
  onclick: (index: number) => void;
}

const Chevron: React.FC<ChevronProps> = ({ index, onclick }) => {
  const _styles = {
    chevron: {
      textAlign: 'right',
      padding: 0,
    },
  };

  return (
    <IonCol style={_styles.chevron}>
      <IonButton color="light" fill="clear" onClick={() => onclick(index)}>
        <IonIcon size="1.1rem" slot="icon-only" icon={chevronUp} />
      </IonButton>
    </IonCol>
  );
};

interface PlayBtnProps {
  component: string;
}

const PlayBtn: React.FC<PlayBtnProps> = ({ component }) => {
  const { state, dispatch } = useContext(SoundsContext);
  const { sound } = state;

  const _styles = {
    icon: {
      fontSize: '7vh',
    },
  };

  const playing = sound[component];

  return (
    <IonCol
      className={playing ? 'playing play-btn' : 'play-btn'}
      onClick={() => dispatch(toggleSound(component === 'night'))}
    >
      {playing ? (
        <IonIcon style={_styles.icon} color="primary" icon={pause} />
      ) : (
        <IonIcon style={_styles.icon} color="primary" icon={play} />
      )}
    </IonCol>
  );
};

export default SoundAccordion;
