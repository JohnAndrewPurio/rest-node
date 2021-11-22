import { IonButton, IonIcon, IonItem, IonLabel } from '@ionic/react';
import { alarm, arrowForward, bed, bulb, musicalNotes } from 'ionicons/icons';
import _styles from './styles';

interface Props {
  title: string;
  icon: number;
}

const SettingPillStrips: React.FC<Props> = ({ title, icon }) => {
  const icons = [alarm, bulb, musicalNotes, bed];
  const colors = ['#2dd36f', '#eb445a', '#71964b', '#e0ac08'];

  return (
    <IonItem style={_styles.item} button detail={false}>
      <IonIcon
        icon={icons[icon]}
        style={{ color: colors[icon] }}
        slot="start"
      />
      <IonLabel style={_styles.title}>{title}</IonLabel>
      <IonButton
        fill="clear"
        slot="end"
        routerLink={`/restnode/settings/${title}`}
      >
        <IonIcon slot="icon-only" icon={arrowForward} />
      </IonButton>
    </IonItem>
  );
};

export default SettingPillStrips;
