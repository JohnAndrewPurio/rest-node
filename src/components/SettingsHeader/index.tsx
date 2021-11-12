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
      await Storage.set({
        key: storage.RED_NODE_STATES,
        value: JSON.stringify(change),
      });
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
    if (!started && value) {
      const states: RestNodeStateType = JSON.parse(value);
      switch (location.pathname) {
        case BEDTIME: {
          const change = {
            bedtime: {
              time: bedtimeState.state.bedtimeStart.format('HH:mm'),
            },
            waketime: {
              time: bedtimeState.state.wakeUpTime.format('HH:mm'),
            },
          };
          const bedtime = { ...states.bedtime, ...change.bedtime };
          const waketime = { ...states.waketime, ...change.waketime };
          const newState = { bedtime, waketime };
          if (_.isEqual(newState, states)) {
            return { status: false };
          }
          return { status: true, newState };
        }
        case LIGHTS: {
          const change = {
            bedtime: {
              light: {
                ...states.bedtime.light,
                onpayload: {
                  ...states.bedtime.light.onpayload,
                  light: 'NIGHT_LIGHT',
                  max_brightness: lightsState.state.brightness.night,
                },
                offpayload: {
                  ...states.bedtime.light.offpayload,
                  light: 'NIGHT_LIGHT',
                  max_brightness: lightsState.state.brightness.night,
                },
              },
            },
            waketime: {
              light: {
                ...states.waketime.light,
                onpayload: {
                  ...states.waketime.light.onpayload,
                  light: 'WAKE_LIGHT',
                  max_brightness: lightsState.state.brightness.wake,
                },
                offpayload: {
                  ...states.waketime.light.offpayload,
                  light: 'WAKE_LIGHT',
                  max_brightness: lightsState.state.brightness.wake,
                },
              },
            },
          };
          const bedtime = { ...states.bedtime, ...change.bedtime };
          const waketime = { ...states.waketime, ...change.waketime };
          const newState = { bedtime, waketime };
          if (_.isEqual(newState, states)) {
            return { status: false };
          }
          return { status: true, newState };
        }
        case SOUNDS: {
          const change = {
            bedtime: {
              sound: {
                ...states.bedtime.sound,
                onpayload: {
                  ...states.bedtime.sound.onpayload,
                  sound: 'NIGHT_SOUND',
                  max_volume: soundsState.state.volume.night,
                  audio_file: soundsState.state.audio.night,
                },
                offpayload: {
                  ...states.bedtime.sound.offpayload,
                  sound: 'NIGHT_SOUND',
                  max_volume: soundsState.state.volume.night,
                  audio_file: soundsState.state.audio.night,
                },
              },
            },
            waketime: {
              sound: {
                ...states.waketime.sound,
                onpayload: {
                  ...states.waketime.sound.onpayload,
                  sound: 'WAKE_SOUND',
                  max_volume: soundsState.state.volume.wake,
                  audio_file: soundsState.state.audio.wake,
                },
                offpayload: {
                  ...states.waketime.sound.offpayload,
                  sound: 'WAKE_SOUND',
                  max_volume: soundsState.state.volume.wake,
                  audio_file: soundsState.state.audio.wake,
                },
              },
            },
          };
          const bedtime = { ...states.bedtime, ...change.bedtime };
          const waketime = { ...states.waketime, ...change.waketime };
          const newState = { bedtime, waketime };
          if (_.isEqual(newState, states)) {
            return { status: false };
          }

          return { status: true, newState };
        }
        case RELAXATION:
          return { status: false };
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

  useEffect(() => {
    document.addEventListener('ionBackButton', hardwareBackHandlers);
    return () =>
      document.removeEventListener('ionBackButton', hardwareBackHandlers);
  }, [started]);

  const handleSave = async () => {
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
        header: 'No new changes detected',
        message: '',
        buttons: ['Ok'],
      });
    }
  };

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
          <IonButton fill="clear" slot="end" onClick={handleSave}>
            <IonIcon icon={save} slot="end" />
            <IonLabel>Save</IonLabel>
          </IonButton>
        )}
      </IonToolbar>
    </IonHeader>
  );
};

export default withRouter(SettingsHeader);
