import React from 'react';
import {Modal, Button} from 'react-bootstrap';
import OrderForm from './OrderForm';
import config from '../config';

class CartModal extends React.Component{

    onCheckOut = async() => {

        const endpoint = config.root + 'cart/';

        const authToken = localStorage.getItem("iceboxAuthToken");

        const payload = JSON.stringify({
            status:'c'
        });

        const response = await fetch(endpoint, {
            method: 'PATCH',
            body: payload,
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + authToken
            }
        });

        if(response.status === 200){

            this.props.onHide();

            return;
        }
        
    }

    render(){

        

        const orderForms = this.props.orders.map((order) => (
            <OrderForm
                productId = {order.product}
                order = {order.id}
                size = {order.size}
                quantity = {order.quantity}
                updateOrders = {this.props.updateOrders}
            />
        ));

        return(
            <Modal show = {this.props.isVisible} onHide = {this.props.onHide}>
                <Modal.Header closeButton> 
                    <Modal.Title>Your Cart</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {orderForms}
                </Modal.Body>
                <Modal.Footer>
                    {this.props.orders.length > 0 && <Button onClick = {this.onCheckOut}>Check Out</Button>}
                    <Button onClick = {this.props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}


export default CartModal;