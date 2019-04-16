import React, { Component } from 'react';
import { signup, checkUsernameAvailability, checkEmailAvailability } from '../../util/APIUtils';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import {
    NAME_MIN_LENGTH, NAME_MAX_LENGTH,
    USERNAME_MIN_LENGTH, USERNAME_MAX_LENGTH,
    EMAIL_MAX_LENGTH,
    PASSWORD_MIN_LENGTH, PASSWORD_MAX_LENGTH
} from '../../constants';

import { Button, FormControl } from 'react-bootstrap';
import { Form } from 'react-bootstrap';


class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: {
                value: '',

            },
            username: {
                value: ''
            },
            email: {
                value: ''
            },
            password: {
                value: ''
            }
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validateUsernameAvailability = this.validateUsernameAvailability.bind(this);
        this.validateEmailAvailability = this.validateEmailAvailability.bind(this);
        this.isFormInvalid = this.isFormInvalid.bind(this);
    }


    handleInputChange(event, validationFun) {
        const target = event.target;
        const inputName = target.name;
        const inputValue = target.value;

        this.setState({
            [inputName]: {
                value: inputValue,
                ...validationFun(inputValue)
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        const signupRequest = {
            name: this.state.name.value,
            email: this.state.email.value,
            username: this.state.username.value,
            password: this.state.password.value
        };
        console.log(signupRequest);
        signup(signupRequest)
            .then(response => {
                toast.info('Вы успешно зарегистрированы', {
                    position: "top-center",
                    autoClose: false,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    type: 'error'
                });
                this.props.history.push("/cabinet");
            }).catch(error => {
                toast.error('Данный пользователь уже есть или вы ввели неверные данные', {
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

    isFormInvalid() {
        return !(this.state.name.validateStatus === 'success' &&
            this.state.username.validateStatus === 'success' &&
            this.state.email.validateStatus === 'success' &&
            this.state.password.validateStatus === 'success'
        );
    }




    render() {
        return (
            <div >
                <p> Введите данные для регистрации</p>
                <Form onSubmit={this.handleSubmit} >
                    <Form.Group controlId="formBasicName">
                        <Form.Label>Имя</Form.Label>
                        <Form.Control type="text" name="name" placeholder="Введите имя" value={this.state.name.value} onChange={(event) => this.handleInputChange(event, this.validateName)} />
                    </Form.Group>
                    <Form.Group controlId="formBasicUserName">
                        <Form.Label>Имя пользователя</Form.Label>
                        <FormControl.Feedback type={(this.state.username.validateStatus === 'error') ? "error" : "valid"} >Имя пользователя занято</FormControl.Feedback>
                        <Form.Control value={this.state.username.value} isValid={this.state.username.validateStatus === 'success'} isInvalid={this.state.username.validateStatus === 'error'} onBlur={this.validateUsernameAvailability} name="username" onChange={(event) => this.handleInputChange(event, this.validateUsername)} type="text" placeholder="Введите имя пользователя" />
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail"  >
                        <Form.Label>Адрес электронной почты</Form.Label>
                        <FormControl.Feedback type={(this.state.email.validateStatus === 'error') ? "error" : "valid"} >Адрес электронной почты занят</FormControl.Feedback>
                        <Form.Control isValid={this.state.email.validateStatus === 'success'} isInvalid={this.state.email.validateStatus === 'error'} name="email" onBlur={this.validateEmailAvailability} value={this.state.email.value} onChange={(event) => this.handleInputChange(event, this.validateEmail)} type="email" placeholder="Введите адрес электронной почты" />
                        <Form.Text className="text-muted">
                            Мы никому не передаем ваш адрес  электронной почты
                    </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Пароль</Form.Label>
                        <FormControl.Feedback type={(this.state.password.validateStatus === 'error') ? "error" : "valid"} >{this.state.password.errorMsg}</FormControl.Feedback>
                        <Form.Control value={this.state.password.value} name="password" onChange={(event) => this.handleInputChange(event, this.validatePassword)} type="password" placeholder="Пароль" />
                    </Form.Group>

                    <Button variant="primary" type="submit"  >
                        Регистрация
                </Button>
                </Form>
            </div >
        );
    }


    // Validation Functions

    validateName = (name) => {
        if (name.length < NAME_MIN_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `Name is too short (Minimum ${NAME_MIN_LENGTH} characters needed.)`
            }
        } else if (name.length > NAME_MAX_LENGTH) {
            return {
                validationStatus: 'error',
                errorMsg: `Name is too long (Maximum ${NAME_MAX_LENGTH} characters allowed.)`
            }
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null,
            };
        }
    }

    validateEmail = (email) => {

        console.log('validateEmail');

        if (!email) {
            return {
                validateStatus: 'error',
                errorMsg: 'Email may not be empty'
            }
        }

        const EMAIL_REGEX = RegExp('[^@ ]+@[^@ ]+\\.[^@ ]+');
        if (!EMAIL_REGEX.test(email)) {
            return {
                validateStatus: 'error',
                errorMsg: 'Email not valid'
            }
        }

        if (email.length > EMAIL_MAX_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `Email is too long (Maximum ${EMAIL_MAX_LENGTH} characters allowed)`
            }
        }

        return {
            validateStatus: null,
            errorMsg: null
        }


    }

    validateUsername = (username) => {
        if (username.length < USERNAME_MIN_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `Username is too short (Minimum ${USERNAME_MIN_LENGTH} characters needed.)`
            }
        } else if (username.length > USERNAME_MAX_LENGTH) {
            return {
                validationStatus: 'error',
                errorMsg: `Username is too long (Maximum ${USERNAME_MAX_LENGTH} characters allowed.)`
            }
        } else {
            return {
                validateStatus: null,
                errorMsg: null
            }
        }
    }

    validateUsernameAvailability() {
        // First check for client side errors in username
        const usernameValue = this.state.username.value;
        const usernameValidation = this.validateUsername(usernameValue);

        if (usernameValidation.validateStatus === 'error') {
            this.setState({
                username: {
                    value: usernameValue,
                    ...usernameValidation
                }
            });
            return;
        }

        this.setState({
            username: {
                value: usernameValue,
                validateStatus: 'validating',
                errorMsg: null
            }
        });

        checkUsernameAvailability(usernameValue)
            .then(response => {
                if (response.available) {
                    this.setState({
                        username: {
                            value: usernameValue,
                            validateStatus: 'success',
                            errorMsg: null
                        }
                    });
                } else {
                    this.setState({
                        username: {
                            value: usernameValue,
                            validateStatus: 'error',
                            errorMsg: 'This username is already taken'
                        }
                    });
                }
            }).catch(error => {
                // Marking validateStatus as success, Form will be recchecked at server
                this.setState({
                    username: {
                        value: usernameValue,
                        validateStatus: 'success',
                        errorMsg: null
                    }
                });
            });
    }

    validateEmailAvailability() {
        // First check for client side errors in email
        const emailValue = this.state.email.value;
        const emailValidation = this.validateEmail(emailValue);


        console.log("validateEmailAvailability");

        //console.log(emailValidation.validateStatus);

        if (emailValidation.validateStatus === 'error') {
            console.log(emailValidation.validateStatus);
            this.setState({
                email: {
                    value: emailValue,
                    ...emailValidation
                }
            });
            return;
        }

        this.setState({
            email: {
                value: emailValue,
                validateStatus: 'success',
                errorMsg: null
            }
        });

        checkEmailAvailability(emailValue)
            .then(response => {
                if (response.available) {

                    this.setState({
                        email: {
                            value: emailValue,
                            validateStatus: 'success',
                            errorMsg: null
                        }
                    });
                } else {

                    console.log('This Email is already registered');
                    this.setState({
                        email: {
                            value: emailValue,
                            validateStatus: 'error',
                            errorMsg: 'This Email is already registered'
                        }
                    });
                    console.log(this.state.email.validateStatus);
                }
            }).catch(error => {
                // Marking validateStatus as success, Form will be recchecked at server
                this.setState({
                    email: {
                        value: emailValue,
                        validateStatus: 'success',
                        errorMsg: null
                    }
                });
            });
    }

    validatePassword = (password) => {
        if (password.length < PASSWORD_MIN_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `Password is too short (Minimum ${PASSWORD_MIN_LENGTH} characters needed.)`
            }
        } else if (password.length > PASSWORD_MAX_LENGTH) {
            return {
                validationStatus: 'error',
                errorMsg: `Password is too long (Maximum ${PASSWORD_MAX_LENGTH} characters allowed.)`
            }
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null,
            };
        }
    }


}


export default Signup;