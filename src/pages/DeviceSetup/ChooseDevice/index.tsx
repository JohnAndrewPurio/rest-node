import { IonCol, IonGrid, IonRow } from '@ionic/react'
import { FC } from 'react'
import Device from '../../../components/Device'
import _styles from './styles'
import { devices } from "../../../devices.json"
import { newDeviceDetailsType } from '../../../types'

interface Props {
    setDetails: any,
    nextStep: () => void
}

const ChooseDevice: FC<Props> = ({ setDetails, nextStep }) => {

    const devicesList = Object.keys(devices)
    const deviceChosen = (device: string) => {
        setDetails((prev: newDeviceDetailsType) => ({ ...prev, type: device }))
        setTimeout(() => nextStep(), 200)
    }

    return (
        <IonRow style={_styles.container}>
            {devicesList.map((device) =>
                <IonCol style={_styles.tiles} size="6" onClick={() => deviceChosen(device)}>
                    <Device device={{ type: device, new: true }} />
                </IonCol>
            )}
        </IonRow>
    )
}

export default ChooseDevice