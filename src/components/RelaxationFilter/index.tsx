import { IonButton, IonCol, IonGrid, IonLabel, IonRow } from '@ionic/react';

interface Props {
  selected: string;
  onSelect: (val: string) => void;
}

const RelaxationFilter: React.FC<Props> = ({ selected, onSelect }) => {
  const _styles = {
    container: {
      margin: '1em .5em',
    },
    btn: {
      height: '10vw',
      width: '10vw',
      margin: 0,
      '--padding-start': '0px',
      '--padding-end': '0px',
      '--padding-top': '0px',
      '--padding-bottom': '0px',
    },
    filtersGrid: {
      marginTop: '2vh',
      padding: 0,
    },
    label: {
      fontSize: '1.1rem',
      fontWeight: 700,
    },
  };

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
                  onClick={() => onSelect(time)}
                  size="small"
                  shape="round"
                  style={_styles.btn}
                  fill={selected === time ? 'solid' : 'outline'}
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
