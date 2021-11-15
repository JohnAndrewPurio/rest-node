import { Storage } from '@capacitor/storage';
import { IonRow } from '@ionic/react';
import { useContext, useEffect } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import BedTimeContext from '../../contextStore/BedTimeContext/bedtimeContext';
import { storage } from '../../services/constants';
import './styles.css';
import { BEDTIME, LIGHTS, SOUNDS, RELAXATION } from '../../pages/Settings/paths.json'

const TimeBar: React.FC<RouteComponentProps> = ({ location }) => {

  const { state } = useContext(BedTimeContext)

  useEffect(() => {
    updateTimeBar()
  }, [state])

  const updateTimeBar = async () => {
    const { value } = await Storage.get({key: storage.RED_NODE_STATES})
    if (value) {
      const states = JSON.parse(value)
      switch(location.pathname) {
        case BEDTIME:
        case LIGHTS:
        case SOUNDS:
        case RELAXATION:
      }
    }
  }

  return (
    <IonRow className="sound-time">
      <IonRow className="time-bar">
        <div className="wake-time" />
        <div className="night-time" />
      </IonRow>
      <div className="times">
        <div className="time time1">00:00</div>
        <div className="time time2">00:00</div>
        <div className="time time3">00:00</div>
        <div className="time time4">00:00</div>
      </div>
    </IonRow>
  );
};

export default withRouter(TimeBar);
