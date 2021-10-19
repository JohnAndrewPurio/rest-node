import { IonGrid, IonRow, IonCol } from "@ionic/react"

const DateAndLocation: React.FC = () => {
    const date = new Date()

    return (
        <IonGrid style={{
            margin: '2em'
        }}>
            <IonRow>
                <IonCol class="ion-text-center" style={{
                    height: 'fit-content'
                }}>
                    Lucena
                </IonCol>
            </IonRow>
            <IonRow>
                <IonCol class="ion-text-center">
                    {date.toDateString()}
                </IonCol>
            </IonRow>
        </IonGrid>
    )
}

export default DateAndLocation
