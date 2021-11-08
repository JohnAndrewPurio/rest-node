import { Dispatch, SetStateAction} from 'react';
import { Geolocation } from '@capacitor/geolocation';
import {
    NativeGeocoder,
    NativeGeocoderOptions,
} from '@ionic-native/native-geocoder';

export const getCurrentPosition = async ( setLocation: Dispatch<SetStateAction<string>> ) => {
    try {
        const options: NativeGeocoderOptions = {
            useLocale: true,
            maxResults: 1
        };
        const coordinates = await Geolocation.getCurrentPosition();
        const { latitude, longitude } = coordinates.coords
        const [ location ] = await NativeGeocoder.reverseGeocode(latitude, longitude, options)

        setLocation( location.locality )
    } catch (error) {
        console.log(error)
    }
};