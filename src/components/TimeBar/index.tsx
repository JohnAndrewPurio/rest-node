
import { IonRow } from "@ionic/react"
import "./styles.css"

const TimeBar: React.FC = () => {
    return (
        <IonRow className="sound-time">
            <IonRow className="time-bar">
                <div className="wake-time"></div>
                <div className="night-time"></div>
            </IonRow>
            <div className="times">
                <div className="time time1">00:00</div>
                <div className="time time2">00:00</div>
                <div className="time time3">00:00</div>
                <div className="time time4">00:00</div>
            </div>
        </IonRow>
    )
}

export default TimeBar