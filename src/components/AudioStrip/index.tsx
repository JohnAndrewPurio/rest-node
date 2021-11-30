import { FC, useContext, MouseEvent, Key } from 'react';
import {
  IonButton,
  IonIcon,
  IonItem,
  IonLabel,
  IonSpinner,
} from '@ionic/react';
import { cloudDownloadOutline, play, stop } from 'ionicons/icons';
import { playSample } from '../../contextStore/SoundsContext/soundsActions';
import SoundsContext from '../../contextStore/SoundsContext/soundsContext';

import { sendAudioBodyInterface } from '../../api/RestNode/POST/sendAudioFilesMetadata';
import AudioAssetsContext from '../../contextStore/RestNodeContext/audioAssets';

import { downloadAudioFile } from '../../api/RestNode/POST/downloadAudioFileFromStorage';
import TargetAddressContext from '../../contextStore/NetworkContext/targetAddress';
import _styles from './styles';
import { BASE_URL } from '../../services/constants';
import DownloadQueueContext from '../../contextStore/RestNodeContext/downloadQueueContext';
import SocketContext from '../../contextStore/RestNodeContext/socketConnection';
import { useSound } from '../../utils/useSound';

interface Props {
  key: Key;
  song: sendAudioBodyInterface;
  active: boolean;
  onclick: (index: number) => void;
  index: number;
  component: string;
}

type handleClickType = (
  event: MouseEvent<HTMLIonButtonElement, globalThis.MouseEvent>
) => void;

const AudioStrip: FC<Props> = ({ index, song, active, onclick, component }) => {
  const socket = useContext(SocketContext);
  const [targetAddress] = useContext(TargetAddressContext);
  const audioAssets = useContext(AudioAssetsContext);
  const asset = `${component.replace(component[0], component[0].toUpperCase())} Sounds`
  const downloadQueue = useContext(DownloadQueueContext);
  const { state, dispatch } = useContext(SoundsContext);
  const audioDownloading = downloadQueue[song.name];
  const audioDownloaded =
    audioAssets && audioAssets[asset].includes(song.name); // Temporary hack for searching if audio is already downloaded
  const audioPlaying = state.sample.playing && song.name === state.sample.audio;
  const playIcon = audioPlaying ? stop : play;
  const icon = !audioDownloaded ? cloudDownloadOutline : playIcon;

  const { sound } = useSound("DeepMeditation")

  const handlePlayClick: handleClickType = (event) => {
    event.stopPropagation();

    const { fullPath, name } = song;

    dispatch(playSample(name));

    sound.play({ playAudioWhenScreenIsLocked: false, numberOfLoops: 1 })
    setTimeout(() => {
      sound.stop()
    }, 10000)

    const data = {
      fullPath,
      volume: 70,
      state: audioPlaying ? 'STOPPED' : 'PLAYING',
      sound: 'WAKE_SOUND',
      type: 'audio',
    };

    socket?.send(JSON.stringify(data));
  };

  const handleDownloadClick: handleClickType = (event) => {
    event.stopPropagation();
    const protocol = targetAddress ? 'http' : 'https';

    downloadAudioFile(targetAddress || BASE_URL, protocol, {
      fullPath: song.fullPath,

    });
  };

  const onClickHandler =
    !audioDownloaded
      ? handleDownloadClick
      : handlePlayClick;

  const actionButton = (
    <IonButton fill="clear" slot="end" onClick={onClickHandler}>
      <IonIcon
        color={active ? 'light' : 'primary'}
        slot="icon-only"
        icon={icon}
      />
    </IonButton>
  );

  const downloading = (
    <IonSpinner color="secondary" />
  )

  return (
    <IonItem
      onClick={() => onclick(index)}
      color={active ? 'primary' : undefined}
      button
      detail={false}
      lines="full"
      style={_styles.audioContainer}
    >
      <IonLabel>{song.name}</IonLabel>
      {audioDownloading ? downloading : actionButton}
    </IonItem>
  );
};

export default AudioStrip;
