import { IonCol, IonIcon, IonRange } from '@ionic/react';
import { volumeHigh, volumeLow } from 'ionicons/icons';
import { FC, useContext } from 'react';
import SocketContext from '../../contextStore/RestNodeContext/socketConnection';
import { adjustVolume } from '../../contextStore/SoundsContext/soundsActions';
import SoundsContext from '../../contextStore/SoundsContext/soundsContext';
import _styles from './styles';

interface Props {
    open: boolean;
    onclick: (index: number) => void;
    index: number;
    component: string;
}

const VolumeSlider: FC<Props> = ({ index, open, onclick, component }) => {
    const socket = useContext(SocketContext);
    const { state, dispatch } = useContext(SoundsContext);

    const handleRangeChange = (event: any) => {
        const { value } = event.target;

        if (value !== 0 && !value) return;

        dispatch(adjustVolume(component === 'night', value));

        const data = {
            volume: value,
            type: 'volume',
        };

        socket?.send(JSON.stringify(data));
    };

    return (
        <IonCol
            style={{
                ..._styles.sliderContainer,
                maxWidth: open ? '500px' : '200px',
            }}
            onClick={() => onclick(index)}
        >
            {open ? (
                <IonRange
                    color="primary"
                    style={_styles.rangeSlider}
                    value={state.volume[component]}
                    onIonChange={handleRangeChange}
                >
                    <IonIcon color="primary" slot="start" icon={volumeLow} />
                    <IonIcon color="primary" slot="end" icon={volumeHigh} />
                </IonRange>
            ) : (
                <IonIcon
                    style={_styles.icon}
                    color="primary"
                    icon={volumeHigh}
                />
            )}
        </IonCol>
    );
};

export default VolumeSlider;
