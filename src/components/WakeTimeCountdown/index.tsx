import {
    IonGrid,
    IonItem,
    IonLabel,
    IonList,
    IonListHeader,
    IonRow,
} from '@ionic/react';
import moment from 'moment';
import React, { useContext, useEffect, useState } from 'react';
import BedTimeContext from '../../contextStore/BedTimeContext/bedtimeContext';
import _styles from './styles';

const WakeTimeCountdown: React.FC = () => {
    const { state } = useContext(BedTimeContext);
    const { wakeUpTime } = state;

    const [diff, setDiff] = useState(wakeUpTime.diff(moment(), 'hours', true));
    const hour = Math.floor(diff);
    const minute = Math.floor(60 * (diff % 1));
    const second = Math.floor(60 * ((60 * (diff % 1)) % 1));

    useEffect(() => {
        const interval = setInterval(() => {
            setDiff(wakeUpTime.diff(moment(), 'hours', true));
        }, 1000);
        return () => clearInterval(interval);
    }, [wakeUpTime]);

    return (
        <IonRow style={_styles.container}>
            <IonList style={_styles.list}>
                <IonListHeader lines="full">
                    <IonLabel style={_styles.headerText}>
                        Hours until wake time
                    </IonLabel>
                </IonListHeader>
                <IonItem lines="none" style={_styles.settingItem}>
                    <IonGrid style={_styles.grid}>
                        <IonRow style={_styles.time}>
                            {hour}h{minute}m{second}s
                        </IonRow>
                    </IonGrid>
                </IonItem>
            </IonList>
        </IonRow>
    );
};

export default WakeTimeCountdown;
