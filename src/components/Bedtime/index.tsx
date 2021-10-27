import { IonBackButton, IonButtons, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react"
import SettingsHeader from "../SettingsHeader"

const Bedtime: React.FC = () => {
    return (
        <IonPage>
            <SettingsHeader title="Bedtime Settings" />
        </IonPage>
    )
}

export default Bedtime