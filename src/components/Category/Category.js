import React from 'react';
import {withRouter} from "react-router-dom";

const Category = ({match, location}) => {
    return (
        <>
            {/*<h2>{location.state.name}</h2>*/}
            <p>Категория {match.params.id}</p>
            <p>Здесь будут продукты</p>

        </>
    )
}

export default withRouter(Category);