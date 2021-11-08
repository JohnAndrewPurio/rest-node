import { isPlatform } from '@ionic/core';

export const domain = 'eixst-tribe.us.auth0.com';
export const clientId = '5HCjEt7mBomKtxGXkBxn8QX9OJmYZHAM';

const isDesktop = isPlatform('desktop')
const nativeCallback = 'com.existtribe.restnode://eixst-tribe.us.auth0.com/capacitor/com.existtribe.restnode/callback'

export const redirectUri = isDesktop
  // ? 'http://localhost:8100/restnode'
  ? 'http://localhost:8100/profile'
  : nativeCallback

export const logoutUri = isDesktop
  ? 'http://localhost:8100'
  : nativeCallback
