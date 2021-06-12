import FetchService from "./FetchService";

class FieldsProductService {

    getManufacturers = async () =>{
        return await FetchService.handleFetch(`/misc/manufacturer`);
    }


    getAllAssignableCategories = async () => {
        return await FetchService.handleFetch(`/misc/category`);
    }
}

export default new FieldsProductService();