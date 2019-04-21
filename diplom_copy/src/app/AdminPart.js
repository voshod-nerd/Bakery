import React, { Component } from 'react';
import { Tabs, Tab, Breadcrumb, ButtonGroup, Button, Nav, Table, Modal, Col, Row, InputGroup, Form } from "react-bootstrap";
import { getAllGoods, createGoods, updateGoods } from '../util/APIUtils';
import { toast } from 'react-toastify';
import { async } from 'q';

class AdminPart extends Component {
    constructor(props) {
        super(props);
        console.log('This is AdminPart');
        this.state = {
            component: null,
            items: this.emptyItem,
            item: {

                name: '',
                price: 0,
                weight: 0,
                description: '',
                actual: true
            },
            isLoading: true,
            isAdd: false,
            isEdit: false,
            show: false
        };

        this.handleShow = () => {
            this.setState({ show: true });
        };

        this.handleHide = () => {
            this.setState({ show: false });
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.updateListGoods = this.updateListGoods.bind(this);
        this.handleClickAddGoods = this.handleClickAddGoods.bind(this);
    }


    componentDidMount() {
        this.updateListGoods();
    }


    updateListGoods() {
        console.log("Update Update Update");
        this.setState({ isLoading: true });

        getAllGoods().then(
            response => this.setState({ items: response, isLoading: false })
        ).catch(error => {
            this.setState({
                isLoading: false
            });
        });
    }


    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let item = { ...this.state.item };
        item[name] = value;
        this.setState({ item });
    }

    async handleSubmit(event) {
        event.preventDefault();


        if (this.state.isEdit) {
            console.log("isEdit");
            updateGoods(this.state.item).then(
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
                    this.updateListGoods();
                    this.handleHide();
                }
            ).catch(error => {
                console.log(error);
            });            
        }
        if (this.state.isAdd) {
            createGoods(this.state.item).then(
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
                this.updateListGoods();
                this.handleHide();
            }
            ).catch(error => {
                this.setState({
                    isLoading: false
                });
            });
        }

       
    }

    handleClickEdit(value) {

        this.setState({
            item: value,
            isEdit: true,
            isAdd: false,
        })
        this.handleShow();

    }
    handleClickAddGoods() {

        this.setState({
            isAdd: true,
            isEdit: false,
            item: {

                name: '',
                price: 0,
                weight: 0,
                description: '',
                actual: true
            }
        })
        this.handleShow();

    }




    render() {

        const { items, item, isLoading } = this.state;

        if (isLoading) {
            return <p>Loading...</p>;
        }


        const groupList = items.map(group => {

            return <tr key={group.id}>
                <td style={{ whiteSpace: 'nowrap' }}>{group.name}</td>
                <td style={{ whiteSpace: 'nowrap' }}>{group.price}</td>
                <td style={{ whiteSpace: 'nowrap' }}>{group.weight}</td>
                <td style={{ whiteSpace: 'nowrap' }}>{group.actual}</td>
                <td style={{ whiteSpace: 'nowrap' }}>{group.description}</td>

                <td>
                    <ButtonGroup>
                        <Button size="sm" color="primary" onClick={() => { this.handleClickEdit(group) }}  >Редактировать</Button>

                    </ButtonGroup>
                </td>
            </tr>
        });

        let component = this.state.component;
        let show;
        if (component === 'AddContent') {
            show = [
            ];
        }
        return (

            <div >
                <Modal
                    show={this.state.show}
                    onHide={this.handleHide}
                    dialogClassName="modal-90w"
                    aria-labelledby="example-custom-modal-styling-title"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="example-custom-modal-styling-title">
                            Форма добавление/изменения  товара
            </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group as={Row} controlId="name"  >
                                <Form.Label column sm={2}>Товар</Form.Label>
                                <Col sm={10}>
                                    <Form.Control placeholder="Введите название товара" name="name" onChange={this.handleChange} value={item.name || ''} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="price">
                                <Form.Label column sm={2}>Цена</Form.Label>
                                <Col sm={10}>
                                    <Form.Control placeholder="Введите цену продукта" name="price" onChange={this.handleChange} value={item.price || ''} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="weigth">
                                <Form.Label column sm={2}>Вес</Form.Label>
                                <Col sm={10}>
                                    <Form.Control placeholder="Введите вес" onChange={this.handleChange} name="weight" value={item.weight || ''} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="description">
                                <Form.Label column sm={2}>Краткое описание продукта</Form.Label>
                                <Col sm={10}>
                                    <Form.Control as="textarea" rows="3" onChange={this.handleChange} name="description" value={item.description || ''} />
                                </Col>
                            </Form.Group>

                            <Button type="submit">Сохранить</Button>
                        </Form>
                    </Modal.Body>
                </Modal>

                <Breadcrumb>
                    <Breadcrumb.Item active>Панель администоратора</Breadcrumb.Item>
                </Breadcrumb>




                <Tabs defaultActiveKey="primary" id="uncontrolled-tab-example">
                    <Tab eventKey="home" title="Список товаров пекарни">

                        <Button variant="primary" onClick={this.handleClickAddGoods}>
                            Добавить товаров </Button>
                      
                        <Table className="mt-4">
                            <thead>
                                <tr>
                                    <th width="20%">Название</th>
                                    <th width="20%">Цена</th>
                                    <th width="20%">Вес</th>
                                    <th width="20%">Актуальность</th>
                                    <th width="20%">Описание</th>

                                    <th width="10%">Действия</th>
                                </tr>
                            </thead>
                            <tbody>
                                {groupList}
                            </tbody>
                        </Table>
                    </Tab>
                    <Tab eventKey="profile" title="Накладные">
                        <p>2</p>
                    </Tab>
                    <Tab eventKey="contact" title="Договора" >
                        <p>3</p>
                    </Tab>
                </Tabs>



            </div>

        );
    }
}

export default AdminPart;