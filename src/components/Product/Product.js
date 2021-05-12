import React, {Component} from 'react';
import ProductService from "../../services/ProductService";
import {withRouter} from "react-router-dom";
import {Container} from "reactstrap";

class Product extends Component {

    productService = new ProductService();

    state = {
        product: null,
        review: {"comment": "",
            "rating": "",
            "favourite": false,
            "reviewDate": ""}
    }

    componentDidMount() {
        const {match} = this.props;
        this.productService.getProduct(match.params.id)
            .then((item) => {
                const {product, review} = item;
                this.setState({product, review});
            });
    }
onValueChange = (e) =>{
        const {review} = this.state;
        const newReview = {
            comment: e.target.value,
            rating: review.rating,
            favourite: review.favourite,
            reviewDate: review.reviewDate
        }
    this.setState({
        review: newReview
    })
}
    render() {
        const {product, review} = this.state;
        if (!product) {
            return (
                <div>loading...</div>
            )
        }
        return (
            <Container>
                <h4>{product.name}</h4>
                <p>Рейтинг: {review.rating}</p>
                <p>Штрихкод: {product.barcode.name}</p>
                <p>Производитель: {product.manufacturer.name}</p>
                <textarea
                    onChange={this.onValueChange}
                    placeholder='Комментарий'
                    value={review.comment}
                    class="form-control"/>
            </Container>
        )
    }
}

export default withRouter(Product);