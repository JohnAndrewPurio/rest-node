import { IonItem, IonIcon, IonLabel } from "@ionic/react";
import { wifi } from "ionicons/icons";
import { FC } from "react";
import { wifiInfoProps } from "./types";

const WifiItem: FC<wifiInfoProps> = ({ wifiInfo }) => {
  const { SSID } = wifiInfo

  return (
    <IonItem detail style={{
      backgroundColor: "inherit"
    }}>
      <IonIcon icon={wifi} slot="start" />
      <IonLabel>
        <h3>{SSID}</h3>
      </IonLabel>
    </IonItem>
  )
};

export default WifiItem;
