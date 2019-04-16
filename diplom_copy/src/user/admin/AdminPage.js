import React, { Component } from 'react';
import { getUserProfile, getCurrentUser } from '../../util/APIUtils';
import LoadingIndicator from '../../common/LoadingIndicator';
import NotFound from '../../common/NotFound';
import { Nav, ListGroup } from 'react-bootstrap';

class AdminPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: null,
            isLoading: false
        }
        this.loadUserProfile = this.loadUserProfile.bind(this);
    }

    loadUserProfile(username) {
        this.setState({
            isLoading: true
        });
        getCurrentUser()
            .then(response => {
                console.log(response);
                this.setState({
                    user: response,
                    isLoading: false
                });
            }).catch(error => {
                if (error.status === 404) {
                    this.setState({
                        notFound: true,
                        isLoading: false
                    });
                } else {
                    this.setState({
                        serverError: true,
                        isLoading: false
                    });
                }
            });
    }

    componentDidMount() {
        const username = this.props.match.params.username;
        this.loadUserProfile(username);
    }

    componentDidUpdate(nextProps) {
        if (this.props.match.params.username !== nextProps.match.params.username) {
            this.loadUserProfile(nextProps.match.params.username);
        }
    }


    render() {

        if (this.state.isLoading) {
            return <LoadingIndicator />;
        }


        if (this.state.notFound) {
            return <NotFound />;
        }

        if (this.state.user) return (
            <div>
                <p >Вы зашли как администоратор</p>
                <p >{this.state.user.username}</p>
                <ListGroup>
                    <ListGroup.Item action href="/addcontent">Добавление статей</ListGroup.Item>
                    <ListGroup.Item action  variant="primary">Редактирование статей</ListGroup.Item>
                    <ListGroup.Item action>No style</ListGroup.Item>
                    <ListGroup.Item action variant="primary">Primary</ListGroup.Item>
                    <ListGroup.Item action>No style</ListGroup.Item>
                    <ListGroup.Item action variant="primary">Primary</ListGroup.Item>
                    <ListGroup.Item action>No style</ListGroup.Item>
                    <ListGroup.Item action variant="primary">Primary</ListGroup.Item>
                </ListGroup>
            </div>
        );




        return (
            <div>
                {
                    this.state.user ? (
                        <p >Hello</p> ,
                        <p >Вы зашли как администоратор</p> ,
                        <p >Вы зашли как администоратор</p> ,
                        <p >{this.state.user.name}</p> ,
                        <p >{this.state.user.username}</p>
                    ) : null
                }
            </div>

        );


    }




}

export default AdminPage;