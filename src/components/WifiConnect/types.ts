import { TextFieldTypes } from "@ionic/core";
import { wifiCredentialsInterface } from "../../api/RestNode/POST/updateNetworkCredentials";

export interface Props {
    wifiCredentials: wifiCredentialsInterface
    dismissModal: () => void
}

export interface inputNamesInterface {
    SSID: "ssid",
    PASSWORD: "password"
    COUNTRY: "country"
}

export interface stringObject {
    [key: string]: string
}

export interface boolObject {
    [key: string]: boolean
}

export interface textFieldObject {
    [key: string]: TextFieldTypes
}

export interface numberObject {
    [key: string]: number
}

export type inputItemType = ("ssid" | "password" | "country")[]