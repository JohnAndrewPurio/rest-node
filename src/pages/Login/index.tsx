import { IonContent, IonGrid, IonRow, IonPage, IonCol } from "@ionic/react"
import CompanyLogo from "../../components/CompanyLogo"
import EmailAccountSignup from "../../components/EmailAccountSignup"
import SigninProviders from "../../components/SigninProviders"
import './styles.css'

const Login: React.FC = () => {
    return (
        <IonPage>
            <IonContent fullscreen>
                <IonGrid id="page-grid">
                    <IonRow class="ion-justify-content-center">
                        <CompanyLogo />
                    </IonRow>
                    <IonRow class="ion-justify-content-center">
                        <EmailAccountSignup />
                    </IonRow>
                    <IonRow class="ion-justify-content-center">
                        <IonCol size="12">
                            <SigninProviders />
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    )
}

export default Login