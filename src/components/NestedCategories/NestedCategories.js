import React from 'react';
import CategoriesList from "../CategoriesList/CategoriesList";
import {withRouter} from 'react-router-dom';

const NestedCategories =({match, location})=>{

        return(
            <>
            {/*<h2>{location.state.name}</h2>*/}
                    <CategoriesList/>

            </>
        )

}

export default withRouter(NestedCategories);