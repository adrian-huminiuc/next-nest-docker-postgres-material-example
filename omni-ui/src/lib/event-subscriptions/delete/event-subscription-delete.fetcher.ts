import {API_URL} from "@/lib/constants";

export const EventSubscriptionDeleteFetcher = async ([k, uuid]: [k: unknown, uuid: string]) => {
    const res = await fetch(`${API_URL}/event-subscriptions/${uuid}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json, text/plain, */*'
            },
            credentials: 'include'
        }
    );
    return await res.json();
}