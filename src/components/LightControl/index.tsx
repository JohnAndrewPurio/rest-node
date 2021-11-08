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

interface controlProps {
  component: string;
  index: number;
}

const LightControl: React.FC<controlProps> = ({ component }) => {
  const { state, dispatch } = useContext(LightsContext);
  const { light, brightness } = state;

  const _styles = {
    header: {
      width: '100%',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1em .5em .5em .5em',
      '--background': 'transparent',
    },
    headerTxt: {
      fontWeight: 700,
      fontSize: '1.1rem',
    },
    titleCol: {
      display: 'flex',
    },
    icon: {
      display: 'flex',
      marginRight: '.5em',
      fontSize: '36px',
    },
    rangeLabel: {
      margin: '0em 1em 0em 1em',
    },
    rangeContainer: {
      marginTop: '1em',
    },
  };

  type iconsType = { [key: string]: any };
  type titlesType = { [key: string]: string };

  const icons: iconsType = { night: moon, wake: sunny };
  const title: titlesType = { night: 'Night Light', wake: 'Wake Light' };

  const handleToggleClicked = () => {
    dispatch(toggleLight(component === 'night'));
  };

  const handleRangeChange = (e: any) => {
    const val = e.target.value;
    if (val > 0 || light[component]) {
      dispatch(adjustBrightness(component === 'night', val));
    }
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
        <IonLabel style={_styles.headerTxt}>{title[component]}</IonLabel>
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
            <IonText style={_styles.headerTxt}>Adjust Light</IonText>
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
