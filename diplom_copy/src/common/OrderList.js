import React, { Component } from 'react';
import { Form, Button, Modal, Col, Row } from 'react-bootstrap';
import { getAllOrdersByDate,  updateOrder, getAllStaff } from '../util/APIUtils';
import './index.css';
import { toast } from 'react-toastify';

class OrderList extends Component {


    constructor(props) {
        super(props);
        console.log("This is props");
        this.state = {
            choosedDate: '',
            isLoading: false,
            data: [],
            staff: [],
            item: {
                id: '',
                dtorder: '',
                idstaff: '',
                iduser: '',
                listGoods: '',
                number: '',
                totalprice: ''
            }
        }
        this.handleClickShow = this.handleClickShow.bind(this);
        this.handleClickEdit = this.handleClickEdit.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.getStaff = this.getStaff.bind(this);
        this.handleChangeIdStaff = this.handleChangeIdStaff.bind(this);
        this.handleShow = () => {
            this.setState({ show: true });
        };
        this.handleHide = () => {
            this.setState({ show: false });
        };
    }


    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });

    }


    handleChangeIdStaff = event => {

        const name = event.target.name;
        const value = event.target.value;
        console.log("staff is exist = ", this.state.staff);
        let getStaffById = (id) => {
            return this.state.staff.find(v => v.id === parseInt(id));
        }

        const idstaff = getStaffById(value);
        const newitem = this.state.item;


        if (name === 'idstaff') {
            newitem['idstaff'] = idstaff;
            this.setState({
                item: newitem
            });

        } else {
            newitem[event.target.id] = value;
            this.setState({
                item: newitem
            });
        }

    }


    handleClickEdit(value) {
        this.setState({
            item: value
        })
        this.handleShow();
    }



    handleClickShow() {
        getAllOrdersByDate(this.state.choosedDate).then(
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

    getStaff() {
        getAllStaff().then(
            response => {
                console.log("Staff list  for order =", response);
                this.setState({
                    staff: response
                })
            }
        ).catch(
            error => { console.log(error); }
        );
    }

    componentDidMount() {

        this.getStaff();
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log("Item Order before update", this.state.item);
        updateOrder(this.state.item).then(
            response => {
                toast.info('Исполнитель успешно изменен. Обновите данные', {
                    position: "top-center",
                    autoClose: false,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    type: 'error'
                });
                this.handleHide();
            }
        ).catch(error => {
            console.log(error);
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
                            <th>Наименование товара и количество</th>
                            <th>Исполнитель</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list.map((el, index) => (
                            <tr key={"ind" + el.number}>
                                <td >{el.number}</td>
                                <td >{el.iduser.name}</td>
                                <td >{el.iduser.adress}</td>


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
                                    <Button onClick={() => { this.handleClickEdit(el) }}>Изменить исполнителя</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>];

        }

        return (
            <div>
                <h4>Список заказов</h4>

                <Modal
                    show={this.state.show}
                    onHide={this.handleHide}
                    dialogClassName="modal-90w"
                    aria-labelledby="example-custom-modal-styling-title"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="example-custom-modal-styling-title">
                            Форма добавление/изменения  сотрудника
            </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={this.handleSubmit}>

                            <Form.Group as={Row} controlId="idstaff">
                                <Form.Label column sm={2}>Тип пользователя</Form.Label>
                                <Col sm={10}>
                                    <Form.Control as="select" onChange={this.handleChangeIdStaff} name="idstaff"  >
                                        {
                                            this.state.staff.map((item) => (
                                                <option key={item.id} value={item.id} >ФИО сотрудника: {item.fio} Должность: {item.place}</option>

                                            ))
                                        }
                                    </Form.Control>

                                </Col>
                            </Form.Group>


                            <Button type="submit">Сохранить</Button>
                        </Form>
                    </Modal.Body>
                </Modal>


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