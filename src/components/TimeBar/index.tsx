import { IonRow } from '@ionic/react';
import { useContext, useEffect, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';

import BedTimeContext from '../../contextStore/BedTimeContext/bedtimeContext';
import LightsContext from '../../contextStore/LightsContext/lightsContext';
import SoundsContext from '../../contextStore/SoundsContext/soundsContext';
import RelaxationContext from '../../contextStore/RelaxationContext/relaxationContext';

import {
    BEDTIME,
    LIGHTS,
    RELAXATION,
    SOUNDS,
} from '../../pages/Settings/paths.json';
import { TimeBarType } from '../../types';
import {
    getBedtimeBars,
    getLightBars,
    getRelaxationBars,
    getSoundBars,
} from './helper';
import _styles from './styles';

const TimeBar: React.FC<RouteComponentProps> = ({ location }) => {
    const bedtimeState = useContext(BedTimeContext);
    const lightsState = useContext(LightsContext);
    const soundsState = useContext(SoundsContext);
    const relaxationState = useContext(RelaxationContext);

    const [bars, setBars] = useState<TimeBarType[]>([]);

    useEffect(() => {
        const updateTimeBar = () => {
            switch (location.pathname) {
                case BEDTIME:
                    return getBedtimeBars(bedtimeState.state);
                case LIGHTS: {
                    return getLightBars(lightsState.state);
                }
                case SOUNDS: {
                    return getSoundBars(soundsState.state);
                }
                case RELAXATION: {
                    return getRelaxationBars(relaxationState.state);
                }
            }

            return [];
        };

        const timeBars = updateTimeBar();
        setBars(timeBars);

        // eslint-disable-next-line
    }, [
        bedtimeState.state,
        lightsState.state,
        soundsState.state,
        relaxationState.state,
    ]);

    return (
        <IonRow style={_styles.timeBarContainer}>
            <IonRow style={_styles.timeBar}>
                {bars.map(bar => (
                    <div
                        key={bar.start}
                        style={{
                            ..._styles.oneBar,
                            width: bar.width,
                            left: bar.position,
                        }}
                    >
                        <div style={_styles.start}>{bar.start}</div>
                        <div style={_styles.end}>{bar.end}</div>
                    </div>
                ))}
            </IonRow>
        </IonRow>
    );
};

export default withRouter(TimeBar);
