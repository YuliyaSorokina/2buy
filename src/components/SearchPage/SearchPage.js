import React, {Component} from 'react';
import ReviewService from "../../services/ReviewService";


export default class SearchPage extends Component {

    reviewService = new ReviewService();

    state = {
        searchResult: null
    }

    componentDidMount() {
        this.setState({who: 'componentDidMount'});
        this.updateResult();

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.searchBarcode !== prevProps.searchBarcode){
            this.setState({who: 'componentDidUpdate'});
            this.updateResult();
        }
    }
    updateResult =()=>{
        const {searchBarcode} = this.props;
        this.reviewService.getReviewByBarcode(searchBarcode)
            .then((searchResult) => {
                this.setState({searchResult: searchResult.product})
            })
    }

    renderSearchResult = (searchResult) => {
        return searchResult.name
    }

    render() {
        if (!this.state.searchResult){
            return <p>Ничего не найдено</p>
        }
        const item = this.renderSearchResult(this.state.searchResult);
        return (
            <div>
            <p>{item}</p>
            </div>
        )
    }
}