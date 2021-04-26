import React, {Component} from 'react';
import {Row, Col, Container} from 'reactstrap';
import Header from '../Header/Header'
import CategoriesList from "../CategoriesList/CategoriesList";


import './App.css';

export default class App extends Component {

  render(){
    return (
        <div className="App">
                <Header/>
                <CategoriesList/>
        </div>
    );
  }

};


