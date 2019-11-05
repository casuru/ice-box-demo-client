import React from 'react';
import ProductList from './components/ProductList';
import NavBar from './components/NavBar';
import AuthModal from './components/AuthModal';
import CartModal from './components/CartModal';
import config from './config';
import './App.css';

class App extends React.Component{


  constructor(props){
    super(props);

    this.state = {
      products: [],
      orders:[],
      nextProducts: null,
      previousProducts: null,
      authModalIsVisible: false,
      isAuthenticated: false,
      hasFetchedProducts: false
    }
  }

  componentDidMount(){

    this.checkCredentials();
    this.getProducts();
  }

  checkCredentials = () => {

    const authToken = localStorage.getItem('iceboxAuthToken');

    if(authToken === null){

        this.setState({
            isAuthenticated: false
        });
    } else if (authToken !== null){
        this.setState({
            isAuthenticated: true
        });
    }

  }

  setCredentials = (authToken) => {

    localStorage.setItem('iceboxAuthToken', authToken);
    this.checkCredentials();
  }


  showAuthModal = () => {

    this.setState({
      authModalIsVisible: true
    });
  }


  hideAuthModal = () => {

    this.setState({
      authModalIsVisible: false
    });
  }

  showCartModal = () => {

    this.setState({
      cartModalIsVisible: true
    });
  }

  hideCartModal = () => {

    this.setState({
      cartModalIsVisible: false
    });
  }

  updateOrders = (orders) => {

    this.setState({
      orders:orders
    });
  }

  signOut = () => {

    localStorage.removeItem('iceboxAuthToken');
    this.checkCredentials();
  }


  getProducts = async() => {

    console.log("Fetching more products");

    const endpoint = this.state.hasFetchedProducts ? this.state.nextProducts : config.root + 'products/';

    if(endpoint === null){

      return;
    }


    const response = await fetch(endpoint);

    const responseJson = await response.json();

    const products = this.state.products.concat(responseJson.results);

    this.setState({
      products: products,
      nextProducts: responseJson.next,
      previousProducts: responseJson.previous,
      hasFetchedProducts: true
    });

  }





  render(){
    return (
      <div className="App">
          <NavBar 
            isAuthenticated = {this.state.isAuthenticated} 
            onClickSignInButton = {this.showAuthModal}
            onClickSignOutButton = {this.signOut}
          />
          <ProductList 
            products = {this.state.products} 
            showAuthModal = {this.showAuthModal}
            showCartModal = {this.showCartModal}
            updateOrders = {this.updateOrders}
            onEndReached = {this.getProducts}
          />
          <AuthModal 
            isVisible = {this.state.authModalIsVisible} 
            onHide = {this.hideAuthModal}
            setCredentials = {this.setCredentials}
          />
          <CartModal
            isVisible = {this.state.cartModalIsVisible}
            orders = {this.state.orders}
            onHide = {this.hideCartModal}
          />
      </div>
    );
  }
}

export default App;
