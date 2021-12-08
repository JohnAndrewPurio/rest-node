import { menuController } from '@ionic/core';
import {
  IonAvatar,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonList,
  IonMenu,
  IonToolbar,
} from '@ionic/react';
import {
  addCircleOutline,
  arrowForwardCircleOutline,
  homeOutline,
  personCircleOutline,
} from 'ionicons/icons';
import { FC, useContext, useEffect, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import MenuContext from '../../contextStore/AppContext/menuContext';

import { HOME, PROFILE, REST_NODE } from "../../pages/paths.json"
import _styles from './styles';

const paths = [
  {
    name: 'Home',
    path: HOME,
    icon: homeOutline,
  },
  {
    name: 'Profile',
    path: PROFILE,
    icon: personCircleOutline,
  },
  {
    name: 'Rest Node',
    path: REST_NODE,
    icon: arrowForwardCircleOutline,
  },
];

const Menu: FC<RouteComponentProps> = ({ location }) => {
  const [swiper] = useContext(MenuContext);
  const [active, setActive] = useState<string | null>(null);

  const selectPath = (pathname: string) => {
    if (pathname.includes('home'))
      return HOME

    if (pathname.includes('restnode'))
      return REST_NODE

    if (pathname.includes('profile'))
      return PROFILE

    return ""
  }

  const close = () => {
    menuController.close();
  };

  // set highlighted active path
  useEffect(() => {
    const path = selectPath(location.pathname)

    setActive(path)
  }, [location.pathname]);

  return (
    <IonMenu side="start" contentId="main" menuId="main" swipeGesture={swiper}>
      <IonHeader>
        <IonToolbar>
          <IonItem lines="none" style={_styles.header}>
            <IonAvatar slot="start">
              <img src="/assets/splash-logo.png" alt="Splash Logo"/>
            </IonAvatar>
            Exist Tribe
          </IonItem>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {paths.map((path) => (
            <IonItem
              key={path.path}
              color={active === path.path ? 'primary' : undefined}
              button
              onClick={close}
              routerLink={active === path.path ? undefined : path.path}
              detail={false}
            >
              <IonIcon
                slot="start"
                icon={path.icon}
                style={{ margin: '0em .5em 0em 0em' }}
              />
              {path.name}
            </IonItem>
          ))}
          <IonItem button style={_styles.add} detail={false}>
            <IonIcon slot="end" color="primary" icon={addCircleOutline} />
            Add new device
          </IonItem>
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default withRouter(Menu);
