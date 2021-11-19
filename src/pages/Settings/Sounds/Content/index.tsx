import { IonContent, IonGrid } from "@ionic/react";
import { FC, useContext, useEffect, useState } from "react"
import { Storage } from "@capacitor/storage";

import moment from "moment";
import SoundAccordion from "../../../../components/SoundAccordion";
import TimeBar from "../../../../components/TimeBar";
import BedTimeContext from "../../../../contextStore/BedTimeContext/bedtimeContext";
import SoundsContext from "../../../../contextStore/SoundsContext/soundsContext";

import { bedtimeStarted } from "../../../../contextStore/BedTimeContext/bedtimeActions";
import { setState } from "../../../../contextStore/SoundsContext/soundsActions"
import { storage, BASE_URL } from "../../../../services/constants";
import { _styles } from "../styles";
import AudioFilesContext from "../../../../contextStore/RestNodeContext/audioFiles";

const Content: FC = () => {
    const audioTypes = useContext(AudioFilesContext)
    const bedtimeState = useContext(BedTimeContext);
    const soundsState = useContext(SoundsContext);

    const { started, bedtimeStart, wakeUpTime } = bedtimeState.state;

    const getState = async () => {
        const { value } = await Storage.get({ key: storage.RED_NODE_STATES });

        if (!value)
            return

        const { bedtime, waketime } = JSON.parse(value);

        const _moment = moment()
        const bedtimeMoment = moment(bedtime.time, 'H:mm')
        const waketimeMoment = moment(waketime.time, 'H:mm')

        const nightStart = bedtimeMoment.add(
            bedtime.sound.onoffset,
            'minutes'
        );
        const nightEnd = bedtimeMoment.add(
            bedtime.sound.offoffset,
            'minutes'
        );
        const wakeStart = waketimeMoment.add(
            waketime.sound.onoffset,
            'minutes'
        );
        const wakeEnd = waketimeMoment.add(
            waketime.sound.offoffset,
            'minutes'
        );

        const isNightSoundOn =
            _moment.isSameOrAfter(nightStart) && _moment.isBefore(nightEnd);
        const isWakeSoundOn =
            _moment.isSameOrAfter(wakeStart) && _moment.isBefore(wakeEnd);

        const sound = {
            night: isNightSoundOn,
            wake: isWakeSoundOn
        }

        const volume = {
            night: bedtime.sound.onpayload.max_volume,
            wake: bedtime.sound.onpayload.max_volume,
        }

        const audio = {
            night: bedtime.sound.onpayload.audio_file,
            wake: bedtime.sound.onpayload.audio_file,
        }

        const nightSoundSchedule = {
            start: nightStart,
            end: nightEnd
        }

        const wakeSoundSchedule = {
            start: wakeStart,
            end: wakeEnd
        }

        const sample = {
            playing: false,
            audio: null
        }

        const newState = {
            sound, volume, audio, nightSoundSchedule, wakeSoundSchedule, sample
        };

        soundsState.dispatch(setState(newState));
    };

    const isBedtime = () =>
        moment().isSameOrAfter(bedtimeStart) && moment().isSameOrBefore(wakeUpTime);

    const [accordions, setAccordions] = useState([false, false]);
    const [sliderOpen, setSliderOpen] = useState([false, false]);
    const [activeSong, setActiveSong] = useState(0);

    const toggleAccordion = (index: number) => {
        if (!accordions[index]) {
            const newArr = new Array(accordions.length).fill(false);
            newArr[index] = !accordions[index];
            setAccordions(newArr);
            setSliderOpen(new Array(sliderOpen.length).fill(false));
        }
    };

    const closeAccordion = (index: number) => {
        const newArr = new Array(accordions.length).fill(false);
        newArr[index] = !accordions[index];
        setAccordions(newArr);
        setSliderOpen(new Array(sliderOpen.length).fill(false));
    };

    const sliderOpenSlider = (index: number) => {
        if (!sliderOpen[index]) {
            const newArr = new Array(sliderOpen.length).fill(false);
            newArr[index] = !sliderOpen[index];
            setSliderOpen(newArr);
        }
    };

    const closeSlider = (index: number) => {
        const newArr = new Array(sliderOpen.length).fill(false);
        newArr[index] = !sliderOpen[index];
        setSliderOpen(newArr);
    };

    const chooseSong = (index: number) => {
        if (activeSong !== index) {
            setActiveSong(index);
        }
    };

    useEffect(() => {
        const bedtimeCheckHandler = () => {
            const bedtime = isBedtime()
            const bedtimeHasStarted = bedtimeStarted()

            if (!started && bedtime)
                bedtimeState.dispatch(bedtimeHasStarted);
        }

        const interval = setInterval(bedtimeCheckHandler, 1000);

        getState();

        return () => {
            clearInterval(interval);
        }
    }, []);

    const componentsHandler = (component: string, index: number) => (
        <SoundAccordion
            component={component}
            index={index}
            accordionOpen={accordions[index]}
            openAccordion={() => toggleAccordion(index)}
            closeSlider={() => closeSlider(index)}
            sliderOpen={sliderOpen[index]}
            closeAccordion={() => closeAccordion(index)}
            openSlider={() => sliderOpenSlider(index)}
            activeSong={activeSong}
            chooseSong={chooseSong}
        />
    )

    console.log("Content Audio Type:", audioTypes)

    return (
        <IonContent style={_styles.fullHeight}>
            <IonGrid style={_styles.innerGrid}>
                <TimeBar />

                <IonGrid style={_styles.accordions}>
                    {
                        audioTypes
                        && Object.keys(audioTypes).map(componentsHandler)
                    }
                </IonGrid>
            </IonGrid>
        </IonContent>
    )
}

export default Content
