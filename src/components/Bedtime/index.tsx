import {
  IonContent,
  IonGrid,
  IonPage,
  IonRow,
  IonButton,
  IonListHeader,
  IonLabel,
  IonList,
  IonItem,
  IonCol,
  IonIcon,
  IonDatetime,
} from '@ionic/react';
import { add, alarm, remove } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import SettingsHeader from '../SettingsHeader';
import TimeBar from '../TimeBar';
import './styles.css';
import moment from 'moment';
import momentTz from 'moment-timezone';

const Bedtime: React.FC = () => {
  const _styles = {
    page: {
      marginBottom: '5vh',
    },
  };

  const [sleepHours, setSleepHours] = useState(8);
  const [bedtimeStarted, setBedtimeStarted] = useState(false);
  const [bedtime, setBedTime] = useState(moment().add(30, 'm'));
  const [wakeUpTime, setWakeUpTime] = useState(
    moment(bedtime).add(sleepHours, 'h')
  );

  const handleChangeHours = (add: boolean) => {
    if (add && sleepHours < 24) {
      setSleepHours((p) => p + 1);
    } else if (!add && sleepHours > 1) {
      setSleepHours((p) => p - 1);
    }
  };

  const handleChangeWakeTime = (val: string) => {
    console.log(wakeUpTime);
    setWakeUpTime(moment(val));
    console.log(wakeUpTime);
  };

  useEffect(() => {
    setBedTime(moment(wakeUpTime).subtract(sleepHours, 'h'));
  }, [sleepHours, wakeUpTime]);

  return (
    <IonPage style={_styles.page}>
      <SettingsHeader title="Bedtime Settings" />
      <IonContent>
        <IonGrid>
          <TimeBar />
          <StartBtn />
          <BedTimeStart bedtime={bedtime} />
          <TimeControl
            sleepHours={sleepHours}
            handleChangeHours={handleChangeHours}
            wakeUpTime={wakeUpTime}
            handleChangeWakeTime={handleChangeWakeTime}
          />
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

const StartBtn: React.FC = () => {
  const _styles = {
    container: {
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
    },
  };

  return (
    <IonRow style={_styles.container}>
      <div className="outer-circle">
        <IonButton
          fill="clear"
          shape="round"
          className="inner-circle"
          color="light"
        >
          <p className="circle-text">
            <p>Start</p>
            <p>Now</p>
          </p>
        </IonButton>
      </div>
    </IonRow>
  );
};

interface BedTimeStartProps {
  bedtime: moment.Moment;
}

const BedTimeStart: React.FC<BedTimeStartProps> = ({ bedtime }) => {
  const _styles = {
    headerText: {
      fontSize: '1.1rem',
      fontWeight: 700,
    },
    time: {
      fontSize: '12vw',
      fontWeight: 900,
      color: 'var(--ion-color-primary-shade)',
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
    },
    date: {
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      fontWeight: 900,
      color: 'var(--ion-color-primary-shade)',
    },
    grid: {
      marginTop: '5vw',
    },
  };

  return (
    <IonRow className="time-control-container">
      <IonList className="song-list">
        <IonListHeader lines="full">
          <IonLabel style={_styles.headerText}>
            Scheduled bed time start
          </IonLabel>
        </IonListHeader>
        <IonItem lines="none" className="transparent-bg-ion-item">
          <IonGrid style={_styles.grid}>
            <IonRow style={_styles.time}>
              {moment(bedtime).format('HH:mm')}
            </IonRow>
            <IonRow style={_styles.date}>
              {`${moment(bedtime).format('MMMM DD, YYYY z')} ${momentTz
                .tz(momentTz.tz.guess())
                .zoneAbbr()}`}
            </IonRow>
          </IonGrid>
        </IonItem>
      </IonList>
    </IonRow>
  );
};

interface TimeControlProps {
  sleepHours: number;
  handleChangeHours: (add: boolean) => void;
  wakeUpTime: moment.Moment;
  handleChangeWakeTime: (val: string) => void;
}

const TimeControl: React.FC<TimeControlProps> = ({
  sleepHours,
  handleChangeHours,
  wakeUpTime,
  handleChangeWakeTime,
}) => {
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
              <HoursSetter
                sleepHours={sleepHours}
                handleChangeHours={handleChangeHours}
              />
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
              <TimePicker
                wakeUpTime={wakeUpTime}
                handleChangeWakeTime={handleChangeWakeTime}
              />
            </IonRow>
          </IonGrid>
        </IonItem>
      </IonList>
    </IonRow>
  );
};

interface HoursSetterProps {
  sleepHours: number;
  handleChangeHours: (add: boolean) => void;
}

const HoursSetter: React.FC<HoursSetterProps> = ({
  sleepHours,
  handleChangeHours,
}) => {
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
          onClick={() => handleChangeHours(false)}
          size="small"
          style={_styles.button}
          fill="clear"
        >
          <IonIcon
            color="tertiary"
            style={_styles.icon}
            slot="icon-only"
            icon={remove}
          />
        </IonButton>
      </IonCol>
      <IonCol style={_styles.col}>{sleepHours}</IonCol>
      <IonCol style={{ ..._styles.col, ..._styles.buttonColAdd }}>
        <IonButton
          onClick={() => handleChangeHours(true)}
          size="small"
          style={_styles.button}
          fill="clear"
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

interface TimePickerProps {
  wakeUpTime: moment.Moment;
  handleChangeWakeTime: (val: string) => void;
}

const TimePicker: React.FC<TimePickerProps> = ({
  wakeUpTime,
  handleChangeWakeTime,
}) => {
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
        pickerOptions={{
          buttons: [
            {
              text: 'Confirm',
              handler: (e) => {
                console.log(e);
                return true;
              },
            },
            {
              text: 'Cancel',
              handler: () => {
                return false;
              },
            },
          ],
        }}
        displayFormat="HH:mm"
        value={wakeUpTime.format()}
        onIonChange={(e) => handleChangeWakeTime(e.detail.value!)}
      />
      <IonLabel slot="end" style={_styles.label}>
        <IonIcon color="tertiary" icon={alarm} />
      </IonLabel>
    </IonItem>
  );
};

export default Bedtime;
