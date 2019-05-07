import React, { Component } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { getAllUsers, getAllNotify, createNotify } from '../util/APIUtils';
import { Form, Button, InputGroup, FormControl } from 'react-bootstrap';
import { toast } from 'react-toastify';
class Send extends Component {
    constructor(props) {
        super(props);
        console.log("This is Send");
        this.state = {
            content: '',
            users: [],
            message: '',
            item: {
                id: '',
                name: '',
                cnt: "",
                dtsend: "",
                list: []

            }
        };
        this.handleEditorChange = this.handleEditorChange.bind(this);
        this.getAllClient = this.getAllClient.bind(this);
        this.handleClickSend = this.handleClickSend.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleEditorChange(content) {
        
        let item = { ...this.state.item };
        item['cnt'] = content;
        this.setState({ item });
    }


    handleClickSend() {
        let getUserById = (id) => {  
            return this.state.users.find(v => v.id === parseInt(id));
        }

        let lst = this.state.item.list.map((v) => { let el = getUserById(v); console.log(el); return el; });
        console.log("lst", lst);

        let sendNotify = this.state.item;
        sendNotify.list = lst;
        createNotify(sendNotify)
            .then(
                response => {
                    toast.info('Рассылка успешно создана', {
                        position: "top-center",
                        autoClose: false,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        type: 'error'
                    });
                    this.getAllClient();
                }
            )
            .catch(error => {
               
                toast.error('Создать рассылку не удалось', {
                    position: "top-center",
                    autoClose: false,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    type: 'error'
                });
            });
    }

    getAllClient() {
        getAllUsers().then(
            response => {
                let client = response.filter(v => v.roles[0] === "ROLE_USER");
                console.log(client);
                this.setState({
                    users: client,
                })
            }

        ).catch(error => {
            this.setState({
                isLoading: false
            });
        });

    }


    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const options = event.target.options;
        const name = target.name;
        let item = { ...this.state.item };
        item[name] = value;
        if (name === "list") {
            item.list = [];
            for (var i = 0, l = options.length; i < l; i++) {
                if (options[i].selected) {
                    item.list.push(options[i].value);

                }
            }
        }
        this.setState({ item });
    }


    componentDidMount() {
        this.getAllClient();
    }


    render() {

        const list = this.state.users;
        return (
            <div>
                <h3>Рассылки рекламный и акционных сообщений</h3>
                <p>Создание рекламной рассылки</p>

                <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                        <InputGroup.Text id="basic-addon1"></InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl onChange={this.handleChange} value={this.state.item['name']} name="name"
                        placeholder="Введите название рассылки"

                        aria-describedby="basic-addon1"
                    />
                </InputGroup>


                <Editor value={this.state.content} onEditorChange={this.handleEditorChange} />
                <p>Список клиентов на отправку</p>
                <Form.Control as="select" onChange={this.handleChange} multiple name="list"  >
                    {
                        list.map((item) => (
                            <option key={item.id} value={item.id} >{item.name} {item.email}</option>

                        ))
                    }
                </Form.Control>
                <Button onClick={() => { this.handleClickSend() }} >Сделать рассылку</Button>

                <br></br>

                <hr />
                <p>Прошлые рассылки</p>


            </div>
        );
    }

}

export default Send;