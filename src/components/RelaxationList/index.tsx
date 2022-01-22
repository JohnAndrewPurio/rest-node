import { IonGrid, IonLabel, IonRow } from '@ionic/react';
import { useContext } from 'react';
import RelaxationContext from '../../contextStore/RelaxationContext/relaxationContext';
import AudioFilesContext from '../../contextStore/RestNodeContext/audioFiles';
import RelaxationCard from '../RelaxationCard';
import _styles from './styles';

interface Props {
    openModal: (technique: any) => void;
}

const RelaxationList: React.FC<Props> = ({ openModal }) => {
    const filterValues: { [key: string]: number } = {
        5: 300,
        10: 600,
        15: 900,
        20: 1200,
        30: 1800,
    };

    const { state } = useContext(RelaxationContext);
    const songs = useContext(AudioFilesContext);
    const techniques = songs ? Object.values(songs['Relaxation Sounds']) : [];
    const filteredList = techniques.filter(el => {
        const filter = state.relaxationFilter;
        const length = parseInt(el.length || '');
        switch (filter) {
            case 'All':
                return true;
            case '30+':
                return length > 1800;
            case '30':
                return length > 1500 && length < 1801;
            case '20':
                return length > 1020 && length < 1501;
            default:
                return (
                    length > filterValues[filter] - 150 &&
                    length < filterValues[filter] + 150
                );
        }
    });

    return (
        <IonRow style={_styles.container}>
            <IonGrid>
                <IonRow>
                    <IonLabel style={_styles.label}>All Techniques</IonLabel>
                </IonRow>
                <IonRow style={_styles.gridContainer}>
                    <IonGrid style={_styles.grid}>
                        {filteredList.map(item => (
                            <RelaxationCard onClick={openModal} item={item} />
                        ))}
                    </IonGrid>
                </IonRow>
            </IonGrid>
        </IonRow>
    );
};

export default RelaxationList;
