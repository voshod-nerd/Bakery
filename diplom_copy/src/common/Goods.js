import React, { Component } from 'react'
import { InputGroup, FormControl, Breadcrumb, Card, Button } from 'react-bootstrap';
import { addGoods } from "../redux/actions/index";
import { connect } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
function mapDispatchToProps(dispatch) {
    return {
        addGoods: item => dispatch(addGoods(item)),
    };
}


class Goods extends Component {

    constructor(props) {
        super(props);
        console.log('This is Goods');

        this.state = {
            initialItems: [
                {   
                    id:1,
                    name: "Хлеб бездрожевой",
                    price: 45,
                    weigtht: 400,
                    description: "Состав: мука пшеничная высший сорт, закваска, кориандр, соль, сахар, вода, тыквенные семечки. Бездрожжевой хлеб легко усваивается и способствует более активной работе кишечника. Тыквенные семечки - природный кладезь полезных веществ. Кориандр придает этому хлебу неповторимый аромат."
                },
                { 
                    id:2,
                    name: "Хлеб дрожевой",
                    price: 50,
                    weigtht: 450,
                    description: "Состав: мука пшеничная высший сорт, закваска, кориандр, соль, сахар, вода, тыквенные семечки. Дрожжевой хлеб легко усваивается и способствует более активной работе кишечника. Тыквенные семечки - природный кладезь полезных веществ. Кориандр придает этому хлебу неповторимый аромат."
                },
                {
                    id:3,
                    name: "Батон с изюмом",
                    price: 50,
                    weigtht: 450,
                    description: "Тесто дрожжевое, изюм. Похрустеть сухариками - это особое удовольствие! А похрустеть сухариками с изюмом - удовольствие вдвойне! Впрочем, можно и не хрустеть, а макать в крепкий сладкий чай. вы делали так в детстве? Почему не повторить этот прекрасный опыт?"
                },
                {
                    id:4, 
                    name: "Сухарики",
                    price: 50,
                    weigtht: 450,
                    description: "Состав: тесто дрожжевое Хрустящие домашние сухарики - чудесная добавка к супчику или бульону. Можно сушить самим, а можно купить у нас - сэкономите время! "
                },
                {
                    id:5,
                    name: "Ромашка с кунжутом",
                    price: 50,
                    weigtht: 230,
                    description: "Состав: кунжут, мука пшеничная высший сорт, сахар, дрожжи, соль, вода, масло сливочное, яйцо. Разрежьте каждую булочку горизонтально пополам, положите между слоями сливочное масло, налейте себе крепкого сладкого чаю - и наслаждайтесь! В такие моменты жизнь прекрасна!  "
                },

            ],
            items: []
        }
        this.filterList = this.filterList.bind(this);
        this.handleClick = this.handleClick.bind(this);
       // this.handleLogin = this.handleLogin.bind(this);
    }


    handleClick(item) {
        this.props.addGoods(item);
        toast.info('Вы добавили товар в корзину', {
            position: "top-center",
            autoClose: false,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            type: 'error'
          });
    }


    componentWillMount() {
        this.setState({ items: this.state.initialItems })
    }

    filterList(event) {
        var updatedList = this.state.initialItems;
        updatedList = updatedList.filter(function (item) {
            return item.name.toLowerCase().search(
                event.target.value.toLowerCase()) !== -1;
        });
        this.setState({ items: updatedList });
    }

    render() {
        console.log("Content of State");
        console.log(this.state.items);

        const list = this.state.items.map((item) => (
            <div key={item.id}>
                <br></br>
                <Card   >
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Body>
                        <Card.Text>
                            {item.description}
                        </Card.Text>
                        <Card.Text>
                            Цена: {item.price} р.
                        </Card.Text>
                        <Card.Text>
                            Вес :{item.weigtht} гр.
                        </Card.Text>
                        <Button variant="outline-primary"  onClick={() => { this.handleClick(item) }} 	 >Добавить в корзину</Button>
                    </Card.Body>
                </Card>
            </div>
        ));

        return (
            <div>

                <Breadcrumb>
                    <Breadcrumb.Item active>Cписок всех товаров нашей пекарни</Breadcrumb.Item>
                </Breadcrumb>
                <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                        <InputGroup.Text id="basic-addon1"></InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl onChange={this.filterList}
                        placeholder="Поиск по имени товара"
                        aria-label="Название продукта"
                        aria-describedby="basic-addon1"
                    />
                </InputGroup>
                <ul>
                    {list}
                </ul>
            </div>
        );
    }
}


const List = (list) => {
    return (<ul>
        {
            list.map(function (item) {
                return <li key={item}>{item}</li>
            })
        }
    </ul>);
};



//const App = connect(null, mapDispatchToProps)(Apps);
//export default withRouter(App);
export default connect(null, mapDispatchToProps)(Goods);;