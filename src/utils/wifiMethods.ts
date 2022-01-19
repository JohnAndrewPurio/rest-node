import { WifiWizard2 } from '@ionic-native/wifi-wizard-2';

export const wifiScan = async () => {
  const delay = 2000; // delay of 2 seconds for more accurate scanning of available wifi

  try {
    await WifiWizard2.timeout(delay);

    const wifiAvailable = await WifiWizard2.scan();

    console.log('Wifi Scanned', wifiAvailable);

    return wifiAvailable;
  } catch (error) {
    throw error;
  }
};
