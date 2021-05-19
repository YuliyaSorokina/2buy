import React, {Component} from 'react';
import CategoriesList from "../CategoriesList/CategoriesList";
import CategoryService from "../../services/CategoryService";

export default class RootCategories extends Component {

    categoryService = new CategoryService();

    state = {
        categories: []
    }

    componentDidMount() {
        this.categoryService.getAllCategories()
            .then((categories) => this.setState({categories}))
    }

    render() {
        const {categories} = this.state;
        if (categories.length === 0)
            return <p>loading...</p>
        return (
                <CategoriesList categories={categories} title='Все категории'/>
        )
    }


}