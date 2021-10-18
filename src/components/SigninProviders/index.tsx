import { IonFab, IonGrid, IonIcon, IonRow, IonCol, IonFabButton } from '@ionic/react'
import { logoGoogle } from 'ionicons/icons';

const SigninProviders: React.FC = () => {
    return (
        <IonGrid>
            <IonRow>
                <IonCol>
                    <IonFab>
                        <IonFabButton>
                            <IonIcon icon={logoGoogle} />
                        </IonFabButton>
                    </IonFab>
                </IonCol>

                <IonCol>
                    <IonFab>
                        <IonFabButton>
                            <IonIcon icon={logoGoogle} />
                        </IonFabButton>
                    </IonFab>
                </IonCol>

                <IonCol>
                    <IonFab>
                        <IonFabButton>
                            <IonIcon icon={logoGoogle} />
                        </IonFabButton>
                    </IonFab>
                </IonCol>

                <IonCol>
                    <IonFab>
                        <IonFabButton>
                            <IonIcon icon={logoGoogle} />
                        </IonFabButton>
                    </IonFab>
                </IonCol>
            </IonRow>
        </IonGrid>
    )
}

export default SigninProviders
