import React, {Component} from 'react';
import Header from '../Header/Header'
import CategoriesList from "../CategoriesList/CategoriesList";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import NestedCategories from "../NestedCategories/NestedCategories";
import CategoryPage from '../CategoryPage/CategoryPage'
import Product from "../ProductPage/ProductPage";
import CategoryService from "../../services/CategoryService";

import './App.css';


export default class App extends Component {

    categoryService = new CategoryService();

    render() {
        return (
            <Router>
                <div className="App">
                    <Header/>
                    <Switch>
                        <Route exact path="/"><CategoriesList/></Route>
                        <Route exact path='/:id/'><NestedCategories/></Route>
                        <Route exact path='/product/add'><Product add={true}/></Route>
                        <Route exact path='/:mainCategoryId/:id/'><CategoryPage/></Route>
                        <Route exact path='/:mainCategoryId/:childCategoryId/:id'><Product add={false}/></Route>
                    </Switch>
                </div>
            </Router>
        );
    }

};


