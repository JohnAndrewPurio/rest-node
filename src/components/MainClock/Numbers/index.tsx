
import Triangles from "../Triangles"
import "./styles.css"
import { positions, time } from "./constants.json"


const Numbers: React.FC = () => {

    return (
        <div className="number-container">
            {time.map((number, i) => <div key={`number${number}`} className="number" style={positions[i]}>{number}</div>)}
            <Triangles />
        </div>
    )
}

export default Numbers
