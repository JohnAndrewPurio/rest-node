import { IonContent, IonPage } from "@ionic/react"
import SigninProviders from "../../components/SigninProviders"

const Login: React.FC = () => {
    return (
        <IonPage>
            <IonContent>
                <SigninProviders />
            </IonContent>
        </IonPage>
    )
}

export default Login