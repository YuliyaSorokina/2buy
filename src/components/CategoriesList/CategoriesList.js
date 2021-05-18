import React, {Component} from 'react';
import CategoryService from "../../services/CategoryService";
import {Container} from "reactstrap";
import {Link, withRouter} from 'react-router-dom';

import './CategoriesList.css';


class CategoriesList extends Component {

    categoryService = new CategoryService();

    state = {
        categories: null,
        title: 'Все категории'
    }

    componentDidMount() {
        const {match} = this.props;
        if (match.params.id) {
            this.categoryService.getCategoryById(match.params.id)
                .then((category) => this.setState({
                    categories: category.childCategories,
                    title: category.name
                }))
        } else {
            this.categoryService.getAllCategories()
                .then((categories) => this.setState({categories}))
        }
    }

    renderCategoryItem(arr) {
        let {match} = this.props;
        return arr.map((item) => {
            const {id, name} = item;
            return (
                <li key={id}>
                    <Link to={`${match.url}${id}/`}>{name}</Link>
                </li>
            )
        })
    }

    render() {
        const {categories, title} = this.state;
        if (!categories) {
            return (
                <div>loading...</div>
            )
        }
        const items = this.renderCategoryItem(categories);
        return (

                <Container>
                    <h4>{title}</h4>
                    <ul>{items}</ul>
                </Container>

        )
    }
}

export default withRouter(CategoriesList);