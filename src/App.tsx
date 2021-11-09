import { useEffect, useState } from 'react';
import { IonApp } from '@ionic/react';
import { App as CapApp } from '@capacitor/app';
import { Browser } from '@capacitor/browser';
import { useAuth0 } from '@auth0/auth0-react';

import AppRouter from './components/AppRouter';

import DarkModeContext from './contextStore/AppContext/darkMode';
import UserContext from './contextStore/UserContext/userContext';
import LoadingContext from './contextStore/AppContext/loadingContext';
import toggleDarkMode from './utils/toggleDarkMode';
import './styles';

const App: React.FC = () => {
  const loadingState = useState<boolean>(false)
  const darkModeState = useState<boolean>(false)
  const { user, handleRedirectCallback } = useAuth0()

  const [darkMode, setDarkMode] = darkModeState

  const handleRedirect: (params: { url: string }) => void = async ({ url }) => {
    const stateIncluded = url.includes('state')
    const codeIncluded = url.includes('code')
    const errorIncluded = url.includes('error')

    if (stateIncluded && (codeIncluded || errorIncluded))
      await handleRedirectCallback(url);
    await Browser.close()
  }

  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)')
    toggleDarkMode(document, prefersDark.matches)

    setDarkMode(prefersDark.matches)

  }, [])

  useEffect(() => {
    toggleDarkMode(document, darkMode)
  }, [darkMode])

  useEffect(() => {
    CapApp.addListener('appUrlOpen', handleRedirect);
  }, [handleRedirectCallback]);

  return (
    <IonApp>
      <DarkModeContext.Provider value={darkModeState}>
        <UserContext.Provider value={user}>
          <LoadingContext.Provider value={loadingState}>
            <AppRouter />
          </LoadingContext.Provider>
        </UserContext.Provider>
      </DarkModeContext.Provider>
    </IonApp>
  )
}

export default App;