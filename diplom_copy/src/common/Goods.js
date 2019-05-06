import React, { Component } from 'react'
import { InputGroup, FormControl, Breadcrumb, Card, Button } from 'react-bootstrap';
import { addGoods } from "../redux/actions/index";
import { connect } from "react-redux";
import { toast } from 'react-toastify';
import { getAllGoods } from '../util/APIUtils';
function mapDispatchToProps(dispatch) {
    return {
        addGoods: item => dispatch(addGoods(item)),
    };
}

const uuidv1 = require('uuid/v1');


class Goods extends Component {

    

    constructor(props) {
        super(props);
        console.log('This is Goods');

        this.state = {
            isLoading: false,
            initialItems: [],
            items: []
        }
        this.filterList = this.filterList.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.updateListGoods = this.updateListGoods.bind(this);
    }



    componentDidMount() {
        this.updateListGoods();
    }

    updateListGoods() {
        console.log("Update Update Update");
        this.setState({ isLoading: true });

        getAllGoods().then(
            response => this.setState({ items: response, initialItems: response, isLoading: false })
        ).catch(error => {
            this.setState({
                isLoading: false
            });
        });
    }

    handleClick(item) {
      
        item.uuid =  uuidv1() ;
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
                        <Button variant="outline-primary" onClick={() => { this.handleClick(item) }} 	 >Добавить в корзину</Button>
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

export default connect(null, mapDispatchToProps)(Goods);;