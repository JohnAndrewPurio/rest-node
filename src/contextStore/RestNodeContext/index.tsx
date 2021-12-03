import { useIonAlert, LoadingOptions, useIonLoading } from '@ionic/react'
import { HookOverlayOptions } from '@ionic/react/dist/types/hooks/HookOverlayOptions'
import { FC, useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { storageGet, storageSet } from '../../api/CapacitorStorage'
import { SOUND_KEY } from '../../api/CapacitorStorage/keys'
import { availableAudioAssetsInterface } from '../../api/RestNode/POST/sendAudioFilesMetadata'
import audioDownloadResponseHandler, { audioAssetsAvailableResponse, AUDIO_DOWNLOAD_RESPONSE } from '../../api/RestNode/WebSocketHandlers/audioDownloadSocketResponse'
import { BASE_URL } from '../../services/constants'
import { getLastValues, initializeWebsocketConnection, websocketMessageResponse } from '../../services/restnodeServices'
import { listAudioFilesMetadata } from '../../utils/listAudioFilesMetadata'
import { BedTimeContextProvider } from '../BedTimeContext/bedtimeContext'

import TargetAddressContext from '../NetworkContext/targetAddress'
import AudioAssetsContext from './audioAssets'
import AudioFilesContext, { AudioFilesContextType } from './audioFiles'
import AudioLoadingContext from './audioLoading'
import DownloadQueueContext, { DownloadQueueContextInterface } from './downloadQueueContext'
import SocketContext from './socketConnection'

interface dataObject {
    [key: string]: any
}

const RestNodeContext: FC = ({ children }) => {
    const history = useHistory()
    const [targetAddress] = useContext(TargetAddressContext)
    const [socket, setSocket] = useState<WebSocket | null>(null)
    const [audioFiles, setAudioFiles] = useState<AudioFilesContextType>(null)
    const [audioAssets, setAudioAssets] = useState<availableAudioAssetsInterface>()
    const [downloadQueue, setDownloadQueue] = useState<DownloadQueueContextInterface>({})
    const [loading, setLoading] = useState<null | boolean>(false);
    const [loaded, setLoaded] = useState(false);
    const [present] = useIonAlert();
    const [startLoading, stopLoading] = useIonLoading();
    const [soundLoading, setSoundLoading] = useState<boolean>(false)
    const socketProtocol = targetAddress ? 'ws' : 'wss'

    const getInitialValues = async () => {
        const url = targetAddress || BASE_URL
        const protocol = targetAddress ? 'http' : 'https'
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
            const key = SOUND_KEY

            storageSet(data, key)
        } catch (error) {
            console.log(error)
        }
    }

    const retrieveSoundMetadata = async () => {
        try {
            const { audioFiles, audioAssets } = await storageGet(SOUND_KEY)

            if (audioAssets && audioFiles) {
                setAudioAssets(audioAssets)
                setAudioFiles(audioFiles)

                return
            }
            
            // If Audio Assets and Files Metadata are not Stored
            setSoundLoading(() => true);

            await listAudioFilesMetadata(
                targetAddress, audioFiles,
                setAudioFiles, setSoundLoading
            )

            await audioAssetsAvailableResponse(targetAddress || BASE_URL, setAudioAssets);

            setSoundLoading(() => false);
        } catch (error) {
            console.log(error)
        }
    }

    // Websocket Event Handlers
    const socketOnOpen = (event: Event) => {
        console.log('Websocket Started:', event, socket);
    }

    const socketOnClose = (event: Event) => {
        console.log('Websocket Ended:', event, socket)
    }

    const socketOnError = (event: Event) => {
        console.log('Websocket Error:', event, socket)
    }

    const socketOnMessage = (event: MessageEvent<any>) => {
        const { data } = event
        const message: websocketMessageResponse = JSON.parse(data)

        switch (message.type) {
            case AUDIO_DOWNLOAD_RESPONSE:
                audioDownloadResponseHandler(
                    message, targetAddress, downloadQueue,
                    setAudioAssets, setDownloadQueue
                )

                break

            default:
                console.log(message)
        }
    }

    useEffect(() => {
        const webSocket = initializeWebsocketConnection(
            targetAddress || BASE_URL, socketProtocol,
            socketOnOpen, socketOnClose, socketOnError, socketOnMessage
        )

        getInitialValues()
        retrieveSoundMetadata()
        setSocket(webSocket)
    }, []);

    useEffect(() => {
        const options: LoadingOptions & HookOverlayOptions = {
            showBackdrop: true,
            message: 'Loading...',
        }

        if (loading) {
            startLoading(options);

            return
        }

        stopLoading();
    }, [loading]);

    useEffect(() => {
        const data = {
            audioFiles, audioAssets
        }

        storeSoundMetadata(data)
    }, [audioFiles, audioAssets])

    return (
        <SocketContext.Provider value={socket}>
            <BedTimeContextProvider>
                <AudioLoadingContext.Provider value={soundLoading}>
                    <AudioFilesContext.Provider value={audioFiles}>
                        <AudioAssetsContext.Provider value={audioAssets}>
                            <DownloadQueueContext.Provider value={downloadQueue}>
                                {loaded && !loading && children}
                            </DownloadQueueContext.Provider>
                        </AudioAssetsContext.Provider>
                    </AudioFilesContext.Provider>
                </AudioLoadingContext.Provider>
            </BedTimeContextProvider>
        </SocketContext.Provider>
    )
}

export default RestNodeContext
