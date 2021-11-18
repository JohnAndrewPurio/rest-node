import { FC, useContext, MouseEvent, Key } from 'react';
import { IonButton, IonIcon, IonItem, IonLabel } from '@ionic/react';
import { cloudDownloadOutline, download, play, stop } from 'ionicons/icons';
import { playSample } from '../../contextStore/SoundsContext/soundsActions';
import SoundsContext from '../../contextStore/SoundsContext/soundsContext';

import { sendAudioBodyInterface } from '../../api/RestNode/POST/sendAudioFilesMetadata';
import AudioAssetsContext from '../../contextStore/RestNodeContext/audioAssets';

import './styles.css';
import { downloadAudioFile } from '../../api/RestNode/POST/downloadAudioFileFromStorage';
import TargetAddressContext from '../../contextStore/NetworkContext/targetAddress';

interface Props {
  key: Key
  song: sendAudioBodyInterface
  active: boolean
  onclick: (index: number) => void
  index: number
  component: string
}

type handleClickType = (event: MouseEvent<HTMLIonButtonElement, globalThis.MouseEvent>) => void

const AudioStrip: FC<Props> = ({ index, song, active, onclick, component }) => {
  const [targetAddress] = useContext(TargetAddressContext)
  const audioAssets = useContext(AudioAssetsContext)
  const { state, dispatch } = useContext(SoundsContext);
  const audioDownloaded = audioAssets && audioAssets[component].includes(song.name) // Temporary hack for searching if audio is already downloaded
  const audioPlaying = state.sample.playing && song.name === state.sample.audio
  const playIcon = audioPlaying ? stop : play
  const icon = !audioDownloaded ? cloudDownloadOutline: playIcon

  const handlePlayClick: handleClickType = (event) => {
    event.stopPropagation();
    dispatch(
      playSample(song.name)
    );
  };

  const handleDownloadClick: handleClickType = (event) => {
    event.stopPropagation()

    downloadAudioFile(targetAddress, 'http', {
      fullPath: song.fullPath
    })
  }

  const onClickHandler = !audioDownloaded ? handleDownloadClick: handlePlayClick

  console.log("Audio Assets Rerender", audioAssets)

  return (
    <IonItem
      onClick={() => onclick(index)}
      color={active ? 'primary' : undefined}
      button
      detail={false}
      lines="full"
      className="audio-container"
    >
      <IonLabel>
        {song.name}
      </IonLabel>
      <IonButton
        fill="clear"
        slot="end"
        onClick={onClickHandler}
      >
        <IonIcon
          color={active ? 'light' : 'primary'}
          slot="icon-only"
          icon={icon}
        />
      </IonButton>
    </IonItem>
  );
};

export default AudioStrip;
