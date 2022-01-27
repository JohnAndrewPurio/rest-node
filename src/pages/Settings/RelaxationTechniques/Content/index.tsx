import { IonContent, IonGrid } from '@ionic/react';
import moment from 'moment';
import { FC, useContext, useEffect, useState } from 'react';
import RelaxationFavorites from '../../../../components/RelaxationFavorites';
import RelaxationFilter from '../../../../components/RelaxationFilter';
import RelaxationList from '../../../../components/RelaxationList';
import TimeBar from '../../../../components/TimeBar';
import { bedtimeStarted } from '../../../../contextStore/BedTimeContext/bedtimeActions';
import BedTimeContext from '../../../../contextStore/BedTimeContext/bedtimeContext';
import RelaxationContext, {
    State,
} from '../../../../contextStore/RelaxationContext/relaxationContext';
import { setState } from '../../../../contextStore/RelaxationContext/relaxationActions';
import { getStartEnd } from '../../helper';
import RelaxationModal from '../../../../components/RelaxationModal';
import { storageGet } from '../../../../api/CapacitorStorage';
import {
    RELAXATION_FAVORITES_KEY,
    REST_NODE_STATES_KEY,
} from '../../../../api/CapacitorStorage/keys';

interface Props {
    router: HTMLIonRouterOutletElement | null;
}

const Content: FC<Props> = ({ router }) => {
    const bedtimeState = useContext(BedTimeContext);
    const relaxationState = useContext(RelaxationContext);
    const { started, bedtimeStart, wakeUpTime } = bedtimeState.state;

    const isBedtime = () =>
        moment().isSameOrAfter(bedtimeStart) &&
        moment().isSameOrBefore(wakeUpTime);

    const getState = async () => {
        const defaultStates = await storageGet(REST_NODE_STATES_KEY);
        let favorites = await storageGet(RELAXATION_FAVORITES_KEY);
        if (!favorites) {
            favorites = [];
        }

        if (defaultStates && favorites) {
            const { start, end } = getStartEnd(defaultStates);
            const newState: State = {
                relaxationAudio: { night: null, wake: null },
                relaxationFilter: 'All',
                relaxationPlaying: { night: false, wake: false },
                nightRelaxationSchedule: { start: null, end: null },
                wakeRelaxationSchedule: { start: null, end: null },
                relaxationVolume: 50,
                sample: { playing: false, audio: null },
                favorites,
            };

            if (defaultStates.bedtime.relax) {
                const nightStart = start
                    .clone()
                    .add(defaultStates.bedtime.relax.onoffset, 'minutes');
                const nightEnd = start
                    .clone()
                    .add(defaultStates.bedtime.relax.offoffset, 'minutes');
                const isNightRelaxationOn =
                    moment().isSameOrAfter(nightStart) &&
                    moment().isBefore(nightEnd);
                newState.relaxationAudio.night =
                    defaultStates.bedtime.relax.onpayload.audio_file;
                newState.relaxationPlaying.night = isNightRelaxationOn;
                newState.nightRelaxationSchedule = {
                    start: nightStart,
                    end: nightEnd,
                };
                newState.relaxationVolume =
                    defaultStates.bedtime.relax.onpayload.max_volume;
            }

            if (defaultStates.waketime.relax) {
                const wakeStart = end
                    .clone()
                    .add(defaultStates.waketime.relax.onoffset, 'minutes');
                const wakeEnd = end
                    .clone()
                    .add(defaultStates.waketime.relax.offoffset, 'minutes');

                const isWakeRelaxationOn =
                    moment().isSameOrAfter(wakeStart) &&
                    moment().isBefore(wakeEnd);

                newState.relaxationAudio.wake =
                    defaultStates.waketime.relax.onpayload.audio_file;
                newState.relaxationPlaying.wake = isWakeRelaxationOn;
                newState.wakeRelaxationSchedule = {
                    start: wakeStart,
                    end: wakeEnd,
                };
                newState.relaxationVolume =
                    defaultStates.waketime.relax.onpayload.max_volume;
            }

            relaxationState.dispatch(setState(newState));
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            if (!started && isBedtime()) {
                bedtimeState.dispatch(bedtimeStarted());
            }
        }, 1000);
        getState();
        return () => clearInterval(interval);

        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        if (started) getState();

        // eslint-disable-next-line
    }, [started])

    const [modalOpen, setModalOpen] = useState(false);
    const [chosenTechnique, setChosenTechnique] = useState(null);

    const openModal = (technique: any) => {
        setChosenTechnique(technique);
        setModalOpen(true);
    };

    return (
        <IonContent>
            <RelaxationModal
                technique={chosenTechnique}
                router={router}
                isOpen={modalOpen}
                closeModal={() => setModalOpen(false)}
            />
            <IonGrid>
                <TimeBar />
                <RelaxationFilter />
                <RelaxationFavorites openModal={openModal} />
                <RelaxationList openModal={openModal} />
            </IonGrid>
        </IonContent>
    );
};

export default Content;
