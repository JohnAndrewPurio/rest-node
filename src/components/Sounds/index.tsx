import { IonBackButton, IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonPage, IonRow, IonTitle, IonToolbar } from "@ionic/react"
import { chevronUp } from "ionicons/icons"
import { useState } from "react"
import "./styles.css"

const Sounds: React.FC = () => {

    const _styles = {
        fullHeight: {
            height: "100%"
        },
        fullWidth: {
            width: "100%"
        },
        titleHead: {
            display: "flex",
            justifyContent: "space-between",
            fontWeight: 700,
            fontSize: "1.1rem",
            alignItems: "center",
            width: "100%",
            padding: "0em .5em"
        },
        chevron: {
            textAlign: "right",
            padding: 0
        },
        accContent: {
            height: "100%"
        },
        accordions: {
            flex: 1,
            width: "100%"
        },
        innerGrid: {
            height: "100%",
            display: "flex",
            flexDirection: "column"
        }
    }

    const [accordions, setAccordions] = useState([false, false])

    const toggleAccordion = (index: number) => {
        if (!accordions[index]) {
            let newArr = new Array(accordions.length).fill(false)
            newArr[index] = !accordions[index]
            setAccordions(newArr)
        }
    }

    const closeAccordion = (index: number) => {
        let newArr = new Array(accordions.length).fill(false)
        newArr[index] = !accordions[index]
        setAccordions(newArr)
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton />
                    </IonButtons>
                    <IonTitle>Sounds Settings</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent style={_styles.fullHeight}>
                <IonGrid style={_styles.innerGrid}>

                    <IonRow className="sound-time">
                        <IonRow className="time-bar">
                            <div className="wake-time"></div>
                            <div className="night-time"></div>
                        </IonRow>
                        <div className="times">
                            <div className="time time1">00:00</div>
                            <div className="time time2">00:00</div>
                            <div className="time time3">00:00</div>
                            <div className="time time4">00:00</div>
                        </div>
                    </IonRow>

                    <IonGrid style={_styles.accordions}>
                        <IonRow onClick={() => toggleAccordion(0)} className={accordions[0] ? "acc-open" : "acc-close"}>
                            <IonRow className="title-head" style={_styles.titleHead}>
                                <IonCol>Night Sounds</IonCol>
                                {accordions[0] &&
                                    <IonCol style={_styles.chevron}>
                                        <IonButton color="light" fill="clear" onClick={() => closeAccordion(0)}>
                                            <IonIcon size="1.1rem" slot="icon-only" icon={chevronUp} />
                                        </IonButton>
                                    </IonCol>
                                }
                            </IonRow>
                            {accordions[0] &&
                                <IonRow style={_styles.accContent}>

                                </IonRow>
                            }
                        </IonRow>
                        <IonRow onClick={() => toggleAccordion(1)} className={accordions[1] ? "acc-open" : "acc-close"}>
                            <IonRow className="title-head" style={_styles.titleHead}>
                                <IonCol>Wake Sounds</IonCol>
                                {accordions[1] &&
                                    <IonCol style={_styles.chevron}>
                                        <IonButton color="light" fill="clear" onClick={() => closeAccordion(1)}>
                                            <IonIcon size="1.1rem" slot="icon-only" icon={chevronUp} />
                                        </IonButton>
                                    </IonCol>
                                }
                            </IonRow>
                            {accordions[1] &&
                                <IonRow style={_styles.accContent}>

                                </IonRow>
                            }
                        </IonRow>
                    </IonGrid>
                </IonGrid>
            </IonContent>
        </IonPage>
    )
}

export default Sounds