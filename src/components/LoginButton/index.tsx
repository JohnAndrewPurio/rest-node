import { useAuth0 } from '@auth0/auth0-react';
import { Browser } from '@capacitor/browser';
import { IonButton } from '@ionic/react';

const LoginButton: React.FC = () => {
    const { buildAuthorizeUrl } = useAuth0();

    const login = async () => {
        // Ask auth0-react to build the login URL
        // logOut(Browser, buildLogoutUrl, logout, logoutUri);
        const url = await buildAuthorizeUrl();

        // Redirect using Capacitor's Browser plugin
        await Browser.open({ url });
    };

    return (
        <IonButton onClick={login} shape="round">
            Sign in
        </IonButton>
    );
};

export default LoginButton;
