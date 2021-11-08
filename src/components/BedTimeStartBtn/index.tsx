import { IonButton, IonRow } from '@ionic/react';
import moment from 'moment';
import { useContext } from 'react';
import {
  startBedTimeNow,
  stopBedTimeNow,
} from '../../contextStore/BedTimeContext/bedtimeActions';
import BedTimeContext from '../../contextStore/BedTimeContext/bedtimeContext';

const BedTimeStartBtn: React.FC = () => {
  const { state, dispatch } = useContext(BedTimeContext);

  const _styles = {
    container: {
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
    },
  };

  const started =
    moment().isSameOrAfter(state.bedtimeStart) &&
    moment().isSameOrBefore(state.wakeUpTime);

  return (
    <IonRow style={_styles.container}>
      <div className="outer-circle">
        {started ? (
          <IonButton
            fill="clear"
            shape="round"
            className="inner-circle"
            color="light"
            onClick={() => dispatch(stopBedTimeNow())}
          >
            <p className="circle-text">
              <span className="p-block">Stop and</span>
              <span className="p-block">Restart</span>
            </p>
          </IonButton>
        ) : (
          <IonButton
            fill="clear"
            shape="round"
            className="inner-circle"
            color="light"
            onClick={() => dispatch(startBedTimeNow())}
          >
            <p className="circle-text">
              <span className="p-block">Start</span>
              <span className="p-block">Now</span>
            </p>
          </IonButton>
        )}
      </div>
    </IonRow>
  );
};

export default BedTimeStartBtn;
