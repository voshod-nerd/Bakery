import React, { Component } from 'react'
import { Form, Button, Modal, Col, Row } from 'react-bootstrap'
import { getOrderByDateAndStaff, updateOrder } from '../util/APIUtils';
import { toast } from 'react-toastify';
import { Document, Page, Text, View, StyleSheet, PDFViewer, List, Font } from '@react-pdf/renderer';
import logo from "./fonts/arial.ttf";
import  "./css/index.css";


Font.register({ family: 'Roboto', src: logo });
const styles = StyleSheet.create({
    page: {
        flexDirection: "row"
    },
    section: {
        flexGrow: 1
    },
    title: {
        fontSize: 24,
        textAlign: 'center',
        fontFamily: 'Roboto',
    },
    subtitle: {
        fontSize: 16,
        margin: 12,
        fontFamily: 'Roboto',
    },
    lefthh3: {
        fontSize: 10,
        textAlign: 'left',
        marginBottom: 5,
        fontFamily: 'Roboto',
    },
    table: { display: "table", width: "auto", borderStyle: "solid", borderWidth: 1, borderRightWidth: 0, borderBottomWidth: 0 },
    tableRow: { margin: "auto", flexDirection: "row" },
    tableCol: { width: "15%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 1, borderTopWidth: 0 },
    tableCell: { margin: "auto", marginTop: 1, fontSize: 8, fontFamily: "Roboto" }
});

const MyDocument = (data) => (
    <Document>
        {console.log("Data=", data)}
        <Page size="A4" style={styles.page}>
            <View style={styles.section}>
                <Text style={styles.title}>Маршрутный лист</Text>
                <Text style={styles.lefthh3}>Фамилия Имя Отчество: {data.value[0].idstaff.fio}</Text>
                <Text style={styles.lefthh3}>Должность: Водитель</Text>
                <View style={styles.table}>
                    <View style={styles.tableRow}>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>Номер заказа</Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>ФИО клиента</Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>Адрес доставки</Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>Статус заказа</Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>Содержимое заказа</Text>
                        </View>
                    </View>


                    {data.value.map((el, index) => (
                        <View key={"ind=" + index} style={styles.tableRow}>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>{el.number}</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>{el.iduser.name}</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>{el.iduser.adress}</Text>
                            </View>

                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>{el.ready === false ? "В работе" : "Исполнено"}</Text>
                            </View>
                            <View style={styles.tableCol}>
                                {el.listGoods.map((v, ind) => (
                                    <Text key={"xe" + ind} style={styles.tableCell}> {v.name} - {v.count}</Text>
                                ))}
                            </View>
                        </View>
                    ))}
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

        let modalPdf = [];
        if (this.state.data.length > 0) modalPdf = [<PDFViewer key="pdf" height="700" width="900" ><MyDocument value={this.state.data} ></MyDocument></PDFViewer>]

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
                    dialogClassName="modal-1050w"
                    show={this.state.showPdf}
                    onHide={this.handleHidePDF}
                   
                    
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="example-custom-modal-styling-title">
                            Cформированный маршрутный лист
             </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {modalPdf}
                    </Modal.Body>
                </Modal>
            </div>
        ];

       

        return (
            <div >
                <p></p>
                {modal}

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
              
            </div>
        );
    }
}

export default RouteList;