import { IonBackButton, IonButtons, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react"

const Lights: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton />
                    </IonButtons>
                    <IonTitle>Lights Settings</IonTitle>
                </IonToolbar>
            </IonHeader>
        </IonPage>
    )
}

export default Lights