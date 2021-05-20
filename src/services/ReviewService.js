export default class ReviewService{
    constructor() {
        this._apiBase = 'http://192.168.3.9:8080';
    }

    postResource = async (url, item) => {
        const res = await fetch(`${this._apiBase}${url}`, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(item)
        });
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
        return await res.json();
    }

    getResource = async (url) => {
        const res = await fetch(`${this._apiBase}${url}`);
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
        return await res.json();
    }

    submitProductReview = async (item) => {
        return await this.postResource(`/api/v1/review`, item);
    }

    getReviewsByCategory = async (categoryId) => {
        return await this.getResource(`/api/v1/review?categoryId=${categoryId}`);
    }

    getReviewByBarcode = async (barcode) => {
        return await this.getResource(`/api/v1/review/${barcode}`);
    }
    getReviewsByName = async (name) => {
        return await this.getResource(`/api/v1/review?name=${name}`);
    }
}