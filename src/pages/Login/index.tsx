import { IonContent, IonPage } from "@ionic/react"
import EmailAccountSignup from "../../components/EmailAccountSignup"
import SigninProviders from "../../components/SigninProviders"

const Login: React.FC = () => {
    return (
        <IonPage>
            <IonContent fullscreen>
                <EmailAccountSignup />
                <SigninProviders />
            </IonContent>
        </IonPage>
    )
}

export default Login