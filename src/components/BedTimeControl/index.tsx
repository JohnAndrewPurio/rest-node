import {
  IonButton,
  IonCol,
  IonDatetime,
  IonGrid,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonRow,
} from '@ionic/react';
import { add, alarm, remove } from 'ionicons/icons';
import moment from 'moment';
import { useContext } from 'react';
import {
  setBedtimeHours,
  setWakeUpTime,
} from '../../contextStore/BedTimeContext/bedtimeActions';
import BedTimeContext from '../../contextStore/BedTimeContext/bedtimeContext';
import _styles from './styles';

const BedTimeControl: React.FC = () => {
  return (
    <IonRow className="time-control-container">
      <IonList className="song-list">
        <IonListHeader lines="full">
          <IonLabel style={_styles.headerText}>
            Configure bed time schedule
          </IonLabel>
        </IonListHeader>
        <IonItem lines="none" className="transparent-bg-ion-item">
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
        <IonItem lines="none" className="transparent-bg-ion-item">
          <IonGrid>
            <IonRow>
              <IonLabel>
                {' '}
                <span style={_styles.bullet}>●</span> What time do you need to
                wake up?
              </IonLabel>
            </IonRow>
            <IonRow>
              <TimePicker />
            </IonRow>
          </IonGrid>
        </IonItem>
      </IonList>
    </IonRow>
  );
};

const HoursSetter: React.FC = () => {
  const { state, dispatch } = useContext(BedTimeContext);
  const { bedtimeHours, started } = state;

  return (
    <IonRow style={_styles.hourSetterContainer}>
      <IonCol
        style={{ ..._styles.hourSetterColumn, ..._styles.buttonColMinus }}
      >
        <IonButton
          onClick={() => dispatch(setBedtimeHours(false))}
          size="small"
          style={_styles.hourSetterbutton}
          fill="clear"
          disabled={started}
        >
          <IonIcon
            color="tertiary"
            style={_styles.icon}
            slot="icon-only"
            icon={remove}
          />
        </IonButton>
      </IonCol>
      <IonCol style={_styles.hourSetterColumn}>{bedtimeHours}</IonCol>
      <IonCol
        style={{
          ..._styles.hourSetterNumber,
          color: started
            ? 'var(--ion-color-secondary-shade)'
            : 'var(--ion-color-dark)',
        }}
      >
        <IonButton
          onClick={() => dispatch(setBedtimeHours(true))}
          size="small"
          style={_styles.hourSetterbutton}
          fill="clear"
          disabled={started}
        >
          <IonIcon
            color="tertiary"
            style={_styles.icon}
            slot="icon-only"
            icon={add}
          />
        </IonButton>
      </IonCol>
    </IonRow>
  );
};

const TimePicker: React.FC = () => {
  const { state, dispatch } = useContext(BedTimeContext);
  const { wakeUpTime, started } = state;

  return (
    <IonItem lines="none" style={_styles.timePickerContainer}>
      <IonDatetime
        slot="start"
        style={_styles.picker}
        displayFormat="HH:mm"
        value={wakeUpTime.format()}
        onIonChange={(e) => dispatch(setWakeUpTime(moment(e.detail.value!)))}
        min={moment().add(24, 'h').format('YYYY-MM-DD')}
        disabled={started}
      />
      <IonLabel slot="end" style={_styles.label}>
        <IonIcon color="tertiary" icon={alarm} />
      </IonLabel>
    </IonItem>
  );
};

export default BedTimeControl;
