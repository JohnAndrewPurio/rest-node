import { IonAlert } from '@ionic/react';
import { useContext } from 'react';
import PermissionAlertContext from '../../../../contextStore/NetworkContext/permissionAlert';

const PermissionAlert = () => {
  const [showPermissionAlert, setShowPermissionAlert] = useContext(
    PermissionAlertContext
  );
  const header =
    'On Android versions 8.0 and above, the GPS or location service is required to scan nearby networks';

  const dismissAlert = () => {
    if (setShowPermissionAlert) setShowPermissionAlert(false);
  };

  const okayButton = {
    text: 'Okay',
    role: 'cancel',
    cssClass: 'secondary',
    handler: dismissAlert,
  };

  return (
    <IonAlert
      isOpen={showPermissionAlert}
      header={header}
      onDidDismiss={dismissAlert}
      buttons={[okayButton]}
    />
  );
};

export default PermissionAlert;
