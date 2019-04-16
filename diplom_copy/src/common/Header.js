import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';


class HeaderEl extends Component {

    constructor(props) {
        super(props);
        console.log(props.currentUser);

        this.handleLogoutClick = this.handleLogoutClick.bind(this);
    }


    handleLogoutClick() {
        console.log('handleLogoutClick');
        this.props.onLogout();
    }


    render() {

        let menuItems;

        if (this.props.isAuthenticated) {

            if (this.props.currentUser.roles[0] === "ROLE_ADMIN") {
                menuItems = [
                    <Nav.Link key='adminTool' href="/admintools"  >AdministrationTools</Nav.Link>,
                    <Nav.Link key='logout' onClick={this.handleLogoutClick} >Logout</Nav.Link>

                ];
            }
            else {
                menuItems = [

                    <Nav.Link key='logout' onClick={this.handleLogoutClick} >Logout</Nav.Link>

                ];
            }
        } else {
            menuItems = [
                <Nav.Link key="/signup" href="/signup">Signup</Nav.Link>,
                <Nav.Link key="/login" href="/login">Login </Nav.Link>
            ];
        }



        return (
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand href="/">Main</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">

                    </Nav>
                    <Nav>
                        {menuItems}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>);
    }

}


export default HeaderEl;