import { IonButton, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonLabel, IonList, IonListHeader, IonPage, IonRow } from "@ionic/react"
import { chevronUp, close, pause, play } from "ionicons/icons"
import { useState } from "react"
import Slider from "./Slider"
import TimeBar from "../TimeBar"
import "./styles.css"
import SettingsHeader from "../SettingsHeader"
import { songs } from "./songs.json"
import Audio from "./Audio"

const Sounds: React.FC = () => {

    const _styles = {
        fullHeight: {
            height: "100%"
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
        accContent: {
            display: "flex",
            flexDirection: "column",
            flex: 1,
            width: "100%"
        },
        accordions: {
            flex: 1,
            width: "100%"
        },
        innerGrid: {
            height: "100%",
            display: "flex",
            flexDirection: "column"
        },
        closeIcon: {
            fontSize: "10vw"
        },
        listHeaderTitle: {
            fontSize: "1.1rem"
        }
    }

    const [accordions, setAccordions] = useState([false, false])

    const toggleAccordion = (index: number) => {
        if (!accordions[index]) {
            let newArr = new Array(accordions.length).fill(false)
            newArr[index] = !accordions[index]
            setAccordions(newArr)
            setSliderOpen(new Array(sliderOpen.length).fill(false))
        }
    }

    const closeAccordion = (index: number) => {
        let newArr = new Array(accordions.length).fill(false)
        newArr[index] = !accordions[index]
        setAccordions(newArr)
        setSliderOpen(new Array(sliderOpen.length).fill(false))
    }

    const [playing, setPlaying] = useState([false, false])

    const playBtnClicked = (index: number) => {
        let newArr = new Array(playing.length).fill(false)
        newArr[index] = !playing[index]
        setPlaying(newArr)
    }

    const [sliderOpen, setSliderOpen] = useState([false, false])

    const sliderOpenSlider = (index: number) => {
        if (!sliderOpen[index]) {
            let newArr = new Array(sliderOpen.length).fill(false)
            newArr[index] = !sliderOpen[index]
            setSliderOpen(newArr)
        }
    }

    const closeSlider = (index: number) => {
        let newArr = new Array(sliderOpen.length).fill(false)
        newArr[index] = !sliderOpen[index]
        setSliderOpen(newArr)
    }

    const [activeSong, setActiveSong] = useState(0)

    const chooseSong = (index: number) => {
        if (activeSong !== index) {
            setActiveSong(index)
        }
    }

    const getClassName = (index: number) => {
        let classNames = []
        if (accordions[index]) {
            classNames.push("acc-open")
        }
        else {
            classNames.push("acc-close")
            if (playing[index]) {
                classNames.push("playing")
            }
        }
        
        return classNames.join(" ")
    }

    return (
        <IonPage>
            <SettingsHeader title="Sounds Settings" />
            <IonContent style={_styles.fullHeight}>
                <IonGrid style={_styles.innerGrid}>
                    <TimeBar />
                    <IonGrid style={_styles.accordions}>
                        <IonRow onClick={() => toggleAccordion(0)} className={getClassName(0)}>
                            <IonRow className="title-head" style={_styles.titleHead}>
                                <IonCol>Night Sounds</IonCol>
                                {accordions[0] &&
                                    <Chevron index={0} onclick={closeAccordion} />
                                }
                            </IonRow>
                            {accordions[0] &&
                                <IonRow style={_styles.accContent}>
                                    <IonRow className="play-volume-grid">
                                        <Slider index={0} onclick={sliderOpenSlider} open={sliderOpen[0]} />
                                        {sliderOpen[0] ?
                                            <IonCol size="auto" className="slider-close-btn" onClick={() => closeSlider(0)}>
                                                <IonIcon style={_styles.closeIcon} icon={close} />
                                            </IonCol>
                                            : <PlayBtn index={0} onclick={playBtnClicked} playing={playing[0]} />
                                        }
                                    </IonRow>
                                    <IonRow className="song-list-container">
                                        <IonHeader>
                                            <IonListHeader lines="full">
                                                <IonLabel style={_styles.listHeaderTitle}>Night Sound Audio</IonLabel>
                                            </IonListHeader>
                                        </IonHeader>
                                        <IonContent className="song-list-content" scrollEvents={true}>
                                            <IonList className="song-list">
                                                {songs.map((song, index) => <Audio index={index} onclick={chooseSong} active={index === activeSong} song={song} />)}
                                            </IonList>
                                        </IonContent>
                                    </IonRow>
                                </IonRow>
                            }
                        </IonRow>
                        <IonRow onClick={() => toggleAccordion(1)} className={getClassName(1)}>
                            <IonRow className="title-head" style={_styles.titleHead}>
                                <IonCol>Wake Sounds</IonCol>
                                {accordions[1] &&
                                    <Chevron index={1} onclick={closeAccordion} />
                                }
                            </IonRow>
                            {accordions[1] &&
                                <IonRow style={_styles.accContent}>
                                    <IonRow className="play-volume-grid">
                                        <Slider index={1} onclick={sliderOpenSlider} open={sliderOpen[1]} />
                                        {sliderOpen[1] ?
                                            <IonCol size="auto" className="slider-close-btn" onClick={() => closeSlider(1)}>
                                                <IonIcon style={_styles.closeIcon} icon={close} />
                                            </IonCol>
                                            : <PlayBtn index={1} onclick={playBtnClicked} playing={playing[1]} />
                                        }
                                    </IonRow>
                                    <IonRow className="song-list-container">
                                        <IonHeader>
                                            <IonListHeader lines="full">
                                                <IonLabel style={_styles.listHeaderTitle}>Wake Sound Audio</IonLabel>
                                            </IonListHeader>
                                        </IonHeader>
                                        <IonContent className="song-list-content" scrollEvents={true}>
                                            <IonList className="song-list">
                                                {songs.map((song, index) => <Audio index={index} onclick={chooseSong} active={index === activeSong} song={song} />)}
                                            </IonList>
                                        </IonContent>
                                    </IonRow>
                                </IonRow>
                            }
                        </IonRow>
                    </IonGrid>
                </IonGrid>
            </IonContent>
        </IonPage>
    )
}

interface ChevronProps {
    index: number,
    onclick: (index: number) => void
}

const Chevron: React.FC<ChevronProps> = ({ index, onclick }) => {

    const _styles = {
        chevron: {
            textAlign: "right",
            padding: 0
        }
    }

    return (
        <IonCol style={_styles.chevron}>
            <IonButton color="light" fill="clear" onClick={() => onclick(index)}>
                <IonIcon size="1.1rem" slot="icon-only" icon={chevronUp} />
            </IonButton>
        </IonCol>
    )
}

interface PlayBtnProps {
    index: number,
    onclick: (index: number) => void,
    playing: boolean
}

const PlayBtn: React.FC<PlayBtnProps> = ({ index, onclick, playing }) => {

    const _styles = {
        icon: {
            fontSize: "7vh"
        }
    }

    return (
        <IonCol className={playing ? "playing play-btn" : "play-btn"} onClick={() => onclick(index)}>
            {playing ?
                <IonIcon style={_styles.icon} color="tertiary" icon={pause} />
                :
                <IonIcon style={_styles.icon} color="tertiary" icon={play} />
            }
        </IonCol>
    )
}


export default Sounds