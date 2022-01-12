import {
  IonGrid,
  IonLabel,
  IonRow,
} from '@ionic/react';
import { techniques } from '../../pages/Settings/RelaxationTechniques/techniques.json';
import RelaxationCard from '../RelaxationCard';
import _styles from './styles';

interface Props {
  openModal: (technique: any) => void
}

const RelaxationList: React.FC<Props> = ({ openModal }) => {

  return (
    <IonRow style={_styles.container}>
      <IonGrid>
        <IonRow>
          <IonLabel style={_styles.label}>All Techniques</IonLabel>
        </IonRow>
        <IonRow style={_styles.gridContainer}>
          <IonGrid style={_styles.grid}>
            {techniques.map((item) => (
              <RelaxationCard onClick={openModal} item={item} />
            ))}
          </IonGrid>
        </IonRow>
      </IonGrid>
    </IonRow>
  );
};

export default RelaxationList;
