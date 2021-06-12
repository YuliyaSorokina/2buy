import React from 'react';
import AuthService from "../../services/AuthService";

const Logout = ({onLogout}) => {
    AuthService.logoutUser()
        .then((r) => {
            onLogout();
        });
    return <></>

}
export default Logout;