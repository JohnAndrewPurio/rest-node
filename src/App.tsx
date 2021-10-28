import { IonApp } from '@ionic/react';
import { useEffect } from 'react';

import AppRouter from './components/AppRouter';
import './styles'

const App: React.FC = () => {

  useEffect(() => {
    // document.body.classList.add('dark');
    // eslint-disable-next-line
  }, [])

  return (
    <IonApp>
      <AppRouter />
    </IonApp>
  )
};

export default App;
