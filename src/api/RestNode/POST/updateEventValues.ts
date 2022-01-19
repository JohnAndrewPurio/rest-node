import axios from 'axios';
import { RestNodeStateType } from '../../../types';
import { storageSet } from '../../CapacitorStorage';
import { REST_NODE_STATES_KEY } from '../../CapacitorStorage/keys';

export type updateValuesType = (
  url: string,
  protocol: string,
  data: RestNodeStateType
) => Promise<RestNodeStateType>;

export const updateValues: updateValuesType = async (url, protocol, data) => {
  const URL = `${protocol}://${url}/restnode/event`;

  await axios.post(URL, data.bedtime);
  await axios.post(URL, data.waketime);
  await storageSet(JSON.stringify(data), REST_NODE_STATES_KEY);

  return data;
};
