import { positions } from './constants.json';
import _styles from '../styles';

const Triangles: React.FC = () => (
    <div style={_styles.trianglesContainer}>
        {positions.map((triangle, i) => (
            <div
                key={`triangle${i}`}
                style={{ ...triangle, ..._styles.triangle }}
            />
        ))}
    </div>
);

export default Triangles;
