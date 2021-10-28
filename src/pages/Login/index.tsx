import { IonContent, IonGrid, IonRow, IonPage } from "@ionic/react"
import CompanyLogo from "../../components/CompanyLogo"
import LoginButton from "../../components/LoginButton"
import './styles.css'

const Login: React.FC = () => {
    return (
        <IonPage>
            <IonContent fullscreen>
                <IonGrid id="page-grid">
                    <IonRow class="ion-justify-content-center">
                        <CompanyLogo />
                    </IonRow>
                    <IonRow class="ion=justify-content-center">
                        <LoginButton />
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    )
}

export default Login