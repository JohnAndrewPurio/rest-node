import { useEffect, useState, Dispatch, SetStateAction, FC } from 'react';
import { IonHeader, IonPage, IonText } from '@ionic/react';
import { ServiceDiscovery } from '@ionic-native/service-discovery';
import { xml2js } from 'xml-js';
import { Zeroconf, ZeroconfOriginal } from '@ionic-native/zeroconf';

const url = 'http://raspberrypi.local/restnode/test';

const Network: FC = () => {
  const [message, setMessage] = useState<string>('Failed!');

  const getRequest = async (
    url: string,
    storeResponse: Dispatch<SetStateAction<string>>
  ) => {
    try {
      const response = await fetch(url);
      const { test } = await response.json();

      storeResponse(test);
    } catch (error) {
      storeResponse((error as Error).message);
    }
  };

  const discoverService = async (
    storeResponse: Dispatch<SetStateAction<string>>
  ) => {
    const serviceType = 'zeroconf:_http._tcp';
    try {
      const services = await ServiceDiscovery.getNetworkServices(serviceType);
      const str_services = JSON.stringify(services);

      interface Service {
        xml: string;
      }

      services.forEach((service: Service) => {
        console.log(xml2js(service.xml));
      });

      console.log('Services:', services);

      // storeResponse(str_services)
    } catch (error) {
      // storeResponse((error as Error).message)
    }
  };

  const serviceListener = async (zeroconf: ZeroconfOriginal) => {
    zeroconf.registerAddressFamily = 'ipv4'; // or 'ipv6' ('any' by default)
    zeroconf.watchAddressFamily = 'ipv4'; // or 'ipv6' ('any' by default)

    const watcher = zeroconf.watch('_http._tcp.', 'local.');

    watcher.subscribe(({ action, service }) => {
      if (action === 'resolved') console.log(service);
    });
  };

  useEffect(() => {
    // getRequest(url, setMessage)
    serviceListener(Zeroconf);
    discoverService(setMessage);
  }, []);

  return (
    <IonPage
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <IonHeader>
        <IonText
          style={{
            color: 'white',
            overflowY: 'auto',
          }}
        >
          Network
        </IonText>
      </IonHeader>
    </IonPage>
  );
};

export default Network;
