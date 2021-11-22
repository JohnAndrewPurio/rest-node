import { IonList } from '@ionic/react';
import SettingPillStrips from '../SettingPillStrips';
import _styles from './styles';
import './styles.css';

const SettingsList: React.FC = () => {
  const list = ['bedtime', 'lights', 'sounds', 'relaxation'];

  return (
    <IonList style={_styles.list}>
      {list.map((page, index) => (
        <SettingPillStrips key={page} title={page} icon={index} />
      ))}
    </IonList>
  );
};

export default SettingsList;
