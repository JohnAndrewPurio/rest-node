import { IonList } from '@ionic/react';
import SettingPillStrips from '../SettingPillStrips';
import { listOfSettings } from './settings';
import { listStyle } from './styles';

import './styles.css';

const SettingsList: React.FC = () => {
  const settings = Object.keys(listOfSettings);

  return (
    <IonList style={listStyle}>
      {settings.map((page, index) => (
        <SettingPillStrips key={page} title={page} icon={index} />
      ))}
    </IonList>
  );
};

export default SettingsList;
