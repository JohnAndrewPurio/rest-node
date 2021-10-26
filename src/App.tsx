import { IonApp } from '@ionic/react';

import AppRouter from './components/AppRouter';
import './styles'

const App: React.FC = () => {
  return (
    <IonApp>
      <AppRouter />
    </IonApp>
  )
};

export default App;
