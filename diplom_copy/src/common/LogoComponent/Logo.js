import React, { Component } from 'react'
import logo from "../../img/logofond.jpg" 
import Image from "react-bootstrap/Image";
import Card from "react-bootstrap/Card";

class Logo extends Component {

    constructor(props) {
        super(props);
        console.log('This is Logo component');

    }

    render() {
        return (
            <div>
            <Card >
            <Card.Img variant="top" src={logo} />
            <Card.Body>
            <Card.Title>
             Территориального фонда обязательного медицинского страхования города Байконур. (ТФОМС города Байконур)
             </Card.Title>
              </Card.Body>
              </Card>
            </div>
        );

    }

}

export default Logo;