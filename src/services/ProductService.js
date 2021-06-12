import FetchService from "./FetchService";

class ProductService{

    getProduct = async (id) => {
        return await FetchService.handleFetch(`/product/${id}`);
    }
}

export default new ProductService();