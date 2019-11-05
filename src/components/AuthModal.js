import React from 'react';
import {Modal, Form, FormControl, Button} from 'react-bootstrap';
import config from '../config';


class AuthModal extends React.Component{


    constructor(props){
        super(props);

        this.state = {
            isShowingSignInForm: true,
            usernameErrors:'',
            emailErrors:'',
            passwordErrors:'',
            username:'',
            email:'',
            password:''
        }
    }


    clearErrors = () => {

        this.setState({
            usernameErrors: '',
            emailErrors:'',
            passwordErrors:''
        });
    }

    updateUsername = (event) => {

        this.setState({
            username:event.target.value
        });
    }

    updateEmail = (event) => {

        this.setState({
            email:event.target.value
        });
    }

    updatePassword = (event) => {


        this.setState({
            password:event.target.value
        });
    }

    signIn = async() => {


        this.clearErrors();

        const endpoint = config.root + 'auth/token/';
        const payload = JSON.stringify({
            username: this.state.username,
            password: this.state.password
        });

        const response = await fetch(endpoint, {
            method: 'POST',
            body: payload,
            headers: {
                'Content-Type': 'application/json'
              }
        });

        const responseJson = await response.json();


        if(response.status === 400){

            this.setState({
                usernameErrors: responseJson.username,
                passwordErrors: responseJson.password,
                nonFieldErrors: responseJson.non_field_errors
            });
        }


        if(response.status === 200){

            this.props.setCredentials(responseJson.token);
            this.props.onHide();
        }
    }


    signUp = async() => {

        this.clearErrors();

        const endpoint =  config.root + 'users/';

        const payload = JSON.stringify({
            username: this.state.username,
            email: this.state.email,
            password: this.state.password
        });

        const response = await fetch(endpoint, {
            method: 'POST',
            body: payload,
            headers: {
                'Content-Type': 'application/json'
              }
        });

        const responseJson = await response.json();

        if(response.status === 400){

            this.setState({
                usernameErrors: responseJson.username,
                emailErrors: responseJson.email,
                passwordErrors: responseJson.password,
                nonFieldErrors: responseJson.non_field_errors
            });

            return;
        }

        this.signIn();

    }

    toggleForm = () => {

        this.clearErrors();

        this.setState({
            isShowingSignInForm: !this.state.isShowingSignInForm
        });
    }


    render(){

        return(
            <Modal show = {this.props.isVisible} onHide = {this.props.onHide}>
                <Modal.Header closeButton>
                    <Modal.Title>{this.state.isShowingSignInForm ? 'Sign In' : 'Sign Up'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {this.state.nonFieldErrors && 
                    <div class="alert alert-danger" role="alert">
                        {this.state.nonFieldErrors}
                    </div>}
                    <Form.Group>
                        <Form.Label>
                            Username
                        </Form.Label>
                        <FormControl
                            placeholder = {'Username'}
                            value = {this.state.username}
                            onChange = {this.updateUsername}
                        />
                        {this.state.usernameErrors && 
                        <div class="alert alert-danger" role="alert">
                            {this.state.usernameErrors}
                        </div>}
                    </Form.Group>
                    {!this.state.isShowingSignInForm && 
                    <Form.Group>
                        <Form.Label>
                            Email
                        </Form.Label>
                        <FormControl
                            placeholder = {'email'}
                            onChange = {this.updateEmail}
                        />
                        {this.state.emailErrors && 
                        <div class="alert alert-danger" role="alert">
                            {this.state.emailErrors}
                        </div>}
                    </Form.Group>}

                    <Form.Group>
                        <Form.Label>
                            Password
                        </Form.Label>
                        <FormControl
                            placeholder = {'Password'}
                            type={'password'}
                            onChange = {this.updatePassword}
                        />
                        {this.state.passwordErrors && 
                        <div class="alert alert-danger" role="alert">
                            {this.state.passwordErrors}
                        </div>}
                    </Form.Group>
                    
                </Modal.Body>
                <Modal.Footer>
                    {this.state.isShowingSignInForm && 
                    <Button 
                        onClick = {this.signIn} 
                        variant="primary">
                            Sign In
                    </Button>}
                    {this.state.isShowingSignInForm && 
                    <Button
                        onClick = {this.toggleForm}
                        variant="secondary">
                            Sign Up
                    </Button>}
                    {!this.state.isShowingSignInForm && 
                    <Button 
                        onClick = {this.signUp} 
                        variant="primary">
                            Sign Up
                    </Button>}
                    {!this.state.isShowingSignInForm && 
                    <Button 
                        onClick = {this.toggleForm} 
                        variant="secondary">
                            Sign In
                    </Button>}
                </Modal.Footer>
            </Modal>
        );
    }
}


export default AuthModal;

