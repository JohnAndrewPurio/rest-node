import { IonLoading } from "@ionic/react"
import { FC, useEffect, useState } from "react"
import { wifiInfo } from "./types"
import { checkLocationPermission } from "../../utils/getCurrentPosition"
import { wifiScan } from "../../utils/wifiMethods"
import WifiListContext from "./wifiList"
import { isPlatform } from "@ionic/core"

const NetworkContext: FC = ({ children }) => {
    const wifiState = useState<wifiInfo[]>([])
    const [rescanWifi, setRescanWifi] = useState<boolean>(true)

    const [, setAvailableWifi] = wifiState
    const isLoading = rescanWifi
    const loadingMessage = "Scanning Wifi..."

    const getAvailableWifiAndroid = async () => {
        try {
            const permitted = await checkLocationPermission()

            if (!permitted)
                return

            const wifiAvailable = await wifiScan()

            console.log(wifiAvailable)

            setAvailableWifi(wifiAvailable)
        } catch (error) {
            console.error(error);
        } finally {
            setRescanWifi(false)
        }
    }

    useEffect(() => {
        if (!rescanWifi)
            return

        if (isPlatform('android'))
            setTimeout(getAvailableWifiAndroid, 2000)

        // TODO: ***Add wifi scanning for iOS devices***
    }, [rescanWifi])

    return (
        <WifiListContext.Provider value={wifiState}>
            {children}

            <IonLoading
                isOpen={isLoading}
                message={loadingMessage}
            />
        </WifiListContext.Provider>
    )
}

export default NetworkContext