import { IonList } from "@ionic/react"
import SettingPillStrips from "../SettingPillStrips"
import "./styles.css"

const SettingsList: React.FC = () => {

    const _styles = {
        list: {
            margin: '0em .5em .5em .5em'
        }
    }

    const list = ["Bedtime", "Lights", "Sounds", "Relaxation"]

    return (
        <IonList style={_styles.list}>
            {list.map((page, index) => 
            <SettingPillStrips title={page} icon={index} />
            )}
        </IonList>
    )
}

export default SettingsList
