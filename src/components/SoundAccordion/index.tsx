import { FC, useContext } from 'react';
import {
  IonCol,
  IonContent,
  IonHeader,
  IonIcon,
  IonLabel,
  IonList,
  IonListHeader,
  IonRow,
} from '@ionic/react';
import { close } from 'ionicons/icons';
import VolumeSlider from '../VolumeSlider';
import AudioStrip from '../AudioStrip';
import SoundsContext from '../../contextStore/SoundsContext/soundsContext';
import { _styles } from './styles';

import PlayButton from './PlayButton';
import Chevron from './Chevron';
import AudioFilesContext from '../../contextStore/RestNodeContext/audioFiles';
import { sendAudioBodyInterface } from '../../api/RestNode/POST/sendAudioFilesMetadata';

import './styles.css';
import { StringKeyedObject } from '../../types';

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

const SoundAccordion: FC<Props> = ({
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
  const songs = useContext(AudioFilesContext);
  const { state } = useContext(SoundsContext);
  const { isPlaying } = state;

  const keyMap: StringKeyedObject = {
    "Night Sounds": "night",
    "Wake Sounds": "wake",
    "Relaxation Sounds": "night"
  }
  const key = keyMap[component]

  const playing = isPlaying[key];

  const getClassName = () => {
    if (accordionOpen) return 'acc-open';

    const classNames = [];

    classNames.push('acc-close');

    if (playing) classNames.push('playing');

    return classNames.join(' ');
  };

  const songsHandler = (song: sendAudioBodyInterface, index: number) => (
    <AudioStrip
      key={index}
      index={index}
      onclick={chooseSong}
      active={index === activeSong}
      song={song}
      component={key}
    />
  );

  return (
    <IonRow onClick={openAccordion} className={getClassName()}>
      <IonRow className="title-head" style={_styles.titleHead}>
        <IonCol>{component}</IonCol>
        {accordionOpen && <Chevron index={1} onclick={closeAccordion} />}
      </IonRow>
      {accordionOpen && (
        <IonRow style={_styles.accContent}>
          <IonRow className="play-volume-grid">
            <VolumeSlider
              index={index}
              onclick={openSlider}
              open={sliderOpen}
              component={key}
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
              <PlayButton component={key} />
            )}
          </IonRow>
          <IonRow className="song-list-container">
            <IonHeader>
              <IonListHeader lines="full">
                <IonLabel style={_styles.listHeaderTitle}>{component}</IonLabel>
              </IonListHeader>
            </IonHeader>
            <IonContent className="song-list-content" scrollEvents>
              <IonList className="song-list">
                {songs && Object.values(songs[component]).map(songsHandler)}
              </IonList>
            </IonContent>
          </IonRow>
        </IonRow>
      )}
    </IonRow>
  );
};

export default SoundAccordion;
