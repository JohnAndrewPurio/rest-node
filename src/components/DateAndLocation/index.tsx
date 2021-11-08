import { useEffect, useState, useContext } from 'react';
import {
  IonRow,
  IonCol,
  IonHeader,
  IonContent,
  IonToolbar,
} from '@ionic/react';
import moment from 'moment';

import UserContext, { geoip } from '../../contextStore/userContext';
import { getCurrentPosition } from '../../utils/getCurrentPosition';
import { place } from './styles';

const DateAndLocation: React.FC = ({ children }) => {
  const user = useContext(UserContext);
  const [location, setLocation] = useState<string>('');
  const date = moment();

  const geoLocation = user ? user[geoip] : '';

  console.log('Date and Location:', user, geoLocation);

  useEffect(() => {
    getCurrentPosition(setLocation);
  }, []);

  return (
    <IonContent>
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
      <IonContent>{children}</IonContent>
    </IonContent>
  );
};

export default DateAndLocation;
