import { IonContent, IonGrid, IonRow, IonPage } from "@ionic/react"
import CompanyLogo from "../../components/CompanyLogo"
import EmailAccountSignup from "../../components/EmailAccountSignup"
import SigninProviders from "../../components/SigninProviders"
import './styles.css'

const Login: React.FC = () => {
    return (
        <IonPage>
            <IonContent fullscreen>
                <IonGrid>
                    <IonRow class="ion-justify-content-center">
                        <CompanyLogo />
                    </IonRow>
                    <IonRow>
                        <EmailAccountSignup />
                    </IonRow>
                    <IonRow>
                        <SigninProviders />
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    )
}

export default Login