import React, {Component} from 'react';
import {Redirect} from "react-router-dom";
import ScanBarcode from "../ScanBarcode/ScanBarcode";
import ReviewService from "../../services/ReviewService";


class BarcodeSearch extends Component {

    state = {
        barcode: '',
        redirect: false,
        exists: false
    }

    updateResult = (barcode) => {
        ReviewService.getReviewByBarcode(barcode)
            .then((item) => {
                const {product} = item;
                if (product) {
                    this.setState({barcode: barcode, redirect: true, exists: true});
                } else {
                    this.setState({barcode: barcode, redirect: true, exists: false});
                }
            })
    }

    render() {
        const {barcode, redirect, exists} = this.state;
        if (redirect) {
            return <Redirect to={
                exists
                ? `/product/barcode/${barcode}`
                : `/product/add?barcode=${barcode}`}/>;
        }
        return (
            <ScanBarcode onBarcodeFound={this.updateResult}/>
        )
    }
}

export default BarcodeSearch
