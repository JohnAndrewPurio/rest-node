import { IonCol, IonGrid, IonIcon, IonRippleEffect, IonRouterLink, IonRow, IonText } from '@ionic/react'
import { addOutline } from 'ionicons/icons'
import { FC, useState } from 'react'
import { deviceInfo } from '../../types'
import Device from '../Device'
import _styles from './styles'
import { DEVICE_SETUP } from '../../pages/paths.json'

const DevicesList: FC = () => {

    const dummyDevices: deviceInfo[] = [{ id: 1, type: "Rest Node", nickname: "Bedroom", new: false }]
    const [devices,] = useState<deviceInfo[]>(dummyDevices)

    return (
        <IonGrid style={_styles.container}>
            <IonRow>
                {devices.map((device) => <Device key={device.id} device={device} />)}
                <IonCol size='6' style={_styles.addContainer} >
                    <IonRouterLink color="dark" routerLink={DEVICE_SETUP}>
                        <IonRow className="ion-activatable" style={_styles.addInnerContainer}>
                            <IonGrid style={_styles.addDeviceGrid}>
                                <IonIcon color='primary' icon={addOutline} style={_styles.addIcon} />
                                <IonText>
                                    Add New
                                </IonText>
                                <IonText>
                                    Device
                                </IonText>
                            </IonGrid>
                            <IonRippleEffect></IonRippleEffect>
                        </IonRow>
                    </IonRouterLink>
                </IonCol>
            </IonRow>
        </IonGrid>
    )
}

export default DevicesList