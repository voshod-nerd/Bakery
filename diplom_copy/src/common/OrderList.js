import React, { Component } from 'react';
import { Form, Button, Table } from 'react-bootstrap';
import { getAllOrdersByDate } from '../util/APIUtils';
import './index.css';

class OrderList extends Component {


    constructor(props) {
        super(props);
        console.log("This is props");
        this.state = {
            choosedDate: '',
            isLoading: false,
            data: []
        }
        this.handleClickShow = this.handleClickShow.bind(this);
    }
    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });

    }


    handleClickShow() {
        getAllOrdersByDate(this.state.choosedDate).then(
            response => {
                console.log(response);
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
        if (this.state.isLoading === true) {
            const list = this.state.data;
            console.log(list);
            content = [
                <table >
                    <thead>
                        <tr>
                            <th>Номер заказа</th>
                            <th>Заказчик</th>
                            <th>Адрес доставки</th>
                            <th>Товар</th>
                            <th>Количество</th>
                            <th>Исполнитель</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list.map((el, index) => (
                            <tr key={"ind"+el.number}>
                                <td >{el.number}</td>
                                <td >{el.iduser.name}</td>
                                <td >{el.iduser.adress}</td>

                                <td>
                                    <table>
                                        <tbody>
                                        {el.listGoods.map((v, ind) => (
                                            <tr key={"se" + ind}><td>{v.name}</td></tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </td>
                                <td>
                                    <table>
                                    <tbody>
                                        {el.listGoods.map((v, ind) => (
                                            <tr key={"xe" + ind} ><td> {v.count} </td></tr>
                                        ))}
                                         </tbody>
                                    </table>
                                </td>
                                <td>Сергей</td>
                            </tr>
                        ))}
                    </tbody>
                </table>];

        }

        return (
            <div>
                <h4>Список заказов</h4>
                <Form>
                    <Form.Group controlId="choosedDate">
                        <Form.Label>Выберете дату </Form.Label>
                        <Form.Control onChange={this.handleChange} name="choosedDate" type="date" placeholder="Enter email" />

                    </Form.Group>
                    <Button onClick={this.handleClickShow} >Показать список заказов</Button>
                    {content}
                </Form>
            </div>
        );
    }
}

export default OrderList;