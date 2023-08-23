import {API_URL} from "@/lib/constants";
import baseGetRequestInit from "@/lib/http/base-get-request-init";

export const ProfileGetFetcher = ()=> fetch(`${API_URL}/profile`, baseGetRequestInit).then(res => res.json())