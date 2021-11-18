import { FC, useEffect } from 'react';
import { IonApp } from '@ionic/react';

import AppRouter from './components/AppRouter';
import AppContext from './contextStore/AppContext';

import './styles';
import Menu from './components/Menu';

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
