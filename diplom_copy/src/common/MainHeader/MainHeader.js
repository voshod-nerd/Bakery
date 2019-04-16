import React, { Component } from 'react'
import Navbar from 'react-bootstrap/Navbar';
import { Nav } from "react-bootstrap";
import { connect } from "react-redux";



const mapStateToProps = state => {
    return {
        user: state.user,
        isAuthenticated: state.isAuthenticated
    };
};


class MainHeader extends Component {
    constructor(props) {
        super(props);
        console.log('This is MainHeader');
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
    }

    handleLogoutClick() {
        console.log('handleLogoutClick');
        this.props.onLogout();
    }

    render() {
        let menuItems;
        let shop;
        console.log("This props of MainHeader");
        console.log(this.props);
        console.log(this.props.isAuthenticated);
        if (this.props.isAuthenticated) {

            if (this.props.user.roles[0] === "ROLE_ADMIN") {
                menuItems = [

                    <Navbar.Brand key='logout' href="#" onClick={this.handleLogoutClick} >Выйти</Navbar.Brand>

                ];
            }
            if (this.props.user.roles[0] === "ROLE_DRIVER") {
                menuItems = [
                    <Navbar.Brand key='list' href="#"  >Маршрутный лист</Navbar.Brand>,
                    <Navbar.Brand key='logout' href="#" onClick={this.handleLogoutClick} >Выйти</Navbar.Brand>

                ];
            }
            if (this.props.user.roles[0] === "ROLE_USER") {

                shop = [
                    <Navbar.Brand key='shop' href="/shoplist"  >Корзина</Navbar.Brand>,
                
                ]; 

                menuItems = [
                   
                    <Navbar.Brand key='logout' href="#" onClick={this.handleLogoutClick} >Выйти</Navbar.Brand>

                ];
            }
        } else {
            menuItems = [
                <Navbar.Brand key="/signup" href="/signup">Регистрация</Navbar.Brand>,
                <Navbar.Brand key="/login" href="/login">Войти</Navbar.Brand>
            ];
        }

        return (
            <div>
                <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
                    <Navbar.Brand href="/">Главная</Navbar.Brand>
                    <Navbar.Brand href="/goods">Каталог товара</Navbar.Brand>
                    
                    <Nav>
                    {shop}
                    </Nav>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Nav className="mr-auto">
                    </Nav>
                    <Nav>
                        {menuItems}
                    </Nav>


                </Navbar>
                <br></br>


            </div>

        );
    }
}


//const MainHeader = connect(mapStateToProps)(MainHead);
export default connect(mapStateToProps)(MainHeader);