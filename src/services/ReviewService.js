import FetchService from "./FetchService";

class ReviewService{

    submitProductReview = async (item) => {
        return await FetchService.handleFetch(`/review`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                },
            body: JSON.stringify(item)
        });
    }

    getAllReviews = async (limit=10, offset=0) => {
        return await FetchService.handleFetch(`/review?limit=${limit}&offset=${offset}`);
    }

    getReviewsByCategory = async (categoryId, limit=10, offset=0) => {
        return await FetchService.handleFetch(`/review?categoryId=${categoryId}&limit=${limit}&offset=${offset}`);
    }

    getReviewByBarcode = async (barcode) => {
        return await FetchService.handleFetch(`/review/${barcode}`);
    }
    getReviewsByName = async (name) => {
        return await FetchService.handleFetch(`/review?name=${name}`);
    }
}

export default new ReviewService();