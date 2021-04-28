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

    getAllCategories = async () => {
        const res = await this.getResource('/api/v1/category/');
        return res.map(this._transformCategory);
    }


    getCategoryById = async (id) => {
        const res = await this.getResource('/api/v1/category');
        const transformRes = res.map(this._transformCategory);
        const ind = transformRes.findIndex(elem => elem.id === id);
        return transformRes[ind];
    }

    _transformCategory = (category) => {
        return {
            id: category.id,
            name:category.name,
            childCategories: category.childCategories
        }
    }
}