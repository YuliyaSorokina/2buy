import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import {Button, Form} from "reactstrap";
import AuthService from "../../services/AuthService";
import Logo from "../../components/Logo/Logo";

import './LoginPage.css';


const LoginPage = ({onLogin}) => {

    const [values, setValues] = React.useState({
        name: '',
        password: '',
        showPassword: false,
    });

    const handleChange = (prop) => (event) => {
        setValues({...values, [prop]: event.target.value});
    };

    const handleClickShowPassword = () => {
        setValues({...values, showPassword: !values.showPassword});
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        const credentials = {
            username: values.name,
            password: values.password,
            rememberMe: true,
        }
        AuthService.loginUser(credentials)
            .then(() => {
                    onLogin();
                }
            )
    }

    return (
        <div className="login-root">
            <Form className="form login_form" onSubmit={handleFormSubmit}>
                <Logo/>
                <div>
                    <TextField
                        id="outlined-name"
                        label="Логин"
                        value={values.name}
                        className="login_input"
                        onChange={handleChange('name')}
                        variant="outlined"
                    />
                </div>
                <div>
                    <FormControl className="login_input" variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Пароль</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={values.showPassword ? 'text' : 'password'}
                            value={values.password}
                            onChange={handleChange('password')}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {values.showPassword ? <Visibility/> : <VisibilityOff/>}
                                    </IconButton>
                                </InputAdornment>
                            }
                            labelWidth={70}
                        />
                    </FormControl>
                </div>
                <Button variant="contained" color="primary" className="login_input">
                    Войти
                </Button>
            </Form>
        </div>
    )
}

export default LoginPage;