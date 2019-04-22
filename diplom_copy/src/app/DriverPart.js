import React, { Component } from 'react'




class DriverPart extends Component {

    constructor(props) {
        super(props);
        console.log('This is DriverPart');
    }

    render() {
        return (
            <div >
                <p>Это часть водителя</p>
            </div>
        );
    }




}

export default DriverPart;