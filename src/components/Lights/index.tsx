import { IonBackButton, IonButtons, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react"
import SettingsHeader from "../SettingsHeader"

const Lights: React.FC = () => {
    return (
        <IonPage>
            <SettingsHeader title="Lights Settings" />
        </IonPage>
    )
}

export default Lights