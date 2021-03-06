import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import { clientId, domain, redirectUri } from './auth0.config';

ReactDOM.render(
    <StrictMode>
        <Auth0Provider
            domain={domain}
            clientId={clientId}
            redirectUri={redirectUri}
            useRefreshTokens
            cacheLocation="localstorage"
        >
            <App />
        </Auth0Provider>
        ,
    </StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
