import React, { Component } from 'react';
import './style.css'


export class BlueBlock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.currentUser,
            isLoading: this.props.isLoading
        };
    }
    render() {
        return (<div className="blocks">
            <p>Hello World</p>
            <p>Hello World</p>
            <p>Hello World</p>
            <p>Hello World</p>
            <p>Hello World</p>
            <p>Hello World</p>
        </div>);
    }
}

export default BlueBlock;