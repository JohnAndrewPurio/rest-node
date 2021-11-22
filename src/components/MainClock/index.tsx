import { useEffect, useState } from 'react';
import { Storage } from '@capacitor/storage';
import { useIonViewDidEnter } from '@ionic/react';
import Circle from './Circle';
import Clock from './Clock';
import Numbers from './Numbers';
import { circleSpacing, initialArcs } from './constants.json';
import { ClockArcs, StringKeyedObject } from '../../types';
import { storage } from '../../services/constants';
import {
  getBedtimeArcs,
  getLightArcs,
  getRelaxationArcs,
  getSoundsArcs,
} from './helper';

interface Props {
  biggest: number;
}

const MainClock: React.FC<Props> = ({ biggest }) => {
  const [arcs, setArcs] = useState<ClockArcs>(initialArcs);

  // calculate arcs based on current states
  const configureArcs = () => {
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
  };

  useEffect(() => {
    configureArcs();
  }, []);

  useIonViewDidEnter(() => configureArcs());

  const circles: StringKeyedObject = {
    bedtime: {
      id: 'bedtime',
      color: '#2dd36f',
      arcs: arcs.bedtime,
      size: biggest - circleSpacing * 0, // sizes of circles are getting smaller
    },
    sounds: {
      id: 'sounds',
      color: '#71964b',
      arcs: arcs.sounds,
      size: biggest - circleSpacing * 1,
    },
    lights: {
      id: 'lights',
      color: '#eb445a',
      arcs: arcs.lights,
      size: biggest - circleSpacing * 2,
    },
    relaxation: {
      id: 'relaxation',
      color: '#e0ac08',
      arcs: arcs.relaxation,
      size: biggest - circleSpacing * 3,
    },
  };

  return (
    <>
      <Numbers />
      {Object.values(circles).map((circle) => (
        <Circle
          key={circle.id}
          size={circle.size}
          color={circle.color}
          arcs={circle.arcs}
        />
      ))}
      <Clock
        size={circles.relaxation.size - circleSpacing}
        circle={biggest / 2}
      />
    </>
  );
};

export default MainClock;
