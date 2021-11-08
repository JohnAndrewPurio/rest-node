import { IonCol, IonIcon, IonRange } from '@ionic/react';
import { volumeHigh, volumeLow } from 'ionicons/icons';
import { useContext } from 'react';
import { adjustVolume } from '../../contextStore/SoundsContext/soundsActions';
import SoundsContext from '../../contextStore/SoundsContext/soundsContext';
import './styles.css';

interface Props {
  open: boolean;
  onclick: (index: number) => void;
  index: number;
  component: string;
}

const Slider: React.FC<Props> = ({ index, open, onclick, component }) => {
  const { state, dispatch } = useContext(SoundsContext);

  const _styles = {
    icon: {
      fontSize: '7vh',
    },
  };

  const handleRangeChange = (e: any) => {
    const val = e.target.value;
    if (val) {
      dispatch(adjustVolume(component === 'night', val));
    }
  };

  return (
    <IonCol
      className={open ? 'open-slider slider-container' : 'slider-container'}
      onClick={() => onclick(index)}
    >
      {open ? (
        <IonRange
          color="primary"
          className="range-slider"
          value={state.volume[component]}
          onIonChange={handleRangeChange}
        >
          <IonIcon color="primary" slot="start" icon={volumeLow} />
          <IonIcon color="primary" slot="end" icon={volumeHigh} />
        </IonRange>
      ) : (
        <IonIcon style={_styles.icon} color="primary" icon={volumeHigh} />
      )}
    </IonCol>
  );
};

export default Slider;
