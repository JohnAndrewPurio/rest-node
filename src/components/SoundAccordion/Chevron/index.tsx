import { IonButton, IonCol, IonIcon } from "@ionic/react";
import { chevronUp } from "ionicons/icons";
import { _styles } from "./styles";

interface ChevronProps {
    index: number;
    onclick: (index: number) => void;
}

const Chevron: React.FC<ChevronProps> = ({ index, onclick }) => {
    return (
        <IonCol style={_styles.chevron}>
            <IonButton color="light" fill="clear" onClick={() => onclick(index)}>
                <IonIcon size="1.1rem" slot="icon-only" icon={chevronUp} />
            </IonButton>
        </IonCol>
    );
};

export default Chevron