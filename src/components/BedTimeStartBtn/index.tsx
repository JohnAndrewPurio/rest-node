import { IonButton, IonRow } from '@ionic/react';
import moment from 'moment';
import { useContext } from 'react';
import {
    startBedTimeNow,
    stopBedTimeNow,
} from '../../contextStore/BedTimeContext/bedtimeActions';
import BedTimeContext from '../../contextStore/BedTimeContext/bedtimeContext';
import _styles from './styles';

const BedTimeStartBtn: React.FC = () => {
    const { state, dispatch } = useContext(BedTimeContext);

    const started =
        moment().isSameOrAfter(state.bedtimeStart) &&
        moment().isSameOrBefore(state.wakeUpTime);

    return (
        <IonRow style={_styles.container}>
            <div style={_styles.outerCircle}>
                {started ? (
                    <IonButton
                        fill="clear"
                        shape="round"
                        style={_styles.startedInnerCircle}
                        color="light"
                        onClick={() => dispatch(stopBedTimeNow())}
                    >
                        <p style={_styles.circleText}>
                            <span style={_styles.textSpan}>Stop and</span>
                            <span style={_styles.textSpan}>Restart</span>
                        </p>
                    </IonButton>
                ) : (
                    <IonButton
                        fill="clear"
                        shape="round"
                        style={_styles.notStartedInnerCircle}
                        color="light"
                        onClick={() => dispatch(startBedTimeNow())}
                    >
                        <p style={_styles.circleText}>
                            <span style={_styles.textSpan}>Start</span>
                            <span style={_styles.textSpan}>Now</span>
                        </p>
                    </IonButton>
                )}
            </div>
        </IonRow>
    );
};

export default BedTimeStartBtn;
