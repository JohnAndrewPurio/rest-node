import {
  IonGrid,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonRow,
} from '@ionic/react';
import moment from 'moment';
import momentTz from 'moment-timezone';

interface BedTimeStartProps {
  bedtime: moment.Moment;
}

const BedTimeStartTime: React.FC<BedTimeStartProps> = ({ bedtime }) => {
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

export default BedTimeStartTime;
