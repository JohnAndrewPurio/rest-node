import Circle from './Circle';
import Clock from './Clock';
import Numbers from './Numbers';
import { circleSpacing } from './constants.json';
import { useEffect, useState } from 'react';
import { ClockArcs, StringKeyedObject } from '../../types';
import { Storage } from '@capacitor/storage';
import { storage } from '../../services/constants';
import {
  getBedtimeArcs,
  getLightArcs,
  getRelaxationArcs,
  getSoundsArcs,
} from './helper';

import './styles.css';

interface Props {
  biggest: number;
}

const MainClock: React.FC<Props> = ({ biggest }) => {
  const initialArcs = {
    bedtime: [],
    lights: [],
    sounds: [],
    relaxation: [],
  };

  const [arcs, setArcs] = useState<ClockArcs>(initialArcs);

  const configureArcs = () => {
    Storage.get({ key: storage.RED_NODE_STATES }).then((res) => {
      if (!res.value)
        return

      const states = JSON.parse(res.value);
      const clockArcs: ClockArcs = {
        bedtime: getBedtimeArcs(states),
        lights: getLightArcs(states),
        sounds: getSoundsArcs(states),
        relaxation: getRelaxationArcs(states),
      };

      setArcs(clockArcs);
    });
  };

  useEffect(() => {
    configureArcs();
  }, []);

  const keys = ['bedtime', 'sounds', 'lights', 'relaxation'];
  const colors: StringKeyedObject = {
    bedtime: '#2dd36f',
    sounds: '#71964b',
    relaxation: '#e0ac08',
    lights: '#eb445a',
  };

  const sizes = new Array(keys.length).fill(0);

  for (let index = 0; index < sizes.length; index++) {
    sizes[index] = biggest - circleSpacing * index;
  }

  return (
    <>
      <Numbers />
      {keys.map((key, i) => (
        <Circle
          key={keys[i]}
          size={sizes[i]}
          color={colors[key]}
          arcs={arcs[key]}
        />
      ))}
      <Clock
        size={sizes[keys.length - 1] - circleSpacing}
        circle={biggest / 2}
      />
    </>
  );
};

export default MainClock;
