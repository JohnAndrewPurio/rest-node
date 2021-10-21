
import Clock from "../Clock"
import "./styles.css"

const Numbers: React.FC = () => {

    const positions = [
        {
            top: 0,
            margin: "0 auto"
        },
        {
            right: "15%",
            top: "15%",
            margin: "auto"
        },
        {
            right: "1ch",
            margin: "auto 0"
        },
        {
            right: "15%",
            bottom: "15%",
            margin: "auto"
        },
        {
            bottom: 0,
            margin: "0 auto"
        },
        {
            left: "14%",
            bottom: "14%",
            margin: "auto"
        },
        {
            left: 0,
            margin: "auto 0"
        },
        {
            left: "14%",
            top: "14%",
            margin: "auto"
        }
    ]

    const time = [24, 3, 6, 9, 12, 15, 18, 21]

    return (
        <div className="numberContainer">
            {time.map((number, i) => <div key={`number${number}`} className="number" style={positions[i]}>{number}</div>)}
            <Clock />
        </div>
    )
}

export default Numbers
