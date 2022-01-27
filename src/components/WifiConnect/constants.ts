import {
    boolObject,
    inputNamesInterface,
    numberObject,
    stringObject,
    textFieldObject,
} from './types';

export const inputNames: inputNamesInterface = {
    SSID: 'ssid',
    PASSWORD: 'password',
    COUNTRY: 'country',
};

export const labels: stringObject = {
    ssid: 'Wifi Name',
    password: 'Password',
};

export const hidden: boolObject = {
    country: true,
};

export const readonly: boolObject = {
    ssid: true,
};

export const placeholders: stringObject = {
    password: 'Password',
};

export const types: textFieldObject = {
    password: 'password',
};

export const minlength: numberObject = {
    password: 8,
};
