import React, {Component} from 'react';
import CategoryService from "../../services/CategoryService";
import {Container} from "reactstrap";


import './CategoryList.css';

export default class CategoryList extends Component {

    categoryService = new CategoryService();

    state = {
        categories: null,
        selectedId: null

    }

    componentDidMount() {
        const {parentId} = this.props;
        if (!parentId) {
            this.categoryService.getAllCategories()
                .then((categories) => {
                    this.setState({categories})
                });
        } else {
            this.setChildren(parentId);
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.parentId !== prevProps.parentId) {
            this.setChildren(this.props.parentId);
        }
    }

    setChildren = (id) => {
        this.categoryService.getCategoryById(id)
            .then((category) => {
                const {childCategories} = category;
                this.setState({
                    categories: childCategories
                })
            });
    }
    onSelectedCategory = (id) => {
        this.setState({
            selectedId: id
        })
    }

    renderCategoryItem(arr) {
        return arr.map((item) => {
            const {id, name} = item;
            const {selectedId} = this.state;
            const classSelected = selectedId === id ? 'selected' : '';
            return (
                <li
                    key={id}
                    className={classSelected}
                    onClick={() => this.onSelectedCategory(id)}>
                    {name}
                </li>
            )
        })

    }

    render() {
        const {categories} = this.state;
        if (!categories) {
            return (
                <div>Wait</div>
            )
        }
        const items = this.renderCategoryItem(categories);
        const child = this.state.selectedId ? <CategoryList parentId={this.state.selectedId}/> : null;
        return (
            <Container>
                <ul>{items}</ul>
                {child}
            </Container>

        )
    }
}