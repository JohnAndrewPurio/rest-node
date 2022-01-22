import { isPlatform } from '@ionic/core';
import { LoadingOptions, useIonAlert, useIonLoading } from '@ionic/react';
import { HookOverlayOptions } from '@ionic/react/dist/types/hooks/HookOverlayOptions';
import { FC, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { BASE_URL } from '../../api/BASE_URL';
import { storageGet, storageSet } from '../../api/CapacitorStorage';
import { SOUND_KEY } from '../../api/CapacitorStorage/keys';
import { crashlytics } from '../../api/Firebase/firebaseCrashlytics';
import { getLastValues } from '../../api/RestNode/GET/getLastEventValue';
import { availableAudioAssetsInterface } from '../../api/RestNode/POST/sendAudioFilesMetadata';
import audioDownloadResponseHandler, {
    AUDIO_DOWNLOAD_RESPONSE,
    audioAssetsAvailableResponse,
} from '../../api/RestNode/WebSocketHandlers/audioDownloadSocketResponse';
import {
    initializeWebsocketConnection,
    websocketMessageResponse,
} from '../../services/restnodeServices';
import { listAudioFilesMetadata } from '../../utils/listAudioFilesMetadata';
import { BedTimeContextProvider } from '../BedTimeContext/bedtimeContext';

import TargetAddressContext from '../NetworkContext/targetAddress';
import AudioAssetsContext from './audioAssets';
import AudioFilesContext, { AudioFilesContextType } from './audioFiles';
import AudioLoadingContext from './audioLoading';
import DownloadQueueContext, {
    DownloadQueueContextInterface,
} from './downloadQueueContext';
import SocketContext from './socketConnection';

interface dataObject {
    [key: string]: any;
}

const RestNodeContext: FC = ({ children }) => {
    const history = useHistory();
    const [targetAddress] = useContext(TargetAddressContext);
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const [audioFiles, setAudioFiles] = useState<AudioFilesContextType>(null);
    const [audioAssets, setAudioAssets] =
        useState<availableAudioAssetsInterface>();
    const [downloadQueue, setDownloadQueue] =
        useState<DownloadQueueContextInterface>({});
    const [loading, setLoading] = useState<null | boolean>(false);
    const [loaded, setLoaded] = useState(false);
    const [present] = useIonAlert();
    const [startLoading, stopLoading] = useIonLoading();
    const [soundLoading, setSoundLoading] = useState<boolean>(false);
    const socketProtocol = 'ws';

    const getInitialValues = async () => {
        const url = targetAddress || BASE_URL;
        const protocol = 'http';
        try {
            setLoading(true);
            await getLastValues(url, protocol);
            setLoaded(true);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            present({
                cssClass: 'my-css',
                header: 'Error',
                message: 'Cannot connect to REST Node',
                buttons: ['Ok'],
                onDidDismiss: () => history.replace('/profile'),
            });
        }
    };

    const storeSoundMetadata = async (data: dataObject) => {
        try {
            const key = SOUND_KEY;

            storageSet(data, key);
        } catch (error) {
            console.log(error);
        }
    };

    const retrieveSoundMetadata = async () => {
        try {
            const { audioFiles, audioAssets } = await storageGet(SOUND_KEY);

            if (audioAssets && audioFiles) {
                setAudioAssets(audioAssets);
                setAudioFiles(audioFiles);
                return;
            }

            // If Audio Assets and Files Metadata are not Stored
            setSoundLoading(() => true);

            await listAudioFilesMetadata(
                targetAddress || BASE_URL,
                audioFiles,
                setAudioFiles,
                setSoundLoading
            );

            await audioAssetsAvailableResponse(
                targetAddress || BASE_URL,
                setAudioAssets
            );

            setSoundLoading(() => false);
        } catch (error) {
            console.log(error);
        }
    };

    // Websocket Event Handlers
    const socketOnOpen = (event: Event) => {
        console.log('Target Address:', targetAddress);
        console.log('Websocket Started:', event, socket);
    };

    const socketOnClose = (event: Event) => {
        console.log('Websocket Ended:', event, socket);
    };

    const socketOnError = (event: Event) => {
        console.log('Websocket Error:', event, socket);
        console.log('Target Address:', targetAddress);

        if (!isPlatform('android') || !isPlatform('ios')) return;

        crashlytics.log('Socket Error'); // Add more details regarding the error
    };

    const socketOnMessage = (event: MessageEvent<any>) => {
        const { data } = event;
        const message: websocketMessageResponse = JSON.parse(data);

        switch (message.type) {
            case AUDIO_DOWNLOAD_RESPONSE:
                audioDownloadResponseHandler(
                    message,
                    targetAddress || BASE_URL,
                    downloadQueue,
                    setAudioAssets,
                    setDownloadQueue
                );

                break;

            default:
                console.log(message);
        }
    };

    useEffect(() => {
        const webSocket = initializeWebsocketConnection(
            targetAddress || BASE_URL,
            socketProtocol,
            socketOnOpen,
            socketOnClose,
            socketOnError,
            socketOnMessage
        );

        getInitialValues();
        retrieveSoundMetadata();
        setSocket(webSocket);

        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        const options: LoadingOptions & HookOverlayOptions = {
            showBackdrop: true,
            message: 'Connecting...',
        };

        if (loading) {
            startLoading(options);

            return;
        }

        setTimeout(stopLoading, 500);
        // eslint-disable-next-line
    }, [loading])

    useEffect(() => {
        const data = {
            audioFiles,
            audioAssets,
        };

        storeSoundMetadata(data);
    }, [audioFiles, audioAssets]);

    return (
        <SocketContext.Provider value={socket}>
            <BedTimeContextProvider>
                <AudioLoadingContext.Provider value={soundLoading}>
                    <AudioFilesContext.Provider value={audioFiles}>
                        <AudioAssetsContext.Provider value={audioAssets}>
                            <DownloadQueueContext.Provider
                                value={downloadQueue}
                            >
                                {loaded && !loading && children}
                            </DownloadQueueContext.Provider>
                        </AudioAssetsContext.Provider>
                    </AudioFilesContext.Provider>
                </AudioLoadingContext.Provider>
            </BedTimeContextProvider>
        </SocketContext.Provider>
    );
};

export default RestNodeContext;
