import { useContext, useEffect, useState } from 'react';
import {
    IonButtons,
    IonCol,
    IonHeader,
    IonMenuButton,
    IonRow,
    IonTitle,
    IonToolbar,
} from '@ionic/react';
import moment from 'moment';
import './styles.css';

import UserContext, { geoip } from '../../contextStore/UserContext/userContext';
import { getCurrentPosition } from '../../utils/getCurrentPosition';
import { header, place } from './styles';
import MenuContext from '../../contextStore/AppContext/menuContext';

const DateAndLocation: React.FC = () => {
    const user = useContext(UserContext);
    const [location, setLocation] = useState<string>('');
    const date = moment();

    const [, setSwiper] = useContext(MenuContext);

    useEffect(() => {
        if (!setSwiper) return;

        setSwiper(true);

        const cleanup = () => {
            setSwiper(false);
        };

        return cleanup;

        // eslint-disable-next-line
    }, [])

    const geoLocation = user ? user[geoip] : '';

    useEffect(() => {
        getCurrentPosition(setLocation);
    }, []);

    return (
        <IonHeader>
            <IonToolbar mode="ios">
                <IonButtons slot="start">
                    <IonMenuButton menu="main" mode="md" />
                </IonButtons>
                <IonTitle style={header} className="DALTitle">
                    <IonRow>
                        <IonCol className="ion-text-center" style={place}>
                            {location ||
                                `${geoLocation.city_name}, ${geoLocation.country_name}`}
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol
                            className="ion-text-center"
                            style={{ paddingBottom: '.5em' }}
                        >
                            {date.format('DD MMMM YYYY')}
                        </IonCol>
                    </IonRow>
                </IonTitle>
            </IonToolbar>
        </IonHeader>
    );
};

export default DateAndLocation;
