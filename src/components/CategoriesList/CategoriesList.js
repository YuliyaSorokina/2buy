import React from 'react';
import {Button, Container} from "@mui/material";
import {Link, withRouter} from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';

import './CategoriesList.css';

const renderCategoryItem = (url, arr) => {
    return arr.map((item) => {
        const {id, name} = item;
        return (
            <>
                <ListItem button key={id}>
                    <Link className='category-link' to={`${url}${id}/`}>{name}</Link>
                </ListItem>
                <Divider/>
            </>
        )
    })
}

const CategoriesList = ({match, categories, title}) => {
    const items = renderCategoryItem(match.url, categories);
    return (
        <Container maxWidth="sm">
            <h4>{title}</h4>
            <List component="nav">
                {items}
            </List>
            <Link to='/search/barcode'>
                <Button color="primary" className='btn-bottom'>Отсканировать штрихкод</Button>
            </Link>
        </Container>
    )
}

export default withRouter(CategoriesList);