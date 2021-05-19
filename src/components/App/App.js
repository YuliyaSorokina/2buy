import React, {Component} from 'react';
import Header from '../Header/Header'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import NestedCategories from "../NestedCategories/NestedCategories";
import RootCategories from "../RootCategories/RootCategories";
import CategoryPage from '../CategoryPage/CategoryPage'
import Product from "../ProductPage/ProductPage";
import SearchPage from "../SearchPage/SearchPage";


import './App.css';


export default class App extends Component {

    state = {
        searchBarcode: '',
        isFound: true
    }

    onUpdateSearch = (searchBarcode) => {
        this.setState({searchBarcode});
        const isFound = !searchBarcode;
        this.setState({isFound});
    }

    render() {
        const {searchBarcode} = this.state;
        const content = searchBarcode
            ? <SearchPage searchBarcode={searchBarcode} onUpdateSearch={this.onUpdateSearch}/>
            : <Switch>
                <Route exact path="/"><RootCategories/></Route>
                <Route exact path='/:id/' render={
                    ({match}) => {
                        const {id}=match.params;
                        return <NestedCategories catId={id}/>
                }}/>
                <Route exact path='/product/add'><Product add={true}/></Route>
                <Route exact path='/product/:id'><Product add={false}/></Route>
                <Route exact path='/:mainCategoryId/:id/'><CategoryPage/></Route>
            </Switch>;

        return (
            <Router>
                <div className="App">
                    <Header onUpdateSearch={this.onUpdateSearch} isFound={this.state.isFound}/>
                    {content}
                </div>
            </Router>
        );
    }

};


