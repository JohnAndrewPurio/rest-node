import { IonList } from "@ionic/react"
import SettingPillStrips from "../SettingPillStrips"

const SettingsList = () => {
    return (
        <IonList>
            <SettingPillStrips />
            <SettingPillStrips />
            <SettingPillStrips />
            <SettingPillStrips />
        </IonList>
    )
}

export default SettingsList
