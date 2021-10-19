import { createContext, useState, useEffect } from 'react';
import { IonApp } from '@ionic/react';
import AppRouter from './components/AppRouter';
import './api/firebaseConfig'

import { auth } from './api/firebaseAuth';
import { User } from 'firebase/auth'

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

export const UserContext = createContext<User | null>(null)

const App: React.FC = () => {
  const [ userData, setUserData ] = useState<User | null>(null)

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUserData(user)
    })
  }, [])

  return (
    <UserContext.Provider value={userData}>
      <IonApp>
        <AppRouter />
      </IonApp>
    </UserContext.Provider>
  )
};

export default App;
