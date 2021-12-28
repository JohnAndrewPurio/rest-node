import { IonItem, IonIcon, IonLabel, useIonModal } from "@ionic/react";
import { wifi } from "ionicons/icons";
import { FC, useContext } from "react";

import UserContext, { geoip } from "../../contextStore/UserContext/userContext";
import WifiConnect from "../WifiConnect";

import { wifiInfoProps } from "./types";

const WifiItem: FC<wifiInfoProps> = ({ wifiInfo }) => {
  const user = useContext(UserContext)
  const { country_code: country } = user && user[geoip]
  const { SSID } = wifiInfo

  const wifiCredentials = {
    ssid: SSID,
    country
  }

  const dismissModal = () => {
    dismiss()
  }

  const [present, dismiss] = useIonModal(WifiConnect, {
    wifiCredentials,
    dismissModal
  })

  const showWifiDialog = () => {
    present()
  }

  console.log("User GeoIP", user ? user[geoip] : "None")

  return (
    <IonItem detail button onClick={showWifiDialog}>
      <IonIcon icon={wifi} slot="start" />
      <IonLabel>
        <h3>{SSID}</h3>
      </IonLabel>
    </IonItem>
  )
};

export default WifiItem;