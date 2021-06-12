import React, {Component} from 'react';
import Header from '../Header/Header'
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import NestedCategories from "../NestedCategories/NestedCategories";
import RootCategories from "../RootCategories/RootCategories";
import CategoryPage from '../../pages/CategoryPage/CategoryPage'
import Product from "../../pages/ProductPage/ProductPage";
import SearchPage from "../../pages/SearchPage/SearchPage";
import BarcodeSearch from "../BarcodeSearch/BarcodeSearch";
import GuardedRoute from "../GuardedRoute/GuardedRoute";
import LoginPage from "../../pages/LoginPage/LoginPage";
import AuthService from "../../services/AuthService";
import Logout from "../Logout/Logout";

import './App.css';
import MyReviewsPage from "../../pages/MyReviewsPage/MyReviewsPage";


export default class App extends Component {

    state = {
        term: '',
        isFound: true,
        isAuthenticated: false,
        user: null,
        loading: true
    }

    componentDidMount() {
        this.updateCurrentUser();
    }

    updateCurrentUser = () => {
        AuthService.getCurrentUser()
            .then((user) => {
                this.setState({
                    user: user.value,
                    isAuthenticated: user.value != null,
                    loading: false
                })
            });
    }

    onUpdateSearch = (term) => {
        this.setState({term});
        const isFound = !term;
        this.setState({isFound});
    }

    onLogout = () =>{
        this.setState({
            user: null,
            isAuthenticated: false,
            loading: false
        })
    }

    render() {
        const {isAuthenticated, term, loading, isFound} = this.state;
        const content = term
            ? <SearchPage term={term} onUpdateSearch={this.onUpdateSearch}/>
            : <View auth={isAuthenticated} loading={loading} onLogin={this.updateCurrentUser} onLogout={this.onLogout}/>;
        const header = isAuthenticated
            ? <Header onUpdateSearch={this.onUpdateSearch} isFound={isFound}/>
            : null;
        return (
            <Router>
                <div className="App">
                    {header}
                    {content}
                </div>
            </Router>
        );
    }
}

const View = ({auth, loading, onLogin, onLogout}) => {
    if (loading) return <div>loading...</div>
    return (
        <>
            <Switch>
                <Route exact path="/user/login" render={() => auth ? <Redirect to="/"/> : <LoginPage onLogin={onLogin}/>} />
                <Route exact path="/user/logout" render={() => !auth ? <Redirect to="/user/login"/> : <Logout onLogout={onLogout}/>} />
                <GuardedRoute exact path="/" auth={auth} component={RootCategories}/>
                <GuardedRoute exact path='/my-reviews' auth={auth} component={MyReviewsPage}/>
                <GuardedRoute exact path='/:id/' auth={auth} render={
                    ({match}) => {
                        const {id} = match.params;
                        return <NestedCategories catId={id}/>
                    }}/>
                <GuardedRoute exact path='/product/add' auth={auth} component={Product} add={true}/>
                <GuardedRoute exact path='/product/barcode/:barcode' auth={auth} component={Product} add={false}/>
                <GuardedRoute exact path='/product/id/:id' auth={auth} component={Product} add={false}/>
                <GuardedRoute exact path='/search/barcode/' auth={auth} component={BarcodeSearch}/>
                <GuardedRoute exact path='/:mainCategoryId/:id/' auth={auth} component={CategoryPage}/>
            </Switch>
        </>
    )
}


