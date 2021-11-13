import Circle from './Circle';
import Clock from './Clock';
import Numbers from './Numbers';
import './styles.css';
import { circleSpacing } from './constants.json';
import { useContext, useEffect, useState } from 'react';
import { ClockArcs } from '../../types';
import { Storage } from '@capacitor/storage';
import { storage } from '../../services/constants';
import {
  getBedtimeArcs,
  getLightArcs,
  getRelaxationArcs,
  getSoundsArcs,
} from './helper';
import BedTimeContext from '../../contextStore/BedTimeContext/bedtimeContext';

interface Props {
  biggest: number;
}

const MainClock: React.FC<Props> = ({ biggest }) => {
  const circles = [
    {
      size: 0,
      color: '#2dd36f',
      percentage: 20,
      placement: 0,
    },
    {
      size: 0,
      color: '#71964b',
      percentage: 50,
      placement: 90,
    },
    {
      size: 0,
      color: '#406916',
      percentage: 80,
      placement: 180,
    },
    {
      size: 0,
      color: '#e0ac08',
      percentage: 10,
      placement: 270,
    },
    {
      size: 0,
      color: '#eb445a',
      percentage: 35,
      placement: 90,
    },
  ];

  circles.forEach((circle, index) => {
    circle.size = biggest - circleSpacing * index;
  });

  const initialArcs = {
    bedtime: [],
    lights: [],
    sounds: [],
    relaxation: [],
  };

  const { state } = useContext(BedTimeContext);
  const [arcs, setArcs] = useState<ClockArcs>(initialArcs);

  useEffect(() => {
    Storage.get({ key: storage.RED_NODE_STATES }).then((res) => {
      if (res.value) {
        const states = JSON.parse(res.value);
        const clockArcs: ClockArcs = {
          bedtime: getBedtimeArcs(states),
          lights: getLightArcs(states),
          sounds: getSoundsArcs(states),
          relaxation: getRelaxationArcs(states),
        };
        setArcs(clockArcs);
      }
    });
  }, [state]);

  return (
    <>
      <Numbers />
      {circles.map((circle, i) => (
        <Circle
          key={`circle${i}`}
          size={circle.size}
          color={circle.color}
          percentage={circle.percentage}
          placement={circle.placement}
        />
      ))}
      <Clock
        size={circles[circles.length - 1].size - circleSpacing}
        circle={biggest / 2}
      />
    </>
  );
};

export default MainClock;
