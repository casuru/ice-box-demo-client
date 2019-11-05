import React from "react";
import ProductRow from './ProductRow';
import {Container} from 'react-bootstrap';

class ProductList extends React.Component{


    componentDidMount(){

        window.addEventListener('scroll', this.onScroll, false);
    }

    componentWillUnmount(){
        window.removeEventListener('scroll', this.onScroll, false)
    }

    onScroll = () => {

        const windowHeight = window.innerHeight;
        const documentHeight = document.body.offsetHeight;
        const scrolledPixels = window.scrollY;

        if((windowHeight + scrolledPixels) >= (documentHeight - 500)) {

            this.props.onEndReached();
        };

    }


    render(){

        const productRows = this.props.products.map((product) => (
            <ProductRow
                name = {product.name}
                id = {product.id}
                description = {product.description}
                sizes = {product.sizes}
                showAuthModal = {this.props.showAuthModal}
                showCartModal = {this.props.showCartModal}
                updateOrders = {this.props.updateOrders}
            />
        ))

        return(
            <Container className = "product-list">
                {productRows}
            </Container>
        );
    }
}


export default ProductList;