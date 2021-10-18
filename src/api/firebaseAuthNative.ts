import { FirebaseAuthentication } from '@ionic-native/firebase-authentication'

export const getCurrentUser = async () => {
    const currentUser = await FirebaseAuthentication.getCurrentUser()

    return currentUser
}
