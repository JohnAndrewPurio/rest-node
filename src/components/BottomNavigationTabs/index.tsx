import { IonTabBar, IonTabs, IonTabButton, IonLabel, IonRouterOutlet, IonIcon } from "@ionic/react"
import { Redirect, Route, RouteComponentProps } from "react-router"
import { IonReactRouter } from "@ionic/react-router"

import Dashboard from "./Dashboard"
import Bedtime from "./Bedtime"
import Learn from "./Learn"
import { bed, bookmark, home } from "ionicons/icons"

const BottomNavigationTabs: React.FC<RouteComponentProps> = ({ match }) => {
    return (
        <IonTabs>
            <IonRouterOutlet>
                <IonReactRouter>
                    <Route path={`${match.url}/bedtime`} render={() => <Bedtime />} />
                    <Route path={`${match.url}/learn`} render={() => <Learn />} />
                    <Route path={`${match.url}/dashboard`} render={() => <Dashboard />} />
                    <Route render={() => <Redirect to={`${match.url}/dashboard`} />} />
                </IonReactRouter>
            </IonRouterOutlet>

            <IonTabBar slot="bottom">
                <IonTabButton tab="dashboard" href="/restnode/dashboard">
                    <IonIcon icon={home} />
                    <IonLabel>Dashboard</IonLabel>
                </IonTabButton>

                <IonTabButton tab="bedtime" href="/restnode/bedtime">
                    <IonIcon icon={bed} />
                    <IonLabel>Bedtime</IonLabel>
                </IonTabButton>

                <IonTabButton tab="learn" href="/restnode/learn">
                    <IonIcon icon={bookmark} />
                    <IonLabel>Learn</IonLabel>
                </IonTabButton>
            </IonTabBar>
        </IonTabs>
    )
}

export default BottomNavigationTabs
