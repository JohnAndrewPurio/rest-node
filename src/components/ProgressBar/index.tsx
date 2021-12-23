import { IonRow, IonText } from '@ionic/react'
import { FC, useState } from 'react'
import { newDeviceDetailsType } from '../../types'
import _styles from './styles'

type Page = {
    title: string,
    component: any
}

interface Props {
    currentStep: number,
    setStep: (index: number) => void,
    pages: Page[],
    deviceDetails: newDeviceDetailsType
}

const ProgressBar: FC<Props> = ({ currentStep, setStep, pages, deviceDetails }) => {

    const getStyle = (type: string, index: number) => {
        switch (type) {
            case "circle":
                if (index <= currentStep) {
                    return _styles.circleActive
                }
                else return _styles.circle
            case "connector":
                if (index <= currentStep) {
                    return _styles.connectorActive
                }
                else return _styles.connector
            default:
                return _styles.circle
        }
    }

    const jumpStep = (index: number) => {
        switch (index) {
            case 0:
                setStep(index);
                break;
            case 1:
                if (deviceDetails.type) {
                    setStep(index)
                }
                break;
            case 2:
                if (deviceDetails.switchedOn) {
                    setStep(index)
                }
                break;
        }
    }

    return (
        <IonRow style={_styles.container}>
            {pages.map((step, index) =>
                index === 0 ? <div onClick={() => jumpStep(index)} style={_styles.circleActive}>
                    <IonText style={{ fontSize: ".8rem" }}>
                        1
                    </IonText>
                </div>
                    : <>
                        <div style={getStyle("connector", index)}></div>
                        <div onClick={() => jumpStep(index)} style={getStyle("circle", index)}>
                            <IonText style={{ fontSize: ".8rem" }}>
                                {index + 1}
                            </IonText>
                        </div>
                    </>
            )}
        </IonRow>
    )
}

export default ProgressBar