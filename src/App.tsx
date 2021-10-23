import { useState } from 'react';
import { IonApp } from '@ionic/react';

import AppRouter from './components/AppRouter';

import './api/firebaseConfig'
import { User } from 'firebase/auth'

import UserContext from './contextStore/userContext'

import './styles'

const App: React.FC = () => {
  // const [present, dismiss] = useIonToast()
  const [userData, setUserData] = useState<User | null>(null)

  return (
    <UserContext.Provider value={userData}>
      <IonApp>
        <AppRouter />
      </IonApp>
    </UserContext.Provider>
  )
};

export default App;
