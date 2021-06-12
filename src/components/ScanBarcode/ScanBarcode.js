import React, {Component} from 'react';
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import {Container} from "reactstrap";


class ScanBarcode extends Component {

    state = {
        barcode: '',
        torch: false,
        facingMode: 'environment'
    }


    updateResult = (result) => {
        if (result) {
            this.setState({barcode: result.text});
            this.props.onBarcodeFound(result.text);
        }
    }

    render() {
        const {barcode, torch, facingMode} = this.state;
        return (
            <Container>
                <div>
                    <BarcodeScannerComponent
                        width={300}
                        height={500}
                        delay={50}
                        torch={!!torch}
                        facingMode={facingMode}
                        onUpdate={(err, result) => this.updateResult(result)}
                    />

                </div>
                {barcode}
                {/*<label htmlFor="torch">Вспышка</label>*/}
                {/*<input*/}
                {/*    id="torch"*/}
                {/*    type="checkbox"*/}
                {/*    checked={this.state.torch}*/}
                {/*    onClick={(event => this.setState({torch: !!event.target.checked}))}*/}
                {/*/>*/}
                {/*<button value={this.state.facingMode === 'user' ? 'Основная' : 'Фронтальная'}*/}
                {/*        onClick={() =>*/}
                {/*            this.setState({facingMode: this.state.facingMode === 'user' ? 'environment' : 'user'})}>Камера</button>*/}

                {/*for debug purposes*/}
                {/*<input type={"text"} value={barcode} onChange={(event => this.updateResult({text: event.target.value}))} />*/}


            </Container>
        )
    }
}

export default ScanBarcode
