import './styles.css';
import { positions } from './constants.json';

const Triangles: React.FC = () => {
  return (
    <div className="grid">
      {positions.map((triangle, i) => (
        <div key={`triangle${i}`} style={triangle} className="triangle" />
      ))}
    </div>
  );
};

export default Triangles;
