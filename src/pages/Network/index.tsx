import { useState, useEffect, FC } from 'react';
import { IonContent, IonHeader, IonIcon, IonItem, IonItemGroup, IonLabel, IonList, IonListHeader, IonPage, IonText, useIonAlert } from '@ionic/react';
import { page, text } from './styles';
import { checkLocationPermission } from '../../utils/getCurrentPosition';
import { wifiScan } from '../../utils/wifiMethods';
import { wifi } from 'ionicons/icons';

interface wifiInfo {
  BSSID: string
  SSID: string
  capabilities: string
  centerFreq0: number
  centerFreq1: number
  channelWidth: number
  frequency: number
  level: number
  timestamp: number
}

const Network: FC = () => {
  const [availableWifi, setAvailableWifi] = useState<wifiInfo[]>([])

  const getAvailableWifi = async () => {
    try {
      const permitted = await checkLocationPermission()

      if (!permitted)
        return

      const wifiAvailable = await wifiScan()

      console.log("Available Wifi:", wifiAvailable)
      setAvailableWifi(wifiAvailable)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const everySecond = setInterval( getAvailableWifi, 1000 )

    return () => {
      clearInterval(everySecond)
    }
  }, [])

  return (
    <IonPage
      style={page}
    >
      <IonHeader>
        <IonText
          style={text}
        >
          Network
        </IonText>
      </IonHeader>

      <IonContent>
        <IonItemGroup>
          <IonListHeader>
            <IonText>Available Wifi</IonText>
          </IonListHeader>

          {
            availableWifi.map(({ SSID, BSSID }) => (
              <IonItem>
                <IonIcon icon={wifi} slot="start" />
                <IonLabel>
                  <h3>{SSID}</h3>
                </IonLabel>
              </IonItem>
            ))
          }

        </IonItemGroup>
      </IonContent>
    </IonPage>
  );
};

export default Network;
