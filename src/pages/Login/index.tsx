import { FC, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { IonContent, IonGrid, IonPage, IonRow } from '@ionic/react';
import { Redirect } from 'react-router-dom';
import CompanyLogo from '../../components/CompanyLogo';
import LoginButton from '../../components/LoginButton';

import { HOME } from '../paths.json';
import './styles.css';

const Login: FC = () => {
    const { user } = useAuth0();
    // auth0 user store in storage

    if (user) return <Redirect to={HOME} />;

    return (
        <IonPage>
            <IonContent fullscreen>
                <IonGrid id="page-grid">
                    <IonRow className="ion-justify-content-center">
                        <CompanyLogo />
                    </IonRow>
                    <IonRow className="ion-justify-content-center login-btn">
                        <LoginButton />
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default Login;
