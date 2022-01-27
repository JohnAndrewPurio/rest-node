import { IonCol, IonIcon } from '@ionic/react';
import { pause, play } from 'ionicons/icons';
import { FC, useContext } from 'react';
import { toggleSound } from '../../../contextStore/SoundsContext/soundsActions';

import SoundsContext from '../../../contextStore/SoundsContext/soundsContext';
import _styles from './styles';

export interface PlayButtonProps {
    component: string;
}

const PlayButton: FC<PlayButtonProps> = ({ component }) => {
    const { state, dispatch } = useContext(SoundsContext);
    const { isPlaying } = state;

    const toggleSoundHandler = () => {
        dispatch(toggleSound(component === 'night'));
    };

    const playing = isPlaying[component];
    const playIcon = playing ? pause : play;

    const colStyle = () => {
        const style = { ..._styles.playBtn };
        if (playing) {
            style.backgroundColor = 'var(--ion-color-primary-tint)';
        }
        return style;
    };

    return (
        <IonCol style={colStyle()} onClick={toggleSoundHandler}>
            <IonIcon style={_styles.playIcon} color="primary" icon={playIcon} />
        </IonCol>
    );
};

export default PlayButton;
