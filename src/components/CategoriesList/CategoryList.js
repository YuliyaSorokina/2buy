import React, {Component} from 'react';
import CategoryService from "../../services/CategoryService";
import {Container} from "reactstrap";

import './CategoryList.css';

export default class CategoryList extends Component {

    categoryService = new CategoryService();

    state = {
        categories: null,
        selectedCategory: null,
        needUpdateChildren: false
    }

    componentDidMount() {
        const {parent} = this.props;
        this.updateCategories(parent);
    }

    componentDidUpdate(prevProps) {
        if (this.props.parent !== prevProps.parent) {
            this.updateCategories(this.props.parent);
        }
    }

    updateCategories = (parent) => {
        const id = parent ? parent.id : '';
        this.categoryService.getCategories(id)
            .then((categories) => {
                this.setState({
                    categories,
                    needUpdateChildren: false
                })
            });
    }

    onSelectedCategory = (selectedCategory) => {
        this.setState({
            selectedCategory,
            needUpdateChildren: true
        })
    }

    renderCategoryItem(arr) {
        return arr.map((item) => {
            const {id, name} = item;
            return (
                <li
                    key={id}
                    onClick={() => this.onSelectedCategory(item)}>
                    {name}
                </li>
            )
        })
    }

    render() {
        const {categories, selectedCategory, needUpdateChildren} = this.state;
        if (!categories) {
            return (
                <div>loading...</div>
            )
        }
        const children = needUpdateChildren ? <CategoryList parent={selectedCategory}/> : null;

        const items = this.renderCategoryItem(categories);
        return (
            <Container>
                <ul>{items}</ul>
                {children}
            </Container>
        )
    }
}