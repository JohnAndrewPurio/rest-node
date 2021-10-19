import { IonRouterOutlet } from '@ionic/react'
import { IonReactRouter } from "@ionic/react-router"
import { Redirect, Route } from 'react-router-dom';

import Home from '../../pages/Home'
import Login from '../../pages/Login'
import RestNode from '../../pages/RestNode';

const AppRouter: React.FC = () => {
    return (
        <IonReactRouter>
            <IonRouterOutlet>
                <Route exact path="/login">
                    <Login />
                </Route>
                <Route exact path="/home">
                    <Home />
                </Route>
                <Route path="/restnode" render={(props) => <RestNode {...props} />} />
                <Route render={() => <Redirect to="/restnode" />} />
            </IonRouterOutlet>
        </IonReactRouter>
    )
}

export default AppRouter
