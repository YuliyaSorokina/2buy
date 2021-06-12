import React, {Component} from 'react';
import ProductService from "../../services/ProductService";
import ReviewService from "../../services/ReviewService";
import FieldsProductService from "../../services/FieldsProductService";
import {Redirect, withRouter} from "react-router-dom";
import {Button, Container, Form, Input} from "reactstrap";
import {AutocompleteCreatable, AutocompleteGrouped} from "../../components/Autocomplete/Autocomplete";
import IconButton from '@material-ui/core/IconButton';
import {OutlinedInput, SvgIcon} from "@material-ui/core";
import {ReactComponent as BarcodeIcon} from '../../barcode.svg'
import ScanBarcode from "../../components/ScanBarcode/ScanBarcode";
import InputAdornment from '@material-ui/core/InputAdornment';

import './ProductPage.css';

class ProductPage extends Component {

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
        manufacturers: [],
        categories: [],
        scanBarcode: false
    }

    componentDidMount() {
        const {add} = this.props;
        if (add) {
            const urlParams = new URLSearchParams(this.props.location.search)
            const barcode = urlParams.get('barcode')
            if (barcode) {
                this.handleSetState({id: null, name: barcode}, 'product', 'barcode');
            }
        }
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
            if (id)
                this.getProductById(id)
            else if (barcode)
                this.getReviewByBarcode(barcode)
        } else {
            FieldsProductService.getAllAssignableCategories()
                .then((categories) => {
                    this.setState({categories});
                })
            FieldsProductService.getManufacturers()
                .then((manufacturers) => this.setState({manufacturers}))
        }
    }

    getProductById = (id) => {
        ProductService.getProduct(id)
            .then((item) => {
                const {product, review} = item;
                this.setState({product, review});
            })
    }

    getReviewByBarcode = (barcode) => {
        ReviewService.getReviewByBarcode(barcode)
            .then((item) => {
                const {product, review} = item;
                this.setState({product, review});
            })
    }

    renderEmptyFields = () => {
        const {product} = this.state;
        return (
            <>
                <h4>Добавление продукта</h4>
                <Input value={product.name} placeholder="Наименование" name="name"
                       onChange={(e) => this.handleSetState(e.target.value, 'product', 'name')}/>

                <OutlinedInput
                    value={product.barcode.name}
                    className="barcode_input"
                    placeholder="Штрихкод"
                    name="name"
                    onChange={(e) => {
                        this.handleSetState({id: null, name: e.target.value}, 'product', 'barcode');
                    }}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton aria-label="delete"
                                        className="barcode_input-icon"
                                        onClick={this.onScanBarcode}>
                                <SvgIcon component={BarcodeIcon} viewBox="0 0 600 476.6"/>
                            </IconButton>

                        </InputAdornment>
                    }
                />


                <AutocompleteGrouped array={this.state.categories}
                                     handleSetNestedState={this.handleSetNestedState}
                                     label="Выберите категорию"
                                     params={Array.of('product', 'category')}

                />
                <AutocompleteCreatable array={this.state.manufacturers}
                                       handleSetNestedState={this.handleSetState}
                                       label="Выберите производителя"
                                       params={Array.of('product', 'manufacturer')}
                />
            </>
        )
    }

    renderExistingProduct = () => {
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

    handleSetState = (value, cat, field) => {
        const target = value;
        const category = {...this.state[cat]};
        category[field] = target;
        this.setState({[cat]: category, edit: true, scanBarcode: false});
    }

    handleSetNestedState = (value, cat, field) => {
        const category = {...this.state[cat]};
        const categoryFieldObject = {...category[field]};
        categoryFieldObject['id'] = value;
        this.setState({
            [cat]: {
                ...this.state[cat],
                [field]: categoryFieldObject
            },
            edit: true
        });
    }

    onScanBarcode = (e) => {
        e.preventDefault();
        this.setState({scanBarcode: !this.state.scanBarcode});
    }

    onFormSubmit = (e) => {
        e.preventDefault();
        const productItem = {
            product: this.state.product,
            review: this.state.review
        }
        ReviewService.submitProductReview(productItem)
            .then((item) => {
                const {product, review} = item;
                this.setState({product, review, edit: false});
                if (this.state.add) {
                    this.setState({add: false, redirect: true})
                }
            });
    }


    render() {
        const {product, review, edit, add, redirect, scanBarcode} = this.state;
        if (redirect)
            return <Redirect to={`/product/id/${product.id}`}/>;
        if (!add && !product.name) {
            return (
                <div>loading...</div>
            )
        }
        if (scanBarcode)
            return <ScanBarcode onBarcodeFound={(barcode) => {
                ReviewService.getReviewByBarcode(barcode)
                    .then((item) => {
                        const {product, review} = item;
                        if (product) {
                            this.setState({product, review, edit: false, add: false, redirect: true, scanBarcode: false});
                        } else {
                            this.handleSetState({id: null, name: barcode}, 'product', 'barcode')
                        }
                    })
            }
            }/>
        const formProduct = add ? this.renderEmptyFields() : this.renderExistingProduct();
        const color = edit ? 'success' : 'secondary';
        return (
            <Container>
                <Form className="form productForm" onSubmit={this.onFormSubmit}>
                    {formProduct}
                    <Input
                        type="text"
                        name="rating"
                        placeholder="Рейтинг"
                        value={review.rating}
                        onChange={(e) => this.handleSetState(e.target.value, 'review', 'rating')}
                    />
                    <Input
                        type="textarea"
                        name="comment"
                        placeholder='Комментарий'
                        value={review.comment}
                        onChange={(e) => this.handleSetState(e.target.value, 'review', 'comment')}
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
