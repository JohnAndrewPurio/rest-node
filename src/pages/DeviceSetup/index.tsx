import {
    IonButton,
    IonButtons,
    IonContent,
    IonGrid,
    IonHeader,
    IonPage,
    IonRow,
    IonText,
    IonTitle,
    IonToolbar,
    useIonViewDidEnter,
} from '@ionic/react';
import { FC, useEffect, useState } from 'react';
import ProgressBar from '../../components/ProgressBar';
import { newDeviceDetailsType } from '../../types';
import { HOME } from '../paths.json';
import ChooseDevice from './ChooseDevice';
import ConnectHotspot from './ConnectHotspot';
import TurnOnDevice from './TurnOnDevice';

import _styles from './styles';
import ConnectWifiNetwork from './ConnectWifiNetwork';

const initialDeviceDetails = {
    type: null,
    switchedOn: false,
    hotspotConnected: false,
};

const DeviceSetup: FC = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [newDeviceDetails, setNewDeviceDetails] =
        useState<newDeviceDetailsType>(initialDeviceDetails);
    const setStep = (index: number) => {
        setCurrentStep(index);
    };

    const pages = [
        {
            title: 'Choose Your Device',
            component: (
                <ChooseDevice
                    nextStep={() => setCurrentStep(1)}
                    setDetails={setNewDeviceDetails}
                />
            ),
        },
        {
            title: 'Switch On Device',
            component: (
                <TurnOnDevice
                    nextStep={() => setCurrentStep(2)}
                    setDetails={setNewDeviceDetails}
                    deviceDetails={newDeviceDetails}
                />
            ),
        },
        {
            title: 'Connect to Hotspot',
            component: (
                <ConnectHotspot
                    nextStep={() => setCurrentStep(3)}
                    setDetails={setNewDeviceDetails}
                    deviceDetails={newDeviceDetails}
                />
            ),
        },
        {
            title: 'Connect to Wifi Network',
            component: (
                <ConnectWifiNetwork nextStep={() => setCurrentStep(4)} />
            ),
        },
    ];

    const reset = () => {
        setNewDeviceDetails(initialDeviceDetails);
        setCurrentStep(0);
    };

    useEffect(() => {
        reset();
    }, []);
    useIonViewDidEnter(() => reset());

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonButton
                            routerLink={HOME}
                            style={_styles.cancelAdd}
                            fill="clear"
                        >
                            Cancel
                        </IonButton>
                    </IonButtons>
                    <IonTitle>Setup a new device</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonGrid style={_styles.content}>
                    <ProgressBar
                        deviceDetails={newDeviceDetails}
                        pages={pages}
                        currentStep={currentStep}
                        setStep={setStep}
                    />
                    <IonRow style={_styles.titleContainer}>
                        <IonText style={_styles.title}>
                            {pages[currentStep].title}
                        </IonText>
                    </IonRow>
                    {pages[currentStep].component}
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default DeviceSetup;
