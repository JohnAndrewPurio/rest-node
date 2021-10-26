import { IonContent } from "@ionic/react"
import DateAndLocation from "../../DateAndLocation"
import SettingsList from "../../SettingsList"
import "./styles.css"

const Dashboard: React.FC = () => {

    return (
        <IonContent>
            <DateAndLocation />
            <SettingsList />
        </IonContent>
    )
}

export default Dashboard