import { IonGrid, IonRow, IonCol } from "@ionic/react"
import MainClock from "../MainClock"
import moment from "moment"
import { useEffect, useState } from "react"

import { Geolocation } from '@capacitor/geolocation';
import { NativeGeocoder, NativeGeocoderOptions } from '@ionic-native/native-geocoder'

const DateAndLocation: React.FC = () => {

    const _styles = {
        grid: {
            margin: '2em .5em 2sem .5em'
        },
        place: {
            height: 'fit-content',
            fontWeight: 700
        },
        clock: {
            display: "flex",
            justifyContent: "center"
        }
    }

    const [location, setLocation] = useState<any>()

    // interface Position {
    //     timestamp: number,
    //     coords: { 
    //         latitude: number,
    //         longitude: number,
    //         accuracy: number,
    //         altitudeAccuracy: number | null,
    //         altitude: number | null,
    //         speed: number | null,
    //         heading: number | null
    //     }
    // }


    let options: NativeGeocoderOptions = {
        useLocale: true,
        maxResults: 5
    };

    const printCurrentPosition = async () => {
        const coordinates = await Geolocation.getCurrentPosition();
            const {latitude, longitude} = coordinates.coords
            NativeGeocoder.reverseGeocode(latitude, longitude, options)
                .then(res => {
                    console.log('Current position:', res);
                    setLocation(res[0].administrativeArea)
                })
  };

  useEffect(() => {
                printCurrentPosition()
            }, [])

            return (
            <IonGrid style={_styles.grid}>
                <IonRow>
                    <IonCol class="ion-text-center" style={_styles.place}>
                        {location}
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol class="ion-text-center">
                        {moment().format("DD MMMM YYYY")}
                    </IonCol>
                </IonRow>
                <IonRow style={_styles.clock}>
                    <MainClock />
                </IonRow>
            </IonGrid>
            )
}

            export default DateAndLocation
