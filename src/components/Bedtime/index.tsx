import { IonBackButton, IonButtons, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react"

const Bedtime: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton />
                    </IonButtons>
                    <IonTitle>Bedtime Settings</IonTitle>
                </IonToolbar>
            </IonHeader>
        </IonPage>
    )
}

export default Bedtime