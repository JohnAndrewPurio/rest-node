import { useEffect, useState } from 'react';
import { IonApp, useIonLoading } from '@ionic/react';
import { App as CapApp } from '@capacitor/app';
import { Browser } from '@capacitor/browser';
import { useAuth0 } from '@auth0/auth0-react';

import AppRouter from './components/AppRouter';

import './styles';
import UserContext from './contextStore/userContext';
import LoadingContext from './contextStore/loadingContext';

interface handleRedirect {
  url: string
}

const App: React.FC = () => {
  const loadingState = useState<Boolean>(false)
  const { user, handleRedirectCallback } = useAuth0()

  const handleRedirect: (params: handleRedirect) => void = async ({ url }) => {
    const stateIncluded = url.includes('state')
    const codeIncluded = url.includes('code')
    const errorIncluded = url.includes('error')

    if (stateIncluded && (codeIncluded || errorIncluded))
      await handleRedirectCallback(url);

    // No-op on Android
    await Browser.close()
  }


  useEffect(() => {
    document.body.classList.add('dark');
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    CapApp.addListener('appUrlOpen', handleRedirect);
  }, [handleRedirectCallback]);

  return (
    <IonApp>
      <UserContext.Provider value={user}>
        <LoadingContext.Provider value={loadingState}>
          <AppRouter />
        </LoadingContext.Provider>
      </UserContext.Provider>
    </IonApp>
  );
};

export default App;
