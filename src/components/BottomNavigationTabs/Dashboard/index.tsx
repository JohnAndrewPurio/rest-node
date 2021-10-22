import { IonContent } from "@ionic/react"
import DateAndLocation from "../../DateAndLocation"
import SettingsList from "../../SettingsList"

const Dashboard: React.FC = () => {
    return (
        <IonContent>
            <DateAndLocation />
            <SettingsList />
        </IonContent>
    )
}

export default Dashboard