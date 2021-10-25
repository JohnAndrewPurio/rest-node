import { IonGrid, IonRow, IonCol } from "@ionic/react"
import MainClock from "../MainClock"
import moment from "moment"

const DateAndLocation: React.FC = () => {

    const _styles = {
        grid: {
            margin: '2em .5em 2sem .5em'
        },
        place: {
            height: 'fit-content',
            fontWeight: 700
        },
        clock: {
            display: "flex",
            justifyContent: "center"
        }
    }

    return (
        <IonGrid style={_styles.grid}>
            <IonRow>
                <IonCol class="ion-text-center" style={_styles.place}>
                    Lucena
                </IonCol>
            </IonRow>
            <IonRow>
                <IonCol class="ion-text-center">
                    {moment().format("DD MMMM YYYY")}
                </IonCol>
            </IonRow>
            <IonRow style={_styles.clock}>
                <MainClock />
            </IonRow>
        </IonGrid>
    )
}

export default DateAndLocation
