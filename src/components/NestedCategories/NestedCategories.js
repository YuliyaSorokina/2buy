import React, {Component} from 'react';
import CategoriesList from "../CategoriesList/CategoriesList";
import CategoryService from "../../services/CategoryService";
import CategoryPage from "../../pages/CategoryPage/CategoryPage";

export default class NestedCategories extends Component {

    state = {
        categories: [],
        title: ''
    }

    componentDidMount() {
        CategoryService.getCategoryById(this.props.catId)
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