import { useAuth0 } from '@auth0/auth0-react';
import { Browser } from '@capacitor/browser';
import { IonButton } from '@ionic/react';
import { logoutUri } from '../../auth0.config';

const LogoutButton: React.FC = () => {
  const { buildLogoutUrl, logout } = useAuth0();

  const doLogout = async () => {
    await Browser.open({
      url: buildLogoutUrl({ returnTo: logoutUri }),
      windowName: '_self',
    });

    logout({ localOnly: true });
  };

  return <IonButton onClick={doLogout}>Log out</IonButton>;
};

export default LogoutButton;
