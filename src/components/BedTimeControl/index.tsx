import { FC } from 'react';
import {
    IonGrid,
    IonItem,
    IonLabel,
    IonList,
    IonListHeader,
    IonRow,
} from '@ionic/react';
import HoursSetter from './HourSetter';
import WakeUpTimePicker from './WakeUpTimePicker';

import styles from './styles.module.css';

const BedTimeControl: FC = () => {
    const labels = {
        bedtimeSchedule: 'Configure bed time schedule',
        hoursNeeded: 'How many hours do you need to sleep?',
        timeToWakeup: 'What time do you need to wake up?',
    };

    return (
        <IonRow className={styles.timeControlContainer}>
            <IonList className={styles.settingsList}>
                <IonListHeader lines="full">
                    <IonLabel className={styles.headerText}>
                        {labels.bedtimeSchedule}
                    </IonLabel>
                </IonListHeader>
                <IonItem lines="none" className={styles.settingItem}>
                    <IonGrid>
                        <IonRow>
                            <IonLabel>
                                {' '}
                                <span className={styles.bullet}>●</span>
                                {labels.hoursNeeded}
                            </IonLabel>
                        </IonRow>
                        <IonRow>
                            <HoursSetter />
                        </IonRow>
                    </IonGrid>
                </IonItem>
                <IonItem lines="none" className={styles.settingItem}>
                    <IonGrid>
                        <IonRow>
                            <IonLabel>
                                {' '}
                                <span className={styles.bullet}>●</span>
                                {labels.timeToWakeup}
                            </IonLabel>
                        </IonRow>
                        <IonRow className={styles.fullWidth}>
                            <WakeUpTimePicker />
                        </IonRow>
                    </IonGrid>
                </IonItem>
            </IonList>
        </IonRow>
    );
};

export default BedTimeControl;
