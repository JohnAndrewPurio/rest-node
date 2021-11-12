import { useEffect, useState, useContext } from 'react';
import {
  IonRow,
  IonCol,
  IonHeader,
  IonContent,
  IonToolbar,
} from '@ionic/react';
import moment from 'moment';

import UserContext, { geoip } from '../../contextStore/UserContext/userContext';
import { getCurrentPosition } from '../../utils/getCurrentPosition';
import { place } from './styles';

const DateAndLocation: React.FC = () => {
  const user = useContext(UserContext);
  const [location, setLocation] = useState<string>('');
  const date = moment();

  const geoLocation = user ? user[geoip] : '';

  useEffect(() => {
    getCurrentPosition(setLocation);
  }, []);

  return (
    <IonHeader>
      <IonToolbar>
        <IonRow>
          <IonCol className="ion-text-center" style={place}>
            {location ||
              `${geoLocation.city_name}, ${geoLocation.country_name}`}
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol className="ion-text-center">
            {date.format('DD MMMM YYYY')}
          </IonCol>
        </IonRow>
      </IonToolbar>
    </IonHeader>
  );
};

export default DateAndLocation;
