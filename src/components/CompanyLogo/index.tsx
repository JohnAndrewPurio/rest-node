import { IonImg } from '@ionic/react';
import { logo } from './resources.json';

import './styles.css';

const CompanyLogo = () => {
  return <IonImg src={logo.src} alt={logo.alt} id={logo.id} />;
};

export default CompanyLogo;
