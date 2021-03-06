import {
    IonButton,
    IonGrid,
    IonInput,
    IonItem,
    IonLabel,
    IonList,
    IonRow,
} from '@ionic/react';
import { FormEvent } from 'react';
import './styles.css';

function EmailAccountSignup() {
    const submitHandler = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const entries = Object.fromEntries(formData.entries());

        // !!Replace this with the EmailAndPassword signup handler
        console.log(entries);
    };

    return (
        <form onSubmit={submitHandler} id="email-account-signup">
            <IonList id="email-forms-list" inset>
                <IonItem>
                    <IonLabel color="primary">Name</IonLabel>
                    <IonInput
                        type="text"
                        placeholder="Enter Name"
                        name="name"
                        required
                    />
                </IonItem>

                <IonItem>
                    <IonLabel color="primary">Email</IonLabel>
                    <IonInput
                        type="email"
                        placeholder="Enter Email"
                        name="email"
                        required
                    />
                </IonItem>

                <IonItem>
                    <IonLabel color="primary">Password</IonLabel>
                    <IonInput
                        type="password"
                        placeholder="Enter Pasword"
                        name="password"
                        required
                    />
                </IonItem>
            </IonList>
            <IonGrid>
                <IonRow className="ion-justify-content-center">
                    <IonButton type="submit" color="primary">
                        Sign Up
                    </IonButton>
                </IonRow>
            </IonGrid>
        </form>
    );
}

export default EmailAccountSignup;
