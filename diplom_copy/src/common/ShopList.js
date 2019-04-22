import React, { Component } from 'react'
import { connect } from "react-redux";
import { Table, Button, Form } from 'react-bootstrap';
import { deleteGoodsFromShopList, addGoods, reduceCountGoodsFromShopList,deleteAllGoods } from "../redux/actions/index";
import { uuid4, createOrderItem } from '../util/APIUtils';
import { toast } from 'react-toastify';

const mapStateToProps = state => {
    return {
        shoplist: state.shoplist,
        user: state.user,
        isAuthenticated: state.isAuthenticated
    };
};




function mapDispatchToProps(dispatch) {
    return {
        deleteGoodsFromShopList: item => dispatch(deleteGoodsFromShopList(item)),
        addGoods: item => dispatch(addGoods(item)),
        reduceCountGoodsFromShopList: item => dispatch(reduceCountGoodsFromShopList(item)),
        deleteAllGoods: item =>dispatch(deleteAllGoods(item)),
    };
}

class ShopListReact extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dtorder: '',
            number: uuid4().substring(0, 6),
        }
        console.log("This is ShopListReact");
    }

    handleChange = event => {
        console.log(event.target.value);
        console.log(event.target.id);
        this.setState({
            [event.target.id]: event.target.value
        });

    }

    handleClick(item) {
        this.props.deleteGoodsFromShopList(item);

    }

    addCountHandleClick(item) {
        this.props.addGoods(item);
    }
    reduceGoodsHandleClick(item) {
        this.props.reduceCountGoodsFromShopList(item);
    }
    handleDoOrderClick() {
        let lstGoods = this.props.shoplist.map((value) => {
            return {
                id: value.id,
                count: value.count
            }
        });
        let total = 0;
        this.props.shoplist.forEach(x => { total = total + parseInt(x.price) * parseInt(x.count); });
        let orderItem = {
            dtorder: this.state.dtorder,
            number: this.state.number,
            iduser: {
                id:this.props.user.id
            },
            listGoods: lstGoods,
            totalprice: total
        }

        console.log('Result', orderItem);
        createOrderItem(orderItem).then(
            response => {
                console.log(response);
                toast.info('Вы успешно оформили заказ', {
                    position: "top-center",
                    autoClose: false,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    type: 'error'
                });
                this.props.deleteAllGoods(response);

            }
        ).catch(error => {
            this.setState({
                isLoading: false
            });
        });
    }






    render() {

        let shoplist;
        if (this.props.shoplist.length > 0) {
            let totalPrice = 0;
            this.props.shoplist.forEach(x => { totalPrice = totalPrice + parseInt(x.price) * parseInt(x.count); });
            shoplist = [
                <Form key="formshoplist">
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Наименование товара</th>
                                <th>Цена</th>
                                <th>Вес</th>
                                <th>Количество</th>
                                <th>Описание</th>
                                <th>Действие</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.shoplist.map((el, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{el.name}</td>
                                    <td>{el.price}</td>
                                    <td>{el.weight}</td>
                                    <td><Button onClick={() => { this.reduceGoodsHandleClick(el) }}>-</Button> {el.count} <Button onClick={() => { this.addCountHandleClick(el) }}>+</Button></td>
                                    <td>{el.description}</td>
                                    <td><Button onClick={() => { this.handleClick(el) }}  >Удалить</Button></td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <Form.Group controlId="formBasicFIO">
                        <Form.Label>ФИО клиента  {this.props.user.name}</Form.Label>

                    </Form.Group>
                    <Form.Group controlId="formBasicAdress">
                        <Form.Label>Адрес доставки  {this.props.user.adress} </Form.Label>
                    </Form.Group>
                    <Form.Group controlId="dtorder">
                        <Form.Label>Дата поставки</Form.Label>
                        <Form.Control type="date" value={this.state.dtorder} onChange={this.handleChange} name="dtorder" />
                    </Form.Group>
                    <Form.Label>Номер заказа  {this.state.number}</Form.Label>
                    <h4>Общая сумма заказа {totalPrice}</h4>
                    <Button onClick={() => { this.handleDoOrderClick() }} >Сделать заказ</Button>
                </Form>

            ]

        } else {
            shoplist = [
                <p>У вас нет покупок</p>
            ]
        }




        return (
            <div>
                <h4>Содержимое корзины</h4>
                {shoplist}

            </div>
        );
    }
}

const ShopList = connect(mapStateToProps, mapDispatchToProps)(ShopListReact);
export default ShopList;