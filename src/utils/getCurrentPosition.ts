import { Dispatch, SetStateAction } from 'react';
import { Geolocation } from '@capacitor/geolocation';
import {
    NativeGeocoder,
    NativeGeocoderOptions,
} from '@ionic-native/native-geocoder';
import { alertController } from '@ionic/core';

export const getCurrentPosition = async (
    setLocation: Dispatch<SetStateAction<string>>
) => {
    try {
        const options: NativeGeocoderOptions = {
            useLocale: true,
            maxResults: 1,
        };
        const coordinates = await Geolocation.getCurrentPosition();
        const { latitude, longitude } = coordinates.coords;
        const [location] = await NativeGeocoder.reverseGeocode(
            latitude,
            longitude,
            options
        );

        setLocation(location.locality);
    } catch (error) {
        console.log(error);
    }
};

// modal alert to beg for location permission
export const requestLocation = {
    cssClass: 'my-css',
    header: 'Enable Location',
    message:
        'The app is having a hard time connecting to the Rest Node. Consider enabling location.',
    buttons: [
        { text: 'Close', role: 'cancel' },
        {
            text: 'Enable location',
            handler: async () => {
                Geolocation.requestPermissions();
                alertController.dismiss();
            },
        },
    ],
};

export const checkLocationPermission = async () => {
    try {
        const PERMISSION_GRANTED: PermissionState = 'granted';
        const { location } = await Geolocation.checkPermissions();

        if (location !== PERMISSION_GRANTED)
            await Geolocation.requestPermissions();

        const { location: permission } = await Geolocation.checkPermissions();

        return permission === PERMISSION_GRANTED;
    } catch (error) {
        console.log(error);
    }
};
