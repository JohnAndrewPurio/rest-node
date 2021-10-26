import { IonBackButton, IonButtons, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react"

const Relaxation: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton />
                    </IonButtons>
                    <IonTitle>Relaxation Techniques</IonTitle>
                </IonToolbar>
            </IonHeader>
        </IonPage>
    )
}

export default Relaxation