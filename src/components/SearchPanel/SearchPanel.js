import React, {Component} from 'react';
import {Input} from "reactstrap";

import './SearchPanel.css';


export default class SearchPanel extends Component {

    state = {
        barcode: ''
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if ((this.props.isFound !== prevProps.isFound) && this.props.isFound) {
            this.setState({barcode: ''})
        }
    }

    onUpdateSearch = (e) => {
        const barcode = e.target.value;
        this.setState({barcode});
        this.props.onUpdateSearch(barcode);
    }

    render() {
        const {barcode} = this.state;
        return (
            <div className="search">
                <Input placeholder="Найти..."
                       value={barcode}
                       onChange={this.onUpdateSearch}
                />
            </div>
        )
    }
}
