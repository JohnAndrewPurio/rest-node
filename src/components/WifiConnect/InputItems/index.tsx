import { TextFieldTypes } from '@ionic/core';
import { IonInput, IonItem, IonLabel } from '@ionic/react';
import { FC } from 'react';

interface InputInterface {
    hidden?: boolean;
    label?: string;
    minlength?: number;
    name: string;
    placeholder?: string;
    readonly?: boolean;
    type?: TextFieldTypes;
    value: string;
}

const InputItems: FC<InputInterface> = ({
    hidden,
    label,
    minlength,
    name,
    value,
    placeholder,
    readonly,
    type,
}) => (
    <IonItem hidden={hidden}>
        {label && <IonLabel position="floating">{label}</IonLabel>}
        <IonInput
            type={type}
            value={value}
            placeholder={placeholder}
            disabled={readonly}
            name={name}
            minlength={minlength}
        />
    </IonItem>
);

export default InputItems;
