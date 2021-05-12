export default class ProductService{

    constructor() {
        this._apiBase = 'http://192.168.3.9:8080';
    }

    isSet(data) {
        if (data) {
            return data
        } else {
            return ''
        }
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
        return this._transformProduct(res);
    }

    _transformProduct = (item)=>{
        const product = item.product;
        const review = item.review ? item.review : {};
        return({
            "product": {
                "id": this.isSet(product.id),
                "name": this.isSet(product.name),
                "category": {
                    "id": this.isSet(product.category.id),
                    "name": this.isSet(product.category.name)
                },
                "manufacturer": {
                    "id": this.isSet(product.manufacturer.id),
                    "name": this.isSet(product.manufacturer.name)
                },
                "barcode": {
                    "id": this.isSet(product.barcode.id),
                    "name": this.isSet(product.barcode.name),
                    "barcodeType": {
                        "id": this.isSet(product.barcode.barcodeType.id),
                        "name": this.isSet(product.barcode.barcodeType.name)
                    }
                }
            },
            "review": {
                "comment": this.isSet(review.comment),
                "rating": this.isSet(review.rating),
                "favourite": this.isSet(review.favourite),
                "reviewDate": this.isSet(review.reviewDate)
            }
        })
    }
}