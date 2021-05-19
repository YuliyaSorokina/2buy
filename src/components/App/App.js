import React, {Component} from 'react';
import Header from '../Header/Header'
import CategoriesList from "../CategoriesList/CategoriesList";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import NestedCategories from "../NestedCategories/NestedCategories";
import CategoryPage from '../CategoryPage/CategoryPage'
import Product from "../ProductPage/ProductPage";
import CategoryService from "../../services/CategoryService";
import ReviewService from "../../services/ReviewService";
import SearchPage from "../SearchPage/SearchPage";


import './App.css';


export default class App extends Component {

    categoryService = new CategoryService();
    reviewService = new ReviewService();

    state = {
        searchBarcode: '',
        isSearch: false
    }

    onUpdateSearch = (searchBarcode) => {
        const isSearch = !!searchBarcode;
        this.setState({searchBarcode, isSearch});
    }


    render() {
        const {isSearch, searchBarcode} = this.state;
        const content = isSearch
            ? <SearchPage searchBarcode={searchBarcode}/>
            : <Switch>
                <Route exact path="/"><CategoriesList/></Route>
                <Route exact path='/:id/'><NestedCategories/></Route>
                <Route exact path='/product/add'><Product add={true}/></Route>
                <Route exact path='/product/:id'><Product add={false}/></Route>
                <Route exact path='/:mainCategoryId/:id/'><CategoryPage/></Route>
                {/*<Route exact path='/:mainCategoryId/:childCategoryId/:id'><Product add={false}/></Route>*/}
            </Switch>;
        return (
            <Router>
                <div className="App">
                    <Header onUpdateSearch={this.onUpdateSearch}/>
                    {content}
                </div>
            </Router>
        );
    }

};


