import React, { Component } from 'react'
import { Form, Button, Modal, Col, Row } from 'react-bootstrap'
import { getOrderByDateAndStaff, updateOrder } from '../util/APIUtils';
import { toast } from 'react-toastify';
import { Document, Page, Text, View, StyleSheet, PDFViewer } from '@react-pdf/renderer';



const styles = StyleSheet.create({
    page: {
        flexDirection: "row"
    },
    section: {
        flexGrow: 1
    },
    table: { display: "table", width: "auto", borderStyle: "solid", borderWidth: 1, borderRightWidth: 0, borderBottomWidth: 0 },
    tableRow: { margin: "auto", flexDirection: "row" },
    tableCol: { width: "25%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 1, borderTopWidth: 0 },
    tableCell: { margin: "auto", marginTop: 5, fontSize: 10 }
});

const MyDocument = () => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.section}>
                <View style={styles.table}>
                    <View style={styles.tableRow}>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>Product</Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>Product</Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>{'Hello'}</Text>
                        </View>
                    </View>
                    <View style={styles.tableRow}>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>Product</Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>Product</Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>Product</Text>
                        </View>
                    </View>
                    <View style={styles.tableRow}>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>Product</Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>Product</Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>Product</Text>
                        </View>
                    </View>
                    <View style={styles.tableRow}>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>Product</Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>Product</Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>Product</Text>
                        </View>
                    </View>
                    <View style={styles.tableRow}>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>Product</Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>Product</Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>Product</Text>
                        </View>
                    </View>

                </View>
            </View>
        </Page>
    </Document>
);




class RouteList extends Component {
    constructor(props) {
        super(props);
        console.log('This is RouteList');
        this.state = {
            data: [],
            curDate: new Date().toISOString(),
            item: '',
            curUser: '',
            show: false,
            showPdf: false,
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleClickShow = this.handleClickShow.bind(this);
        this.changeStatus = this.changeStatus.bind(this);
        this.handleChangeReady = this.handleChangeReady.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.createRouteList = this.createRouteList.bind(this);
        this.handleHidePDF = this.handleHidePDF.bind(this);
        this.handleShowPDF = this.handleShowPDF.bind(this);
        this.handleShow = () => {
            this.setState({ show: true });
        };
        this.handleHide = () => {
            this.setState({ show: false });
        };

    }

    handleShowPDF = () => {
        this.setState({ showPdf: true });
    };
    handleHidePDF = () => {
        this.setState({ showPdf: false });
    };

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });

    }
    changeStatus = value => {
        this.setState({
            item: value
        });
        this.handleShow();

    }

    handleChangeReady = event => {
        let v = this.state.item;
        v.ready = event.target.value;
        this.setState({
            item: v
        });
        console.log("StateItem=", this.state.item);
    }

    handleSubmit = (event) => {
        event.preventDefault();

        updateOrder(this.state.item).then(
            response => {
                toast.info('Статус изменен', {
                    position: "top-center",
                    autoClose: false,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    type: 'error'
                });
                this.handleHide();
                this.handleClickShow();
            }
        ).catch(error => {
            console.log(error);
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

    createRouteList() {

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
                <div key="table_key">
                    < table >
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
                                    <td >{el.ready === false ? "В работе" : "Исполнено"}
                                        <span>  &nbsp;&nbsp;  &nbsp;&nbsp; &nbsp;&nbsp;         </span><span>            </span>
                                        <Button onClick={() => { this.changeStatus(el) }}>Изменить статус</Button>
                                    </td>
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
                    </table>
                    <hr></hr>
                    <Button onClick={() => { this.handleShowPDF() }} >Сформировать маршртуный лист</Button>
                    <hr></hr>
                </div>];
        }

        let modal = [
            <div key="hiddenPart">
                <Modal key="modal"
                    show={this.state.show}
                    onHide={this.handleHide}
                    dialogClassName="modal-90w"
                    aria-labelledby="example-custom-modal-styling-title">
                    <Modal.Header closeButton>
                        <Modal.Title id="example-custom-modal-styling-title">
                            Изменение стутаса заказа
                     </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group as={Row} controlId="idstaff">
                                <Form.Label column sm={2}>Тип пользователя</Form.Label>
                                <Col sm={10}>
                                    <Form.Control as="select" onChange={this.handleChangeReady} name="ready"  >
                                        <option value="false">В работе</option>
                                        <option value="true">Исполнено</option>

                                    </Form.Control>

                                </Col>
                            </Form.Group>


                            <Button type="submit">Сохранить</Button>
                        </Form>
                    </Modal.Body>
                </Modal>
                <Modal key="modalPDF"
                    size="lg"
                    show={this.state.showPdf}
                    onHide={this.handleHidePDF}
                    dialogClassName="modal-90w"
                    aria-labelledby="example-custom-modal-styling-title"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="example-custom-modal-styling-title">
                            Cформированный маршрутный лист
             </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                   
                    </Modal.Body>
                </Modal>
            </div>
        ];

        let modalPdf = [


        ];
        return (
            <div >
                <p></p>
                {modal}
                {modalPdf}
                <h4>Список заказов</h4>



                <Form>
                    <Form.Label>Выбранная дата {this.state.curDate.substring(0, 10)} </Form.Label>
                    <Form.Group controlId="curDate">
                        <Form.Label>Выберете дату </Form.Label>
                        <Form.Control onChange={this.handleChange} name="curDate" type="date" />

                    </Form.Group>
                    <Button onClick={this.handleClickShow} >Показать список заказов</Button>
                    <br></br>
                    <Form.Label> Данные на выбранную дату  </Form.Label>
                    {content}
                </Form>
                <PDFViewer><MyDocument></MyDocument></PDFViewer>
            </div>
        );
    }
}

export default RouteList;