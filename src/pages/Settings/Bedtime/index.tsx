import { IonContent, IonGrid, IonPage } from '@ionic/react';
import React, { useContext } from 'react';
import SettingsHeader from '../../../components/SettingsHeader';
import TimeBar from '../../../components/TimeBar';
import './styles.css';
import BedTimeStartBtn from '../../../components/BedTimeStartBtn';
import BedTimeStartTime from '../../../components/BedTimeStartTime';
import BedTimeControl from '../../../components/BedTimeControl';
import moment from 'moment';
import BedTimeContext from '../../../contextStore/BedTimeContext/bedtimeContext';
import WakeTimeCountdown from '../../../components/WakeTimeCountdown';

const Bedtime: React.FC = () => {
  const _styles = {
    page: {
      marginBottom: '5vh',
    },
  };

  const { state } = useContext(BedTimeContext);
  const started = moment().isSameOrAfter(state.bedtimeStart);

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
