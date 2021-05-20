import React, {Component} from 'react';
import BarcodeScannerComponent from "react-webcam-barcode-scanner";
import ReviewService from "../../services/ReviewService";
import {Redirect} from "react-router-dom";
import {Container} from "reactstrap";


class BarcodeSearch extends Component {

    reviewService = new ReviewService();
    state = {
        barcode: '',
        redirect: false
    }

    updateResult = (result) => {
        if (result) {
            this.setState({barcode: result.text, redirect: true});
        } else
            this.setState({barcode: 'Продукт не найден', redirect: false});
    }

    render() {
        const {barcode, redirect} = this.state;
        if (redirect) {
            return <Redirect to={`/product/barcode/${barcode}`}/>;
        }
        return (
            <Container>
                <div>
                <BarcodeScannerComponent
                    width={300}
                    height={500}
                    onUpdate={(err, result) => this.updateResult(result)}
                />
                </div>
                {barcode}
            </Container>
        )
    }

}

export default BarcodeSearch