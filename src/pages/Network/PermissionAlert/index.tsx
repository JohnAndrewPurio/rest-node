import { IonAlert } from "@ionic/react"
import { useState } from "react"

const PermissionAlert = () => {
    const [showPermissionAlert, setShowPermissionAlert] = useState<boolean>(false)
    const header = "On Android versions 8.0 and above, the GPS or location service are required to scan nearby networks"

    const dismissAlert = () => {
        setShowPermissionAlert(false)
    }

    return (
        <IonAlert 
            isOpen={showPermissionAlert}
            header={header}
            onDidDismiss={dismissAlert}
        />   
    )
}

export default PermissionAlert
