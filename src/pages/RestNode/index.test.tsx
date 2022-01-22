import { IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { render } from '@testing-library/react';
import { Route } from 'react-router-dom';
import RestNode from './index';

test('renders RestNode without crashing', () => {
    const { baseElement } = render(
        <IonReactRouter>
            <IonRouterOutlet>
                <Route
                    exact
                    path="/restnode"
                    render={props => <RestNode {...props} />}
                />
            </IonRouterOutlet>
        </IonReactRouter>
    );
    expect(baseElement).toBeDefined();
});
