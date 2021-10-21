
import { IonGrid } from "@ionic/react";
import { useEffect, useRef, useState } from "react";
import Circle from "./Circle"
import Numbers from "./Numbers"
import "./styles.css"

const MainClock: React.FC = () => {

    const space = 30;
    const ref = useRef<HTMLDivElement>(null)
    const [biggest, setBiggest] = useState(200)

    useEffect(() => {
        setTimeout(() => {
            if (ref.current?.offsetWidth) {
                setBiggest(ref.current.offsetWidth*.75)
            }
        }, 1000)
    }, [])

    const circles = [
        {
            size: 0,
            color: "#2dd36f",
            percentage: 20,
            placement: 0
        },
        {
            size: 0,
            color: "#71964b",
            percentage: 50,
            placement: 90,
        },
        {
            size: 0,
            color: "#406916",
            percentage: 80,
            placement: 180
        },
        {
            size: 0,
            color: "#e0ac08",
            percentage: 10,
            placement: 270
        },
        {
            size: 0,
            color: "#eb445a",
            percentage: 35,
            placement: 70
        }
    ]

    circles.forEach((circle, index) => {
        circle.size = biggest - (space * index)
    })

    return (
        <div ref={ref} className="container">
            <Numbers />
            {circles.map((circle, i) => 
                <Circle key={`circle${i}`} size={circle.size} color={circle.color} percentage={circle.percentage} placement={circle.placement}/>
            )}
        </div>
    )
}

export default MainClock
