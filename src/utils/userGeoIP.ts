import { User } from '@auth0/auth0-spa-js';
import { geoip } from '../contextStore/UserContext/userContext';

type getAddressType = (user: User | undefined) => string;

export const getAddress: getAddressType = user => {
    if (!user) return '';

    const { city_name, country_name } = user[geoip];

    return `${city_name}, ${country_name}`;
};
