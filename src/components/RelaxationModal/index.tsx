import {
  IonButton,
  IonCheckbox,
  IonCol,
  IonContent,
  IonHeader,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonModal,
  IonPage,
  IonRow,
  IonSpinner,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { play, cloudDownloadOutline, stop } from 'ionicons/icons';
import React, { useState, MouseEvent, useContext } from 'react';
import styles from './styles.module.css';
import { downloadAudioFile } from '../../api/RestNode/POST/downloadAudioFileFromStorage';
import TargetAddressContext from '../../contextStore/NetworkContext/targetAddress';
import { BASE_URL } from '../../api/BASE_URL';
import RelaxationContext from '../../contextStore/RelaxationContext/relaxationContext';
import { playSample } from '../../contextStore/RelaxationContext/relaxationActions';
import SocketContext from '../../contextStore/RestNodeContext/socketConnection';
import AudioAssetsContext from '../../contextStore/RestNodeContext/audioAssets';
import DownloadQueueContext from '../../contextStore/RestNodeContext/downloadQueueContext';


interface Props {
  router: HTMLIonRouterOutletElement | null;
  isOpen: boolean;
  closeModal: () => void;
  technique: any;
}

const RelaxationModal: React.FC<Props> = ({
  router,
  isOpen,
  closeModal,
  technique,
}) => {
    const { state, dispatch } = useContext(RelaxationContext)
    const [targetAddress] = useContext(TargetAddressContext)
    const [bedtime, setBedtime] = useState(false);
    const [waketime, setWaketime] = useState(false);
    const socket = useContext(SocketContext);
    const downloadQueue = useContext(DownloadQueueContext);
    const audioAssets = useContext(AudioAssetsContext);

  if (technique) {
    const audioPlaying = state.sample.playing && technique.name === state.sample.audio;

    const audioDownloading = downloadQueue[technique.name];

    const asset = 'Relaxation Sounds';
    const audioDownloaded = audioAssets && audioAssets[asset].includes(technique.name); // Temporary hack for searching if audio is already downloaded

    const playIcon = audioPlaying ? stop : play;
    const icon = !audioDownloaded ? cloudDownloadOutline : playIcon;

    type handleClickType = (
      event: MouseEvent<HTMLIonButtonElement, globalThis.MouseEvent>
    ) => void;

    const handleDownloadClick: handleClickType = (event) => {
      event.stopPropagation();
      const protocol = targetAddress ? 'http' : 'https';

      downloadAudioFile(targetAddress || BASE_URL, protocol, {
        fullPath: technique.fullPath,
      });
    };

    const handlePlayClick: handleClickType = (event) => {
      event.stopPropagation();

      const { fullPath, name } = technique;

      dispatch(playSample(name));

      const data = {
        fullPath,
        volume: state.relaxationVolume,
        state: audioPlaying ? 'STOPPED' : 'PLAYING',
        sound: `RELAXATION_SOUND`,
        type: 'audio',
      };

      socket?.send(JSON.stringify(data));
    };

    const onClickHandler = !audioDownloaded
      ? handleDownloadClick
      : handlePlayClick;

    return (
      <IonModal
        isOpen={isOpen}
        swipeToClose={true}
        presentingElement={router || undefined}
        onDidDismiss={closeModal}
      >
        {technique && (
          <IonPage>
            <IonHeader>
              <IonToolbar>
                <IonTitle>{technique.name}</IonTitle>
                <IonButton slot="end" fill="clear" onClick={closeModal}>
                  Close
                </IonButton>
              </IonToolbar>
            </IonHeader>
            <IonContent>
              <IonRow className={styles.songDetails}>
                <IonImg
                  className={styles.image}
                  src={technique.image}
                />
                <IonCol className={styles.details}>
                  <IonRow className={styles.title}>{technique.name}</IonRow>
                  <IonRow className={styles.creator}>
                    {technique.creator || ''}
                  </IonRow>
                </IonCol>
                <IonCol size="auto">
                  {audioDownloading ? (
                    <IonSpinner color="secondary" style={{ marginRight: '2.2em' }} />
                  ) : (
                    <IonButton fill="clear" onClick={onClickHandler}>
                      <IonIcon
                        slot="icon-only"
                        icon={icon}
                        color="primary"
                        className={styles.playIcon}
                        style={{ fontSize: audioDownloaded ? '3em' : '2em' }}
                      />
                    </IonButton>
                  )}
                </IonCol>
              </IonRow>
              {audioDownloaded && (
                <IonRow>
                  <IonItem lines="none" style={{ '--background': 'trnasparent' }}>
                    <IonCheckbox slot="start" color="primary" />
                    <IonLabel class="ion-text-wrap" style={{ fontSize: '1rem' }}>
                      Choose this technique for bedtime relaxation
                    </IonLabel>
                  </IonItem>
                </IonRow>
              )}
            </IonContent>
          </IonPage>
        )}
      </IonModal>
    );
  }
  else return <></>

};

export default RelaxationModal;
