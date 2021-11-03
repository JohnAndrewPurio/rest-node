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

interface Props {
  component: string;
  index: number;
  playing: boolean;
  playBtnClicked: (index: number) => void;

  open: boolean;
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
  open,
  playing,
  sliderOpen,
  openAccordion,
  closeSlider,
  closeAccordion,
  openSlider,
  playBtnClicked,
  activeSong,
  chooseSong,
}) => {
  const { state, dispatch } = useContext(SoundsContext);
  const { audio, volume } = state;

  type titlesType = { [key: string]: string };
  const titles: titlesType = { night: 'Night Sounds', light: 'Wake Sounds' };

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

  const getClassName = () => {
    const classNames = [];
    if (open) {
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
        {open && <Chevron index={1} onclick={closeAccordion} />}
      </IonRow>
      {open && (
        <IonRow style={_styles.accContent}>
          <IonRow className="play-volume-grid">
            <VolumeSlider
              index={index}
              onclick={openSlider}
              open={sliderOpen}
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
              <PlayBtn
                index={index}
                onclick={playBtnClicked}
                playing={playing}
              />
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
  index: number;
  onclick: (index: number) => void;
  playing: boolean;
}

const PlayBtn: React.FC<PlayBtnProps> = ({ index, onclick, playing }) => {
  const _styles = {
    icon: {
      fontSize: '7vh',
    },
  };

  return (
    <IonCol
      className={playing ? 'playing play-btn' : 'play-btn'}
      onClick={() => onclick(index)}
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
