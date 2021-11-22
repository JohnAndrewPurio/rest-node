import {
  IonButton,
  IonCol,
  IonGrid,
  IonIcon,
  IonImg,
  IonLabel,
  IonRow,
} from '@ionic/react';
import { heart, heartOutline } from 'ionicons/icons';
import { useContext } from 'react';
import { toggleFavorite } from '../../contextStore/RelaxationContext/relaxationActions';
import RelaxationContext from '../../contextStore/RelaxationContext/relaxationContext';
import { techniques } from '../../pages/Settings/RelaxationTechniques/techniques.json';
import _styles from './styles';

const RelaxationList: React.FC = () => {
  const { state, dispatch } = useContext(RelaxationContext);

  return (
    <IonRow style={_styles.container}>
      <IonGrid>
        <IonRow>
          <IonLabel style={_styles.label}>All Techniques</IonLabel>
        </IonRow>
        <IonRow style={_styles.gridContainer}>
          <IonGrid style={_styles.grid}>
            {techniques.map((el) => (
              <IonCol key={el.id} style={_styles.card}>
                <IonRow style={_styles.gridPicture}>
                  <IonImg
                    style={_styles.gridIonPicture}
                    src="https://picsum.photos/200"
                  />
                  <div style={_styles.lengthIndicator}>05:14</div>
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
                      onClick={() => dispatch(toggleFavorite(el.id))}
                    >
                      {state.favorites.includes(el.id) ? (
                        <IonIcon slot="icon-only" icon={heart} />
                      ) : (
                        <IonIcon slot="icon-only" icon={heartOutline} />
                      )}
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
