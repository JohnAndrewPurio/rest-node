
import { IonButton, IonIcon, IonItem, IonLabel } from "@ionic/react"
import { play } from "ionicons/icons"
import "./styles.css"

interface Props {
    song: {
        title: string,
        artist: string
    },
    active: boolean,
    onclick: (index: number) => void,
    index: number
}

const Audio: React.FC<Props> = ({ index, song, active, onclick }) => {
    return (
        <IonItem onClick={() => onclick(index)} color={active ? "primary" : undefined} button detail={false} lines="full" className="audio-container">
            <IonLabel>{song.title}</IonLabel>
            <IonButton fill="clear" slot="end">
                <IonIcon color={active ? "light" : "primary"} slot="icon-only" icon={play} />
            </IonButton>
        </IonItem>
    )
}

export default Audio