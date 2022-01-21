import { IonButton, IonCol, IonGrid, IonLabel, IonRow } from '@ionic/react';
import { useContext } from 'react';
import { setFilter } from '../../contextStore/RelaxationContext/relaxationActions';
import RelaxationContext from '../../contextStore/RelaxationContext/relaxationContext';
import _styles from './styles';

const RelaxationFilter = () => {
  const { state, dispatch } = useContext(RelaxationContext)
  const filters = ['All', '5', '10', '15', '20', '30', '30+'];

  return (
    <IonRow style={_styles.container}>
      <IonGrid>
        <IonRow>
          <IonLabel style={_styles.label}>Filter by Time</IonLabel>
        </IonRow>
        <IonRow>
          <IonGrid style={_styles.filtersGrid}>
            {filters.map((time) => (
              <IonCol key={time}>
                <IonButton
                  onClick={() => dispatch(setFilter(time))}
                  size="small"
                  shape="round"
                  style={_styles.btn}
                  fill={state.relaxationFilter === time ? 'solid' : 'outline'}
                >
                  {time}
                </IonButton>
              </IonCol>
            ))}
          </IonGrid>
        </IonRow>
      </IonGrid>
    </IonRow>
  );
};

export default RelaxationFilter;
