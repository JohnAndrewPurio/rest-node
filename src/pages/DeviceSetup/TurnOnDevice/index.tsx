import { IonButton, IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonRow, IonText, useIonAlert } from '@ionic/react'
import { checkmarkCircleOutline } from 'ionicons/icons'
import { FC } from 'react'
import { newDeviceDetailsType } from '../../../types'
import _styles from './styles'

interface Props {
    deviceDetails: newDeviceDetailsType,
    setDetails: any,
    nextStep: () => void
}

const TurnOnDevice: FC<Props> = ({ deviceDetails, setDetails, nextStep }) => {

    const [present] = useIonAlert()
    const openManual = () => {
        setTimeout(() => present("This will open manual", [{ text: 'Nice' }]), 200)
    }

    const next = () => {
        setDetails((prev: newDeviceDetailsType) => ({ ...prev, switchedOn: true }))
        setTimeout(() => nextStep(), 200)
    }

    return (
        <IonRow style={_styles.container}>
            <IonRow style={_styles.upperPart}>
                <IonText style={_styles.bodyText}>Make sure to switch on your
                    <IonText style={{ fontWeight: 700 }}>
                        {` ${deviceDetails.type} `}
                    </IonText>
                    device.
                </IonText>
                <IonList style={_styles.instructionsList}>
                    <IonListHeader>
                        <IonLabel style={_styles.instructionsHeader}>Steps:</IonLabel>
                    </IonListHeader>
                    <IonItem class="ion-text-wrap" lines='none' style={_styles.instructions}>
                        <IonIcon icon={checkmarkCircleOutline} slot='start' size='small' color="primary" />
                        <IonLabel>Plug in your {deviceDetails.type}</IonLabel>
                    </IonItem>
                    <IonItem class="ion-text-wrap" lines='none' style={_styles.instructions}>
                        <IonIcon icon={checkmarkCircleOutline} slot='start' size='small' color="primary" />
                        <IonLabel>Press the power button</IonLabel>
                    </IonItem>
                    <IonItem class="ion-text-wrap" lines='none' style={_styles.instructions}>
                        <IonIcon icon={checkmarkCircleOutline} slot='start' size='small' color="primary" />
                        <IonLabel>Click next when done.</IonLabel>
                    </IonItem>
                </IonList>
                <IonText style={_styles.openManualText}>
                    Having problems switching on the device?
                </IonText>
                <IonButton onClick={openManual} size='small' style={_styles.openManualLink} fill='clear'>Open user manual here</IonButton>
            </IonRow>
            <IonRow style={_styles.bottomPart}>
                <IonButton onClick={next} style={_styles.nextBtn}>Next</IonButton>
            </IonRow>
        </IonRow>
    )
}

export default TurnOnDevice