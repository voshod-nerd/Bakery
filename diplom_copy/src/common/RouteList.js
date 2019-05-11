import React, { Component } from 'react'
import {  Form, Button } from 'react-bootstrap'
import { getOrderByDateAndStaff } from '../util/APIUtils';


class RouteList extends Component {
    constructor(props) {
        super(props);
        console.log('This is RouteList');
        this.state = {
            data: [],
            curDate: new Date().toISOString(),
            curUser: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleClickShow = this.handleClickShow.bind(this);
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });

    }



    handleClickShow() {
        getOrderByDateAndStaff(this.state.curDate).then(
            response => {
                console.log("Order by date", response);
                this.setState({
                    isLoading: true,
                    data: response
                });

            }
        ).catch(error => {
            this.setState({
                isLoading: false
            });
        });


    }

    componentDidMount() {
        console.log("date =", new Date().toISOString());
        console.log('current date=', new Date());
        getOrderByDateAndStaff(new Date().toISOString()).then(
            response => {
                console.log("Order by date", response);
                this.setState({
                    isLoading: true,
                    data: response
                });

            }
        ).catch(error => {
            this.setState({
                isLoading: false
            });
        });
    }


    render() {

        let content = [];
        if (this.state.data.length === 0) {
            content = [<p key="error" >Данных нет</p>]
        } else {
            content = [
                < table key="table_key" >
                    <thead>
                        <tr>
                            <th>Номер заказа</th>
                            <th>Заказчик</th>
                            <th>Адрес доставки</th>
                            <th>Cтатус заказа</th>
                            <th>Наименование товара и количество</th>
                            
                            <th>Исполнитель</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.data.map((el, index) => (
                            <tr key={"ind=" + index}>
                                <td >{el.number}</td>
                                <td >{el.iduser.name}</td>
                                <td >{el.iduser.adress}</td>
                                <td >{el.ready===false ? "В работе":"Исполнено"}</td>
                                <td>
                                    <ul >
                                        {el.listGoods.map((v, ind) => (
                                            <li key={"xe" + ind} >{v.name} - {v.count} </li>
                                        ))}
                                    </ul>
                                </td>
                                <td>
                                    {el.idstaff !== undefined ? el.idstaff.fio + ' ' + el.idstaff.place : ""}
                                    <br></br>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>];
        }


        return (
            <div >
                <p></p>
                <h4>Список заказов</h4>
                <Form> 
                <Form.Label>Выбранная дата {this.state.curDate.substring(0,10)} </Form.Label>
                    <Form.Group controlId="curDate">
                        <Form.Label>Выберете дату </Form.Label>
                        <Form.Control onChange={this.handleChange} name="curDate" type="date"  />

                    </Form.Group>
                    <Button onClick={this.handleClickShow} >Показать список заказов</Button>
                    <br></br>
                    <Form.Label> Данные на выбранную дату  </Form.Label>
                    {content}
                </Form>
            </div>
        );
    }
}

export default RouteList;