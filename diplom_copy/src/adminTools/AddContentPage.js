import React, { Component } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { addTopic, getTopicsasNode } from '../util/APIUtils';
import 'react-toastify/dist/ReactToastify.min.css';
import { toast } from 'react-toastify';


class AddContentPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            isNode: false,
            parentid: null,
            editorState: EditorState.createEmpty(),
            isLoadingnodeList: true,
            TopicsNodeList: []
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onEditorStateChange = this.onEditorStateChange.bind(this);

    }

    loadTopicNodeList() {
        this.setState({
            isLoadingnodeList: true
        });
        getTopicsasNode()
            .then(response => {
                console.log(response);
                this.setState({
                    TopicsNodeList: response,
                    isLoadingnodeList: false
                });
            }).catch(error => {
                if (error.status === 404) {
                    this.setState({
                        notFound: true,
                        isLoadingnodeList: false
                    });
                } else {
                    this.setState({
                        serverError: true,
                        isLoadingnodeList: false
                    });
                }
            });
    }


    componentDidMount() {
        this.loadTopicNodeList();

        //const username = this.props.match.params.username;
        //this.loadUserProfile(username);
    }

    componentDidUpdate(nextProps) {
        // if (this.props.match.params.username !== nextProps.match.params.username) {
        //     this.loadUserProfile(nextProps.match.params.username);
        // }
    }


    onEditorStateChange = (editorState) => {
        console.log(this.state);
        this.setState({
            editorState,
        });


        console.log(this.state.editorState);

    };

    handleChange = event => {

        if (event.target.id === 'isNode') {
            this.setState({
                ['isNode']: event.target.checked
            });
          //  return;
        }
       /* if (event.target.id === 'parentid') {
            this.setState({
                [event.target.id]: event.target.key
            });
         return;
        }
         */
         else 
       
            this.setState({
                [event.target.id]: event.target.value
            });
        console.log(this.state);
    }


    handleSubmit(event) {
        const rawContentState = convertToRaw(this.state.editorState.getCurrentContent());
        const markup = draftToHtml(
            rawContentState
        );

        event.preventDefault();
        const topicRequest = {
            name: this.state.name,
            nodeis: this.state.isNode,
            contentText: markup,
            parentid:this.state.parentid

        };

        console.log("Post sent");
        console.log(JSON.stringify(topicRequest));
        addTopic(topicRequest)
            .then(response => {
                toast.info('Данная статья  успешно сохранена!', {
                    position: "top-center",
                    autoClose: false,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    type: 'error'
                });

                this.props.history.push("/admintools");
            }).catch(error => {
                toast.error('Ошибка с сохранением данных', {
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


    createOptions = () =>
    this.state.TopicsNodeList.length
        ? this.state.TopicsNodeList.map(data => (
            <option key={data.id} value={data.id}>
                {data.name}
            </option>
        ))
        : "";



    render() {
        const { editorState } = this.state;
        console.log(this.state);

        let selectEl;
        // if (this.state.notFound) {
        //    return <NotFound />;
        // }

     /*   if (this.state.isLoadingnodeList) {
            selectEl = [
                <Form.Control as="select">
                   {this.createOptions()}
                </Form.Control>

            ];
        }
        else {
            selectEl = [

                <div></div>

            ];
        }
    */

        




        return (
            <div>
                <br></br>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="name" >
                        <Form.Label>Название статьи</Form.Label>
                        <Form.Control required onChange={this.handleChange} type="text" placeholder="введите названи статьи или новости" />
                    </Form.Group>
                    <Form.Group controlId="parentid">
                        <Form.Label>Выберете категорию статьи</Form.Label>
                        <Form.Control as="select" onChange={this.handleChange}>
                        {this.createOptions()}
                        </Form.Control>

                    </Form.Group>
                    <Form.Group controlId="isNode" >
                        <Form.Check name='isNode' value={this.state.isNode} type="checkbox" onChange={this.handleChange} label="Является узлом" />
                    </Form.Group>
                    <Editor
                        editorState={editorState}
                        toolbarClassName="toolbarClassName"
                        wrapperClassName="wrapperClassName"
                        editorClassName="editorClassName"
                        onEditorStateChange={this.onEditorStateChange}
                    />
                    <Button variant="primary" type="submit">
                        Сохранить
                </Button>
                </Form>
            </div>
        );
    }

}

export default AddContentPage;
