import {any} from "prop-types";

class FetchService {
    constructor() {
        this._apiBase = '/api/v1';
    }

    handleFetch = async (url, settings = {headers: any}) => {
        const token = localStorage.getItem("token");
        if (token !== null) {
            settings.headers = {
                ...settings.headers,
                Authorization: `Bearer ${token}`
            }
        }
        const res = await fetch(`${this._apiBase}${url}`, settings);
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
        return await res.json();
    }
}

export default new FetchService();
