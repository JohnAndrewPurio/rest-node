import { useEffect } from 'react';
import { IonApp } from '@ionic/react';
// import { App as CapApp } from '@capacitor/app';
// import { Browser } from '@capacitor/browser';
// import { useAuth0 } from '@auth0/auth0-react';

import AppRouter from './components/AppRouter';

import './styles';

const App: React.FC = () => {
  // const { handleRedirectCallback } = useAuth0()

  useEffect(() => {
    document.body.classList.add('dark');
    // eslint-disable-next-line
  }, [])


  // useEffect(() => {
  //   // Handle the 'appUrlOpen' event and call `handleRedirectCallback`
  //   CapApp.addListener('appUrlOpen', async ({ url }) => {
  //     if (url.includes('state') && (url.includes('code') || url.includes('error'))) {
  //       await handleRedirectCallback(url);
  //     }
  //     // No-op on Android
  //     await Browser.close()
  //   });

  // }, [handleRedirectCallback]);

  return (
    <IonApp>
      <AppRouter />
    </IonApp>
  );
};

export default App;
