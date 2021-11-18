import { IonContent, IonGrid, IonPage } from '@ionic/react';
import React, { useContext, useEffect } from 'react';
import { Storage } from '@capacitor/storage';
import SettingsHeader from '../../../components/SettingsHeader';
import TimeBar from '../../../components/TimeBar';
import './styles.css';
import BedTimeStartBtn from '../../../components/BedTimeStartBtn';
import BedTimeStartTime from '../../../components/BedTimeStartTime';
import BedTimeControl from '../../../components/BedTimeControl';
import moment from 'moment';
import BedTimeContext from '../../../contextStore/BedTimeContext/bedtimeContext';
import WakeTimeCountdown from '../../../components/WakeTimeCountdown';
import {
  bedtimeStarted,
  setState,
} from '../../../contextStore/BedTimeContext/bedtimeActions';
import { storage } from '../../../services/constants';
import { getStartEnd } from '../helper';

const Bedtime: React.FC = () => {
  const _styles = {
    page: {
      marginBottom: '5vh',
    },
  };

  const { state, dispatch } = useContext(BedTimeContext);
  const { started, bedtimeStart, wakeUpTime } = state;

  const getState = async () => {
    const { value } = await Storage.get({ key: storage.RED_NODE_STATES });
    if (value) {
      const defaultStates = JSON.parse(value);
      const { start, end } = getStartEnd(defaultStates);
      const newState = {
        started: moment().isSameOrAfter(start) && moment().isSameOrBefore(end),
        bedtimeStart: start,
        bedtimeHours: end.diff(start, 'hours'),
        wakeUpTime: end,
      };
      console.log(newState, end.format(), start.format());
      dispatch(setState(newState));
    }
  };

  const isBedtime = () =>
    moment().isSameOrAfter(bedtimeStart) && moment().isSameOrBefore(wakeUpTime);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!started && isBedtime()) {
        dispatch(bedtimeStarted());
      }
    }, 1000);
    getState();
    return () => clearInterval(interval);
  }, []);

  return (
    <IonPage style={_styles.page}>
      <SettingsHeader title="Bedtime Settings" />
      <IonContent>
        <IonGrid>
          <TimeBar />
          <BedTimeStartBtn />
          {started ? <WakeTimeCountdown /> : <BedTimeStartTime />}
          <BedTimeControl />
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Bedtime;
