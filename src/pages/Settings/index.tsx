import { IonPage, IonRouterOutlet } from "@ionic/react"
import { Redirect, Route, RouteComponentProps } from "react-router"
import Bedtime from "../../components/Bedtime"
import Lights from "../../components/Lights"
import Relaxation from "../../components/Relaxation"
import Sounds from "../../components/Sounds"

const SettingsRouter: React.FC<RouteComponentProps> = () => {
    return (
        <IonPage>
            <IonRouterOutlet>
                <Route path={`/settings/bedtime`} component={Bedtime} />
                <Route path={`/settings/sounds`} component={Sounds} />
                <Route path={`/settings/lights`} component={Lights} />
                <Route path={`/settings/relaxation`} component={Relaxation} />
                <Route render={() => <Redirect to={`/restnode/dashboard`} />} />
            </IonRouterOutlet>
        </IonPage>
    )
}

export default SettingsRouter
