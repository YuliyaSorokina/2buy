import React, {Component} from 'react';
import CategoriesList from "../CategoriesList/CategoriesList";
import CategoryService from "../../services/CategoryService";
import CategoryPage from "../CategoryPage/CategoryPage";

export default class NestedCategories extends Component {

    categoryService = new CategoryService();

    state = {
        categories: [],
        title: ''
    }

    componentDidMount() {
        this.categoryService.getCategoryById(this.props.catId)
            .then((category) => this.setState({
                categories: category.childCategories,
                title: category.name
            }))
    }

    render() {
        const {title, categories} = this.state;
        if (!title)
            return <p>loading...</p>
        const content = categories.length === 0
            ? <CategoryPage/>
            : <CategoriesList categories={categories} title={title}/>
        return (
            <>
                {content}
            </>
        )
    }


}