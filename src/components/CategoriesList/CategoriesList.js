import React, {Component} from 'react';
import CategoryService from "../../services/CategoryService";
import {Container} from "reactstrap";
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';
import {withRouter} from 'react-router-dom';

import './CategoriesList.css';

class CategoriesList extends Component {

    categoryService = new CategoryService();

    state = {
        categories: null,
        match: null
    }

    componentDidMount() {
        const {match} = this.props;
        this.setState({match});
        this.updateCategories(match.params.mainCategoryId);
    }

    updateCategories = (parentId) => {
        const id = parentId ? parentId : '';
        this.categoryService.getCategories(id)
            .then((categories) => {
                this.setState({categories})
            });
    }


    renderCategoryItem(arr) {
        let {match} = this.state;
        return arr.map((item) => {
            const {id, name} = item;
            return (
                <li key={id}>
                    <Link to={`${match.url}/${id}`}>{name}</Link>
                </li>
            )
        })
    }

    render() {
        const {categories} = this.state;
        if (!categories) {
            return (
                <div>loading...</div>
            )
        }
        const items = this.renderCategoryItem(categories);
        const {match} = this.state;
        console.log(match.path);
        console.log(match.url);
        return (

            <Container>
                <ul>{items}</ul>
                <Router>
                    <Route path={`${match.path}/:id`} render={
                        ({match}) =>
                            <CategoriesList match={match}/>
                    }/>
                </Router>
            </Container>
        )
    }
}

export default withRouter(CategoriesList);