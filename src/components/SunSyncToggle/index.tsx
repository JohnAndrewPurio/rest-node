import { IonItem, IonLabel, IonRow, IonToggle } from '@ionic/react';
import _styles from './styles';

const ToggleSync: React.FC = () => (
    <IonRow>
        <IonItem style={_styles.item}>
            <IonLabel>Sync Sunset and Sunrise</IonLabel>
            <IonToggle slot="end" />
        </IonItem>
    </IonRow>
);

export default ToggleSync;
