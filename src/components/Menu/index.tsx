import { menuController } from "@ionic/core";
import { IonAvatar, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonMenu, IonTitle, IonToolbar } from "@ionic/react"
import { addCircleOutline, arrowForwardCircleOutline, homeOutline, personCircleOutline } from "ionicons/icons";
import { useContext, useEffect, useState } from "react";
import { RouteComponentProps, withRouter } from "react-router";
import MenuContext from "../../contextStore/AppContext/menuContext";

const Menu: React.FC<RouteComponentProps> = ({ location }) => {

    const [swiper] = useContext(MenuContext)

    const _styles = {
        header: {
            margin: ".5em 0em",
            fontWeight: 700,
            fontSize: "1.1rem"
        },
        add: {
            fontSize: ".9rem",
            color: "var(--ion-color-primary)"
        }
    }

    const close = () => {
        menuController.close()
    }

    const paths = [
        {
            name: "Home",
            path: "/home",
            icon: homeOutline
        },
        {
            name: "Profile",
            path: "/profile",
            icon: personCircleOutline
        },
        {
            name: "Rest Node",
            path: "/restnode",
            icon: arrowForwardCircleOutline
        }
    ]

    const [active, setActive] = useState<string | null>(null)

    useEffect(() => {
        if (location.pathname.includes("home")) setActive("/home")
        else if (location.pathname.includes("restnode")) setActive("/restnode")
        else if (location.pathname.includes("profile")) setActive("/profile")
    }, [location.pathname])

    return (
        <IonMenu side="start" contentId="main" menuId="main" swipeGesture={swiper} >
            <IonHeader>
                <IonToolbar>
                    <IonItem lines="none" style={_styles.header}>
                        <IonAvatar slot="start">
                            <img src='/assets/splash-logo.png' />
                        </IonAvatar>
                        Exist Tribe
                    </IonItem>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonList>
                    {
                        paths.map((path) => (
                            <IonItem color={active === path.path ? "primary" : undefined} button onClick={close} routerLink={active === path.path ? undefined : path.path} detail={false}>
                                <IonIcon slot="start" icon={path.icon} style={{ margin: "0em .5em 0em 0em" }}></IonIcon>
                                {path.name}
                            </IonItem>
                        ))
                    }
                    <IonItem button style={_styles.add} detail={false}>
                        <IonIcon slot="end" color="primary" icon={addCircleOutline}></IonIcon>
                        Add new device
                    </IonItem>
                </IonList>
            </IonContent>
        </IonMenu>
    )
}

export default withRouter(Menu)