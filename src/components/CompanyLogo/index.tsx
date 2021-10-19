import { IonImg } from '@ionic/react'
import { src, alt, id } from './resources.json'

import './styles.css'

const CompanyLogo = () => {
    return (
        <IonImg src={src} alt={alt} id={id} />
    )
}

export default CompanyLogo
