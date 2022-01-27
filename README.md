# Rest Node

## Screens

-   [2022-01-21 Screens](https://marvelapp.com/prototype/hfjji77/screens)

## Diagrams

-   [Some context and routing diagram](https://tinyurl.com/ja5kyzbt)

## Deployment dependencies

-   Xcode 12.x
-   OS X 11 or above
-   node 12+
-   Android sdk (set **ANDROID_HOME** environment value)
-   pod https://cocoapods.org/
-   @ionic/cli

## Build And Run

```sh
npm install
npm run lint:fix
```

### Android

-   to run on simulator, run `ionic cap run android`
-   to run on real device
    -   plugin your device and enable usb debugging on your phone
    -   run `ionic cap run android` on terminal

### iOS

-   to run on simulator
    -   run `ionic cap open ios`
    -   select a simulator from the top drop down list
    -   press the play button on top left
-   to run on physical device
    -   make sure you are added as developer in the Exist Tech apple developer account
    -   run `ionic cap open ios`
    -   Select the target `App`, navigate to `Signing & Capabilities`
    -   enable signing to Automatically manage signing && choose Exist Tech as team
    -   press the play button on top left

If errors encountered in building iOS:

**Error:**

```sh
No known instance method for selector 'userAgent'
```

Click the error and remove line 107 to 110

```sh
NSString* userAgent = [self.commandDelegate userAgent];
if (userAgent) {
    [req setValue:userAgent forHTTPHeaderField:@"User-Agent"];
}
```

**Error:**

```sh
'Firebase/Firebase.h' file not found
```

Change line 5 to

```
#import <FirebaseCore/FirebaseCore.h>
```

### Web (for debugging)

    - run `ionic serve`

### After installing new package

    - run `ionic cap sync`

### After editing code

    - run `ionic cap copy ios` before run on iOS

### Building APK

    - run `ionic cap open android`
    - click `Build` in the top navigation and choose `Build APK(s)`
    - apk is located in `./android/app/build/outputs/apk/app-debug.apk`

_p.s. please edit and update installation guide if needed_
