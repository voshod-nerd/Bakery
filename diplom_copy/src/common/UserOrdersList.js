import React, { Component } from 'react'
import { Table, Form, Modal, Button } from 'react-bootstrap';
import { getAllOrdersByUser } from '../util/APIUtils';
import { Document, Page, Text, View, StyleSheet, PDFViewer, List, Font } from '@react-pdf/renderer';
import logo from "./fonts/arial.ttf";

Font.register({ family: 'Roboto', src: logo });
const styles = StyleSheet.create({
    page: {
        flexDirection: "row"
    },
    body: {
        paddingTop: 35,
        paddingBottom: 45,
        paddingHorizontal: 35,
    },
    section: {
        flexGrow: 1
    },
    title: {
        fontSize: 18,
        textAlign: 'center',
        fontFamily: 'Roboto',
    },
    subtitle: {
        fontSize: 14,
        textAlign: 'center',
        margin: 12,
        fontFamily: 'Roboto',
    },
    lefthh3: {
        fontSize: 10,
        textAlign: 'left',
        marginBottom: 5,
        maginLeft: 50,
        maginRigth: 80,
        fontFamily: 'Roboto',
    },
    centrhh3: {
        fontSize: 10,
        textAlign: 'center',
        marginBottom: 5,
        fontFamily: 'Roboto',
    },
    table: { display: "table", width: "auto", borderStyle: "solid", borderWidth: 1, borderRightWidth: 0, borderBottomWidth: 0 },
    tableRow: { margin: "auto", flexDirection: "row" },
    tableCol: { width: "20%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0 },
    tableCell: { margin: "auto", marginTop: 1, fontSize: 8, fontFamily: "Roboto" }
});

const RednerPDF = (data) => (
    <Document>
        <Page size="A4" style={styles.body} wrap key="1" >
            <View style={styles.section}>
                <Text style={styles.title}>Договор № {data.value.number}</Text>
                <Text style={styles.centrhh3}>поставки товара</Text>
                <Text style={styles.lefthh3}>ТОО "Первая пекарня",именуемая в дальнейшнем "Поставщик" в лице ИП Анар Кенжеева действующего на основании с одной стороны и {data.value.iduser.name} именуемым в дальнейшнем "Покупатель" с другой стороны заключили настоящий договор о нижеследующем.</Text>
                <Text style={styles.subtitle}>1 Предмет договора</Text>
                <Text style={styles.lefthh3}>1.1 Поставщик обязуется передать в собственность Покупателю, а Покупатель принять и оплатить   в количестве и ассортименте согласно принятым Поставщиком заказам Покупателя.</Text>
                <Text style={styles.lefthh3}>1.2. Ассортимент Товара и цена, по которой Поставщик обязуется поставлять Товар в рамках настоящего договора, указаны в Спецификации (Приложение No. 1 к договору), являющейся неотъемлемой частью настоящего договора</Text>
                <Text style={styles.lefthh3} >1.3. В Спецификации может быть указан срок, в течение которого будет действовать достигнутое сторонами соглашение о цене Товара.</Text>
                <Text style={styles.lefthh3}>1.4. Количество и цена поставленного Товара указываются в накладных</Text>
                <Text style={styles.lefthh3}>1.5. Право собственности на Товар переходит к Покупателю в момент передачи Товара Покупателю или перевозчику</Text>
                <Text style={styles.lefthh3}>1.6. Риск случайной гибели несет собственник Товара в соответствии с действующим гражданским законодательством РФ</Text>
                <Text style={styles.subtitle} >2. ЦЕНА ТОВАРА</Text>
                <Text style={styles.lefthh3}>2.1. После получения заказа Покупателя и при наличии необходимого количества Товара на складе Поставщик выставляет Покупателю счет на оплату Товара.</Text>
                <Text style={styles.lefthh3}>2.2. Цена Товара указана в накладных и действительна в течение срока, указанного в Спецификации (Приложение No. 1 к договору), а если срок не указан - в течение срока действия настоящего договора или до подписания сторонами нового соглашения о цене</Text>
                <Text style={styles.lefthh3}>2.3. Цена Товара указывается в условных единицах и включает в себя НДС - 20%.</Text>
                <Text style={styles.lefthh3}>2.4. Оплата производится Покупателем в рублях по курсу ЦБ РФ на дату получения заявки от Покупателя плюс установленный настоящим договором в зависимости от размера отсрочки платежа процент.</Text>
                <Text style={styles.lefthh3}>2.5. По истечении срока действия соглашения о цене, указанного в Спецификации, Поставщик уведомляет Покупателя о новых ценах на Товар, которые закрепляются в дополнительном соглашении сторон. В случае если Покупатель не соглашается с новыми ценами на Товар, договор считается расторгнутым в момент получения Поставщиком письменного отказа Покупателя от подписания дополнительного соглашения о цене либо, при отсутствии письменного отказа, по истечении 30 дней с момента направления Поставщиком предложения с новыми ценами.</Text>
                <Text style={styles.subtitle}>3. УСЛОВИЯ ПОСТАВКИ ТОВАРА</Text>
                <Text style={styles.lefthh3}>3.1. Поставка Товара осуществляется партиями на основании заказов Покупателя и при наличии соответствующего Товара на складе Поставщика</Text>
                <Text style={styles.lefthh3}>3.2. Заказ Покупателя должен содержать наименование (ассортимент), количество Товара, условия поставки и адрес, по которому должен быть поставлен Товар</Text>
                <Text style={styles.lefthh3}>3.4. Указанный в п.п. 5.1 - 5.2 настоящего договора заказ Покупателя может быть сделан как письменно, в том числе по факсу или по электронной почте, так и по телефону.</Text>
                <Text style={styles.lefthh3}>3.5. Обязательства Поставщика по поставке Товара считаются выполненными с момента передачи Товара уполномоченному представителю Покупателя или перевозчику груза по железной дороге, автотранспортом, авиа- или речным транспортом, что подтверждается датой, указанной в товарно - транспортной накладной</Text>
                <Text style={styles.lefthh3}>3.6. Упаковка Товара должна обеспечивать его сохранность при транспортировке при условии бережного с ним обращения.</Text>
                <Text style={styles.subtitle}></Text>
                <Text style={styles.subtitle}></Text>
                

                <Text style={styles.subtitle}>4 ЗАКЛЮЧИТЕЛЬНЫЕ ПОЛОЖЕНИЯ</Text>
                <Text style={styles.lefthh3}>4.1. Настоящий договор составлен в двух экземплярах, имеющих одинаковую юридическую силу, по одному экземпляру для каждой из сторон.</Text>
                <Text style={styles.lefthh3}>4.2. Любые изменения и дополнения к настоящему договору действительны при условии, если они совершены в письменной форме, подписаны надлежаще уполномоченными на то представителями сторон и скреплены печатями</Text>
            </View>
        </Page>
        <Page size="A4" style={styles.body} key="2" wrap>
            <View style={styles.section}>
                <Text style={styles.title}>Приложение №1</Text>
                <Text style={styles.centrhh3}>список товара</Text>
                <View style={styles.section}>
                <View style={styles.table}>
                <View  style={styles.tableRow}>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>№</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>Наименование товара</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>Цена товара</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>Вес</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>Количество</Text>
                            </View>


                        </View>
                    {data.value.listGoods.map((el, index) => (
                        <View key={"ind=" + index} style={styles.tableRow}>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>{index}</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>{el.name}</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>{el.price}</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>{el.weight}</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>{el.count}</Text>
                            </View>
                        </View>
                    ))}
                </View>
                <Text style={styles.lefthh3}></Text>
                <Text style={styles.lefthh3}></Text>
                <Text style={styles.lefthh3}></Text>
                <Text style={styles.lefthh3}>Поставщик: ИП Анар Кенжеева</Text>
                <Text style={styles.lefthh3}>Покупатель: {data.value.iduser.name}</Text>
                </View>
            </View>
        </Page>
    </Document>
);

class UserOrdersList extends Component {

    constructor(props) {
        super(props);
        console.log("This is ListOrders");
        this.state = {
            listOrders: [],
            item: []
        }
        this.handleHidePDF = this.handleHidePDF.bind(this);
        this.handleShowPDF = this.handleShowPDF.bind(this);
    }

    handleShowPDF = (value) => {
        console.log("Item=", value);
        this.setState({ showPdf: true, item: value });
    };
    handleHidePDF = () => {
        this.setState({ showPdf: false });
    };


    componentDidMount() {
        getAllOrdersByUser().then(
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

        let modalPdf = [];
        if (this.state.listOrders.length > 0) modalPdf = [<PDFViewer key="pdf" height="700" width="770" ><RednerPDF value={this.state.item} ></RednerPDF></PDFViewer>]

        let modal = [
            <Modal key="modalPDF"
                size="lg"
                show={this.state.showPdf}
                onHide={this.handleHidePDF} >
                <Modal.Header closeButton>
                    <Modal.Title id="example-custom-modal-styling-title">
                        Cформированный маршрутный лист
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {modalPdf}
                </Modal.Body>
            </Modal>
        ];



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
                        <hr />
                        <Button onClick={() => { this.handleShowPDF(value) }} >Сформировать договор</Button>

                    </Form.Group>



                ))}

            </Form>];

        }


        return (
            <div>
                {modal}
                <h4>Список ваших заказов</h4>
                {content}
            </div>
        );
    }

}
export default UserOrdersList;