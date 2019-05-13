import React, { Component } from 'react'
import { Table, Form } from 'react-bootstrap';
import { getAllOrders } from '../util/APIUtils';

class UserOrdersList extends Component {

    constructor(props) {
        super(props);
        console.log("This is ListOrders");
        this.state = {
            listOrders: []
        }
    }


    componentDidMount() {
        getAllOrders().then(
            response => {
                this.setState({
                    listOrders: response
                });
                console.log(response);
            }
        ).catch(error => {
            console.log(error);
        });
    }

    render() {
        let content = [];
        if (this.state.listOrders.length > 0) {
            content = [<Form key="listOrders" >
                {this.state.listOrders.map((value, index) => (

                    <Form.Group key={'order_' + value.id} className="border border-primary" >
                       
                        <Form.Group controlId="formBasicAdress">
                            <Form.Label>Номер заказа  {value.number} </Form.Label>
                        </Form.Group>
                        <Form.Group controlId="formBasicAdress">
                            <Form.Label>Адрес доставки  {value.iduser.adress} </Form.Label>
                        </Form.Group>
                        <Form.Group controlId="formBasicAdress">
                            <Form.Label>Дата поставки  {value.dtorder.substr(0, 10)} </Form.Label>

                        </Form.Group>
                        <Form.Group controlId="formBasicAdress">
                            <Form.Label>Сумма заказа  {value.totalprice} </Form.Label>
                        </Form.Group>
                        <Form.Label>Список товаров заказа </Form.Label>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Наименование товара</th>
                                    <th>Цена</th>
                                    <th>Вес</th>
                                    <th>Количество</th>


                                </tr>
                            </thead>
                            <tbody>
                                {value.listGoods.map((el, index) => (
                                    <tr key={'goods' + index}>
                                        <td>{index + 1}</td>
                                        <td>{el.name}</td>
                                        <td>{el.price}</td>
                                        <td>{el.weight}</td>
                                        <td> {el.count}</td>


                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Form.Group>



                ))}
            </Form>];

        }


        return (
            <div>
                <h4>Список ваших заказов</h4>
                {content}
            </div>
        );
    }

}
export default UserOrdersList;