import React from "react";
import {Card, Button, Form, FormControl} from "react-bootstrap";
import config from '../config';

class ProductRow extends React.Component {


    addItemToCart = async() => {

        const authToken = localStorage.getItem('iceboxAuthToken');
        const endpoint = config.root + 'cart/';


        if(authToken === null){

            this.props.showAuthModal();

            return;
        }

        const payload = JSON.stringify({
            product: this.props.id,
            size: this.refs.sizeInput.value,
            quantity: 1
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
        this.props.showCartModal();

    }


    render(){

        const sizeOptions = this.props.sizes.map((size) => (<option id={size} value={size}>{size}</option>))
        return(

            <Card>
                <Card.Img 
                    variant="top" 
                    src="https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png" 
                />
                <Card.Body>
                    <Card.Title>{this.props.name}</Card.Title>
                    <Card.Text>{this.props.description}</Card.Text>
                    <div style = {{width:'109.16px', margin: 'auto'}}>
                        <Form>
                            <FormControl as={'select'} ref = {'sizeInput'}>
                                {sizeOptions}
                            </FormControl>
                            <Button onClick= {this.addItemToCart}>Add To Cart</Button>
                        </Form>
                    </div>

                </Card.Body>
            </Card>
        );
    }
}


export default ProductRow;