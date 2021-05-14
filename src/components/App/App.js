import React, {Component} from 'react';
import Header from '../Header/Header'
import CategoriesList from "../CategoriesList/CategoriesList";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import NestedCategories from "../NestedCategories/NestedCategories";
import Category from '../Category/Category'
import Product from "../ProductPage/ProductPage";

import './App.css';


export default class App extends Component {

    render() {
        return (
            <Router>
                <div className="App">
                    <Header/>
                    <Switch>
                        <Route exact path="/"><CategoriesList/></Route>
                        <Route exact path='/:id/'><NestedCategories/></Route>
                        <Route exact path='/product/add'><Product add={true}/></Route>
                        <Route exact path='/:mainCategoryId/:id/'><Category/></Route>
                        <Route exact path='/:mainCategoryId/:childCategoryId/:id'><Product add={false}/></Route>
                    </Switch>
                </div>
            </Router>
        );
    }

};


