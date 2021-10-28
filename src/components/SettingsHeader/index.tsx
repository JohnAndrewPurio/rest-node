import { IonBackButton, IonButtons, IonHeader, IonTitle, IonToolbar } from "@ionic/react"

interface Props {
    title: string
}

const SettingsHeader: React.FC<Props> = ({ title }) => {
    return (
        <IonHeader>
            <IonToolbar>
                <IonButtons slot="start">
                    <IonBackButton />
                </IonButtons>
                <IonTitle>{title}</IonTitle>
            </IonToolbar>
        </IonHeader>
    )
}

export default SettingsHeader