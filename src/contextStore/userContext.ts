import { createContext } from 'react';
import { User } from '@auth0/auth0-spa-js';

const UserContext = createContext<User | undefined>(undefined);

export const geoip = 'https://example.com/geoip';
export const country = 'https://example.com/country';
export const timezone = 'https://example.com/timezone';

export default UserContext;
