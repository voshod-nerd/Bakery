import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { ACCESS_TOKEN } from '../../constants';
import { Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { login } from '../../util/APIUtils';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        const values = {
            usernameOrEmail: this.state.username,
            password: this.state.password
        }
        console.log(values);

        const loginRequest = Object.assign({}, values);
        login(loginRequest)
            .then(response => {
                localStorage.setItem(ACCESS_TOKEN, response.accessToken);                
                this.props.onLogin();
            }).catch(error => {
                if (error.status === 401) {
                    toast.error('Неверный логин и/или пароль', {
                        position: "top-center",
                        autoClose: false,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        type: 'error'
                    });

                } else {
                    toast.error('Чтото не так с серверром. Попробуйте чуть позже', {
                        position: "top-center",
                        autoClose: false,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        type: 'error'
                    });

                }
            });


    }

    validateForm() {
        return this.state.username.length > 0 && this.state.password.length > 0;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
       
    }

    render() {
        return (
            <div >
                <p>Введите логин  и пароль для входа в личный кабинет</p>

                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="username">
                        <Form.Label>Адрес электронной почты или ваше имя пользователя</Form.Label>
                        <Form.Control required value={this.state.username} onChange={this.handleChange} name="username" type="text" placeholder="Enter email or username" />
                        <Form.Control.Feedback>Все хорошо</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="password">
                        <Form.Label>Пароль</Form.Label>
                        <Form.Control required value={this.state.password} onChange={this.handleChange} name="password" type="password" placeholder="Password" />

                    </Form.Group>

                    <Button variant="primary" disabled={!this.validateForm()} type="submit">
                        Войти
                </Button>
                    или <Link to="/signup">Зарегистрируйтесь</Link>
                </Form>
            </div>
        );
    }


}

export default Login;