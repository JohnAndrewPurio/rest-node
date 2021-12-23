import { IonLoading } from "@ionic/react"
import { FC, useEffect, useState } from "react"
import { wifiInfo } from "./types"
import { checkLocationPermission } from "../../utils/getCurrentPosition"
import { wifiScan } from "../../utils/wifiMethods"
import WifiListContext from "./wifiList"
import PermissionAlertContext from "./permissionAlert"
import PermissionAlert from "../../pages/Network/PermissionAlert"
import { isPlatform } from "@ionic/core"

const NetworkContext: FC = ({ children }) => {
    const wifiState = useState<wifiInfo[]>([])
    const permissionAlert = useState<boolean>(true)
    const [rescanWifi, setRescanWifi] = useState<boolean>(true)
    const [, setLocationAccessPermitted] = useState<boolean>(false)

    const [, setAvailableWifi] = wifiState
    const [showPermissionAlert, setShowPermissionAlert] = permissionAlert
    const isLoading = rescanWifi && !showPermissionAlert
    const loadingMessage = "Scanning Wifi..."

    const wifiScanned = !showPermissionAlert && !isLoading

    useEffect(() => {
        if (!rescanWifi)
            return

        const getAvailableWifiAndroid = async () => {
            try {
                const permitted = await checkLocationPermission()

                setShowPermissionAlert(() => !permitted)
                setLocationAccessPermitted(() => !!permitted)

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

        console.log("Android:", isPlatform("android"))
        console.log("Show Permission Alert:", showPermissionAlert)

        if (isPlatform('android') && !showPermissionAlert)
            getAvailableWifiAndroid()

        // TODO: ***Add wifi scanning for iOS devices***

        // eslint-disable-next-line
    }, [rescanWifi, showPermissionAlert])

    return (
        <WifiListContext.Provider value={wifiState}>
            <PermissionAlertContext.Provider value={permissionAlert}>
                {wifiScanned && children}

                <PermissionAlert />
                <IonLoading
                    isOpen={isLoading}
                    message={loadingMessage}
                />
            </PermissionAlertContext.Provider>
        </WifiListContext.Provider>
    )
}

export default NetworkContext