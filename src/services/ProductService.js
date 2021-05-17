export default class ProductService{

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

    getProduct = async (id) => {
        const res = await this.getResource(`/api/v1/product/${id}`);
        return res;
    }


}