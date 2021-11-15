import { IonContent, IonGrid, IonPage } from '@ionic/react';
import { useContext, useEffect, useState } from 'react';
import { Storage } from '@capacitor/storage';
import TimeBar from '../../../components/TimeBar';
import './styles.css';
import SettingsHeader from '../../../components/SettingsHeader';
import SoundAccordion from '../../../components/SoundAccordion';
import SoundsContext, {
  SoundsContextProvider,
} from '../../../contextStore/SoundsContext/soundsContext';
import BedTimeContext from '../../../contextStore/BedTimeContext/bedtimeContext';
import moment from 'moment';
import { bedtimeStarted } from '../../../contextStore/BedTimeContext/bedtimeActions';
import { storage } from '../../../services/constants';
import { setState } from '../../../contextStore/SoundsContext/soundsActions';
import { getStartEnd } from '../helper';

const Sounds: React.FC = () => {
  return (
    <SoundsContextProvider>
      <IonPage>
        <SettingsHeader title="Sounds Settings" />
        <Content />
      </IonPage>
    </SoundsContextProvider>
  );
};

export default Sounds;

const Content: React.FC = () => {
  const bedtimeState = useContext(BedTimeContext);
  const soundsState = useContext(SoundsContext);
  const { started, bedtimeStart, wakeUpTime } = bedtimeState.state;

  const getState = async () => {
    const { value } = await Storage.get({ key: storage.RED_NODE_STATES });
    if (value) {
      const defaultStates = JSON.parse(value);
      const { start, end } = getStartEnd(defaultStates);
      const nightStart = moment(start).add(
        defaultStates.bedtime.sound.onoffset,
        'minutes'
      );
      const nightEnd = moment(start).add(
        defaultStates.bedtime.sound.offoffset,
        'minutes'
      );
      const wakeStart = moment(end).add(
        defaultStates.waketime.sound.onoffset,
        'minutes'
      );
      const wakeEnd = moment(end).add(
        defaultStates.waketime.sound.offoffset,
        'minutes'
      );
      const isNightSoundOn =
        moment().isSameOrAfter(nightStart) && moment().isBefore(nightEnd);
      const isWakeSoundOn =
        moment().isSameOrAfter(wakeStart) && moment().isBefore(wakeEnd);
      const newState = {
        sound: { night: isNightSoundOn, wake: isWakeSoundOn },
        volume: {
          night: defaultStates.bedtime.sound.onpayload.max_volume,
          wake: defaultStates.bedtime.sound.onpayload.max_volume,
        },
        audio: {
          night: defaultStates.bedtime.sound.onpayload.audio_file,
          wake: defaultStates.bedtime.sound.onpayload.audio_file,
        },
        nightSoundSchedule: { start: nightStart, end: nightEnd },
        wakeSoundSchedule: { start: wakeStart, end: wakeEnd },
        sample: { playing: false, audio: null },
      };
      soundsState.dispatch(setState(newState));
    }
  };

  const isBedtime = () =>
    moment().isSameOrAfter(bedtimeStart) && moment().isSameOrBefore(wakeUpTime);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!started && isBedtime()) {
        bedtimeState.dispatch(bedtimeStarted());
      }
    }, 1000);
    getState();
    return () => clearInterval(interval);
  }, []);

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
  );
};
