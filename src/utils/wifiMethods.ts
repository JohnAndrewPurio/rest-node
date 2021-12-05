import { WifiWizard2 } from '@ionic-native/wifi-wizard-2'

export const wifiScan = async () => {
    try {
        const wifiAvailable = await WifiWizard2.scan()

        console.log("Wifi Scanned", wifiAvailable)

        return wifiAvailable
    } catch(error) {
        throw error
    }
}