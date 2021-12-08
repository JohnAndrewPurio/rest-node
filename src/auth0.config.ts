import { isPlatform } from '@ionic/core';

export const domain = 'eixst-tribe.us.auth0.com';
export const clientId = '5HCjEt7mBomKtxGXkBxn8QX9OJmYZHAM';

const isAndroid = isPlatform('android');
const isIos = isPlatform('ios');
const nativeCallback =
  'com.existtribe.restnode://eixst-tribe.us.auth0.com/capacitor/com.existtribe.restnode/callback';
const desktopRedirect = 'http://localhost:8100/profile';

// Comment out if testing for native device emulators
export const redirectUri =
  isAndroid || isIos ? nativeCallback : desktopRedirect;

// **Comment out if using browser for testing locally**
// export const redirectUri = nativeCallback;
export const logoutUri = nativeCallback;