import { FC, useEffect, useState } from 'react';

import { isPlatform } from '@ionic/react';
import { Zeroconf } from '@ionic-native/zeroconf';
import { useAuth0 } from '@auth0/auth0-react';
import { Browser } from '@capacitor/browser';
import { App as CapApp } from '@capacitor/app';
import { serviceListener } from '../../utils/serviceAddress';

import DarkModeContext from './darkMode';
import LoadingContext from './loadingContext';

import UserContext from '../UserContext/userContext';
import TargetAddressContext from '../NetworkContext/targetAddress';

import toggleDarkMode from '../../utils/toggleDarkMode';

import '../../api/Firebase/firebaseInit';
import MenuContext from './menuContext';
import { storageGet, storageSet } from '../../api/CapacitorStorage';
import { PROFILE_KEY } from '../../api/CapacitorStorage/keys';

interface paramsInterface {
  url: string;
}

type handleRedirectType = (params: paramsInterface) => void;

const AppContext: FC = ({ children }) => {
  const loadingState = useState<boolean>(false);
  const darkModeState = useState<boolean>(true);
  const targetAddressState = useState<string>('');
  const menuSwiper = useState<boolean>(false);

  const [darkMode, setDarkMode] = darkModeState;
  const [, setTargetAddress] = targetAddressState;

  const { user, handleRedirectCallback } = useAuth0();

  const getProfileData = async () => {
    try {
      const { darkMode } = await storageGet(PROFILE_KEY);

      setDarkMode(darkMode);
    } catch (error) {
      console.log(error);
    }
  };

  const persistDarkMode = async () => {
    try {
      const key = PROFILE_KEY;
      const previousData = await storageGet(key);
      const data = {
        ...previousData,
        darkMode,
      };
      storageSet(data, key);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const handleRedirect: handleRedirectType = async ({ url }) => {
      const stateIncluded = url.includes('state');
      const codeIncluded = url.includes('code');
      const errorIncluded = url.includes('error');

      console.log('Redirect URL:', url);

      if (stateIncluded && (codeIncluded || errorIncluded))
        await handleRedirectCallback(url);

      await Browser.close();
    };

    CapApp.addListener('appUrlOpen', handleRedirect);
  }, [handleRedirectCallback]);

  useEffect(() => {
    getProfileData();

    if (isPlatform('android') || isPlatform('ios'))
    serviceListener(Zeroconf, setTargetAddress);

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    console.log('Dark Mode:', darkMode);

    toggleDarkMode(document, darkMode);
    persistDarkMode();

    // eslint-disable-next-line
  }, [darkMode]);

  return (
    <DarkModeContext.Provider value={darkModeState}>
      <UserContext.Provider value={user}>
        <LoadingContext.Provider value={loadingState}>
          <TargetAddressContext.Provider value={targetAddressState}>
            <MenuContext.Provider value={menuSwiper}>
              {children}
            </MenuContext.Provider>
          </TargetAddressContext.Provider>
        </LoadingContext.Provider>
      </UserContext.Provider>
    </DarkModeContext.Provider>
  );
};

export default AppContext;
