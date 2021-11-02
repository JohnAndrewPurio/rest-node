import { IonContent, IonGrid, IonPage } from '@ionic/react';
import React, { useContext } from 'react';
import SettingsHeader from '../../../components/SettingsHeader';
import TimeBar from '../../../components/TimeBar';
import './styles.css';
import moment from 'moment';
import BedTimeStartBtn from '../../../components/BedTimeStartBtn';
import BedTimeStartTime from '../../../components/BedTimeStartTime';
import BedTimeControl from '../../../components/BedTimeControl';
import BedTimeContext from '../../../contextStore/BedTimeContext/bedtimeContext';
import {
  setBedtimeHours,
  setWakeUpTime,
} from '../../../contextStore/BedTimeContext/bedtimeActions';

const Bedtime: React.FC = () => {
  const _styles = {
    page: {
      marginBottom: '5vh',
    },
  };

  const { state, dispatch } = useContext(BedTimeContext);
  const { bedtimeHours, bedtimeStart, wakeUpTime } = state;

  const handleChangeHours = (add: boolean) => {
    dispatch(setBedtimeHours(add));
  };

  const handleChangeWakeTime = (val: string) => {
    console.log(val);
    dispatch(setWakeUpTime(moment(val)));
  };

  return (
    <IonPage style={_styles.page}>
      <SettingsHeader title="Bedtime Settings" />
      <IonContent>
        <IonGrid>
          <TimeBar />
          <BedTimeStartBtn />
          <BedTimeStartTime bedtime={bedtimeStart} />
          <BedTimeControl
            sleepHours={bedtimeHours}
            handleChangeHours={handleChangeHours}
            wakeUpTime={wakeUpTime}
            handleChangeWakeTime={handleChangeWakeTime}
          />
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Bedtime;
