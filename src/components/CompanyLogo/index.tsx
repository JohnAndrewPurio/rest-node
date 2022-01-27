import { IonImg } from '@ionic/react';
import { logo } from './resources.json';

import './styles.css';

function CompanyLogo() {
    return <IonImg src={logo.src} alt={logo.alt} id={logo.id} />;
}

export default CompanyLogo;

// "src": "https://static.wixstatic.com/media/4dd395_9179e6b24c2d4ac594a7e8ebbb28b792~mv2.png/v1/fill/w_164,h_64,al_c,q_85,usm_0.66_1.00_0.01/Exist_Tribe_Logo_Border.webp",
