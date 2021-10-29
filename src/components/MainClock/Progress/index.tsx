import './styles.css';

interface Props {
  size: number;
  color: string;
  percentage: number;
  placement: number;
  strokeWidth: number;
}

const Progress: React.FC<Props> = ({
  size,
  color,
  percentage,
  placement,
  strokeWidth,
}) => {
  const radius = (size - strokeWidth) / 2;
  const dashArray = radius * Math.PI * 2;
  const dashOffset = dashArray - (dashArray * percentage) / 100;

  return (
    <circle
      className="circle-progress"
      stroke={color}
      cx={size / 2}
      cy={size / 2}
      r={radius}
      strokeWidth={`${strokeWidth}px`}
      transform={`rotate(${placement} ${size / 2} ${size / 2})`}
      style={{
        strokeDasharray: dashArray,
        strokeDashoffset: dashOffset,
      }}
    />
  );
};

export default Progress;
