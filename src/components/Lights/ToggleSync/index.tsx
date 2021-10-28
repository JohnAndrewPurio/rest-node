import { IonItem, IonLabel, IonRow, IonToggle } from "@ionic/react"
import "./styles.css"


const ToggleSync: React.FC = () => {

    const _styles = {
        item: {
            margin: "1em 0em"
        }
    }

    return (
        <IonRow>
            <IonItem style={_styles.item}>
                <IonLabel>Enable Sun Sync</IonLabel>
                <IonToggle slot="end" />
            </IonItem>
        </IonRow>
    )
}

export default ToggleSync