import { useState, useEffect } from 'react';
import { IonApp, useIonToast } from '@ionic/react';

import AppRouter from './components/AppRouter';

import './api/firebaseConfig'
import { auth } from './api/firebaseAuth';
import { User } from 'firebase/auth'

import UserContext from './contextStore/userContext'

import './styles'

const App: React.FC = () => {
  const [present, dismiss] = useIonToast()
  const [userData, setUserData] = useState<User | null>(null)

  const showToast = (message: string) => {
    const toastData = {
      buttons: [{ text: 'hide', handler: dismiss }],
      message,
      onDidDismiss: () => console.log('dismissed'),
      onWillDismiss: () => console.log('will dismiss'),
    }

    present(toastData)
  }

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUserData(user)

      showToast( userData?.displayName || '' )
    })

    // eslint-disable-next-line
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
