import axios from "axios";
import { RestNodeStateType } from "../../../types";
import { storageSet } from "../../CapacitorStorage";
import { REST_NODE_STATES_KEY } from "../../CapacitorStorage/keys";
import { BASE_URL } from "../../BASE_URL";

export type getLastValuesType = (
    url: string,
    protocol?: string
) => Promise<RestNodeStateType>;

export const getLastValues: getLastValuesType = async (
    url = BASE_URL,
    protocol = 'https'
) => {
    const bedtimeURL = `${protocol}://${url}/restnode/event/bedtime`;
    const waketimeURL = `${protocol}://${url}/restnode/event/waketime`;

    const bedtimeResponse = await axios.get(bedtimeURL);
    const waketimeResponse = await axios.get(waketimeURL);

    const bedtime = bedtimeResponse.data;
    const waketime = waketimeResponse.data;

    await storageSet(
        JSON.stringify({ bedtime, waketime }),
        REST_NODE_STATES_KEY
    );

    return { bedtime, waketime };
};