import { IonContent, IonRow } from '@ionic/react';
import DateAndLocation from '../../DateAndLocation';
import MainClock from '../../MainClock';
import SettingsList from '../../SettingsList';
import './styles.css';

const Dashboard: React.FC = () => {
  const _styles = {
    clock: {
      display: 'flex',
      justifyContent: 'center',
    },
  };

  return (
    <IonContent>
      <DateAndLocation>
        <IonRow style={_styles.clock}>
          <MainClock />
        </IonRow>
        <SettingsList />
      </DateAndLocation>
    </IonContent>
  );
};

export default Dashboard;
