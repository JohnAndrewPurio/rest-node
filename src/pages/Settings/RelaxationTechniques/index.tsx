import { IonContent, IonGrid, IonPage } from '@ionic/react';
import { useContext, useEffect, useState } from 'react';
import moment from 'moment';
import { Storage } from '@capacitor/storage';
import SettingsHeader from '../../../components/SettingsHeader';
import TimeBar from '../../../components/TimeBar';
import RelaxationList from '../../../components/RelaxationList';
import './styles.css';
import RelaxationFilter from '../../../components/RelaxationFilter';
import RelaxationFavorites from '../../../components/RelaxationFavorites';
import RelaxationContext, {
  RelaxationContextProvider,
} from '../../../contextStore/RelaxationContext/relaxationContext';
import RelaxationFooter from '../../../components/RelaxationPlayer';
import BedTimeContext from '../../../contextStore/BedTimeContext/bedtimeContext';
import { bedtimeStarted } from '../../../contextStore/BedTimeContext/bedtimeActions';
import { storage } from '../../../services/constants';
import { setState } from '../../../contextStore/RelaxationContext/relaxationActions';
import { getStartEnd } from '../helper';

const Relaxation: React.FC = () => {
  return (
    <RelaxationContextProvider>
      <IonPage>
        <SettingsHeader title="Relaxation Techniques" />
        <Content />
      </IonPage>
    </RelaxationContextProvider>
  );
};

export default Relaxation;

const Content: React.FC = () => {
  const [selected, setSelected] = useState('All');

  const onSelect = (time: string) => {
    setSelected(time);
  };

  const bedtimeState = useContext(BedTimeContext);
  const relaxationState = useContext(RelaxationContext);
  const { started, bedtimeStart, wakeUpTime } = bedtimeState.state;

  const getState = async () => {
    const { value } = await Storage.get({ key: storage.RED_NODE_STATES });
    let favorites = await Storage.get({ key: storage.RELAXATION_FAVORITES })
    if (!favorites.value) {
      favorites.value = JSON.stringify([])
    }

    if (value && favorites.value) {
      const defaultStates = JSON.parse(value);
      const { start, end } = getStartEnd(defaultStates);
      const nightStart = moment(start).add(
        defaultStates.bedtime.relax.onoffset,
        'minutes'
      );
      const nightEnd = moment(start).add(
        defaultStates.bedtime.relax.offoffset,
        'minutes'
      );
      const wakeStart = moment(end).add(
        defaultStates.waketime.relax.onoffset,
        'minutes'
      );
      const wakeEnd = moment(end).add(
        defaultStates.waketime.relax.offoffset,
        'minutes'
      );
      const isNightRelaxationOn =
        moment().isSameOrAfter(nightStart) && moment().isBefore(nightEnd);
      const isWakeRelaxationOn =
        moment().isSameOrAfter(wakeStart) && moment().isBefore(wakeEnd);
      const newState = {
        relaxationAudio: { night: defaultStates.bedtime.relax.onpayload.audio_file, wake: defaultStates.waketime.relax.onpayload.audio_file },
        relaxationFilter: 'All',
        relaxationPlaying: { night: isNightRelaxationOn, wake: isWakeRelaxationOn },
        nightRelaxationSchedule: { start: nightStart, end: nightEnd },
        wakeRelaxationSchedule: { start: wakeStart, end: wakeEnd },
        relaxationVolume: { night: defaultStates.bedtime.sound.onpayload.max_volume, wake: defaultStates.waketime.sound.onpayload.max_volume },
        sample: { playing: false, audio: null },
        favorites: JSON.parse(favorites.value),
      };
      relaxationState.dispatch(setState(newState));
    }
  };

  const isBedtime = () => moment().isSameOrAfter(bedtimeStart) && moment().isSameOrBefore(wakeUpTime);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!started && isBedtime()) {
        bedtimeState.dispatch(bedtimeStarted());
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (started) {
      getState();
    }
  }, [started]);

  return (
    <>
      <IonContent>
        <IonGrid>
          <TimeBar />
          <RelaxationFilter selected={selected} onSelect={onSelect} />
          <RelaxationFavorites />
          <RelaxationList />
        </IonGrid>
      </IonContent>
      <RelaxationFooter />
    </>
  );
};
