
import { useEffect, useState } from "react"
import "./styles.css"
import moment from "moment"

interface Props {
    size: number,
    circle: number
}

const Clock: React.FC<Props> = ({ size, circle }) => {

    const [time, setTime] = useState(moment().format("HH:mm"))
    const [tilt, setTilt] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(moment().format("HH:mm"))
        }, 1000)
        return () => clearInterval(interval)
    }, [])

    useEffect(() => {
        const minute = Number(moment().minute()) / 60
        const hour = (Number(moment().hour()) + minute) / 24
        setTilt(360*hour)
    }, [time])

    const _style = {
        container: {
            height: size,
            width: size,
            fontSize: `${size/4.5}px`
        },
        hand: {
            height: circle,
            transform: `rotate(${tilt}deg)`
        }
    }

    return (
        <div className="clock-container" style={_style.container}>
            <div className="clock-time">
                {time}
            </div>
            <div className="clock-hand" style={_style.hand}></div>
        </div>
    )
}

export default Clock
