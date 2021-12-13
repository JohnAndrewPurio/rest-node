import { IonContent, IonGrid } from "@ionic/react";
import moment from "moment";
import { FC, useState, useContext, useEffect } from "react";
import RelaxationFavorites from "../../../../components/RelaxationFavorites";
import RelaxationFilter from "../../../../components/RelaxationFilter";
import RelaxationList from "../../../../components/RelaxationList";
import TimeBar from "../../../../components/TimeBar";
import { bedtimeStarted } from "../../../../contextStore/BedTimeContext/bedtimeActions";
import BedTimeContext from "../../../../contextStore/BedTimeContext/bedtimeContext";
import RelaxationContext, { State } from "../../../../contextStore/RelaxationContext/relaxationContext";
import { setState } from '../../../../contextStore/RelaxationContext/relaxationActions';
import { storage } from "../../../../services/constants";
import { getStartEnd } from "../../helper";
import { Storage } from '@capacitor/storage';

const Content: FC = () => {
    const [selected, setSelected] = useState('All');

    const onSelect = (time: string) => {
        setSelected(time);
    };

    const bedtimeState = useContext(BedTimeContext);
    const relaxationState = useContext(RelaxationContext);
    const { started, bedtimeStart, wakeUpTime } = bedtimeState.state;

    const isBedtime = () =>
        moment().isSameOrAfter(bedtimeStart) && moment().isSameOrBefore(wakeUpTime);

    useEffect(() => {
        const interval = setInterval(() => {
            if (!started && isBedtime()) {
                bedtimeState.dispatch(bedtimeStarted());
            }
        }, 1000);

        return () => clearInterval(interval);

        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        const getState = async () => {
            const { value } = await Storage.get({ key: storage.RED_NODE_STATES });
            const favorites = await Storage.get({ key: storage.RELAXATION_FAVORITES });
            if (!favorites.value) {
                favorites.value = JSON.stringify([]);
            }

            if (value && favorites.value) {
                const defaultStates = JSON.parse(value);
                const { start, end } = getStartEnd(defaultStates);
                const newState: State = {
                    relaxationAudio: { night: null, wake: null },
                    relaxationFilter: 'All',
                    relaxationPlaying: { night: false, wake: false },
                    nightRelaxationSchedule: { start: null, end: null },
                    wakeRelaxationSchedule: { start: null, end: null },
                    relaxationVolume: { night: 50, wake: 50 },
                    sample: { playing: false, audio: null },
                    favorites: JSON.parse(favorites.value),
                };

                if (defaultStates.bedtime.relax) {
                    const nightStart = start
                        .clone()
                        .add(defaultStates.bedtime.relax.onoffset, 'minutes');
                    const nightEnd = start
                        .clone()
                        .add(defaultStates.bedtime.relax.offoffset, 'minutes');
                    const isNightRelaxationOn =
                        moment().isSameOrAfter(nightStart) && moment().isBefore(nightEnd);
                    newState.relaxationAudio.night =
                        defaultStates.bedtime.relax.onpayload.audio_file;
                    newState.relaxationPlaying.night = isNightRelaxationOn;
                    newState.nightRelaxationSchedule = { start: nightStart, end: nightEnd };
                    newState.relaxationVolume.night =
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
                        moment().isSameOrAfter(wakeStart) && moment().isBefore(wakeEnd);

                    newState.relaxationAudio.wake =
                        defaultStates.waketime.relax.onpayload.audio_file;
                    newState.relaxationPlaying.wake = isWakeRelaxationOn;
                    newState.wakeRelaxationSchedule = { start: wakeStart, end: wakeEnd };
                    newState.relaxationVolume.wake =
                        defaultStates.waketime.relax.onpayload.max_volume;
                }

                relaxationState.dispatch(setState(newState));
            }
        };

        if (started)
            getState();

        // eslint-disable-next-line
    }, [started]);

    return (
        <IonContent>
            <IonGrid>
                <TimeBar />
                <RelaxationFilter selected={selected} onSelect={onSelect} />
                <RelaxationFavorites />
                <RelaxationList />
            </IonGrid>
        </IonContent>
    );
};

export default Content