import React, {Component} from 'react';
import Header from '../Header/Header'
import CategoriesList from "../CategoriesList/CategoriesList";
import CategoryService from "../../services/CategoryService";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import './App.css';


export default class App extends Component {

    categoryService = new CategoryService();

    render() {
        return (
            <Router>
                <div className="App">
                    <Header/>
                    <Route exact path="/home"><CategoriesList/></Route>
                    <Route path='/home/:mainCategoryId' render={
                        ({match}) =>
                            <CategoriesList match={match}/>

                    }/>

                </div>
            </Router>
        );
    }

};


