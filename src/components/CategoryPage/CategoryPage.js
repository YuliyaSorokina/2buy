import React, {Component} from 'react';
import {Link, withRouter} from "react-router-dom";
import CategoryService from "../../services/CategoryService";
import ReviewService from "../../services/ReviewService";
import {Container} from "reactstrap";

class CategoryPage extends Component {

    state = {
        name: '',
        reviews: []
    }

    categoryService = new CategoryService();
    reviewService = new ReviewService();

    componentDidMount() {
        const {match} = this.props;
        this.categoryService.getCategoryById(match.params.id)
            .then((category) => this.setState({name: category.name}))
        this.reviewService.getReviewsByCategory(match.params.id)
            .then((reviews) => this.setState({reviews: reviews.content})
            )

    }

    renderReviews = (arr) => {
        let {match} = this.props;
        return arr.map((item) => {
                const {product} = item;
                const {id, name} = product;
                return (
                    <li key={id}>
                        {/*<Link to={`${match.url}${id}/`}>{name}</Link>*/}
                        <Link to={`/product/${id}/`}>{name}</Link>
                    </li>
                )
            }
        )
    }

    render() {
        const reviewsArr = this.state.reviews.length === 0
            ? <p>Категория пуста</p>
            : this.renderReviews(this.state.reviews);
        return (
            <Container>
                <h4>{this.state.name}</h4>
                <ul>{reviewsArr}</ul>
            </Container>
        )
    }

}

export default withRouter(CategoryPage);