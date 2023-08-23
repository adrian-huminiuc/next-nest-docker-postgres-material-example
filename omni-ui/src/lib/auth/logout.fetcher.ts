import {API_URL} from "@/lib/constants";

export const LogoutPostFetcher = ()=> fetch(`${API_URL}/logout`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*'
        },
        credentials: 'include'
    }
).then(res => res.json())