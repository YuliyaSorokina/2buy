import React, {Component} from 'react';
import ProductService from "../../services/ProductService";
import ReviewService from "../../services/ReviewService";
import FieldsProductService from "../../services/FieldsProductService";
import {Redirect, withRouter} from "react-router-dom";
import {Button, Container, Form, Input} from "reactstrap";
import AsyncSelect from 'react-select/async';
import CategoryService from "../../services/CategoryService";


import './ProductPage.css';


class ProductPage extends Component {

    productService = new ProductService();
    reviewService = new ReviewService();
    fieldsProductService = new FieldsProductService();
    categoryService = new CategoryService();

    state = {
        product: {
            id: '',
            name: '',
            category: {
                id: '',
                name: '',
                parentCategory: {
                    id: '',
                    name: ''
                },
                childCategories: []
            },
            manufacturer: {
                id: '',
                name: ''
            },
            barcode: {
                id: '',
                name: ''
            }
        },
        review: {
            comment: '',
            rating: '',
            favourite: false,
            reviewDate: ''
        },
        add: false,
        edit: false,
        redirect: false,
        //manufacturers: [],
        categories: []
    }

    componentDidMount() {
        const {add} = this.props;
        this.setState({add});
        this.updateProduct();

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.add !== prevState.add)
            this.updateProduct();

    }

    updateProduct = () => {
        const {match} = this.props;
        const {add} = this.state;
        if (!add) {
            this.setState({redirect: false});
            const {id, barcode} = match.params;
            if (id) this.getProductById(id)
            else if (barcode)
                this.getReviewByBarcode(barcode)

        } else
            this.fieldsProductService.getAllAssignableCategories()
                .then((categories) => {
                    this.setState({categories});
                })
    }

    getProductById = (id) => {
        this.productService.getProduct(id)
            .then((item) => {
                const {product, review} = item;
                this.setState({product, review});
            })
    }

    getReviewByBarcode = (barcode) => {
        this.reviewService.getReviewByBarcode(barcode)
            .then((item) => {
                const {product, review} = item;
                this.setState({product, review});
            })
    }

    renderEmptyFields = () => {
        const {product} = this.state;
        const categoriesList = this.renderSelectOptions(this.state.categories);

        const loadOptions = () => {
            return this.fieldsProductService.getManufacturers()
                .then((manufacturers) => {
                    return manufacturers.map((item) => {
                        return {
                            value: item.id,
                            label: item.name
                        }
                    })
                })
        }
        return (
            <>
                <h4>Добавление продукта</h4>
                <Input value={product.name} placeholder="Наименование" name="name"
                       onChange={(e) => this.handleSetState(e, 'product')}/>
                <Input value={product.barcode.name} placeholder="Штрихкод" name="name"
                       onChange={(e) => this.handleSetNestedState(e, 'product', 'barcode')}/>
                <Input type="select" placeholder="Категория" name="id"
                       onChange={(e) => this.handleSetNestedState(e, 'product', 'category')}>
                    {categoriesList}
                </Input>
                <AsyncSelect cacheOptions defaultOptions loadOptions={loadOptions}
                             onChange={(e) => this.handleSetNestedState({
                                 target: {
                                     name: 'id',
                                     value: e.value
                                 }
                             }, 'product', 'manufacturer')}/>

            </>
        )
    }

    renderSelectOptions = (arr) => {
        return arr.map((item) => {
            const {id, name} = item;
            return (
                <>
                    <option key={id} value={id}>
                        {name}
                    </option>
                </>
            )
        })
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

    handleSetState = (e, cat) => {
        const target = e.target;
        const value = target.value;
        const name = target.name;
        const category = {...this.state[cat]};
        category[name] = value;
        this.setState({[cat]: category, edit: true});
    }

    handleSetNestedState = (e, cat, field) => {
        const target = e.target;
        const value = target.value;
        const name = target.name;
        const category = {...this.state[cat]};
        const categoryFieldObject = {...category[field]};
        categoryFieldObject[name] = value;
        this.setState({
            [cat]: {
                ...this.state[cat],
                [field]: categoryFieldObject
            },
            edit: true
        })

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
                if (this.state.add) {
                    this.setState({add: false, redirect: true})
                }

            });
    }


    render() {
        const {product, review, edit, add, redirect} = this.state;
        if (redirect)
            return <Redirect to={`/product/id/${product.id}`}/>;
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