import { IonButton, IonIcon, IonItem, IonLabel } from '@ionic/react';
import { play, stop } from 'ionicons/icons';
import { useContext } from 'react';
import { playSample } from '../../contextStore/SoundsContext/soundsActions';
import SoundsContext from '../../contextStore/SoundsContext/soundsContext';
import './styles.css';

interface Props {
  song: {
    title: string;
    artist: string;
    id: string;
  };
  active: boolean;
  onclick: (index: number) => void;
  index: number;
}

const Audio: React.FC<Props> = ({ index, song, active, onclick }) => {
  const { state, dispatch } = useContext(SoundsContext);

  const handlePlayClick = (e: any, id: string) => {
    e.stopPropagation();
    dispatch(playSample(id));
  };

  return (
    <IonItem
      onClick={() => onclick(index)}
      color={active ? 'primary' : undefined}
      button
      detail={false}
      lines="full"
      className="audio-container"
    >
      <IonLabel>{song.title}</IonLabel>
      <IonButton
        fill="clear"
        slot="end"
        onClick={(e) => handlePlayClick(e, song.id)}
      >
        {state.sample.playing && song.id === state.sample.audio ? (
          <IonIcon
            color={active ? 'light' : 'primary'}
            slot="icon-only"
            icon={stop}
          />
        ) : (
          <IonIcon
            color={active ? 'light' : 'primary'}
            slot="icon-only"
            icon={play}
          />
        )}
      </IonButton>
    </IonItem>
  );
};

export default Audio;
