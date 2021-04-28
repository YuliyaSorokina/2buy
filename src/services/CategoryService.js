export default class CategoryService {
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

    getCategories = async (id) => {
        const res = await this.getResource(`/api/v1/category/${id}`);
        return res.map(this._transformCategory);
    }

    _transformCategory = (category) => {
        return {
            id: category.id,
            name:category.name
        }
    }
}