import {API_URL} from "@/lib/constants";
import baseGetRequestInit from "@/lib/http/base-get-request-init";


export const ListEventsFetcher = async ([key, pagination]: [string, Record<string, any>])=> {
    const query = new URLSearchParams();
    Object.keys(pagination).forEach(key => query.append(key, pagination[key]));

    return fetch(`${API_URL}/events?${query.toString()}`, baseGetRequestInit).then(res => res.json()).catch(r => r)
}