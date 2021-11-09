import { IonContent, IonGrid, IonPage } from '@ionic/react';
import React, { useContext, useEffect } from 'react';
import SettingsHeader from '../../../components/SettingsHeader';
import TimeBar from '../../../components/TimeBar';
import './styles.css';
import BedTimeStartBtn from '../../../components/BedTimeStartBtn';
import BedTimeStartTime from '../../../components/BedTimeStartTime';
import BedTimeControl from '../../../components/BedTimeControl';
import moment from 'moment';
import BedTimeContext from '../../../contextStore/BedTimeContext/bedtimeContext';
import WakeTimeCountdown from '../../../components/WakeTimeCountdown';
import { bedtimeStarted } from '../../../contextStore/BedTimeContext/bedtimeActions';
// import { Storage } from '@capacitor/storage'

const Bedtime: React.FC = () => {
  const _styles = {
    page: {
      marginBottom: '5vh',
    },
  };

  const { state, dispatch } = useContext(BedTimeContext);
  const { started, bedtimeStart, wakeUpTime }  = state

  const getState = async () => {
    // let { value } = await Storage.get({key: 'bedtime'})
  }

  useEffect(() => {
    let interval = setInterval(() => {
      if (!started && moment().isSameOrAfter(bedtimeStart) && moment().isSameOrBefore(wakeUpTime)) {
        dispatch(bedtimeStarted())
      }
      getState()
    }, 1000)
    return () => clearInterval(interval)
  }, [])



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
