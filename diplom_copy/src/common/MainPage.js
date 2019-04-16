
import React, { Component } from 'react'
//import Container from 'react-bootstrap/Container';
//import Row from 'react-bootstrap/Row';
//import Col from 'react-bootstrap/Col';
import BlockElement from "../util/BlockElement";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MainHeader from "../common/MainHeader/MainHeader";
import NewsBlock from "../common/News/NewsBlocks";
import LeftMenu from "../common/LeftMenu/LeftMenu";
import Login from "../user/login/Login";
import Logo from '../common/LogoComponent/Logo';
import Signup from '../user/signup/Signup';
import {
    Route,
    withRouter,
    Switch
} from 'react-router-dom';



class MainPage extends Component {

    constructor(props) {
        super(props);
        console.log('This is MainPage');
    }


    render() {
        return (
            <div>

               

                       

                        <Switch>
                            <Route exact path="/"
                                render={(props) => <NewsBlock  {...props}></NewsBlock>}>
                            </Route>
                            <Route path="/login"
                                render={(props) => <Login onLogin={this.props.onLogin} {...props} />}></Route>
                            <Route path="/signup" component={Signup}></Route>
                           

                            <NewsBlock />
                        </Switch>

                
            </div>
        );
    }
}
export default withRouter(MainPage);