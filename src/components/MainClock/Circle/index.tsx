
import Progress from "../Progress"
import "./styles.css"
import { strokeWidth } from "./constants.json"

interface Props {
    size: number,
    color: string,
    percentage: number,
    placement: number
}

const Circle: React.FC<Props> = ({ size, color, percentage, placement }) => {

    const sqSize = size;
    const radius = (sqSize - strokeWidth) / 2;
    const viewBox = `0 0 ${sqSize} ${sqSize}`;

    return (
        <svg
            width={sqSize}
            height={sqSize}
            viewBox={viewBox}>
            <circle
                className="circle-background"
                cx={sqSize / 2}
                cy={sqSize / 2}
                r={radius}
                strokeWidth={`${strokeWidth}px`} />
            <Progress size={size} color={color} percentage={percentage} placement={placement} strokeWidth={strokeWidth} />
        </svg>
    )
}

export default Circle
