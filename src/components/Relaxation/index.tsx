import {
  IonButton,
  IonCol,
  IonContent,
  IonFooter,
  IonGrid,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonRow,
  IonSlide,
  IonSlides,
  IonToolbar
} from '@ionic/react';
import { heart, heartOutline, pause, play, playBack, playForward, reload } from 'ionicons/icons';
import { useState } from 'react';
import SettingsHeader from '../SettingsHeader';
import TimeBar from '../TimeBar';
import { techniques } from "./techniques.json"
import "./styles.css"

const Relaxation: React.FC = () => {

  const _styles = {
    playBtn: {
      height: "6vh",
      width: "6vh",
      margin: "1.5vh 0vh",
      '--padding-start': '0px',
      '--padding-end': '0px',
      '--padding-top': '0px',
      '--padding-bottom': '0px',
    },
    icon: {
      margin: 0
    },
    iconGoBack: {
      margin: 0,
      transform: "scale(-1, 1) rotate(35deg)",
      transformOrigin: "center"
    },
    paddingZero: {
      padding: 0
    },
    footerGrid: {
      display: "flex",
      alignItems: "center"
    }
  }

  const [playing, setPlaying] = useState(false)

  return (
    <IonPage>
      <SettingsHeader title="Relaxation Techniques" />
      <IonContent>
        <IonGrid>
          <TimeBar />
          <Filter />
          <Favorites />
          <List />
        </IonGrid>
      </IonContent>
      <IonFooter>
        <IonToolbar>
          <IonGrid style={_styles.footerGrid}>
            <IonCol size="auto">
              <IonButton fill="clear" shape="round" size="small" style={_styles.playBtn}  >
                <IonIcon color="primary" style={_styles.icon} icon={playBack} slot="icon-only" />
              </IonButton>
              <IonButton onClick={() => setPlaying(p => !p)} shape="round" size="small" style={_styles.playBtn}  >
                {playing ?
                  <IonIcon color="light" style={_styles.icon} icon={pause} slot="icon-only" />
                  : <IonIcon color="light" style={_styles.icon} icon={play} slot="icon-only" />
                }
              </IonButton>
              <IonButton fill="clear" shape="round" size="small" style={_styles.playBtn}  >
                <IonIcon color="primary" style={_styles.icon} icon={playForward} slot="icon-only" />
              </IonButton>
            </IonCol>
            <IonCol>
              <IonGrid style={_styles.paddingZero}>
                <IonRow style={{ fontWeight: 700 }}>Title title</IonRow>
                <IonRow style={{ fontSize: ".7rem" }}>Creator</IonRow>
              </IonGrid>
            </IonCol>
          </IonGrid>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

// filter by time
// favorites
// notification
// long list
// audio player

export default Relaxation;

const Filter: React.FC = () => {

  const _styles = {
    container: {
      margin: "1em .5em"
    },
    btn: {
      height: "10vw",
      width: "10vw",
      margin: 0,
      '--padding-start': '0px',
      '--padding-end': '0px',
      '--padding-top': '0px',
      '--padding-bottom': '0px',
    },
    filtersGrid: {
      marginTop: "2vh",
      padding: 0
    },
    label: {
      fontSize: "1.1rem",
      fontWeight: 700
    }
  }

  const filters = ["All", "5", "10", "15", "20", "30", "30+"]

  const [selected, setSelected] = useState("All")

  const select = (time: string) => {
    setSelected(time)
  }

  return (
    <IonRow style={_styles.container}>
      <IonGrid>
        <IonRow>
          <IonLabel style={_styles.label}>Filter by Time</IonLabel>
        </IonRow>
        <IonRow>
          <IonGrid style={_styles.filtersGrid}>
            {filters.map(time =>
              <IonCol>
                <IonButton onClick={() => select(time)} size="small" shape="round" style={_styles.btn} fill={selected === time ? "solid" : "outline"}>{time}</IonButton>
              </IonCol>
            )}
          </IonGrid>
        </IonRow>
      </IonGrid>
    </IonRow>
  )
}

const Favorites: React.FC = () => {

  const _styles = {
    container: {
      margin: "1em .5em"
    },
    label: {
      fontSize: "1.1rem",
      fontWeight: 700
    },
    slider: {
      height: "22vh",
      marginTop: "1em"
    },
    slide: {
      width: "150px",
    },
    card: {
      height: "100%",
      width: "100%",
      borderRadius: "10px",
      padding: "0em .3em"
    },
    detailsGrid: {
      fontSize: ".8rem",
      display: "flex"
    },
    paddingZero: {
      padding: 0
    },
    favBtn: {
      '--padding-start': '0px',
      '--padding-end': '0px',
      '--padding-top': '0px',
      '--padding-bottom': '0px',
    },
    fullHeight: {
      height: "100%"
    },
    playIcon: {
      fontSize: "4rem"
    },
    playBtn: {
      width: "100%",
      height: "100%",
      '--padding-start': '0px',
      '--padding-end': '0px',
      '--padding-top': '0px',
      '--padding-bottom': '0px',
    }
  }

  const slideOpt = {
    initialSlide: 0,
    speed: 600,
    slidesPerView: 'auto',
    zoom: false,
    grabCursor: true
  }

  const [playingIndex, setPlayingIndex] = useState<null | number>(null)
  const [playing, setPlaying] = useState(false)

  const showPlay = (index: number) => {
    console.log("showplay")
    if (index !== playingIndex) {
      console.log("showplay inside")
      setPlaying(false)
      setPlayingIndex(index)
    }
  }

  const playSong = () => {
    console.log("click playing")
    setPlaying(p => !p)
  }


  return (
    <IonRow style={_styles.container}>
      <IonGrid>
        <IonRow>
          <IonLabel style={_styles.label}>Favorites</IonLabel>
        </IonRow>
        <IonRow style={_styles.slider}>
          <IonContent style={_styles.fullHeight}>
            <IonSlides options={slideOpt} style={_styles.fullHeight}>
              {techniques.map((el, i) => (
                <IonSlide style={_styles.slide}>
                  <IonCol style={_styles.card}>
                    <IonRow className="slider-picture" onClick={() => showPlay(i)}>
                      <IonImg className="slider-ion-image" src="https://picsum.photos/200" />
                      <div className="length-indicator">05:14</div>
                      {i === playingIndex &&
                        <div className="card-play-btn">
                          <IonButton onClick={playSong} style={_styles.playBtn} fill="clear">
                            {playing ?
                              <IonIcon style={_styles.playIcon} slot="icon-only" icon={pause} />
                              : <IonIcon style={_styles.playIcon} slot="icon-only" icon={play} />
                            }
                          </IonButton>
                        </div>
                      }
                    </IonRow>
                    <IonGrid style={_styles.detailsGrid}>
                      <IonCol style={_styles.paddingZero}>
                        <IonGrid style={_styles.paddingZero}>
                          <IonRow style={{ fontWeight: 700 }}>Title title</IonRow>
                          <IonRow style={{ fontSize: ".7rem" }}>Creator</IonRow>
                        </IonGrid>
                      </IonCol>
                      <IonCol style={_styles.paddingZero} size="auto">
                        <IonButton shape="round" fill="clear" size="small" style={_styles.favBtn}>
                          <IonIcon slot="icon-only" icon={heart} />
                        </IonButton>
                      </IonCol>
                    </IonGrid>
                  </IonCol>
                </IonSlide>
              ))}
            </IonSlides>
          </IonContent>
        </IonRow>
      </IonGrid >
    </IonRow >
  )
}


const List: React.FC = () => {

  const _styles = {
    container: {
      margin: "1em .5em"
    },
    label: {
      fontSize: "1.1rem",
      fontWeight: 700
    },
    card: {
      height: "22vh",
      width: "120px",
      minWidth: "120px",
      borderRadius: "10px",
      padding: ".3em",
    },
    detailsGrid: {
      fontSize: ".8rem",
      display: "flex"
    },
    paddingZero: {
      padding: 0
    },
    favBtn: {
      '--padding-start': '0px',
      '--padding-end': '0px',
      '--padding-top': '0px',
      '--padding-bottom': '0px',
    },
    grid: {
      width: "100%",
      height: "auto",
      display: "flex",
      flexWrap: "wrap"
    },
    gridContainer: {
      width: "100%",
      marginTop: ".5em"
    }
  }

  return (
    <IonRow style={_styles.container}>
      <IonGrid>
        <IonRow>
          <IonLabel style={_styles.label}>All Techniques</IonLabel>
        </IonRow>
        <IonRow style={_styles.gridContainer}>
          <IonGrid style={_styles.grid}>
            {techniques.map(el => (
              <IonCol style={_styles.card}>
                <IonRow className="grid-picture">
                  <IonImg className="grid-ion-image" src="https://picsum.photos/200" />
                  <div className="length-indicator">05:14</div>
                </IonRow>
                <IonGrid style={_styles.detailsGrid}>
                  <IonCol style={_styles.paddingZero}>
                    <IonGrid style={_styles.paddingZero}>
                      <IonRow style={{ fontWeight: 700 }}>Title title</IonRow>
                      <IonRow style={{ fontSize: ".7rem" }}>Creator</IonRow>
                    </IonGrid>
                  </IonCol>
                  <IonCol style={_styles.paddingZero} size="auto">
                    <IonButton shape="round" fill="clear" size="small" style={_styles.favBtn}>
                      <IonIcon slot="icon-only" icon={heartOutline} />
                    </IonButton>
                  </IonCol>
                </IonGrid>
              </IonCol>
            ))}
          </IonGrid>
        </IonRow>
      </IonGrid>
    </IonRow>
  )
}