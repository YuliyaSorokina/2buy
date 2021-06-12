import React, {Component} from 'react';
import ReviewService from "../../services/ReviewService";
import {Link, withRouter} from "react-router-dom";

import './SearchPage.css'


class SearchPage extends Component {

    state = {
        searchResult: []
    }

    componentDidMount() {
        this.updateResult();

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.term !== prevProps.term) {
            this.updateResult();
        }
    }

    updateResult = () => {
        const {term} = this.props;
        ReviewService.getReviewsByName(term)
            .then((searchResult) => {
                this.setState({searchResult: searchResult.content});
            })
    }

    renderCategoryItem = () => {
        const {searchResult} = this.state;
        return searchResult.map((item) => {
            const {id, name, manufacturer} = item.product;
            return (
                <li key={id}>
                    <Link to={`/product/id/${id}/`}
                          onClick={() => this.props.onUpdateSearch('')}>{name} ({manufacturer.name})</Link>
                </li>
            )
        })
    }

    render() {
        if (this.state.searchResult.length===0) {
            return <p>Ничего не найдено</p>
        }
        const item = this.renderCategoryItem();
        return (
            <div className='search-block'>
                <ul>{item}</ul>
            </div>
        )
    }
}

export default withRouter(SearchPage)