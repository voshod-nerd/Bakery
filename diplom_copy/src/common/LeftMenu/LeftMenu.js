import React, { Component } from 'react'
import './style.css'

class LeftMenu extends Component {

    constructor(props) {
        super(props);
        console.log(this.props);
    }

    render() {
        return (
            <nav className="vertical">
                <ul>
                    <li><a href="#">Home</a></li>
                    <li><a href="#">Services +</a>
                        <ul>
                            <li><a href="#">Service 1</a></li>
                            <li><a href="#">Service 2</a></li>
                            <li><a href="#">Service 3</a></li>
                        </ul>
                    </li>
                    <li><a href="#">Products +</a>
                        <ul>
                            <li><a href="#">Widgets</a></li>
                            <li>
                                <a href="#">Sites +</a>
                                <ul>
                                    <li><a href="#">Site 1</a></li>
                                    <li><a href="#">Site 2</a></li>
                                </ul>
                            </li>
                            <li><a href="#">Gadgets +</a>
                                <ul>
                                    <li><a href="#">Gadget 1</a></li>
                                    <li><a href="#">Gadget 2</a></li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                    <li><a href="">Contact</a></li>
                </ul>
            </nav>
        );
    }
}
export default LeftMenu;