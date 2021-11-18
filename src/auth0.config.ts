import { isPlatform } from '@ionic/core';

export const domain = 'eixst-tribe.us.auth0.com';
export const clientId = '5HCjEt7mBomKtxGXkBxn8QX9OJmYZHAM';

const isDesktop = isPlatform('desktop');
const nativeCallback =
  'com.existtribe.restnode://eixst-tribe.us.auth0.com/capacitor/com.existtribe.restnode/callback';

const desktopRedirect = 'http://localhost:8100/profile'

// Comment out if testing for native device emulators
// export const redirectUri = isDesktop ? desktopRedirect
//   : nativeCallback;

// export const logoutUri = isDesktop ? 'http://localhost:8100' : nativeCallback;

// Comment out if using browser for testing locally
export const redirectUri = nativeCallback;
export const logoutUri = nativeCallback;
