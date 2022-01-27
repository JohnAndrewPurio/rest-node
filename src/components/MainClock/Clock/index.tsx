import { useEffect, useState } from 'react';
import moment from 'moment';
import _styles from '../styles';

interface Props {
    size: number;
    circle: number;
}

const Clock: React.FC<Props> = ({ size, circle }) => {
    const [time, setTime] = useState(moment().format('HH:mm'));
    const [tilt, setTilt] = useState(0);

    // update time every second
    useEffect(() => {
        const interval = setInterval(() => {
            setTime(moment().format('HH:mm'));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    // style based on current time
    const position = {
        container: {
            height: size,
            width: size,
            fontSize: `${size / 4.5}px`,
        },
        hand: {
            height: circle,
            transform: `rotate(${tilt}deg)`,
        },
    };

    // recalculate style every time change
    useEffect(() => {
        const minute = Number(moment().minute()) / 60;
        const hour = (Number(moment().hour()) + minute) / 24;
        setTilt(360 * hour);
    }, [time]);

    return (
        <div style={{ ...position.container, ..._styles.clockContainer }}>
            <div style={_styles.clockTime}>{time}</div>
            <div style={{ ...position.hand, ..._styles.clockHand }} />
        </div>
    );
};

export default Clock;
