import { IonButton, IonContent, IonHeader, IonList, IonPage } from "@ionic/react"
import { FC, FormEventHandler } from "react"
import { inputNames, types, labels, hidden, readonly, placeholders } from "./constants"
import InputItems from "./InputItems"
import { Props } from "./types"

const WifiConnect: FC<Props>  = ({ wifiCredentials, dismissModal }) => {
    const inputItems: ("ssid" | "password" | "country")[] = Object.values(inputNames)

    const connectToWifi: FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault()

        try {
            // const formData = new FormData(event)
            console.log("Event Target:", event.target)

        } catch (error) {
            console.log(error)
        } finally {
            dismissModal()
        }
    }

    return (
        <IonPage>
            <IonHeader>
                <IonButton slot="end" onClick={dismissModal}>
                    Close
                </IonButton>
            </IonHeader>
            <IonContent>
                <form onSubmit={connectToWifi}>
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
                                />
                            ))
                        }

                        <IonButton
                            type="submit"
                        >
                            Connect
                        </IonButton>
                    </IonList>
                </form>
            </IonContent>
        </IonPage>
    )
}

export default WifiConnect
