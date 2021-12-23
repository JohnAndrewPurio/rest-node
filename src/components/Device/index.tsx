import { IonAvatar, IonCol, IonGrid, IonImg, IonRippleEffect, IonRouterLink, IonRow, IonText } from '@ionic/react'
import { FC } from 'react'
import _styles from './styles'
import { devices } from '../../devices.json';
import { deviceInfo } from '../../types'
import { REST_NODE } from '../../pages/paths.json'

interface Props {
    device: deviceInfo
}

const devicesList = JSON.parse(JSON.stringify(devices))

const Device: FC<Props> = ({ device }) => {
    return (
        <IonCol size='6' style={_styles.container} >
            <IonRouterLink routerLink={device.new ? undefined : devicesList[device.type].path} color="dark">
                <IonRow className="ion-activatable" style={_styles.innerContainer}>
                    <IonGrid style={_styles.deviceInfo}>
                        <IonAvatar>
                            <img src={devicesList[device.type].logo} alt="device logo" />
                        </IonAvatar>
                        <IonText>
                            {device.type}
                        </IonText>
                        {
                            device.nickname &&
                            <IonText style={_styles.deviceNickname}>
                                {device.nickname}
                            </IonText>
                        }
                    </IonGrid>
                    <IonRippleEffect></IonRippleEffect>
                </IonRow>
            </IonRouterLink>
        </IonCol>
    )
}

export default Device