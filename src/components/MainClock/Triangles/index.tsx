
import "./styles.css"

const Triangles: React.FC = () => {

    const positions = [
        {
            top: 0,
            margin: "0 auto"
        },
        {
            right: "14%",
            top: "14%",
            margin: "auto"
        },
        {
            right: 0,
            margin: "auto 0"
        },
        {
            right: "14%",
            bottom: "14%",
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

    type rotationType = {
        transform: string
    }
    const rotation: rotationType[] = []

    positions.forEach((el, i) => rotation.push({ transform: `rotate(${i * 45}deg)` }))

    return (
        <div className="grid">
            {positions.map((triangle, i) => <div key={`triangle${i}`} style={{ ...triangle, ...rotation[i] }} className="triangle"></div>)}
        </div>
    )
}

export default Triangles
