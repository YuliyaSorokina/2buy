import React from 'react';
import './Logo.css';
import {Link} from 'react-router-dom';


const Logo =()=>{
    return(
        <div className="logo">
            <Link to='/'>2buy</Link>
        </div>
    )
}

export default Logo;