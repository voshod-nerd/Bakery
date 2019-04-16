import React, { Component } from 'react'

class ShopList extends Component {

    constructor(props) {
        super(props);
        console.log(this.props);
        console.log("This is shop list");
    }

    render() {
        return (
            <div>
                <p>Содержимое корзины</p>
            </div>
        );
    }
}
export default ShopList;