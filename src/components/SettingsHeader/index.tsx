// put all of the settings stuff here because it is the common child component of settings pages

import {
    IonButton,
    IonButtons,
    IonHeader,
    IonIcon,
    IonLabel,
    IonTitle,
    IonToolbar,
    isPlatform,
    useIonAlert,
} from '@ionic/react';
import { arrowBack, save } from 'ionicons/icons';
import { useContext, useEffect } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import BedTimeContext from '../../contextStore/BedTimeContext/bedtimeContext';
import {
    BEDTIME,
    LIGHTS,
    RELAXATION,
    SOUNDS,
} from '../../pages/Settings/paths.json';
import SoundsContext from '../../contextStore/SoundsContext/soundsContext';
import LightsContext from '../../contextStore/LightsContext/lightsContext';
import RelaxationContext from '../../contextStore/RelaxationContext/relaxationContext';

import { RestNodeStateType } from '../../types';
import {
    bedtimeStateChangeChecker,
    lightsStateChangeChecker,
    relaxationStateChangeChecker,
    soundsStateChangeChecker,
} from './helper';
import { sendSocketEvent } from '../../services/restnodeServices';
import TargetAddressContext from '../../contextStore/NetworkContext/targetAddress';
import SocketContext from '../../contextStore/RestNodeContext/socketConnection';
import { storageGet } from '../../api/CapacitorStorage';
import { REST_NODE_STATES_KEY } from '../../api/CapacitorStorage/keys';
import { updateValues } from '../../api/RestNode/POST/updateEventValues';
import { BASE_URL } from '../../api/BASE_URL';

import { PROFILE } from '../../pages/paths.json';

interface Props
    extends RouteComponentProps<{
        id: string;
    }> {
    title: string;
}

const SettingsHeader: React.FC<Props> = ({ title, history, location }) => {
    const socket = useContext(SocketContext);

    const bedtimeState = useContext(BedTimeContext);
    const soundsState = useContext(SoundsContext);
    const lightsState = useContext(LightsContext);
    const relaxationState = useContext(RelaxationContext);
    const [targetAddress] = useContext(TargetAddressContext);

    const { started } = bedtimeState.state;
    const [present] = useIonAlert();

    interface changeCheck {
        status: boolean;
        newState?: RestNodeStateType;
    }

    // checks if current context state is same with last stored local storage value
    const stateCheck = async (): Promise<changeCheck> => {
        const states = await storageGet(REST_NODE_STATES_KEY);
        if (states) {
            switch (location.pathname) {
                case BEDTIME: {
                    return bedtimeStateChangeChecker(
                        bedtimeState.state,
                        states
                    );
                }
                case LIGHTS: {
                    return lightsStateChangeChecker(lightsState.state, states);
                }
                case SOUNDS: {
                    return soundsStateChangeChecker(soundsState.state, states);
                }
                case RELAXATION:
                    return relaxationStateChangeChecker(
                        relaxationState.state,
                        states
                    );
            }
        }
        return { status: false };
    };

    // save button clicked
    const handleSaveClick = async () => {
        const change: changeCheck = await stateCheck();
        if (change.status) {
            present({
                cssClass: 'my-css',
                header: 'Save changes?',
                message: '',
                buttons: [
                    { text: 'No', handler: () => history.goBack() },
                    {
                        text: 'Yes',
                        handler: async () => {
                            if (change.newState)
                                await saveChanges(change.newState);
                        },
                    },
                ],
            });
        } else {
            present({
                cssClass: 'my-css',
                header: 'There are no new changes',
                message: '',
                buttons: ['Ok'],
            });
        }
    };

    // will go back or ask to save
    const goBack = async () => {
        const change: changeCheck = await stateCheck();
        if (!started && change.status) {
            present({
                cssClass: 'my-css',
                header: 'Save changes?',
                message: '',
                buttons: [
                    { text: 'No', handler: () => history.goBack() },
                    {
                        text: 'Yes',
                        handler: async () => {
                            if (change.newState)
                                await saveChanges(change.newState);
                            history.goBack();
                        },
                    },
                ],
            });
        } else {
            history.goBack();
        }
    };

    // save changes prompt
    const saveChanges = async (change: RestNodeStateType) => {
        try {
            const url = targetAddress || BASE_URL;
            const protocol = targetAddress ? 'http' : 'https';
            await updateValues(url, protocol, change);
        } catch (e) {
            present({
                cssClass: 'my-css',
                header: 'Error',
                message: 'Cannot connect to REST Node',
                buttons: ['Ok'],
                onDidDismiss: () => history.replace(PROFILE),
            });
        }
    };

    // android hardware back button listener
    useEffect(() => {
        if (!isPlatform('android')) return;

        const hardwareBackHandlers = (event: any) => {
            const path = window.location.pathname;
            const settingsIncluded = path.includes('settings');

            event.detail.register(5, (processNextHandler: any) => {
                if (settingsIncluded) {
                    goBack();
                    return;
                }

                processNextHandler();
            });
        };

        const cleanup = () => {
            document.removeEventListener('ionBackButton', hardwareBackHandlers);
        };

        document.addEventListener('ionBackButton', hardwareBackHandlers);

        return cleanup;

        // eslint-disable-next-line
    }, [])

    // instant start/stop sender
    useEffect(() => {
        stateCheck().then(({ status, newState }) => {
            const bedtimeStarted = location.pathname === BEDTIME && started;

            if (!bedtimeStarted || !status || !newState) return;

            saveChanges(newState);
        });

        // eslint-disable-next-line
    }, [started])

    // socket sender when state changes
    useEffect(() => {
        if (!started) return;

        stateCheck().then(({ status, newState }) => {
            if (!status || !newState || !socket) return;

            sendSocketEvent(socket, newState);
        });

        // eslint-disable-next-line
    }, [
        bedtimeState.state,
        lightsState.state,
        soundsState.state,
        relaxationState.state,
    ]);

    return (
        <IonHeader>
            <IonToolbar>
                <IonButtons slot="start">
                    <IonButton onClick={goBack}>
                        <IonIcon icon={arrowBack} slot="icon-only" />
                    </IonButton>
                </IonButtons>
                <IonTitle>{title}</IonTitle>
                {!started && (
                    <IonButton
                        fill="clear"
                        slot="end"
                        onClick={handleSaveClick}
                    >
                        <IonIcon icon={save} slot="end" />
                        <IonLabel>Save</IonLabel>
                    </IonButton>
                )}
            </IonToolbar>
        </IonHeader>
    );
};

export default withRouter(SettingsHeader);
