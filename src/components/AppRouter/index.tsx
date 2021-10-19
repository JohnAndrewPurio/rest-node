import { IonRouterOutlet } from '@ionic/react'
import { IonReactRouter } from "@ionic/react-router"
import { Redirect, Route } from 'react-router-dom';

import Home from '../../pages/Home'
import Login from '../../pages/Login'
import RestNode from '../../pages/RestNode';

import { DEFAULT, LOGIN, HOME, REST_NODE } from './paths.json'

const AppRouter: React.FC = () => {
    return (
        <IonReactRouter>
            <IonRouterOutlet>
                <Route exact path={LOGIN} >
                    <Login />
                </Route>
                <Route exact path={HOME} >
                    <Home />
                </Route>
                <Route path={REST_NODE} render={(props) => <RestNode {...props} />} />
                <Route render={() => <Redirect to={DEFAULT} />} />
            </IonRouterOutlet>
        </IonReactRouter >
    )
}

export default AppRouter
