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
import _styles from './styles';

import PlayButton from './PlayButton';
import Chevron from './Chevron';
import AudioFilesContext from '../../contextStore/RestNodeContext/audioFiles';
import { sendAudioBodyInterface } from '../../api/RestNode/POST/sendAudioFilesMetadata';

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
    'Night Sounds': 'night',
    'Wake Sounds': 'wake',
    'Relaxation Sounds': 'night',
  };
  const key = keyMap[component];

  const playing = isPlaying[key];

  const getStyle = () => {
    const style = { ..._styles.accordion };
    if (accordionOpen) {
      style.height = '80%';
      style.backgroundColor = 'var(--ion-color-primary)';
      style.color = 'var(--ion-color-primary-contrast)';
    } else if (playing) {
      style.backgroundColor = 'var(--ion-color-primary-tint)';
    }
    return style;
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
    <IonRow onClick={openAccordion} style={getStyle()}>
      <IonRow
        style={{
          ..._styles.titleHead,
          height: accordionOpen ? '12.5%' : '100%',
        }}
      >
        <IonCol>{component}</IonCol>
        {accordionOpen && <Chevron index={1} onclick={closeAccordion} />}
      </IonRow>
      {accordionOpen && (
        <IonRow style={_styles.accContent}>
          <IonRow style={_styles.playVolumeGrid}>
            <VolumeSlider
              index={index}
              onclick={openSlider}
              open={sliderOpen}
              component={key}
            />
            {sliderOpen ? (
              <IonCol
                size="auto"
                style={_styles.sliderCloseBtn}
                onClick={closeSlider}
              >
                <IonIcon color="light" style={_styles.closeIcon} icon={close} />
              </IonCol>
            ) : (
              <PlayButton component={key} />
            )}
          </IonRow>
          <IonRow style={_styles.songListContainer}>
            <IonHeader>
              <IonListHeader lines="full">
                <IonLabel style={_styles.listHeaderTitle}>{component}</IonLabel>
              </IonListHeader>
            </IonHeader>
            <IonContent style={_styles.songListContent} scrollEvents>
              <IonList style={_styles.songListContent}>
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
