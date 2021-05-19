import React from 'react';
import {Container} from "reactstrap";
import {Link, withRouter} from 'react-router-dom';

import './CategoriesList.css';

const renderCategoryItem = (url, arr) => {
    return arr.map((item) => {
        const {id, name} = item;
        return (
            <li key={id}>
                <Link to={`${url}${id}/`}>{name}</Link>
            </li>
        )
    })
}

const CategoriesList = ({match, categories, title}) => {
    const items = renderCategoryItem(match.url, categories);
    return (
        <Container>
            <h4>{title}</h4>
            <ul>{items}</ul>
        </Container>
    )
}

export default withRouter(CategoriesList);