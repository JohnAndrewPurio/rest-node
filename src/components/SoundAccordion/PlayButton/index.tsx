import { IonCol, IonIcon } from '@ionic/react';
import { pause, play } from 'ionicons/icons';
import { FC, useContext } from 'react'
import { toggleSound } from '../../../contextStore/SoundsContext/soundsActions';

import SoundsContext from '../../../contextStore/SoundsContext/soundsContext';

export interface PlayButtonProps {
    component: string;
}

const PlayButton: FC<PlayButtonProps> = ({ component }) => {
    const { state, dispatch } = useContext(SoundsContext);
    const { audio } = state;

    const _styles = {
        icon: {
            fontSize: '7vh',
        },
    };

    const toggleSoundHandler = () => {
        dispatch(
            toggleSound(component === 'night')
        )
    }

    const playing = audio[component];
    const playIcon = playing ? pause : play
    
    const colClassName = playing ? 'playing play-btn' : 'play-btn'

    return (
        <IonCol
            className={colClassName}
            onClick={toggleSoundHandler}
        >
            <IonIcon
                style={_styles.icon}
                color="primary"
                icon={playIcon}
            />
        </IonCol>
    );
};

export default PlayButton