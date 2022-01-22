import { IonDatetime, IonIcon, IonItem, IonLabel } from '@ionic/react';
import { alarm } from 'ionicons/icons';
import moment from 'moment';
import { useContext } from 'react';
import { setWakeUpTime } from '../../../contextStore/BedTimeContext/bedtimeActions';
import BedTimeContext from '../../../contextStore/BedTimeContext/bedtimeContext';
import _styles from '../styles';

const WakeUpTimePicker: React.FC = () => {
    const { state, dispatch } = useContext(BedTimeContext);
    const { wakeUpTime, started } = state;

    return (
        <IonItem lines="none" style={_styles.timePickerContainer}>
            <IonDatetime
                style={_styles.picker}
                presentation="time"
                value={wakeUpTime.format()}
                onIonChange={e =>
                    dispatch(setWakeUpTime(moment(e.detail.value!)))
                }
                min={moment().add(24, 'h').format('YYYY-MM-DD')}
                disabled={started}
            />
            <IonLabel slot="end" style={_styles.label}>
                <IonIcon color="tertiary" icon={alarm} />
            </IonLabel>
        </IonItem>
    );
};

export default WakeUpTimePicker;
