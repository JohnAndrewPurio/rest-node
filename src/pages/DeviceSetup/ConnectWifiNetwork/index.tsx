import { FC } from 'react';
import { IonRow } from '@ionic/react';
import NetworkContext from '../../../contextStore/NetworkContext';
import WifiList from './WifiList';

interface Props {
  nextStep: () => void;
}

const ConnectWifiNetwork: FC<Props> = ({ nextStep }) => {
  return (
    <NetworkContext>
      <IonRow className="ion-justify-content-center">
        <WifiList />
      </IonRow>
    </NetworkContext>
  );
};

export default ConnectWifiNetwork;
