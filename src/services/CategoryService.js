import FetchService from "./FetchService";

class CategoryService {

    getAllCategories = async () => {
        return await FetchService.handleFetch(`/category/`);
    }

    getCategoryById = async (id) => {
        return await FetchService.handleFetch(`/category/${id}`);
    }
}
export default new CategoryService();