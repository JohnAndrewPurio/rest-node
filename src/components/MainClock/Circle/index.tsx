import Progress from '../Progress';
import './styles.css';
import { strokeWidth } from './constants.json';
import { TimeArc } from '../../../types';

interface Props {
  size: number;
  color: string;
  arcs: TimeArc[]
}

const Circle: React.FC<Props> = ({ size, color, arcs }) => {
  const sqSize = size;
  const radius = (sqSize - strokeWidth) / 2;
  const viewBox = `0 0 ${sqSize} ${sqSize}`;
  
  console.log(size, color, arcs)

  return (
    <svg width={sqSize} height={sqSize} viewBox={viewBox}>
      <circle
        className="circle-background"
        cx={sqSize / 2}
        cy={sqSize / 2}
        r={radius}
        strokeWidth={`${strokeWidth}px`}
      />
      {arcs.map((arc, i) => (
        <Progress
          key={`progress${i}${size}`}
          size={size}
          color={color}
          percentage={arc.percentage}
          placement={arc.placement}
          strokeWidth={strokeWidth}
        />
      ))}
    </svg>
  );
};

export default Circle;
