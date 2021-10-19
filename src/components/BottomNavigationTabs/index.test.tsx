import { IonReactRouter } from '@ionic/react-router';
import { Route } from 'react-router-dom'
import { render } from '@testing-library/react';
import BottomNavigationTabs from './index';

test('renders BottomNavigationTabs without crashing', () => {
  const { baseElement } = render(
    <IonReactRouter>
      <Route render={(props) => <BottomNavigationTabs {...props} />} />
    </IonReactRouter>
  );
  expect(baseElement).toBeDefined();
});