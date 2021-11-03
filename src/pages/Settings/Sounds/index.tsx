import { IonContent, IonGrid, IonPage } from '@ionic/react';
import { useState } from 'react';
import TimeBar from '../../../components/TimeBar';
import './styles.css';
import SettingsHeader from '../../../components/SettingsHeader';
import SoundAccordion from '../../../components/SoundAccordion';

const Sounds: React.FC = () => {
  const _styles = {
    fullHeight: {
      height: '100%',
    },
    accordions: {
      flex: 1,
      width: '100%',
    },
    innerGrid: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
  };

  const [accordions, setAccordions] = useState([false, false]);

  const toggleAccordion = (index: number) => {
    if (!accordions[index]) {
      const newArr = new Array(accordions.length).fill(false);
      newArr[index] = !accordions[index];
      setAccordions(newArr);
      setSliderOpen(new Array(sliderOpen.length).fill(false));
    }
  };

  const closeAccordion = (index: number) => {
    const newArr = new Array(accordions.length).fill(false);
    newArr[index] = !accordions[index];
    setAccordions(newArr);
    setSliderOpen(new Array(sliderOpen.length).fill(false));
  };

  const [playing, setPlaying] = useState([false, false]);

  const playBtnClicked = (index: number) => {
    const newArr = new Array(playing.length).fill(false);
    newArr[index] = !playing[index];
    setPlaying(newArr);
  };

  const [sliderOpen, setSliderOpen] = useState([false, false]);

  const sliderOpenSlider = (index: number) => {
    if (!sliderOpen[index]) {
      const newArr = new Array(sliderOpen.length).fill(false);
      newArr[index] = !sliderOpen[index];
      setSliderOpen(newArr);
    }
  };

  const closeSlider = (index: number) => {
    const newArr = new Array(sliderOpen.length).fill(false);
    newArr[index] = !sliderOpen[index];
    setSliderOpen(newArr);
  };

  const [activeSong, setActiveSong] = useState(0);

  const chooseSong = (index: number) => {
    if (activeSong !== index) {
      setActiveSong(index);
    }
  };

  return (
    <IonPage>
      <SettingsHeader title="Sounds Settings" />
      <IonContent style={_styles.fullHeight}>
        <IonGrid style={_styles.innerGrid}>
          <TimeBar />
          <IonGrid style={_styles.accordions}>
            <SoundAccordion
              index={0}
              title="Night Sounds"
              playing={playing[0]}
              playBtnClicked={playBtnClicked}
              open={accordions[0]}
              openAccordion={() => toggleAccordion(0)}
              closeSlider={() => closeSlider(0)}
              sliderOpen={sliderOpen[0]}
              closeAccordion={() => closeAccordion(0)}
              openSlider={() => sliderOpenSlider(0)}
              activeSong={activeSong}
              chooseSong={chooseSong}
            />
            <SoundAccordion
              index={1}
              title="Wake Sounds"
              playing={playing[1]}
              playBtnClicked={playBtnClicked}
              open={accordions[1]}
              openAccordion={() => toggleAccordion(1)}
              closeSlider={() => closeSlider(1)}
              sliderOpen={sliderOpen[1]}
              closeAccordion={() => closeAccordion(1)}
              openSlider={() => sliderOpenSlider(1)}
              activeSong={activeSong}
              chooseSong={chooseSong}
            />
          </IonGrid>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Sounds;
