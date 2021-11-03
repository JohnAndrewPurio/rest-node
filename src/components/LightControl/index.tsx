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

export default LightControl;
