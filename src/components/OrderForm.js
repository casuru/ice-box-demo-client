import React from 'react';
import {Media, Form, FormControl, Button} from 'react-bootstrap';
import config from '../config';


class OrderForm extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            product: '',
            quantity: this.props.quantity,
            quantityErrors:''
        }
    }

    componentDidMount(){

        this.fetchProduct();
    }

    fetchProduct = async() => {

        const productId = this.props.productId;
        const endpoint = config.root + `products/${productId}/`;

        const response = await fetch(endpoint);

        const responseJson = await response.json();

        this.setState({
            product: responseJson
        })

    }

    
    clearErrors = () => {

        this.setState({
            updateFailure:false,
            updateSuccess: false,
            quantityErrors:''
        });
    }

    updateQuantity = (event) => {

        if(!isNaN(event.target.value)){
            this.setState({
                quantity: event.target.value
            });
        }
    }

    updateItemInCart = async() => {

        this.clearErrors();

        const authToken = localStorage.getItem('iceboxAuthToken');
        const endpoint = config.root + 'cart/';


        const payload = JSON.stringify({
            product: this.props.productId,
            size: this.props.size,
            quantity:parseInt(this.state.quantity)
        });

        const response = await fetch(endpoint, {
            method:'POST',
            body: payload,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + authToken
              }
        });



        const responseJson = await response.json();

        if(response.status === 400){

            this.setState({
                updateFailure: true,
                quantityErrors: responseJson.quantity
            });

            return;
        }

        this.setState({
            updateSuccess: true
        });
    }



    removeItemFromCart = async() => {

        const authToken = localStorage.getItem('iceboxAuthToken');
        const endpoint = config.root + 'cart/';

        const payload = JSON.stringify({
            product: this.props.productId,
            size: this.props.size,
            action: 'remove'
        });

        const response = await fetch(endpoint, {
            method:'POST',
            body: payload,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + authToken
              }
        });

        const responseJson = await response.json();

        this.props.updateOrders(responseJson.order_set);

    }

    render(){

        return(
            <Media>
                {this.state.product && 
                <img
                    width={64}
                    height={64}
                    className="mr-3"
                    src="https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
                    alt={this.state.product.name}
                />}
                <Media.Body>
                    {this.state.product && <h5>{this.state.product.name} : {this.props.size}</h5>}

                    <FormControl placeholder = {'Quantity'} value = {this.state.quantity} onChange = {this.updateQuantity}/>
                    {this.state.updateSuccess && 
                    <div class="alert alert-success" role="alert">
                            Order Updated Successfully
                    </div>}

                    {this.state.updateFailure && 
                    <div class="alert alert-danger" role="alert">
                        {this.state.quantityErrors}
                    </div>}
                    <Button onClick = {this.updateItemInCart}>
                        Update
                    </Button>
                    <Button onClick = {this.removeItemFromCart}>
                        Remove
                    </Button>
                </Media.Body>
                
            </Media>
        );
    }
}

export default OrderForm;