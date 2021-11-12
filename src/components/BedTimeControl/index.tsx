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

const BedTimeControl: React.FC = () => {
  const _styles = {
    headerText: {
      fontSize: '1.1rem',
      fontWeight: 700,
    },
    bullet: {
      color: 'var(--ion-color-primary-shade)',
    },
  };

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

  const _styles = {
    container: {
      width: '100%',
      height: '8vh',
      margin: '5vw 10vw 3vw 10vw',
      backgroundColor: 'var(--ion-color-primary-tint)',
      borderRadius: '10px',
      flexWrap: 'nowrap',
      justifyContent: 'space-evenly',
    },
    button: {
      height: '100%',
      width: '100%',
      '--padding-start': '0px',
      '--padding-end': '0px',
      '--padding-top': '0px',
      '--padding-bottom': '0px',
    },
    col: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 900,
      fontSize: '8vw',
      padding: 0,
      color: started
        ? 'var(--ion-color-secondary-shade)'
        : 'var(--ion-color-dark)',
    },
    icon: {
      fontSize: '10vw',
    },
    buttonColMinus: {
      border: '3px solid var(--ion-color-primary-shade)',
      borderTopLeftRadius: '10px',
      borderBottomLeftRadius: '10px',
    },
    buttonColAdd: {
      border: '3px solid var(--ion-color-primary-shade)',
      borderTopRightRadius: '10px',
      borderBottomRightRadius: '10px',
    },
  };

  return (
    <IonRow style={_styles.container}>
      <IonCol style={{ ..._styles.col, ..._styles.buttonColMinus }}>
        <IonButton
          onClick={() => dispatch(setBedtimeHours(false))}
          size="small"
          style={_styles.button}
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
      <IonCol style={_styles.col}>{bedtimeHours}</IonCol>
      <IonCol style={{ ..._styles.col, ..._styles.buttonColAdd }}>
        <IonButton
          onClick={() => dispatch(setBedtimeHours(true))}
          size="small"
          style={_styles.button}
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

  const _styles = {
    picker: {
      fontSize: '6vw',
      fontWeight: 700,
    },
    container: {
      borderRadius: '10px',
      border: '3px solid var(--ion-color-primary-shade)',
      margin: '5vw 10vw',
      display: 'flex',
      justifyContent: 'center',
    },
    label: {
      fontSize: '8vw',
      marginBottom: '5px',
      marginRight: '3vw',
    },
  };

  return (
    <IonItem lines="none" style={_styles.container}>
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
