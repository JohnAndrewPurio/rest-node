import { Storage } from '@capacitor/storage';
import axios from 'axios';
import { BASE_URL, storage } from './constants';
import { RestNodeStateType } from '../types';

export class RestnodeService {
  static async getLastValues(): Promise<RestNodeStateType> {
    const bedtimeURL = `${BASE_URL}/restnode/event/bedtime`;
    const waketimeURL = `${BASE_URL}/restnode/event/waketime`;

    const bedtimeResponse = await axios.get(bedtimeURL);
    const waketimeResponse = await axios.get(waketimeURL);
    const bedtime = bedtimeResponse.data;
    const waketime = waketimeResponse.data;
    await Storage.set({
      key: storage.RED_NODE_STATES,
      value: JSON.stringify({ bedtime, waketime }),
    });
    return { bedtime, waketime };

    // const { value } = await Storage.get({key: storage.RED_NODE_STATES})
    // if (value) {
    //     return JSON.parse(value)
    // }
  }

  static async updateValues(
    data: RestNodeStateType
  ): Promise<RestNodeStateType> {
    const URL = `${BASE_URL}/restnode/event`;
    await axios.post(URL, data.bedtime);
    await axios.post(URL, data.waketime);
    await Storage.set({
      key: storage.RED_NODE_STATES,
      value: JSON.stringify(data),
    });
    return data;
  }
}
