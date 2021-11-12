import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonHeader,
  IonIcon,
  IonLabel,
  IonTitle,
  IonToolbar,
  useIonAlert,
} from '@ionic/react';
import { arrowBack, save } from 'ionicons/icons';
import { useContext, useEffect } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { Storage } from '@capacitor/storage';
import _ from 'lodash';
import BedTimeContext from '../../contextStore/BedTimeContext/bedtimeContext';
import {
  LIGHTS,
  SOUNDS,
  BEDTIME,
  RELAXATION,
} from '../../pages/Settings/paths.json';
import { storage } from '../../services/constants';
import SoundsContext from '../../contextStore/SoundsContext/soundsContext';
import LightsContext from '../../contextStore/LightsContext/lightsContext';
import RelaxationContext from '../../contextStore/RelaxationContext/relaxationContext';
import { RestnodeService } from '../../services/restnodeServices';
import { RestNodeStateType } from '../../types';
import {
  bedtimeStateChangeChecker,
  lightsStateChangeChecker,
  relaxationStateChangeChecker,
  soundsStateChangeChecker,
} from './helper';

interface Props
  extends RouteComponentProps<{
    id: string;
  }> {
  title: string;
}

const SettingsHeader: React.FC<Props> = ({ title, history, location }) => {
  const bedtimeState = useContext(BedTimeContext);
  const soundsState = useContext(SoundsContext);
  const lightsState = useContext(LightsContext);
  const relaxationState = useContext(RelaxationContext);
  const { started } = bedtimeState.state;

  const [present] = useIonAlert();

  const goBack = async () => {
    const change: changeCheck = await stateCheck();
    if (!started && change.status) {
      present({
        cssClass: 'my-css',
        header: 'Save changes?',
        message: '',
        buttons: [
          { text: 'No', handler: () => history.goBack() },
          {
            text: 'Yes',
            handler: async () => {
              if (change.newState) await saveChanges(change.newState);
              history.goBack();
            },
          },
        ],
      });
    } else {
      history.goBack();
    }
  };

  const saveChanges = async (change: RestNodeStateType) => {
    try {
      await RestnodeService.updateValues(change);
    } catch (e) {
      present({
        cssClass: 'my-css',
        header: 'Error',
        message: 'Cannot connect to REST Node',
        buttons: ['Ok'],
        onDidDismiss: (e) => history.replace('/profile'),
      });
    }
  };

  interface changeCheck {
    status: boolean;
    newState?: RestNodeStateType;
  }

  const stateCheck = async (): Promise<changeCheck> => {
    const { value } = await Storage.get({ key: storage.RED_NODE_STATES });
    if (value) {
      const states: RestNodeStateType = JSON.parse(value);
      switch (location.pathname) {
        case BEDTIME: {
          return bedtimeStateChangeChecker(bedtimeState.state, states);
        }
        case LIGHTS: {
          return lightsStateChangeChecker(lightsState.state, states);
        }
        case SOUNDS: {
          return soundsStateChangeChecker(soundsState.state, states);
        }
        case RELAXATION:
          return relaxationStateChangeChecker();
      }
    }
    return { status: false };
  };

  const hardwareBackHandlers = (ev: any) => {
    const path = window.location.pathname;
    ev.detail.register(5, (processNextHandler: any) => {
      if (path.includes('settings')) {
        goBack();
      } else {
        processNextHandler();
      }
    });
  };

  const handleSaveClick = async () => {
    const change: changeCheck = await stateCheck();
    if (change.status) {
      present({
        cssClass: 'my-css',
        header: 'Save changes?',
        message: '',
        buttons: [
          { text: 'No', handler: () => history.goBack() },
          {
            text: 'Yes',
            handler: async () => {
              if (change.newState) await saveChanges(change.newState);
            },
          },
        ],
      });
    } else {
      present({
        cssClass: 'my-css',
        header: 'There are no new changes',
        message: '',
        buttons: ['Ok'],
      });
    }
  };

  // android hardware back button listener
  useEffect(() => {
    document.addEventListener('ionBackButton', hardwareBackHandlers);
    return () =>
      document.removeEventListener('ionBackButton', hardwareBackHandlers);
  }, []);

  // instant start/stop sender
  useEffect(() => {
    stateCheck().then((change) => {
      if (
        location.pathname === BEDTIME &&
        started &&
        change.status &&
        change.newState
      ) {
        saveChanges(change.newState);
      }
    });
  }, [started]);

  // websocket sender
  useEffect(() => {
    if (started) {
      stateCheck().then((check) => {
        if (check.status && check.newState) {
          RestnodeService.sendSocketEvent(check.newState);
        }
      });
    }
  }, [
    bedtimeState.state,
    lightsState.state,
    soundsState.state,
    relaxationState.state,
  ]);

  return (
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonButton onClick={goBack}>
            <IonIcon icon={arrowBack} slot="icon-only" />
          </IonButton>
        </IonButtons>
        <IonTitle>{title}</IonTitle>
        {!started && (
          <IonButton fill="clear" slot="end" onClick={handleSaveClick}>
            <IonIcon icon={save} slot="end" />
            <IonLabel>Save</IonLabel>
          </IonButton>
        )}
      </IonToolbar>
    </IonHeader>
  );
};

export default withRouter(SettingsHeader);
