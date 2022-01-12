import { IonButton, IonCol, IonGrid, IonIcon, IonImg, IonRow } from '@ionic/react'
import { heart, heartOutline } from 'ionicons/icons'
import React, { useContext, useState } from 'react'
import { toggleFavorite } from '../../contextStore/RelaxationContext/relaxationActions';
import RelaxationContext from '../../contextStore/RelaxationContext/relaxationContext';

import styles from './styles.module.css';

interface Props {
    item: any,
    defaultCard?: boolean,
    slide?: boolean,
    onClick: (technique: any) => void
}

const RelaxationCard: React.FC<Props> = ({ item, defaultCard, slide, onClick }) => {

    const { state, dispatch } = useContext(RelaxationContext);
    const [showModal, setShowModel] = useState(false)

    return (
        <IonCol onClick={() => onClick(item)} sizeXs={slide ? undefined : '6'} sizeMd={slide ? undefined : '4'} key={item.id} className={`&{styles.card} grid-box`}>
            <IonRow
                className={styles.gridPicture}
                onClick={() => setShowModel(true)}
            >
                <IonImg
                    className={styles.gridIonPicture}
                    src="https://picsum.photos/200"
                />
                <div className={styles.lengthIndicator}>05:14</div>
            </IonRow>
            <IonGrid className={styles.detailsGrid}>
                <IonCol className={styles.paddingZero}>
                    <IonGrid className={styles.paddingZero}>
                        <IonRow className={styles.title}>
                            {item.title} title
                        </IonRow>
                        <IonRow className={styles.creator}>Creator</IonRow>
                    </IonGrid>
                </IonCol>
                {
                    defaultCard ?
                        <IonCol
                            className={styles.paddingZero} size="auto"
                        >
                            <IonRow className={styles.creator}>Default</IonRow>
                        </IonCol>
                        : <IonCol className={styles.paddingZero} size="auto">
                            <IonButton
                                shape="round"
                                fill="clear"
                                size="small"
                                className={styles.favBtn}
                                onClick={(e) => {
                                    e.stopPropagation()
                                    dispatch(toggleFavorite(item.id))
                                }}
                            >
                                {state.favorites.includes(item.id) ? (
                                    <IonIcon slot="icon-only" icon={heart} />
                                ) : (
                                    <IonIcon slot="icon-only" icon={heartOutline} />
                                )}
                            </IonButton>
                        </IonCol>
                }
            </IonGrid>
        </IonCol>
    )
}

export default RelaxationCard