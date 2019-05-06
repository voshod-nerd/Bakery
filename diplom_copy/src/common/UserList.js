import React, { Component } from 'react';
import { getAllUsers, createStaff, updateUser } from '../util/APIUtils';
import { Modal, Form, Card, Button, Col, Row, InputGroup, FormControl } from 'react-bootstrap';
import { toast } from 'react-toastify';
class UserList extends Component {

    constructor(props) {
        super(props);
        console.log("This is UserList");
        this.state = {
            users: [],
            usersfiltered: [],
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
        this.getAllUsr = this.getAllUsr.bind(this);
        this.handleClickAddStaff = this.handleClickAddStaff.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.updateListUser = this.updateListUser.bind(this);
        this.filterListByList = this.filterListByList.bind(this);
        this.handleShow = () => {
            this.setState({ show: true });
        };
        this.handleHide = () => {
            this.setState({ show: false });
        };
    }

    getAllUsr() {
        getAllUsers().then(
            response => {
                console.log(response);
                this.setState({
                    users: response,
                    usersfiltered: response
                })
            }

        ).catch(error => {
            this.setState({
                isLoading: false
            });
        });

    }


    componentDidMount() {

        this.getAllUsr();
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let item = { ...this.state.item };
        item[name] = value;
        if (name==="roles") { item.roles=[]; item.roles.push(value);  }
        this.setState({ item });
    }



    handleClickAddStaff() {

        this.setState({
            isAdd: true,
            isEdit: false,
            item: {
                id:'',
                name: '',
                username: '',
                adress: '',
                roles: [],
                
            },
        })
        this.handleShow();

    }

    async handleSubmit(event) {
        event.preventDefault();


        if (this.state.isEdit) {
            console.log("isEdit",this.state.item);

            updateUser(this.state.item).then(
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
                    this.updateListUser();
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

    updateListUser() {
        console.log("Update Update Update");
        this.setState({ isLoading: true });
        getAllUsers().then(
            response => this.setState({ users: response, usersfiltered: response, isLoading: false })
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
        var updatedList = this.state.users;
        updatedList = updatedList.filter(function (item) {
            return item.name.toLowerCase().search(
                event.target.value.toLowerCase()) !== -1;
        });
        this.setState({ usersfiltered: updatedList });
    }

    filterListByList(event) {
        var updatedList = this.state.users;
        updatedList = updatedList.filter(function (item) {

            return item.roles[0].toLowerCase().search(
                event.target.value.toLowerCase()) !== -1;
        });
        this.setState({ usersfiltered: updatedList });
    }


    render() {
        const item = this.state.item;
        let toReadRole = (value) => {
            if (value === "ROLE_USER") return "Пользователь";
            else
                if (value === "ROLE_ADMIN") { return "Администратор" } else return "Водитель"
        };

        const list = (
            <div>
                <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                        <InputGroup.Text id="basic-addon1"></InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl onChange={this.filterList}
                        placeholder="Поиск по ФИО пользователя"

                        aria-describedby="basic-addon1"
                    />
                </InputGroup>

                <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                        <InputGroup.Text id="basic-addon1">Фильтрация по тип пользователей</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl onChange={this.filterListByList} as="select" multiple={false}>
                        <option value="ROLE_USER" >Пользователь</option>
                        <option value="ROLE_ADMIN">Администратор</option>
                        <option value="ROLE_DRIVER">Водитель</option>
                        <option value="">Все</option>
                    </FormControl>
                </InputGroup>

                {this.state.usersfiltered.map((item) => (
                    <div key={item.id}>
                        <br></br>
                        <Card>

                            <Card.Body>
                                <Card.Text>
                                    ФИО пользователя: {item.name}
                                </Card.Text>
                                <Card.Text>
                                    Имя пользователя: {item.username}
                                </Card.Text>

                                <Card.Text>
                                    Тип пользователя: {toReadRole(item.roles[0])}
                                </Card.Text>

                                <Button onClick={() => { this.handleClickEdit(item) }}>Сменить тип пользователя</Button>
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
                                <Form.Label column sm={2}>ФИО пользователя</Form.Label>
                                <Col sm={10}>
                                    <Form.Control name="name" onChange={this.handleChange} value={item.name || ''} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="username">
                                <Form.Label column sm={2}>Имя пользователя</Form.Label>
                                <Col sm={10}>
                                    <Form.Control name="username" onChange={this.handleChange} value={item.username || ''} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="roles">
                                <Form.Label column sm={2}>Тип пользователя</Form.Label>
                                <Col sm={10}>     
                                    <FormControl onChange={this.handleChange} as="select" name="roles" multiple={false} value={item.roles || ''} >
                                        <option value="ROLE_USER" >Пользователь</option>
                                        <option value="ROLE_ADMIN">Администратор</option>
                                        <option value="ROLE_DRIVER">Водитель</option>
                                    </FormControl>
                                </Col>
                            </Form.Group>


                            <Button type="submit">Сохранить</Button>
                        </Form>
                    </Modal.Body>
                </Modal>

                <h4>Cписок зарегистрированных пользователей</h4>
                {list}
            </div>
        );
    }
}

export default UserList;