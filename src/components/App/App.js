import React, {Component} from 'react';
import {Row, Col, Container} from 'reactstrap';
import Header from '../Header/Header'
import CategoryList from "../CategoriesList/CategoryList";
import CategoryService from "../../services/CategoryService";

import './App.css';


export default class App extends Component {

    categoryService = new CategoryService();

    render() {
        return (
            <div className="App">
                <Header/>
                <CategoryList parentId={null}/>
            </div>
        );
    }

};


