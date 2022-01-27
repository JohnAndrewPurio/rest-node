import {
    IonContent,
    IonGrid,
    IonLabel,
    IonRow,
    IonSlide,
    IonSlides,
} from '@ionic/react';
import { useContext, useState } from 'react';
import RelaxationContext from '../../contextStore/RelaxationContext/relaxationContext';
import RelaxationCard from '../RelaxationCard';
import _styles from './styles';
import AudioFilesContext from '../../contextStore/RestNodeContext/audioFiles';

interface Props {
    openModal: (technique: any) => void;
}

const RelaxationFavorites: React.FC<Props> = ({ openModal }) => {
    const { state } = useContext(RelaxationContext);

    const slideOpt = {
        initialSlide: 0,
        speed: 600,
        slidesPerView: 'auto',
        zoom: false,
        grabCursor: true,
    };

    const songs = useContext(AudioFilesContext);
    const techniques = songs ? Object.values(songs['Relaxation Sounds']) : [];

    const favorites = techniques.filter(
        el => el.id && state.favorites.includes(el.id)
    );

    return (
        <IonRow style={_styles.container}>
            <IonGrid>
                <IonRow>
                    <IonLabel style={_styles.label}>Favorites</IonLabel>
                </IonRow>
                <IonRow style={_styles.slider}>
                    <IonContent style={_styles.fullHeight}>
                        <IonSlides
                            key={favorites.map(el => el.id).join('_')}
                            options={slideOpt}
                            style={_styles.fullHeight}
                        >
                            <IonSlide key="default" style={_styles.slide}>
                                <RelaxationCard
                                    onClick={openModal}
                                    slide
                                    item={techniques[0]}
                                    defaultCard
                                />
                            </IonSlide>
                            {favorites.map((item, i) => (
                                <IonSlide key={item.id} style={_styles.slide}>
                                    <RelaxationCard
                                        item={item}
                                        slide
                                        onClick={openModal}
                                    />
                                </IonSlide>
                            ))}
                        </IonSlides>
                    </IonContent>
                </IonRow>
            </IonGrid>
        </IonRow>
    );
};

export default RelaxationFavorites;
