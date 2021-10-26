import { IonIcon, IonItem, IonLabel } from "@ionic/react"
import { alarm, arrowForward, bed, bulb, musicalNotes } from "ionicons/icons"
import './styles.css'

interface Props {
    title: string,
    icon: number
}

const SettingPillStrips: React.FC<Props> = ({ title, icon }) => {

    const icons = [alarm, bulb, musicalNotes, bed]
    const colors = ["#2dd36f", "#eb445a", "#71964b", "#e0ac08" ]

    return (
        <IonItem style={{
            margin: '.5em'
        }}>
            <IonIcon icon={icons[icon]} style={{color: colors[icon]}} slot="start" />
            <IonLabel>{title}</IonLabel>
            <IonIcon icon={arrowForward} slot="end" />
        </IonItem>
    )
}

export default SettingPillStrips
