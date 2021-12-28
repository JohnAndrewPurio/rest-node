import { IonButton, IonCol, IonGrid, IonList, IonRow } from "@ionic/react"
import { FC, FormEventHandler, useContext } from "react"
import { postNetworkCredentials, wifiCredentialsInterface } from "../../api/RestNode/POST/updateNetworkCredentials"
import TargetAddressContext from "../../contextStore/NetworkContext/targetAddress"
import { inputNames, types, labels, hidden, readonly, placeholders, minlength } from "./constants"
import InputItems from "./InputItems"
import { inputItemType, Props } from "./types"

const inputItems: inputItemType = Object.values(inputNames)

const WifiConnect: FC<Props> = ({ wifiCredentials, dismissModal }) => {
    const [targetAddress] = useContext(TargetAddressContext)

    const connectToWifi: FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault()

        const url = `http://${targetAddress}/restnode/network`

        try {
            const formData = new FormData((event.target) as HTMLFormElement)
            const data = (Object.fromEntries(formData.entries())) as wifiCredentialsInterface

            postNetworkCredentials(url, data)

        } catch (error) {
            console.log(error)
        } finally {
            dismissModal()
        }
    }

    return (
        <form onSubmit={connectToWifi}>
            <IonGrid>
                <IonRow className="ion-justify-content-center">
                    <IonCol className="ion-text-right">
                        <IonButton
                            fill="clear"
                            color="warning"
                            onClick={dismissModal}
                        >
                            Cancel
                        </IonButton>
                    </IonCol>
                </IonRow>

                <IonRow className="ion-justify-content-center">
                    <IonCol size="10">
                        <IonList>
                            {
                                inputItems.map((inputName) => (
                                    <InputItems
                                        type={types[inputName]}
                                        label={labels[inputName]}
                                        hidden={hidden[inputName]}
                                        readonly={readonly[inputName]}
                                        name={inputName}
                                        placeholder={placeholders[inputName]}
                                        value={wifiCredentials[inputName]}
                                        minlength={minlength[inputName]}
                                    />
                                ))
                            }
                        </IonList>
                    </IonCol>
                </IonRow>

                <IonRow className="ion-justify-content-end">
                    <IonCol className="ion-text-center">
                        <IonButton
                            type="submit"
                        >
                            Connect
                        </IonButton>
                    </IonCol>
                </IonRow>
            </IonGrid>
        </form>
    )
}

export default WifiConnect
