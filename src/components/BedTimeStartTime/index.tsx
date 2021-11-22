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
import { useContext } from 'react';
import BedTimeContext from '../../contextStore/BedTimeContext/bedtimeContext';
import _styles from './styles';

const BedTimeStartTime: React.FC = () => {
  const { state } = useContext(BedTimeContext);
  const { bedtimeStart } = state;

  return (
    <IonRow style={_styles.container}>
      <IonList style={_styles.list}>
        <IonListHeader lines="full">
          <IonLabel style={_styles.headerText}>
            Scheduled bed time start
          </IonLabel>
        </IonListHeader>
        <IonItem lines="none">
          <IonGrid style={_styles.grid}>
            <IonRow style={_styles.time}>
              {moment(bedtimeStart).format('HH:mm')}
            </IonRow>
            <IonRow style={_styles.date}>
              {`${moment(bedtimeStart).format('MMMM DD, YYYY z')} ${momentTz
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
