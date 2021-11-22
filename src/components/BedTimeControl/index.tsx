import {
  IonGrid,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonRow,
} from '@ionic/react';
import HoursSetter from './HourSetter';
import _styles from './styles';
import WakeUpTimePicker from './WakeUpTimePicker';

const BedTimeControl: React.FC = () => {
  return (
    <IonRow style={_styles.timeControlContainer}>
      <IonList style={_styles.settingsList}>
        <IonListHeader lines="full">
          <IonLabel style={_styles.headerText}>
            Configure bed time schedule
          </IonLabel>
        </IonListHeader>
        <IonItem lines="none" style={_styles.settingItem}>
          <IonGrid>
            <IonRow>
              <IonLabel>
                {' '}
                <span style={_styles.bullet}>●</span> How many hours do you need
                to sleep?
              </IonLabel>
            </IonRow>
            <IonRow>
              <HoursSetter />
            </IonRow>
          </IonGrid>
        </IonItem>
        <IonItem lines="none" style={_styles.settingItem}>
          <IonGrid>
            <IonRow>
              <IonLabel>
                {' '}
                <span style={_styles.bullet}>●</span> What time do you need to
                wake up?
              </IonLabel>
            </IonRow>
            <IonRow style={{ width: '100%' }}>
              <WakeUpTimePicker />
            </IonRow>
          </IonGrid>
        </IonItem>
      </IonList>
    </IonRow>
  );
};

export default BedTimeControl;
