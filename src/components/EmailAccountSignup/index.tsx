import { IonInput, IonLabel, IonList, IonItem, IonItemDivider, IonButton } from "@ionic/react"
import { FormEvent } from "react"
import './styles.css'

const EmailAccountSignup = () => {
    const submitHandler = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const entries = Object.fromEntries(formData.entries())

        console.log(entries)
    }

    return (
        <form onSubmit={submitHandler} id="email-account-signup">
            <IonList>
                <IonItem>
                    <IonLabel color="primary">Name</IonLabel>
                    <IonInput type="text" placeholder="Enter Name" name="name" required/>
                </IonItem>
                <IonItemDivider />

                <IonItem>
                    <IonLabel color="primary">Email</IonLabel>
                    <IonInput type="email" placeholder="Enter Email" name="email" required/>
                </IonItem>
                <IonItemDivider />

                <IonItem>
                    <IonLabel color="primary">Password</IonLabel>
                    <IonInput type="password" placeholder="Enter Pasword" name="password" required/>
                </IonItem>
                <IonItemDivider />

                <IonItem>
                    <IonButton type="submit">Submit</IonButton>
                </IonItem>
            </IonList>
        </form>
    )
}

export default EmailAccountSignup
