import { IonContent, IonGrid, IonRow, IonPage, IonButton } from "@ionic/react"
import CompanyLogo from "../../components/CompanyLogo"
import './styles.css'

const Login: React.FC = () => {
    const signInHandler = () => {
        console.log('Sign in')
    }

    return (
        <IonPage>
            <IonContent fullscreen>
                <IonGrid id="page-grid">
                    <IonRow class="ion-justify-content-center">
                        <CompanyLogo />
                    </IonRow>
                    <IonRow class="ion=justify-content-center">
                        <IonButton onClick={signInHandler}>
                            Sign In
                        </IonButton>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    )
}

export default Login