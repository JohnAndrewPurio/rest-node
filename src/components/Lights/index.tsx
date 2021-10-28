import { IonCol, IonContent, IonGrid, IonIcon, IonItem, IonLabel, IonPage, IonRange, IonRow, IonText, IonToggle } from "@ionic/react"
import SettingsHeader from "../SettingsHeader"
import TimeBar from "../TimeBar"
import ToggleSync from "./ToggleSync"
import "./styles.css"
import { moon, sunny } from "ionicons/icons"

// import Brightness3 from "@mui/icons-material/Brightness3"

const Lights: React.FC = () => {
    return (
        <IonPage>
            <SettingsHeader title="Lights Settings" />
            <IonContent>
                <IonGrid>
                    <TimeBar />
                    <ToggleSync />
                </IonGrid>
                <LightControl index={0} title="Night Light" />
                <LightControl index={1} title="Wake Light" />
            </IonContent>
        </IonPage>
    )
}

interface controlProps {
    title: string,
    index: number
}

const LightControl: React.FC<controlProps> = ({ title, index }) => {

    const _styles = {
        header: {
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "1em .5em .5em .5em",
            "--background": "transparent"
        },
        headerTxt: {
            fontWeight: 700,
            fontSize: "1.1rem"
        },
        titleCol: {
            display: "flex",
        },
        icon: {
            display: "flex",
            marginRight: ".5em",
            fontSize: "36px"
        }

    }

    const icons = [moon, sunny]

    return (
        <IonRow className="light-control-container">
            <IonItem lines="none" style={_styles.header}>
                <IonIcon slot="start" style={_styles.icon} icon={icons[index]} />
                <IonLabel style={_styles.headerTxt}>{title}</IonLabel>
                <IonToggle slot="end" className="light-switch-toggle" />
            </IonItem>
            <IonRow>
                <IonRange color="primary" className="range-slider">
                    <IonIcon slot="start" size="small" icon={icons[index]} />
                    <IonIcon slot="end" color="primary" icon={icons[index]} />
                </IonRange>
            </IonRow>
        </IonRow>
    )
}

// sync
// switch
// level

export default Lights