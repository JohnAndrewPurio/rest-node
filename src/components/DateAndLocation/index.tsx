import { IonGrid, IonRow, IonCol } from "@ionic/react"
import MainClock from "../MainClock"

const DateAndLocation: React.FC = () => {
    const date = new Date()

    return (
        <IonGrid style={{
            margin: '.5em'
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
            <IonRow class="ion-justify-content-center">
                <MainClock />
            </IonRow>
        </IonGrid>
    )
}

export default DateAndLocation
