import { IonIcon, IonItem, IonLabel } from "@ionic/react"
import { moon } from "ionicons/icons"

const SettingPillStrips = () => {
    return (
        <IonItem style={{
            margin: '1em'
        }}>
            <IonIcon icon={moon} slot="start" />
            <IonLabel>Bedtime History</IonLabel>
            <IonIcon icon={moon} slot="end" />
        </IonItem>
    )
}

export default SettingPillStrips
