import Progress from '../Progress';
import { strokeWidth } from './constants.json';
import { TimeArc } from '../../../types';

import styles from "../styles.module.css"

interface Props {
  size: number;
  color: string;
  arcs: TimeArc[];
}

const Circle: React.FC<Props> = ({ size, color, arcs }) => {
  // method source: https://codepen.io/juhaelee/pen/GxymWP

  const sqSize = size;
  const radius = (sqSize - strokeWidth) / 2;
  const viewBox = `0 0 ${sqSize} ${sqSize}`;

  return (
    <svg
      width={sqSize}
      height={sqSize}
      viewBox={viewBox}
      className={styles.circleSVG}
    >
      <circle
        className={styles.circleBackground}
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
