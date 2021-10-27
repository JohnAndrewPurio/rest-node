import { IonGrid, IonRow, IonCol, IonHeader, IonContent, IonPage, IonToolbar } from "@ionic/react"
import MainClock from "../MainClock"
import moment from "moment"
import { useEffect, useState } from "react"

import { Geolocation } from '@capacitor/geolocation';
import { NativeGeocoder, NativeGeocoderOptions } from '@ionic-native/native-geocoder'

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

const DateAndLocation: React.FC = ({ children }) => {
    const _styles = {
        place: {
            height: 'fit-content',
            fontWeight: 700
        },
        header: {
            padding: ".5em 0em"
        }
    }

    const [location, setLocation] = useState<any>("Castillejos")

    let options: NativeGeocoderOptions = {
        useLocale: true,
        maxResults: 5
    };

    const printCurrentPosition = async () => {
        const coordinates = await Geolocation.getCurrentPosition();
        const { latitude, longitude } = coordinates.coords
        const res = await NativeGeocoder.reverseGeocode(latitude, longitude, options)
        setLocation(res[0].locality)
    };

    useEffect(() => {
        printCurrentPosition()
    }, [])

    return (
        <IonContent>
            <IonHeader>
                <IonToolbar>
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
                </IonToolbar>
            </IonHeader>
            <IonContent>
                {children}
            </IonContent>
        </IonContent>
    )
}

export default DateAndLocation
