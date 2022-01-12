import { IonButton, IonCheckbox, IonCol, IonContent, IonHeader, IonIcon, IonImg, IonItem, IonLabel, IonModal, IonPage, IonRow, IonSpinner, IonTitle, IonToolbar } from '@ionic/react'
import { play, cloudDownloadOutline } from 'ionicons/icons';
import React, { useState } from 'react'
import styles from './styles.module.css';

interface Props {
    router: HTMLIonRouterOutletElement | null;
    isOpen: boolean,
    closeModal: () => void,
    technique: any
}

const RelaxationModal: React.FC<Props> = ({ router, isOpen, closeModal, technique }) => {

    const [bedtime, setBedtime] = useState(false)
    const [waketime, setWaketime] = useState(false)
    const [downloaded, setDownloaded] = useState(false)
    const [loadingDownload, setLoadingDownload] = useState(false)

    const download = () => {
        if (!downloaded) {
            setLoadingDownload(true)
            setTimeout(() => {
                setDownloaded(true)
                setLoadingDownload(false)
            }, 3000)
        }
    }

    return (
        <IonModal
            isOpen={isOpen}
            swipeToClose={true}
            presentingElement={router || undefined}
            onDidDismiss={closeModal}
        >
            {technique &&
                <IonPage>
                    <IonHeader>
                        <IonToolbar>
                            <IonTitle>{technique.title}</IonTitle>
                            <IonButton slot='end' fill='clear' onClick={closeModal}>Close</IonButton>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent>
                        <IonRow className={styles.songDetails}>
                            <IonImg
                                className={styles.image}
                                src="https://picsum.photos/200"
                            />
                            <IonCol className={styles.details}>
                                <IonRow className={styles.title}>
                                    {technique.title}
                                </IonRow>
                                <IonRow className={styles.creator}>
                                    {technique.creator || 'creator'}
                                </IonRow>
                            </IonCol>
                            <IonCol size='auto'>
                                {loadingDownload ? <IonSpinner style={{ marginRight: "2.2em" }} />
                                    : <IonButton fill='clear' onClick={download}>
                                        <IonIcon
                                            slot='icon-only'
                                            icon={downloaded ? play : cloudDownloadOutline}
                                            color="primary"
                                            className={styles.playIcon}
                                            style={{ fontSize: downloaded ? "3em" : "2em"}} />
                                    </IonButton>
                                }
                            </IonCol>
                        </IonRow>
                        {
                            downloaded &&
                            <IonRow>
                                <IonItem lines='none' style={{ "--background": "trnasparent" }}>
                                    <IonCheckbox slot="start" color="primary" />
                                    <IonLabel
                                        class="ion-text-wrap"
                                        style={{ fontSize: '1rem' }}
                                    >
                                        Choose this technique for bedtime relaxation
                                    </IonLabel>
                                </IonItem>
                            </IonRow>
                        }
                    </IonContent>
                </IonPage>
            }
        </IonModal>
    )
}

export default RelaxationModal