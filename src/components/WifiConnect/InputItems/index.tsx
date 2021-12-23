import { TextFieldTypes } from "@ionic/core"
import { IonItem, IonLabel, IonInput } from "@ionic/react"
import { FC } from "react"

interface InputInterface {
    hidden?: boolean
    label?: string
    name: string
    placeholder?: string
    readonly?: boolean
    type?: TextFieldTypes
    value: string
}

const InputItems: FC<InputInterface> = ({ hidden, label, name, value, placeholder, readonly, type }) => {
    return (
        <IonItem hidden={hidden}>
            {
                label &&
                <IonLabel position="floating">
                    {label}
                </IonLabel>
            }
            <IonInput
                type={type}
                value={value}
                placeholder={placeholder}
                readonly={readonly}
                name={name}
            />
        </IonItem>
    )
}

export default InputItems
