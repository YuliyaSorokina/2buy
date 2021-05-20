import React, {Component} from 'react';
import Header from '../Header/Header'
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';
import NestedCategories from "../NestedCategories/NestedCategories";
import RootCategories from "../RootCategories/RootCategories";
import CategoryPage from '../CategoryPage/CategoryPage'
import Product from "../ProductPage/ProductPage";
import SearchPage from "../SearchPage/SearchPage";
import {Button} from "reactstrap";
import BarcodeSearch from "../BarcodeSearch/BarcodeSearch";

import './App.css';


export default class App extends Component {

    state = {
        term: '',
        isFound: true
    }

    onUpdateSearch = (term) => {
        this.setState({term});
        const isFound = !term;
        this.setState({isFound});
    }

    render() {
        const {term} = this.state;
        const content = term ? <SearchPage term={term} onUpdateSearch={this.onUpdateSearch}/> : <View/>;
        return (
            <Router>
                <div className="App">
                    <Header onUpdateSearch={this.onUpdateSearch} isFound={this.state.isFound}/>
                    {content}
                </div>
            </Router>
        );
    }
}

const View = () => {
    return (
        <>
            <Switch>
                <Route exact path="/"><RootCategories/></Route>
                <Route exact path='/:id/' render={
                    ({match}) => {
                        const {id} = match.params;
                        return <NestedCategories catId={id}/>
                    }}/>
                <Route exact path='/product/add'><Product add={true}/></Route>
                <Route exact path='/product/id/:id'><Product add={false}/></Route>
                <Route exact path='/product/barcode/:barcode'><Product add={false}/></Route>
                <Route exact path='/search/barcode/'><BarcodeSearch/></Route>
                <Route exact path='/:mainCategoryId/:id/'><CategoryPage/></Route>
            </Switch>
            <Link to='/search/barcode' className='btn-bottom'>
                <Button color="primary">Отсканировать штрихкод</Button>
            </Link>
        </>
    )

}


