import React, {Component} from 'react';
import ProductService from "../../services/ProductService";
import ReviewService from "../../services/ReviewService";
import {withRouter} from "react-router-dom";
import {Button, Container, Form, Input} from "reactstrap";

import './Product.css';


class Product extends Component {

    productService = new ProductService();
    reviewService = new ReviewService();

    state = {
        product: null,
        // review: {"comment": "",
        //     "rating": "",
        //     "favourite": false,
        //     "reviewDate": ""}
        review: null,
        edit: false
    }

    componentDidMount() {
        const {match} = this.props;
        this.productService.getProduct(match.params.id)
            .then((item) => {
                const {product, review} = item;
                this.setState({product, review});
            });
    }

    onValueChange = (e) => {
        const {review} = this.state;
        const newReview = {
            comment: e.target.value,
            rating: review.rating,
            favourite: review.favourite,
            reviewDate: review.reviewDate
        }
        this.setState({
            review: newReview,
            edit: true
        })
    }

    onFormSubmit = (e) => {
        e.preventDefault();
        const obj = {
            product: this.state.product,
            review: this.state.review
        }
        this.reviewService.submitProductReview(obj)
            .then((item) => {
                const {product, review} = item;
                this.setState({product, review, edit: false});
            });
    }

    render() {
        const {product, review, edit} = this.state;
        if (!product) {
            return (
                <div>loading...</div>
            )
        }
        const color = edit ? 'success' : 'secondary';
        return (
            <Container>
                <Form onSubmit={this.onFormSubmit}>
                    <h4>{product.name}</h4>
                    <p>Рейтинг: {review?.rating}</p>
                    <p>Штрихкод: {product.barcode.name}</p>
                    <p>Производитель: {product.manufacturer.name}</p>
                    <Input
                        type="textarea"
                        onChange={this.onValueChange}
                        placeholder='Комментарий'
                        value={review?.comment}>
                    </Input>
                    <Button
                        type="submit"
                        className="submit-btn"
                        color={color}
                        disabled={!edit}
                    >
                        Сохранить
                    </Button>
                </Form>
            </Container>
        )
    }
}

export default withRouter(Product);