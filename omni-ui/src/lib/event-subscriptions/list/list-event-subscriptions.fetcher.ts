import {API_URL} from "@/lib/constants";
import baseGetRequestInit from "@/lib/http/base-get-request-init";


export const ListEventSubscriptionsFetcher = async ([key, pagination, filters]: [string, ...Record<string, any>[]])=> {
    const query = new URLSearchParams();
    Object.keys(pagination).forEach(key => query.append(key, pagination[key]));
    Object.keys(filters).forEach(key => query.append(key, filters[key]));

    return fetch(`${API_URL}/event-subscriptions?${query.toString()}`, baseGetRequestInit).then(res => res.json()).catch(r => r)
}