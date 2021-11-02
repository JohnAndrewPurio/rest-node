import { isPlatform } from '@ionic/core';

export const domain = 'eixst-tribe.us.auth0.com';
export const clientId = '5HCjEt7mBomKtxGXkBxn8QX9OJmYZHAM';

export const redirectUri = isPlatform('desktop')
  ? 'http://localhost:8100/restnode'
  : 'com.existtribe.restnode://eixst-tribe.us.auth0.com/capacitor/com.existtribe.restnode/callback';
