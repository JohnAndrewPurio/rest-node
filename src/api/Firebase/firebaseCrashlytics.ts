import {
    FirebaseCrashlytics,
    FirebaseCrashlyticsOriginal,
} from '@awesome-cordova-plugins/firebase-crashlytics';

export const crashlytics: FirebaseCrashlyticsOriginal =
    FirebaseCrashlytics.initialise();
