import React from "react";
import {Link} from "react-router-dom";
import {Container} from "reactstrap";

const ReviewsList = ({reviews, totalElements, name, loadContent}) => {

    const renderReviews = (arr) => {
        return arr.map((item) => {
                const {product} = item;
                const {id, name} = product;
                return (
                    <li key={id}>
                        <Link to={`/product/id/${id}/`}>{name}</Link>
                    </li>
                )
            }
        )
    }

    const reviewsArr = reviews.length === 0
        ? <p>Категория пуста</p>
        : renderReviews(reviews);
    const pagination = reviews.length === totalElements
        ? null
        : <Link onClick={loadContent}>Показать ещё</Link>;

    return (
        <Container>
            <h4>{name}</h4>
            <ul>{reviewsArr}</ul>
            {pagination}
        </Container>
    )

}

export default ReviewsList;