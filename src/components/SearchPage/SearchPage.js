import React, {Component} from 'react';
import ReviewService from "../../services/ReviewService";
import {Link, withRouter} from "react-router-dom";

import './SearchPage.css'


class SearchPage extends Component {

    reviewService = new ReviewService();

    state = {
        searchResult: null
    }

    componentDidMount() {
        this.updateResult();

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.searchBarcode !== prevProps.searchBarcode) {
            this.updateResult();
        }
    }

    updateResult = () => {
        const {searchBarcode} = this.props;
        this.reviewService.getReviewByBarcode(searchBarcode)
            .then((searchResult) => {
                this.setState({searchResult: searchResult.product})
            })
    }

    renderSearchResult = (searchResult) => {
        const {id, name} = searchResult;
        return <Link to={`/product/id/${id}/`}
                     onClick={() => this.props.onUpdateSearch('')}>{name}</Link>
    }

    render() {
        if (!this.state.searchResult) {
            return <p>Ничего не найдено</p>
        }
        const item = this.renderSearchResult(this.state.searchResult);
        return (
            <div className='search-block'>
                <p>{item}</p>
            </div>
        )
    }
}

export default withRouter(SearchPage)