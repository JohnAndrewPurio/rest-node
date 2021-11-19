import {
  IonGrid,
  IonIcon,
  IonItem,
  IonLabel,
  IonRange,
  IonRow,
  IonText,
  IonToggle,
} from '@ionic/react';
import { moon, sunny } from 'ionicons/icons';
import { useContext } from 'react';
import {
  adjustBrightness,
  toggleLight,
} from '../../contextStore/LightsContext/lightsActions';
import LightsContext from '../../contextStore/LightsContext/lightsContext';
import SocketContext from '../../contextStore/RestNodeContext/socketConnection';
import { _styles } from './styles';

interface controlProps {
  component: string;
  index: number;
}

type iconsType = { [key: string]: any };
type titlesType = { [key: string]: string };

const LightControl: React.FC<controlProps> = ({ component }) => {
  const socket = useContext(SocketContext)
  const { state, dispatch } = useContext(LightsContext);
  const { light, brightness } = state;

  const icons: iconsType = {
    night: moon,
    wake: sunny
  };

  const title: titlesType = {
    night: 'Night Light',
    wake: 'Wake Light'
  };

  const handleToggleClicked = () => {
    dispatch(toggleLight(component === 'night'));
  };

  const handleRangeChange = (event: any) => {
    const { value } = event.target;
    const lightType = `${component.toUpperCase()}_LIGHT` // Temporary Hack
    const data = {
      state: "ADJUST_BRIGHTNESS",
      light: lightType,
      max_brightness: value,
      type: 'light'
    }

    if (value > 0 || light[component]) {
      dispatch(adjustBrightness(
        component === 'night', value)
      );
    }

    socket?.send(JSON.stringify(data))
  };

  return (
    <IonRow
      className={
        light[component]
          ? 'light-control-container open'
          : 'light-control-container'
      }
    >
      <IonItem lines="none" style={_styles.header}>
        <IonIcon
          slot="start"
          color={light[component] ? 'tertiary' : undefined}
          style={_styles.icon}
          icon={icons[component]}
        />
        <IonLabel style={_styles.headerTxt}>
          {title[component]}
        </IonLabel>
        <IonToggle
          color="tertiary"
          checked={light[component]}
          onClick={handleToggleClicked}
          slot="end"
          className="light-switch-toggle"
        />
      </IonItem>
      <IonRow style={_styles.rangeContainer}>
        <IonGrid>
          <IonRow style={_styles.rangeLabel}>
            <IonText style={_styles.headerTxt}>Set max brightness</IonText>
          </IonRow>
          <IonRow>
            <IonRange
              onIonChange={handleRangeChange}
              value={brightness[component]}
              color="primary"
              className="range-slider"
            >
              <IonIcon slot="start" size="small" icon={icons[component]} />
              <IonIcon slot="end" color="primary" icon={icons[component]} />
            </IonRange>
          </IonRow>
        </IonGrid>
      </IonRow>
    </IonRow>
  );
};

export default LightControl;
