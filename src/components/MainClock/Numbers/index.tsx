import Triangles from '../Triangles';
import { positions, time } from './constants.json';
import _styles from '../styles';

const Numbers: React.FC = () => {
  return (
    <div style={_styles.numbersContainer}>
      {time.map((number, i) => (
        <div
          key={`number${number}`}
          style={{ ...positions[i], ..._styles.number }}
        >
          {number}
        </div>
      ))}
      <Triangles />
    </div>
  );
};

export default Numbers;
