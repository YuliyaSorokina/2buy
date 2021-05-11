import React, {Component} from 'react';
import CategoryService from "../../services/CategoryService";
import {Container} from "reactstrap";
import {Link} from 'react-router-dom';
import {withRouter} from 'react-router-dom';

import './CategoriesList.css';

class CategoriesList extends Component {

    categoryService = new CategoryService();

    state = {
        categories: null
    }

    componentDidMount() {
        const {match} = this.props;
        const id = match.params.id ? match.params.id : '';
        this.categoryService.getCategories(id)
            .then((categories) => {
                this.setState({categories})
            });
    }

    renderCategoryItem(arr) {
        let {match} = this.props;
        return arr.map((item) => {
            const {id, name} = item;
            return (
                <li key={id}>
                    {/*<Link to={`${match.url}${id}/`}>{name}</Link>*/}
                    <Link to={{
                        pathname: `${match.url}${id}/`,
                        state: {
                            name: name
                        }
                    }}>{name}</Link>
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
        return (

            <Container>
                <ul>{items}</ul>
            </Container>
        )
    }
}

export default withRouter(CategoriesList);