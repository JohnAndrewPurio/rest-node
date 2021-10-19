import { IonContent, IonPage } from "@ionic/react"
import { RouteComponentProps } from "react-router";

import BottomNavigationTabs from '../../components/BottomNavigationTabs';
// import Header from "../../components/Header";

const RestNode: React.FC<RouteComponentProps> = (props) => {
    return (
        <IonPage>
            {/* <Header title="REST Node" /> */}
            
            <IonContent>
                <BottomNavigationTabs {...props} />
            </IonContent>
        </IonPage>
    )
}

export default RestNode
