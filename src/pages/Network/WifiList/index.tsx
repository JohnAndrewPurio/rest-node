import { IonList, IonItemGroup, IonListHeader, IonText } from '@ionic/react'
import { useContext } from 'react'

import WifiItem from '../../../components/WifiItem'
import WifiListContext from '../../../contextStore/NetworkContext/wifiList'

const WifiList = () => {
    const [availableWifi] = useContext(WifiListContext)

    return (
        <IonList lines="full" style={{
            width: '100%'
        }}>
            <IonItemGroup>
                <IonListHeader>
                    <IonText>Available Wifi</IonText>
                </IonListHeader>
                {
                    availableWifi.map((wifiInfo) => (
                        <WifiItem
                            key={wifiInfo.BSSID}
                            wifiInfo={wifiInfo}
                        />
                    ))
                }
            </IonItemGroup>
        </IonList>
    )
}

export default WifiList
