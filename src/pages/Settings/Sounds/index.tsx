import { IonContent, IonGrid, IonPage } from '@ionic/react';
import { useState } from 'react';
import TimeBar from '../../../components/TimeBar';
import './styles.css';
import SettingsHeader from '../../../components/SettingsHeader';
import SoundAccordion from '../../../components/SoundAccordion';
import { SoundsContextProvider } from '../../../contextStore/SoundsContext/soundsContext';

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
    <SoundsContextProvider>
      <IonPage>
        <SettingsHeader title="Sounds Settings" />
        <IonContent style={_styles.fullHeight}>
          <IonGrid style={_styles.innerGrid}>
            <TimeBar />
            <IonGrid style={_styles.accordions}>
              <SoundAccordion
                component="night"
                index={0}
                accordionOpen={accordions[0]}
                openAccordion={() => toggleAccordion(0)}
                closeSlider={() => closeSlider(0)}
                sliderOpen={sliderOpen[0]}
                closeAccordion={() => closeAccordion(0)}
                openSlider={() => sliderOpenSlider(0)}
                activeSong={activeSong}
                chooseSong={chooseSong}
              />
              <SoundAccordion
                component="wake"
                index={1}
                accordionOpen={accordions[1]}
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
    </SoundsContextProvider>
  );
};

export default Sounds;
