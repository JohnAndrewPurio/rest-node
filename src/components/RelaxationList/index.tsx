import {
  IonButton,
  IonCol,
  IonGrid,
  IonIcon,
  IonImg,
  IonLabel,
  IonRow,
} from '@ionic/react';
import { heartOutline } from 'ionicons/icons';
import { techniques } from '../../pages/Settings/RelaxationTechniques/techniques.json';

const RelaxationList: React.FC = () => {
  const _styles = {
    container: {
      margin: '1em .5em',
    },
    label: {
      fontSize: '1.1rem',
      fontWeight: 700,
    },
    card: {
      height: '22vh',
      width: '120px',
      minWidth: '120px',
      borderRadius: '10px',
      padding: '.3em',
    },
    detailsGrid: {
      fontSize: '.8rem',
      display: 'flex',
    },
    paddingZero: {
      padding: 0,
    },
    favBtn: {
      '--padding-start': '0px',
      '--padding-end': '0px',
      '--padding-top': '0px',
      '--padding-bottom': '0px',
    },
    grid: {
      width: '100%',
      height: 'auto',
      display: 'flex',
      flexWrap: 'wrap',
    },
    gridContainer: {
      width: '100%',
      marginTop: '.5em',
    },
  };

  return (
    <IonRow style={_styles.container}>
      <IonGrid>
        <IonRow>
          <IonLabel style={_styles.label}>All Techniques</IonLabel>
        </IonRow>
        <IonRow style={_styles.gridContainer}>
          <IonGrid style={_styles.grid}>
            {techniques.map((el) => (
              <IonCol style={_styles.card}>
                <IonRow className="grid-picture">
                  <IonImg
                    className="grid-ion-image"
                    src="https://picsum.photos/200"
                  />
                  <div className="length-indicator">05:14</div>
                </IonRow>
                <IonGrid style={_styles.detailsGrid}>
                  <IonCol style={_styles.paddingZero}>
                    <IonGrid style={_styles.paddingZero}>
                      <IonRow style={{ fontWeight: 700 }}>
                        {el.title} title
                      </IonRow>
                      <IonRow style={{ fontSize: '.7rem' }}>Creator</IonRow>
                    </IonGrid>
                  </IonCol>
                  <IonCol style={_styles.paddingZero} size="auto">
                    <IonButton
                      shape="round"
                      fill="clear"
                      size="small"
                      style={_styles.favBtn}
                    >
                      <IonIcon slot="icon-only" icon={heartOutline} />
                    </IonButton>
                  </IonCol>
                </IonGrid>
              </IonCol>
            ))}
          </IonGrid>
        </IonRow>
      </IonGrid>
    </IonRow>
  );
};

export default RelaxationList;
