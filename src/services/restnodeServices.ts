

import { BASE_URL } from "./api";
import { Storage } from "@capacitor/storage"

export class RestnodeService {

    static getLastValues(): Promise<any> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve('meow')
            }, 3000)
            // let URL = `${BASE_URL}/lastValue`;
            // fetch(URL)
            //     .then((res) => {
            //         // Storage.set({ key: 'values', value: JSON.stringify(res) }).then(() => resolve(res))
            //         console.log('reess', res)
            //         resolve(res)
            //     })
            //     .catch((err) => {
            //         console.log('errror')
            //         reject(err);
            //     });
        });
    }

}
