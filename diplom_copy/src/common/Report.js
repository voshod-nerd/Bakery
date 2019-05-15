import React, { Component } from 'react';
import { Form, Button, Modal } from 'react-bootstrap'
import { Document, Page, Text, View, StyleSheet, PDFViewer, Font } from '@react-pdf/renderer';
import logo from "./fonts/arial.ttf";
import { getAllOrders } from '../util/APIUtils';



Font.register({ family: 'Roboto', src: logo });
const styles = StyleSheet.create({
    page: {
        flexDirection: "row"
    },
    section: {
        flexGrow: 1
    },
    body: {
        paddingTop: 35,
        paddingBottom: 45,
        paddingHorizontal: 35,
    },
    title: {
        fontSize: 16,
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
    tableCol: { width: "25%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 1, borderTopWidth: 0 },
    tableColLittle: { width: "18.75%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 1, borderTopWidth: 0 },
    tableColBig: { width: "25%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 1, borderTopWidth: 0 },
    tableCell: { margin: "auto", marginTop: 1, fontSize: 8, fontFamily: "Roboto" }
});



const ReportPerformed = (data) => (
    <Document>
        <Page size="A4" style={styles.body}>
            <View style={styles.section}>
                <Text style={styles.title}>Отчет статистики выполненных/невыполненных заявок</Text>
                <Text style={styles.lefthh3}>Начало периода: {data.value.b}</Text>
                <Text style={styles.lefthh3}>Конец периода: {data.value.e}</Text>
                <View style={styles.table}>
                    <View style={styles.tableRow}>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>Общее количество заказов</Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>Количество выполненных заявок</Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>Количество невыполненных заявок</Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>Процент невыполненных заявок</Text>
                        </View>
                    </View>
                    <View style={styles.tableRow}>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>{data.value.data.length}</Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>{data.value.r_count}</Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>{data.value.off}</Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>{data.value.r_count === 0 ? 0 : (data.value.r_count / data.value.off) * 100}</Text>
                        </View>

                    </View>
                </View>
            </View>
        </Page>
    </Document>
);

const ReportClient = (data) => (   
    <Document>
        <Page size="A4" style={styles.body}>
            <View style={styles.section}>
                <Text style={styles.title}>Статистика по обслуживанию клиентов</Text>
                <Text style={styles.lefthh3}>Начало периода: {data.value.b}</Text>
                <Text style={styles.lefthh3}>Конец периода: {data.value.e}  {console.log(data)}</Text>
                <View style={styles.table}>
                    <View style={styles.tableRow}>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>ФИО клиента</Text>
                        </View>
                        <View style={styles.tableColLittle}>
                            <Text style={styles.tableCell}>Общее количество заявок</Text>
                        </View>
                        <View style={styles.tableColLittle}>
                            <Text style={styles.tableCell}>Количество выполненых заявок</Text>
                        </View>
                        <View style={styles.tableColLittle}>
                            <Text style={styles.tableCell}>Количество неисполненых заявок</Text>
                        </View>
                        <View style={styles.tableColLittle}>
                            <Text style={styles.tableCell}>Процент успешно выполненых заявок</Text>
                        </View>
                    </View>
                    <View style={styles.tableRow}>
                        {data.value.data.map((el, index) => (
                            <View key={"ind=" + index} style={styles.tableRow}>
                                <View style={styles.tableCol}>
                                    <Text style={styles.tableCell}>{el.name}</Text>
                                </View>
                                <View style={styles.tableColLittle}>
                                    <Text style={styles.tableCell}>{el.col}</Text>
                                </View>
                                <View style={styles.tableColLittle}>
                                    <Text style={styles.tableCell}>{el.r}</Text>
                                </View>
                                <View style={styles.tableColLittle}>
                                    <Text style={styles.tableCell}>{el.o}</Text>
                                </View>
                                <View style={styles.tableColLittle}>
                                    <Text style={styles.tableCell}>{el.r === 0 ? 0 : (el.r / el.o) * 100}</Text>
                                </View>                              
                            </View>
                        ))}
                    </View>
                </View>
            </View>
        </Page>
    </Document>
);











class Report extends Component {



    constructor(props) {
        super(props);
        console.log("Report component");
        this.state = {
            beginDate: "",
            endDate: "",
            show: false,
            reportName: '',
            data: [],
            dataForReport: []
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleClickReportPerformedOrders = this.handleClickReportPerformedOrders.bind(this);
        this.handleClickReportClient = this.handleClickReportClient.bind(this);
        this.getAllDataForReport = this.getAllDataForReport.bind(this);

        this.handleShow = () => {
            this.setState({ show: true });
        };
        this.handleHide = () => {
            this.setState({ show: false });
        };
    }

    componentDidMount = () => { this.getAllDataForReport(); }

    getAllDataForReport() {
        getAllOrders().then(
            response => {
                console.log(" All Orders =", response);
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

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleClickReportPerformedOrders() {
        let filteredList = this.state.data.filter((value) => {
            let dDate = new Date(value.dtorder);
            let bDate = new Date(this.state.beginDate);
            let eDate = new Date(this.state.endDate);
            dDate.setHours(0, 0, 0, 0);
            bDate.setHours(0, 0, 0, 0);
            eDate.setHours(0, 0, 0, 0);

            if ((dDate.getDate() >= bDate.getDate()) && (dDate.getDate() <= eDate.getDate())) return true
            else return false;
        }
        );
        console.log("filter=", filteredList);
        let ready_count = filteredList.filter(v => v.ready === true).length;
        let off_count = filteredList.filter(v => v.ready === false).length;

       
        let item = {
            b: this.state.beginDate,
            e: this.state.endDate,
            data: filteredList,
            r_count: ready_count,
            off: off_count,
        }
        console.log("item=", item);

        this.setState({
            reportName: "Отчет статистики выполненных/невыполненных заявок"
        });
        this.handleShow();
        this.setState({
            dataForReport: item
        });



    }
    handleClickReportClient() {

        let filteredList = this.state.data.filter((value) => {
            let dDate = new Date(value.dtorder);
            let bDate = new Date(this.state.beginDate);
            let eDate = new Date(this.state.endDate);
            dDate.setHours(0, 0, 0, 0);
            bDate.setHours(0, 0, 0, 0);
            eDate.setHours(0, 0, 0, 0);

            if ((dDate.getDate() >= bDate.getDate()) && (dDate.getDate() <= eDate.getDate())) return true
            else return false;
        }
        );

        let users = filteredList.map(v => v.iduser);
        let uniqUsers = [...new Set(users.map(item => item.name))];
        console.log("user=", uniqUsers);

        let array = [];
        let func = (arr, nm, array) => {
            let v = {
                name: nm,
                col: 0,
                r: 0,
                o: 0
            };
            const allorder = arr.filter((value) => value.iduser.name === nm).length;
            const allr = arr.filter((value) => value.iduser.name === nm && value.ready === true).length;
            const alloff = arr.filter((value) => value.iduser.name === nm && value.ready === false).length;
            v.col = allorder;
            v.r = allr;
            v.o = alloff;
            return array.push(v);
        };

        uniqUsers.forEach((v) => func(filteredList, v, array));
        console.log(array);

        let item = {
            b: this.state.beginDate,
            e: this.state.endDate,
            data: array,
        }
        console.log(item);


        this.setState({
            dataForReport: item,
            reportName: "Статистика по обслуживанию клиентов"
        });
        this.handleShow();
    }


    render() {

        let report = [];

        if (this.state.reportName === "Отчет статистики выполненных/невыполненных заявок")
            report = [<PDFViewer key="pdf" height="700" width="770" ><ReportPerformed value={this.state.dataForReport} ></ReportPerformed></PDFViewer>]
        if (this.state.reportName === "Статистика по обслуживанию клиентов")
            report = [<PDFViewer key="pdf" height="700" width="770" ><ReportClient value={this.state.dataForReport} ></ReportClient></PDFViewer>];

        let modal = [
            <Modal key="modalPDF"
                size="lg"
                show={this.state.show}
                onHide={this.handleHide} >
                <Modal.Header closeButton>
                    <Modal.Title id="example-custom-modal-styling-title">{this.state.reportName}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {report}
                </Modal.Body>
            </Modal>
        ]


        return (
            <div>
                {modal}
                <p>Это часть отчетов</p>
                <h4>Формирование отчетов по выполненым/неполненым заявкам</h4>
                <Form>
                    <Form.Group controlId="beginDate">
                        <Form.Label>Выберете дату начала периода </Form.Label>
                        <Form.Control onChange={this.handleChange} name="beginDate" type="date" />

                    </Form.Group>
                    <Form.Group controlId="endDate">
                        <Form.Label>Выберете дату конца периода </Form.Label>
                        <Form.Control onChange={this.handleChange} name="endDate" type="date" />

                    </Form.Group>
                    <Button onClick={this.handleClickReportPerformedOrders} >Сформировать отчет</Button>
                </Form>
                <hr></hr>
                <h4>Формирование статистики по обслуживанию клиентов</h4>
                <Form>
                    <Form.Group controlId="beginDate">
                        <Form.Label>Выберете дату начала периода </Form.Label>
                        <Form.Control onChange={this.handleChange} name="beginDate" type="date" />

                    </Form.Group>
                    <Form.Group controlId="endDate">
                        <Form.Label>Выберете дату конца периода </Form.Label>
                        <Form.Control onChange={this.handleChange} name="endDate" type="date" />

                    </Form.Group>
                    <Button onClick={this.handleClickReportClient} >Сформировать отчет</Button>
                </Form>


            </div>
        );
    }
}

export default Report;