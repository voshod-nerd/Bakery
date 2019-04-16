import React, { Component } from 'react';


import {
  Route,
  withRouter,
  Switch
} from 'react-router-dom';

import { getCurrentUser } from '../util/APIUtils';
import { ACCESS_TOKEN } from '../constants';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { loginUser, logOutUser } from "../redux/actions/index";
import MainHeader from "../common/MainHeader/MainHeader";
import Main from "../common/Main/Main";
import Login from "../user/login/Login";
import Signup from '../user/signup/Signup';
import { connect } from "react-redux";
import { Container } from 'react-bootstrap';
import DriverPart from './DriverPart';
import AdminPart from './AdminPart';
import Goods from '../common/Goods';
import ShopList from '../common/ShopList';
function mapDispatchToProps(dispatch) {
  return {
    loginUser: user => dispatch(loginUser(user)),
    logOutUser: user => dispatch(logOutUser(user))
  };
}


class Apps extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      isAuthenticated: false,
      isLoading: false
    }
    this.handleLogout = this.handleLogout.bind(this);
    this.loadCurrentUser = this.loadCurrentUser.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }


  loadCurrentUser() {
    this.setState({
      isLoading: true
    });
    getCurrentUser()
      .then(response => {
        this.props.loginUser(response);
        let role = response.roles[0];
        let name = response.name;
        if (name===this.props.user.name) return;
        console.log(role);
        switch (role) {
          case "ROLE_USER": { console.log("I am user"); console.log(this.props.history); this.props.history.push("/"); break; }
          case "ROLE_ADMIN": {console.log("I am admin"); console.log(this.props.history); this.props.history.push("/admin"); break; }
          case "ROLE_DRIVER": {console.log("I am driver"); console.log(this.props.history); this.props.history.push("/driver"); break; }
          default: break;
        }
        
        console.log(response);
        //this.props.history.push("/"); 

        this.setState({
          currentUser: response,
          isAuthenticated: true,
          isLoading: false
        });
        console.log(response);
      }).catch(error => {
        this.setState({
          isLoading: false
        });
      });
  }


  handleLogout(redirectTo = "/", notificationType = "success", description = "You're successfully logged out.") {
    localStorage.removeItem(ACCESS_TOKEN);

    console.log('handleLogout');
    this.props.logOutUser({ user: null, isAuthenticated: false });
    /*this.setState({
      currentUser: null,
      isAuthenticated: false
    });
    */

    this.props.history.push(redirectTo);

    toast.info('Вы вышли из учетной записи', {
      position: "top-center",
      autoClose: false,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      type: 'error'
    });
  }
  handleLogin() {
    toast.info('Вы успешно авторизовались', {
      position: "top-center",
      autoClose: false,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      type: 'error'
    });
    console.log('This is login');
    this.loadCurrentUser();
    //this.props.history.push("/");

  }

  componentDidMount() {
    this.loadCurrentUser();
  }

  render() {
    return (
      <div >
        <ToastContainer rtl />
        <MainHeader onLogout={this.handleLogout} />
        <Container>
          <Switch>
            <Route exact path="/"
              render={(props) => <Main  {...props}></Main>}>
            </Route>
           
            <Route path="/shoplist"
              render={(props) => <ShopList  {...props} />}></Route>
            <Route path="/goods"
              render={(props) => <Goods  {...props} />}></Route>
            <Route path="/login"
              render={(props) => <Login onLogin={this.handleLogin} {...props} />}></Route>
            <Route path="/signup" component={Signup}></Route>
            <Route path="/login"
              render={(props) => <Login onLogin={this.handleLogin} {...props} />}></Route>
            <Route path="/driver" render={(props) => <DriverPart  {...props} />}></Route>
            <Route path="/admin" render={(props) => <AdminPart  {...props} />}></Route>
            
          </Switch>
        </Container>
      </div>
    );
  }
}
const App = connect(null, mapDispatchToProps)(Apps);
export default withRouter(App);

