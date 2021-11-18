import { isPlatform } from '@ionic/core';

export const domain = 'eixst-tribe.us.auth0.com';
export const clientId = '5HCjEt7mBomKtxGXkBxn8QX9OJmYZHAM';

const isDesktop = isPlatform('desktop');
const isAndroid = isPlatform("android")
const isIos = isPlatform("ios")
const nativeCallback =
  'com.existtribe.restnode://eixst-tribe.us.auth0.com/capacitor/com.existtribe.restnode/callback';

// Comment out if testing for native device emulators
export const redirectUri = isAndroid || isIos
  ? // ? 'http://localhost:8100/restnode'
  nativeCallback :
  'http://localhost:8100/home'

export const logoutUri = isAndroid || isIos ? nativeCallback : 'http://localhost:8100';

// Comment out if using browser for testing locally
// export const redirectUri = nativeCallback;
// export const logoutUri = nativeCallback;
