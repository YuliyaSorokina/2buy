import React from 'react';
import {Redirect, Route} from "react-router-dom";

const GuardedRoute = ({component: Component, render, auth, ...rest}) => {
    let renderFunc = render
        ? render
        : () => (
            auth === true
                ? <Component {...rest} />
                : <Redirect to='/user/login'/>
        );
    return (
        <Route {...rest} render={renderFunc}/>
    );
}


export default GuardedRoute;