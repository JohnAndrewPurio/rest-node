import { IonList } from "@ionic/react"
import SettingPillStrips from "../SettingPillStrips"
import "./styles.css"

const SettingsList: React.FC = () => {

    const _styles = {
        list: {
            margin: '0em .5em .5em .5em'
        }
    }

    const list = ["bedtime", "lights", "sounds", "relaxation"]

    return (
        <IonList style={_styles.list}>
            {
                list.map((page, index) =>
                    <SettingPillStrips key={page} title={page} icon={index} />
                )
            }
        </IonList>
    )
}

export default SettingsList
