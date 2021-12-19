import { FC } from 'react';
import { IonApp, setupIonicReact } from '@ionic/react';

import AppRouter from './components/AppRouter';
import AppContext from './contextStore/AppContext';

import './styles';

// Required for migrating from Ionic v5 to v6
setupIonicReact()

const App: FC = () => {
  return (
    <IonApp>
      <AppContext>
        <AppRouter />
      </AppContext>
    </IonApp>
  );
};

export default App;
