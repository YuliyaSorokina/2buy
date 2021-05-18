import React from 'react';
import CategoriesList from "../CategoriesList/CategoriesList";
import {withRouter} from 'react-router-dom';

const NestedCategories =()=>{

        return(
            <>
                    <CategoriesList/>

            </>
        )

}

export default withRouter(NestedCategories);