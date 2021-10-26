import { IonTabBar, IonTabs, IonTabButton, IonLabel, IonRouterOutlet, IonIcon } from "@ionic/react"
import { Redirect, Route, RouteComponentProps } from "react-router"
import { IonReactRouter } from "@ionic/react-router"

import Dashboard from "./Dashboard"
import History from "./History"
import Learn from "./Learn"
import { bookmark, home, time } from "ionicons/icons"

const BottomNavigationTabs: React.FC<RouteComponentProps> = ({ match }) => {
    return (
        <IonTabs>
            <IonRouterOutlet>
                <IonReactRouter>
                    <Route path={`${match.url}/history`} render={() => <History />} />
                    <Route path={`${match.url}/learn`} render={() => <Learn />} />
                    <Route path={`${match.url}/dashboard`} render={() => <Dashboard />} />
                    <Route render={() => <Redirect to={`${match.url}/dashboard`} />} />
                </IonReactRouter>
            </IonRouterOutlet>

            <IonTabBar slot="bottom">

                <IonTabButton tab="history" href="/restnode/history">
                    <IonIcon icon={time} />
                    <IonLabel>History</IonLabel>
                </IonTabButton>

                <IonTabButton tab="dashboard" href="/restnode/dashboard">
                    <IonIcon icon={home} />
                    <IonLabel>Dashboard</IonLabel>
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
