import { IonContent, IonItemDivider, IonGrid, IonRow, IonPage } from "@ionic/react"
import EmailAccountSignup from "../../components/EmailAccountSignup"
import SigninProviders from "../../components/SigninProviders"
import './styles.css'

const Login: React.FC = () => {
    return (
        <IonPage>
            <IonContent fullscreen>
                <IonGrid>
                    <IonRow>
                        <EmailAccountSignup />
                        <hr className="divider" color="secondary" />
                        <SigninProviders />
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    )
}

export default Login