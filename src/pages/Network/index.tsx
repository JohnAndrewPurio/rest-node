import { useEffect, useState, Dispatch, SetStateAction, FC } from 'react'
import { IonHeader, IonPage, IonText } from '@ionic/react'

const url = 'http://raspberrypi.local/restnode/test'

const Network: FC = () => {
    const [message, setMessage] = useState<string>('Failed!')

    const getRequest = async (url: string, storeResponse: Dispatch<SetStateAction<string>>) => {
        try {
            const response = await fetch(url)
            const { test } = await response.json()

            storeResponse(test)
        } catch (error) {
            storeResponse( (error as Error).message )
        }
    }

    useEffect(() => {
        getRequest(url, setMessage)
    }, [])

    return (
        <IonPage style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center'
        }}>
            <IonHeader>
                <IonText style={{
                    color: 'white'
                }}>
                    {
                        message
                    }
                </IonText>
            </IonHeader>
        </IonPage>
    )
}

export default Network
