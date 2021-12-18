import { Dispatch, SetStateAction } from 'react';
import { ZeroconfOriginal, ZeroconfResult } from '@ionic-native/zeroconf';

export const serviceListener = async (
  zeroconf: ZeroconfOriginal,
  setAddress: Dispatch<SetStateAction<string>>
) => {
  zeroconf.registerAddressFamily = 'ipv4'; // or 'ipv6' ('any' by default)
  zeroconf.watchAddressFamily = 'ipv4'; // or 'ipv6' ('any' by default)

  const watcher = zeroconf.watch('_http._tcp.', 'local.');

  const subscriptionHandler: (value: ZeroconfResult) => void = ({
    action,
    service,
  }) => {
    const { txtRecord, ipv4Addresses } = service;
    const address = ipv4Addresses[0];

    if (action !== 'resolved') return;

    if (!txtRecord['Rest Node by Exist Tribe']) return;

    if (!address) return;

    console.log(address, "ADDDREESSS")
    setAddress(address);
  };

  watcher.subscribe(subscriptionHandler);
};
