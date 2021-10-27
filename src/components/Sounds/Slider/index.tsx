import { IonCol, IonIcon, IonRange } from "@ionic/react"
import { volumeHigh, volumeLow } from "ionicons/icons"
import "./styles.css"

interface Props {
    open: boolean,
    onclick: (index: number) => void,
    index: number
}

const Slider: React.FC<Props> = ({ index, open, onclick }) => {

    const _styles = {
        icon: {
            fontSize: "7vh"
        }
    }

    return (
        <IonCol className={open ? "open-slider slider-container" : "slider-container"} onClick={() => onclick(index)}>
            {open ?
                <IonRange color="tertiary" className="range-slider">
                    <IonIcon color="tertiary" slot="start" icon={volumeLow} />
                    <IonIcon color="tertiary" slot="end" icon={volumeHigh} />
                </IonRange>
                : <IonIcon style={_styles.icon} color="tertiary" icon={volumeHigh} />
            }
        </IonCol>
    )
}

export default Slider