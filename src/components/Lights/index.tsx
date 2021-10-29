import {
  IonContent,
  IonGrid,
  IonIcon,
  IonItem,
  IonLabel,
  IonPage,
  IonRange,
  IonRow,
  IonText,
  IonToggle,
} from '@ionic/react';
import SettingsHeader from '../SettingsHeader';
import TimeBar from '../TimeBar';
import ToggleSync from './ToggleSync';
import './styles.css';
import { moon, sunny } from 'ionicons/icons';
import { useState } from 'react';

const Lights: React.FC = () => {
  const [lightsOpen, setLightsOpen] = useState([false, false]);
  const [rangeValue, setRangeValue] = useState([0, 0]);

  const toggleLight = (index: number) => {
    const newArr = new Array(lightsOpen.length).fill(false);
    newArr[index] = !lightsOpen[index];
    setLightsOpen(newArr);

    const newRangeArr = new Array(rangeValue.length).fill(0);
    newRangeArr[index] = newArr[index] ? 50 : 0;
    setRangeValue(newRangeArr);
  };

  const handleRangeChange = (index: number, e: any) => {
    const val = e.target.value;
    if (val > 0 || lightsOpen[index]) {
      const newArr = new Array(lightsOpen.length).fill(false);
      newArr[index] = val > 0;
      setLightsOpen(newArr);

      const newRangeArr = new Array(rangeValue.length).fill(0);
      newRangeArr[index] = val;
      setRangeValue(newRangeArr);
    }
  };

  return (
    <IonPage>
      <SettingsHeader title="Lights Settings" />
      <IonContent>
        <IonGrid>
          <TimeBar />
          <ToggleSync />
        </IonGrid>
        <LightControl
          index={0}
          title="Night Light"
          rangeVal={rangeValue[0]}
          rangeChange={handleRangeChange}
          onclick={toggleLight}
          open={lightsOpen[0]}
        />
        <LightControl
          index={1}
          title="Wake Light"
          rangeVal={rangeValue[1]}
          rangeChange={handleRangeChange}
          onclick={toggleLight}
          open={lightsOpen[1]}
        />
      </IonContent>
    </IonPage>
  );
};

interface controlProps {
  title: string;
  index: number;
  onclick: (index: number) => void;
  open: boolean;
  rangeChange: (index: number, e: any) => void;
  rangeVal: number;
}

const LightControl: React.FC<controlProps> = ({
  title,
  index,
  onclick,
  open,
  rangeChange,
  rangeVal,
}) => {
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

  const icons = [moon, sunny];

  return (
    <IonRow
      className={
        open ? 'light-control-container open' : 'light-control-container'
      }
    >
      <IonItem lines="none" style={_styles.header}>
        <IonIcon
          slot="start"
          color={open ? 'tertiary' : undefined}
          style={_styles.icon}
          icon={icons[index]}
        />
        <IonLabel style={_styles.headerTxt}>{title}</IonLabel>
        <IonToggle
          color="tertiary"
          checked={open}
          onClick={() => onclick(index)}
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
              onIonChange={(e) => rangeChange(index, e)}
              value={rangeVal}
              color="primary"
              className="range-slider"
            >
              <IonIcon slot="start" size="small" icon={icons[index]} />
              <IonIcon slot="end" color="primary" icon={icons[index]} />
            </IonRange>
          </IonRow>
        </IonGrid>
      </IonRow>
    </IonRow>
  );
};

export default Lights;
