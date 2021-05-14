export default class FieldsProductService {
    constructor() {
        this._apiBase = 'http://192.168.3.9:8080';
    }

    getResource = async (url) => {
        const res = await fetch(`${this._apiBase}${url}`);
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
        return await res.json();
    }


    getManufacturers = async () =>{
        const res = await this.getResource(`/api/v1/misc/manufacturer`);
        return res;
    }
}