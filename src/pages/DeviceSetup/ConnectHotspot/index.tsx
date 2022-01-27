import {
    IonButton,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonListHeader,
    IonRow,
    // , IonText, useIonLoading
} from '@ionic/react';
import {
    arrowForward,
    informationCircleOutline,
    thumbsUpOutline,
} from 'ionicons/icons';
import { FC } from 'react';
import { newDeviceDetailsType } from '../../../types';
import _styles from './styles';

interface Props {
    deviceDetails: newDeviceDetailsType;
    setDetails: any;
    nextStep: () => void;
}

const ConnectHotspot: FC<Props> = ({ deviceDetails, setDetails, nextStep }) => {
    // const [present, dismiss] = useIonLoading()

    const wifiName: { [key: string]: string } = {
        'Rest Node': 'Rest_Node_XXXX',
    };

    const connect = () => {
        nextStep();
        // present(`Connecting to ${deviceDetails.type}`)
        // setTimeout(() => dismiss(), 10000)
    };

    return (
        <IonRow style={_styles.container}>
            <IonList style={_styles.instructionsList}>
                <IonListHeader>
                    <IonLabel style={_styles.instructionsHeader}>
                        Steps to connect to your {deviceDetails.type}
                        's hotspot:{' '}
                    </IonLabel>
                </IonListHeader>
                <IonItem lines="none" style={_styles.instructions}>
                    <IonIcon
                        icon={arrowForward}
                        slot="start"
                        size="small"
                        color="primary"
                    />
                    <IonLabel class="ion-text-wrap">
                        {' '}
                        Go to your phone or tablet's Wi-Fi settings and join
                        your {deviceDetails.type}
                        's network:{' '}
                        {deviceDetails.type && wifiName[deviceDetails.type]}
                    </IonLabel>
                </IonItem>
                <IonItem lines="none" style={_styles.instructions}>
                    <IonIcon
                        icon={informationCircleOutline}
                        slot="start"
                        size="small"
                        color="primary"
                    />
                    <IonLabel
                        color="secondary"
                        class="ion-text-wrap"
                        style={{ fontSize: '.8rem' }}
                    >
                        {' '}
                        XXXX is the last four digit of your {deviceDetails.type}
                        's ID
                    </IonLabel>
                </IonItem>
                <IonItem lines="none" style={_styles.instructions}>
                    <IonIcon
                        icon={informationCircleOutline}
                        slot="start"
                        size="small"
                        color="primary"
                    />
                    <IonLabel
                        color="secondary"
                        class="ion-text-wrap"
                        style={{ fontSize: '.8rem' }}
                    >
                        Cannot find the hotspot? Make sure the{' '}
                        {deviceDetails.type} is switched on
                    </IonLabel>
                </IonItem>
                <IonItem lines="none" style={_styles.instructions}>
                    <IonIcon
                        icon={arrowForward}
                        slot="start"
                        size="small"
                        color="primary"
                    />
                    <IonLabel class="ion-text-wrap">
                        {' '}
                        Return to the app
                    </IonLabel>
                </IonItem>
                <IonItem lines="none" style={_styles.instructions}>
                    <IonIcon
                        icon={arrowForward}
                        slot="start"
                        size="small"
                        color="primary"
                    />
                    <IonLabel class="ion-text-wrap">
                        Click button below when done
                    </IonLabel>
                </IonItem>
            </IonList>
            <IonRow style={_styles.bottomPart}>
                <IonButton
                    onClick={connect}
                    fill="outline"
                    style={_styles.nextBtn}
                >
                    I am already connected
                    <IonIcon size="small" slot="end" icon={thumbsUpOutline} />
                </IonButton>
            </IonRow>
        </IonRow>
    );
};

export default ConnectHotspot;
