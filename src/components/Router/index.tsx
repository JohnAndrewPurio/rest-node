import { IonRouterOutlet } from '@ionic/react'
import { IonReactRouter } from "@ionic/react-router"
import { Redirect, Route } from 'react-router-dom';

import Home from '../../pages/Home'
import Login from '../../pages/Login'

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
                <Route exact path="/">
                    <Redirect to="/home" />
                </Route>
            </IonRouterOutlet>
        </IonReactRouter>
    )
}

export default AppRouter
