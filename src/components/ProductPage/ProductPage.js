import React, {Component} from 'react';
import ProductService from "../../services/ProductService";
import ReviewService from "../../services/ReviewService";
import FieldsProductService from "../../services/FieldsProductService";
import {withRouter} from "react-router-dom";
import {Button, Container, Form, Input} from "reactstrap";


import './ProductPage.css';


class ProductPage extends Component {

    productService = new ProductService();
    reviewService = new ReviewService();
    fieldsProductService = new FieldsProductService();

    state = {
        product: {
            id: '',
            name: '',
            category: {
                id: '',
                name: ''
            },
            manufacturer: {
                id: '',
                name: ''
            },
            barcode: {
                id: '',
                name: '',
                barcodeType: {
                    id: '',
                    name: ''
                }
            }
        },
        review: {
            comment: '',
            rating: '',
            favourite: '',
            reviewDate: ''
        },
        add: false,
        edit: false,
        manufacturers: []
    }

    componentDidMount() {
        const {match, add} = this.props;
        this.setState({add});
        if (!add) {
            this.productService.getProduct(match.params.id)
                .then((item) => {
                    const {product, review} = item;
                    this.setState({product, review});
                })
        }

    }

    handleSetState = (e, cat) => {
        const target = e.target;
        const value = target.value;
        const name = target.name;
        const category = {...this.state[cat]};
        category[name] = value;
        this.setState({[cat]: category, edit: true});
        console.log(this.state[cat]);
    }

    onFormSubmit = (e) => {
        e.preventDefault();
        const productItem = {
            product: this.state.product,
            review: this.state.review
        }
        this.reviewService.submitProductReview(productItem)
            .then((item) => {
                const {product, review} = item;
                this.setState({product, review, edit: false});
            });
    }

    renderEmptyFields = () => {

        return (
            <span></span>
        )
    }

    renderProduct = () => {
        const {product} = this.state;
        return (
            <>
                <h4>{product.name}</h4>
                <p>Штрихкод: {product.barcode.name}</p>
                <p>Категория: {product.category.name}</p>
                <p>Производитель: {product.manufacturer.name}</p>
            </>
        )
    }


    render() {
        const {product, review, edit, add} = this.state;
        if (!add && !product.name) {
            return (
                <div>loading...</div>
            )
        }
        const formProduct = add ? this.renderEmptyFields() : this.renderProduct();

        const color = edit ? 'success' : 'secondary';
        return (
            <Container>
                <Form className="productForm" onSubmit={this.onFormSubmit}>
                    {formProduct}
                    <Input
                        type="text"
                        name="rating"
                        placeholder="Рейтинг"
                        value={review.rating}
                        onChange={(e) => this.handleSetState(e, 'review')}
                    />
                    <Input
                        type="textarea"
                        name="comment"
                        placeholder='Комментарий'
                        value={review.comment}
                        onChange={(e) => this.handleSetState(e, 'review')}
                    />

                    <Button
                        type="submit"
                        className="submit-btn"
                        color={color}
                        disabled={!edit}>
                        Сохранить
                    </Button>
                </Form>
            </Container>

        )
    }
}

export default withRouter(ProductPage);