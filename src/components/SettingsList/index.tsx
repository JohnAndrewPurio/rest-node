import { IonList } from "@ionic/react"
import SettingPillStrips from "../SettingPillStrips"

const SettingsList = () => {
    return (
        <IonList style={{
            margin: '1em'
        }}>
            <SettingPillStrips />
            <SettingPillStrips />
            <SettingPillStrips />
            <SettingPillStrips />
        </IonList>
    )
}

export default SettingsList
