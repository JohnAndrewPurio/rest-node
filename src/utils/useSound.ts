import { Media } from '@ionic-native/media';
import { File } from '@ionic-native/file';
import { isPlatform } from '@ionic/core';

export const useSound = (name: string) => {
    const isIos = isPlatform('ios');
    const isDesktop = isPlatform('desktop');

    let path;
    // File.applicationDirectory is null when on desktop
    if (isIos) {
        const iOSPath = `${File.applicationDirectory.replace(
            /^file:\/\//,
            ''
        )}public/assets/audio/${name}.mp3`;
        path = iOSPath;
    } else if (isDesktop) {
        path = `/assets/audio/${name}.mp3`;
    } else {
        const androidPath = `${File.applicationDirectory}public/assets/audio/${name}.mp3`;
        path = androidPath;
    }

    const sound = Media.create(path);
    sound.onStatusUpdate.subscribe(status => {
        if (status === 4) sound.release();
    });

    return { sound };
};
