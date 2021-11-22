import { IonButton, IonCol, IonIcon, IonRow } from '@ionic/react';
import { add, remove } from 'ionicons/icons';
import { useContext } from 'react';
import { setBedtimeHours } from '../../../contextStore/BedTimeContext/bedtimeActions';
import BedTimeContext from '../../../contextStore/BedTimeContext/bedtimeContext';
import _styles from '../styles';

const HoursSetter: React.FC = () => {
  const { state, dispatch } = useContext(BedTimeContext);
  const { bedtimeHours, started } = state;

  return (
    <IonRow style={_styles.hourSetterContainer}>
      <IonCol
        style={{ ..._styles.hourSetterColumn, ..._styles.buttonColMinus }}
      >
        <IonButton
          onClick={() => dispatch(setBedtimeHours(false))}
          size="small"
          style={_styles.hourSetterbutton}
          fill="clear"
          disabled={started}
        >
          <IonIcon
            color="tertiary"
            style={_styles.icon}
            slot="icon-only"
            icon={remove}
          />
        </IonButton>
      </IonCol>
      <IonCol style={_styles.hourSetterColumn}>{bedtimeHours}</IonCol>
      <IonCol
        style={{
          ..._styles.hourSetterNumber,
          color: started
            ? 'var(--ion-color-secondary-shade)'
            : 'var(--ion-color-dark)',
        }}
      >
        <IonButton
          onClick={() => dispatch(setBedtimeHours(true))}
          size="small"
          style={_styles.hourSetterbutton}
          fill="clear"
          disabled={started}
        >
          <IonIcon
            color="tertiary"
            style={_styles.icon}
            slot="icon-only"
            icon={add}
          />
        </IonButton>
      </IonCol>
    </IonRow>
  );
};

export default HoursSetter;
