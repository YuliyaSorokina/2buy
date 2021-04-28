import React, {Component} from 'react';
import CategoryService from "../../services/CategoryService";

export default class CategoryPage extends Component {

    categoryService = new CategoryService();

    state = {
        selectedCategory: null
    }

    componentDidMount() {
        this.updateCategory();
    }

    componentDidUpdate(prevProps) {
        if (this.props.itemId !== prevProps.itemId) {
            this.updateCategory();
        }
    }

    updateCategory = () => {
        const {category} = this.props;
        console.log(category);
        this.setState({
            selectedCategory: category
        })

    }

    renderItem = () =>{

        const {selectedCategory} = this.state;
        const {childCategories} = selectedCategory;
        return childCategories.map((item) => {
            const {id,name} = item;
            return (
                <div
                    key={id}
                >
                    {name}
                </div>
            )
        })

    }

    render() {
        const {selectedCategory} = this.state;
        //let item = selectedCategory ? this.renderItem() : null;
        let item=null;
        if (selectedCategory){
            item = this.renderItem()
        }
        return (
            <>
                <div>CategoryPage</div>
                {item}
            </>
        )
    }
}
