import { FC, useContext } from 'react';
import {
  IonButton,
  IonIcon,
  IonItem,
  IonLabel,
  IonSpinner,
} from '@ionic/react';
import { alarm, arrowForward, bed, bulb, musicalNotes } from 'ionicons/icons';

import { colors, itemStyle, titleStyle } from './styles';

import AudioLoadingContext from '../../contextStore/RestNodeContext/audioLoading';

interface Props {
  title: string;
  icon: number;
}

const SettingPillStrips: FC<Props> = ({ title, icon }) => {
  const soundLoading = useContext(AudioLoadingContext);
  const icons = [alarm, bulb, musicalNotes, bed];
  let itemLoading = false;

  switch (title.toUpperCase()) {
    case 'SOUNDS':
      itemLoading = soundLoading;
      break;
    case 'RELAXATION':
      itemLoading = soundLoading;
      break;
    default:
      itemLoading = false;
  }

  const loading = <IonSpinner color="secondary" />;

  const actionButton = (
    <IonButton
      fill="clear"
      slot="end"
      routerLink={`/restnode/settings/${title}`}
    >
      <IonIcon slot="icon-only" icon={arrowForward} />
    </IonButton>
  );

  return (
    <IonItem style={itemStyle} button detail={false}>
      <IonIcon
        icon={icons[icon]}
        style={{ color: colors[icon] }}
        slot="start"
      />
      <IonLabel style={titleStyle}>{title}</IonLabel>
      {itemLoading ? loading : actionButton}
    </IonItem>
  );
};

export default SettingPillStrips;
