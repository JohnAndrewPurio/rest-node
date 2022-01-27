import { LogoutOptions, LogoutUrlOptions } from '@auth0/auth0-spa-js';
import { BrowserPlugin } from '@capacitor/browser';

type buildLogoutUrl = (options?: LogoutUrlOptions | undefined) => string;
type logout = (options?: LogoutOptions | undefined) => void;

const logOut = async (
    Browser: BrowserPlugin,
    buildLogoutUrl: buildLogoutUrl,
    logout: logout,
    logoutUri: string
) => {
    const logoutUrlOptions: LogoutUrlOptions = {
        returnTo: logoutUri,
    };

    const browserOptions = {
        url: buildLogoutUrl(logoutUrlOptions),
        windowName: '_self',
    };

    const logoutOptions: LogoutOptions = {
        localOnly: true,
    };

    await Browser.open(browserOptions);
    logout(logoutOptions);
};

export default logOut;
