
// template, not working

import { File } from '@ionic-native/file';
import { FileTransfer } from '@ionic-native/file-transfer'

export const downloadAudio = (name: string) => {
    const fileTransfer = FileTransfer.create()
    const url = 'http://www.example.com/file.pdf';
    fileTransfer.download(url, File.applicationDirectory + `public/assets/audio/${name}.mp3`).then((entry) => {
        console.log('download complete: ' + entry.toURL());
    }, (error) => {
        // handle error
        // throw error
    });
}