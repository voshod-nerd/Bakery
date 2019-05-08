import React, { Component } from 'react';
import { getAllStaff, createStaff, updateStaff, getAllPureUsers } from '../util/APIUtils';
import { Modal, Form, Card, Button, Col, Row, InputGroup, FormControl } from 'react-bootstrap';
import { toast } from 'react-toastify';
class Staff extends Component {

    constructor(props) {
        super(props);
        console.log("This is Staff");
        this.state = {
            users: [],
            staff: [],
            staffs: [],
            item: {
                fio: '',
                work: false,
                adress: '',
                place: '',
                phone: ''
            },
            isAdd: false,
            isEdit: false,
            show: false,
            isLoading: false
        }

        this.filterList = this.filterList.bind(this);
        this.getAllStaff = this.getAllStaff.bind(this);
        this.handleClickAddStaff = this.handleClickAddStaff.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.updateListStaff = this.updateListStaff.bind(this);
        this.getAllUsers = this.getAllUsers.bind(this);
        this.handleShow = () => {
            this.setState({ show: true });
        };
        this.handleHide = () => {
            this.setState({ show: false });
        };
    }

    getAllStaff() {
        getAllStaff().then(
            response => {
                console.log(response);
                this.setState({
                    staff: response,
                    staffs: response
                })
            }

        ).catch(error => {
            this.setState({
                isLoading: false
            });
        });

    }


    getAllUsers() {
        getAllPureUsers().then(
            response => {              
                let onlyStaff = response.filter((v) => {
                    if (v.roles[0].name !== "ROLE_USER") return v;
                });
                this.setState({
                    users: onlyStaff,
                })
            }

        ).catch(error => {
            this.setState({
                isLoading: false
            });
        });

    }

    componentDidMount() {

        this.getAllStaff();
        this.getAllUsers();
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let item = { ...this.state.item };
        item[name] = value;
        this.setState({ item });
    }



    handleClickAddStaff() {

        this.setState({
            isAdd: true,
            isEdit: false,
            item: {
                fio: '',
                work: false,
                adress: '',
                place: '',
                phone: ''
            },
        })
        this.handleShow();

    }

    async handleSubmit(event) {
        event.preventDefault();


        if (this.state.isEdit) {
            console.log("isEdit");
            updateStaff(this.state.item).then(
                response => {
                    toast.info('Данные успешно обновлены', {
                        position: "top-center",
                        autoClose: false,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        type: 'error'
                    });
                    this.updateListStaff();
                    this.handleHide();
                }
            ).catch(error => {
                console.log(error);
            });
        }
        if (this.state.isAdd) {
            createStaff(this.state.item).then(
                response => {
                    toast.info('Товар успешно добавлен', {
                        position: "top-center",
                        autoClose: false,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        type: 'error'
                    });
                    this.updateListStaff();
                    this.handleHide();
                }
            ).catch(error => {
                this.setState({
                    isLoading: false
                });
            });
        }


    }

    updateListStaff() {
        console.log("Update Update Update");
        this.setState({ isLoading: true });

        getAllStaff().then(
            response => this.setState({ staff: response, staffs: response, isLoading: false })
        ).catch(error => {
            this.setState({
                isLoading: false
            });
        });
    }


    handleClickEdit(value) {

        this.setState({
            item: value,
            isEdit: true,
            isAdd: false,
        })
        this.handleShow();

    }


    filterList(event) {
        var updatedList = this.state.staff;
        updatedList = updatedList.filter(function (item) {
            return item.fio.toLowerCase().search(
                event.target.value.toLowerCase()) !== -1;
        });
        this.setState({ staffs: updatedList });
    }


    render() {
        const item = this.state.item;

        const list = (
            <div>
                <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                        <InputGroup.Text id="basic-addon1"></InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl onChange={this.filterList}
                        placeholder="Поиск по ФИО сотрудника"
                        aria-label="Название продукта"
                        aria-describedby="basic-addon1"
                    />
                </InputGroup>

                {this.state.staffs.map((item) => (
                    <div key={item.id}>
                        <br></br>
                        <Card>
                            <Card.Title>{item.name}</Card.Title>
                            <Card.Body>
                                <Card.Text>
                                    ФИО сотрудника: {item.fio}
                                </Card.Text>
                                <Card.Text>
                                    Должность: {item.place}
                                </Card.Text>
                                <Card.Text>
                                    Адрес: {item.adress}
                                </Card.Text>
                                <Card.Text>
                                    Телефон: {item.phone}
                                </Card.Text>

                                <Form.Group controlId="work">
                                    <Form.Label >Статус занятости</Form.Label>
                                    <input type="checkbox" ></input>
                                </Form.Group>
                                <Button onClick={() => { this.handleClickEdit(item) }}>Редактировать</Button>
                            </Card.Body>
                        </Card>
                    </div>

                ))}
            </div>);


        return (
            <div>
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
                            <Form.Group as={Row} controlId="name"  >
                                <Form.Label column sm={2}>ФИО</Form.Label>
                                <Col sm={10}>
                                    <Form.Control placeholder="Фио сотрудника" name="fio" onChange={this.handleChange} value={item.fio || ''} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="place">
                                <Form.Label column sm={2}>Должность</Form.Label>
                                <Col sm={10}>
                                    <Form.Control placeholder="Введите должность сотрудника" name="place" onChange={this.handleChange} value={item.place || ''} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="adress">
                                <Form.Label column sm={2}>Адресс</Form.Label>
                                <Col sm={10}>
                                    <Form.Control placeholder="Введите адрес" onChange={this.handleChange} name="adress" value={item.adress || ''} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="phone">
                                <Form.Label column sm={2}>Телефон</Form.Label>
                                <Col sm={10}>
                                    <Form.Control rows="3" placeholder="Введите телефон" onChange={this.handleChange} name="phone" value={item.phone || ''} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="work">
                                <Form.Label column sm={2}>Статус занятости</Form.Label>

                                <Col sm={10}>
                                    <Form.Check rows="3" ref={item.work} placeholder="Введите телефон" onChange={this.handleChange} name="work" />
                                </Col>
                            </Form.Group>

                            <Button type="submit">Сохранить</Button>
                        </Form>
                    </Modal.Body>
                </Modal>
                <Button onClick={this.handleClickAddStaff}>Добавить сотрудника</Button>
                <h4>Cписок сотрудников</h4>
                {list}
            </div>
        );


    }

}

export default Staff;