import { useIonAlert, LoadingOptions, useIonLoading } from '@ionic/react'
import { HookOverlayOptions } from '@ionic/react/dist/types/hooks/HookOverlayOptions'
import { FC, useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { availableAudioAssetsInterface } from '../../api/RestNode/POST/sendAudioFilesMetadata'
import audioDownloadResponseHandler, { AUDIO_DOWNLOAD_RESPONSE } from '../../api/RestNode/WebSocketHandlers/audioDownloadSocketResponse'
import { BASE_URL } from '../../services/constants'
import { getLastValues, initializeWebsocketConnection, websocketMessageResponse } from '../../services/restnodeServices'
import { listAudioFilesMetadata } from '../../utils/listAudioFilesMetadata'
import { BedTimeContextProvider } from '../BedTimeContext/bedtimeContext'
import TargetAddressContext from '../NetworkContext/targetAddress'
import AudioAssetsContext from './audioAssets'
import AudioFilesContext, { AudioFilesContextType } from './audioFiles'
import SocketContext from './socketConnection'

const RestNodeContext: FC = ({ children }) => {
    const history = useHistory()
    const [targetAddress] = useContext(TargetAddressContext)
    const [socket, setSocket] = useState<WebSocket | null>(null)
    const [audioFiles, setAudioFiles] = useState<AudioFilesContextType>(null)
    const [audioAssets, setAudioAssets] = useState<availableAudioAssetsInterface>()
    const [loading, setLoading] = useState<null | boolean>(false);
    const [loaded, setLoaded] = useState(false);
    const [present] = useIonAlert();
    const [startLoading, stopLoading] = useIonLoading();
    const socketProtocol = targetAddress ? 'ws' : 'wss'

    const getInitialValues = async () => {
        const url = targetAddress || BASE_URL
        const protocol = targetAddress ? 'http' : 'https'

        try {
            setLoading(true);
            await getLastValues(url, protocol);
            setLoaded(true);
            setLoading(false);
        } catch (e) {
            setLoading(false);
            present({
                cssClass: 'my-css',
                header: 'Error',
                message: 'Cannot connect to REST Node',
                buttons: ['Ok'],
                onDidDismiss: (e) => history.replace('/profile'),
            });
        }
    };

    useEffect(() => {
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
            console.log('Websocket Message:', event)
            const { data } = event
            const message: websocketMessageResponse = JSON.parse(data)

            switch(message.type) {
                case AUDIO_DOWNLOAD_RESPONSE: 
                    audioDownloadResponseHandler(message, targetAddress, setAudioAssets)
                    break
    
                default: 
                    console.log(message)
            }
        }

        const webSocket = initializeWebsocketConnection(
            targetAddress || BASE_URL, socketProtocol,
            socketOnOpen, socketOnClose, socketOnError, socketOnMessage
        )

        listAudioFilesMetadata(targetAddress, setAudioAssets, setAudioFiles, setLoading)

        getInitialValues();
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
        console.log("Audio Assets", audioAssets)
    }, [audioAssets])

    return (
        <SocketContext.Provider value={socket}>
            <BedTimeContextProvider>
                <AudioFilesContext.Provider value={audioFiles}>
                    <AudioAssetsContext.Provider value={audioAssets}>
                        {loaded && !loading && children}
                    </AudioAssetsContext.Provider>
                </AudioFilesContext.Provider>
            </BedTimeContextProvider>
        </SocketContext.Provider>
    )
}

export default RestNodeContext