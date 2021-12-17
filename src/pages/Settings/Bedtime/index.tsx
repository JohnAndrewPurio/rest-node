import { IonContent, IonGrid, IonPage } from '@ionic/react';
import { FC, useContext, useEffect } from 'react';
import { Storage } from '@capacitor/storage';
import moment from 'moment';
import SettingsHeader from '../../../components/SettingsHeader';
import TimeBar from '../../../components/TimeBar';
import BedTimeStartBtn from '../../../components/BedTimeStartBtn';
import BedTimeStartTime from '../../../components/BedTimeStartTime';
import BedTimeControl from '../../../components/BedTimeControl';
import BedTimeContext from '../../../contextStore/BedTimeContext/bedtimeContext';
import WakeTimeCountdown from '../../../components/WakeTimeCountdown';
import {
  bedtimeStarted,
  setState,
} from '../../../contextStore/BedTimeContext/bedtimeActions';
import { getStartEnd } from '../helper';

import _styles from './styles';
import { storageGet } from '../../../api/CapacitorStorage';
import { REST_NODE_STATES_KEY } from '../../../api/CapacitorStorage/keys';

const Bedtime: FC = () => {
  const { state, dispatch } = useContext(BedTimeContext);
  const { started, bedtimeStart, wakeUpTime } = state;

  // sync the value of the context states to the local stored value
  const getState = async () => {
    const { value } = await storageGet(REST_NODE_STATES_KEY)
    if (value) {
      const defaultStates = JSON.parse(value);
      const { start, end } = getStartEnd(defaultStates);
      const newState = {
        started: moment().isSameOrAfter(start) && moment().isSameOrBefore(end),
        bedtimeStart: start,
        bedtimeHours: end.diff(start, 'hours'),
        wakeUpTime: end,
      };
      dispatch(setState(newState));
    }
  };

  const isBedtime = () =>
    moment().isSameOrAfter(bedtimeStart) && moment().isSameOrBefore(wakeUpTime);

  // check if bedtime started or stopped every second
  useEffect(() => {
    const interval = setInterval(() => {
      if (!started && isBedtime()) {
        dispatch(bedtimeStarted());
      }
    }, 1000);

    getState();

    return () => clearInterval(interval);

    // eslint-disable-next-line
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
