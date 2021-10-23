import { IonContent, IonPage } from "@ionic/react"
import { RouteComponentProps } from "react-router";

import BottomNavigationTabs from '../../components/BottomNavigationTabs';

const RestNode: React.FC<RouteComponentProps> = (props) => {
    return (
        <IonPage>
            <IonContent>
                <BottomNavigationTabs {...props} />
            </IonContent>
        </IonPage>
    )
}

export default RestNode
