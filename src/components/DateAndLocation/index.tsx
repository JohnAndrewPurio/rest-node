import { useEffect, useState, useContext } from 'react';
import {
  IonRow,
  IonCol,
  IonHeader,
  IonContent,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonGrid,
  IonTitle,
  useIonViewDidLeave,
  useIonViewDidEnter,
} from '@ionic/react';
import moment from 'moment';

import UserContext, { geoip } from '../../contextStore/UserContext/userContext';
import { getCurrentPosition } from '../../utils/getCurrentPosition';
import { place, header } from './styles';
import MenuContext from '../../contextStore/AppContext/menuContext';

const DateAndLocation: React.FC = () => {
  const user = useContext(UserContext);
  const [location, setLocation] = useState<string>('');
  const date = moment();

  const [, setSwiper] = useContext(MenuContext);

  useEffect(() => {
    if (setSwiper) {
      setSwiper(true);
    }
    return () => {
      if (setSwiper) setSwiper(false);
    };
  }, []);

  const geoLocation = user ? user[geoip] : '';

  useEffect(() => {
    getCurrentPosition(setLocation);
  }, []);

  return (
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonMenuButton menu="main" />
        </IonButtons>
        <IonTitle style={header}>
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
        </IonTitle>
      </IonToolbar>
    </IonHeader>
  );
};

export default DateAndLocation;
