import React, { Component } from 'react'




class Cabinet extends Component {

    constructor(props) {
        super(props);
        console.log('This is Cabinet');
    }

    render() {
        return (
            <div>
                <p>Это кабинет</p>
            </div>
        );
    }




}

export default Cabinet;