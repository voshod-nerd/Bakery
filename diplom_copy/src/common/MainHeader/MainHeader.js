import React, { Component } from 'react'
import Navbar from 'react-bootstrap/Navbar';
import { Nav } from "react-bootstrap";
import { connect } from "react-redux";
import {
    Link
  } from 'react-router-dom';


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
                 
                    <Link to='/list'><Navbar.Brand key='listmarshrut'>Маршрутный лист</Navbar.Brand></Link>,
                    <Navbar.Brand key='logout' href="#" onClick={this.handleLogoutClick} >Выйти</Navbar.Brand>
                   
                ];
            }
            if (this.props.user.roles[0] === "ROLE_USER") {

                shop = [
                     <Link to='/shoplist' key='shop'><Navbar.Brand >Корзина</Navbar.Brand></Link>,
                     <Link to='/orders' key='orders'><Navbar.Brand >Мои заказы</Navbar.Brand></Link>
                
                ]; 

                menuItems = [
                   
                    <Navbar.Brand key='logout' href="#" onClick={this.handleLogoutClick} >Выйти</Navbar.Brand>

                ];
            }
        } else {
            menuItems = [
               
                <Link to='/signup' key='signup'><Navbar.Brand >Регистрация</Navbar.Brand></Link>,
                <Link to='/login' key='login'><Navbar.Brand >Войти</Navbar.Brand></Link>
            ];
        }

        return (
            <div>
                <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
                   
                    <Link to='/'><Navbar.Brand key='shop'>Главная</Navbar.Brand></Link>
                    <Link to='/goods'><Navbar.Brand key='shop'>Каталог товара</Navbar.Brand></Link>
                   
                    
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

export default connect(mapStateToProps)(MainHeader);