import React, { Component } from 'react';
import {Tabs, Tab} from 'react-bootstrap';
import RouteList from '../common/RouteList';




class DriverPart extends Component {

    constructor(props) {
        super(props);
        console.log('This is DriverPart');
    }

    render() {
        return (
            <div >
                <p>Это часть водителя</p>
                <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
                    <Tab eventKey="home" title="Задания на сегодня">
                     <RouteList></RouteList>
                    </Tab>
                   
                </Tabs>
            </div>
        );
    }
}

export default DriverPart;