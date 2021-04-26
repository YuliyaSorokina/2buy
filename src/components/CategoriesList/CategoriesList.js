import React, {Component} from 'react';
import CategoryService from "../../services/CategoryService";

export default class CategoriesList extends Component {

    gotService = new CategoryService();

    state = {
        categories: null
    }

    componentDidMount() {
        this.gotService.getAllCategories()
            .then((categories) => {
                this.setState(
                    {categories}
            )
            });

        console.log('categories after update');
        console.log(this.state.categories);
    }

    renderCategoryItem(arr){
        console.log('renderCategoryItem');
        console.log(arr);
        return arr.map((item) => {
            const {id, name} = item;
            return (
                <li
                    key={id}>
                    {name}
                </li>
            )
        })

    }

    render() {
        const {categories} = this.state;
        if (!categories){
            return (
                <div>Wait</div>
            )
        }
        const items = this.renderCategoryItem(categories);
        return (
            <ul>{items}</ul>
        )
    }
}
