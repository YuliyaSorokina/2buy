import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import ReviewService from "../../services/ReviewService";
import ReviewsList from "../../components/ReviewsList/ReviewsList";

class MyReviewsPage extends Component {

    state = {
        name: '',
        reviews: [],
        offset: 0,
        limit: 10,
        totalElements: 1
    }

    componentDidMount() {
        this.loadContent();
    }

    loadContent = () => {
        const {limit, offset} = this.state;
        ReviewService.getAllReviews(limit, offset)
            .then((reviews) => this.setState({
                    reviews: [...this.state.reviews, ...reviews.content],
                    offset: offset + limit,
                    totalElements: reviews.totalElements
                })
            )
    }

    render() {
        const {reviews, totalElements, name} = this.state;
        return (
            <ReviewsList reviews={reviews} name={name} totalElements={totalElements} loadContent={this.loadContent}/>
        )
    }
}

export default withRouter(MyReviewsPage);