import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';

import { Container, Content, Spinner } from 'native-base';

// Components
import AppBar from './components/AppBar';
import CartItem from './components/CartItem';

// Data Services
// import { getProducts } from './services/fakeProductServices';
// import { getProducts as Cart, saveProduct } from './services/fakeCartServices';

export default class ProductList extends Component {
  state = {
    products: [],
    cart: [],
    spinner: true
  };

  async componentDidMount() {
    const products = await axios.get(
      'http://192.168.0.9:3333/api/v1/products/'
    );
    // const cart = await axios.get('http://192.168.0.9:3333/api/v1/orders/');
    const cart = [...this.state.cart];

    this.setState({
      products: products.data,
      cart,
      spinner: false
    });
  }

  handlePressBuyItem = async product => {
    // const data = {
    //   product_id: product.id,
    //   qty: 1,
    //   price: product.price
    // };

    // await axios
    //   .post('http://192.168.0.9:3333/api/v1/orders/', data)
    //   .then(res => alert(JSON.stringify(res.data.status)));

    // const orders = await axios.get('http://192.168.0.9:3333/api/v1/orders/');

    const cart = [...this.state.cart, product];

    // const cart = orders.data.length;
    this.setState({ cart });
  };

  handlePressProduct = productId => {
    const cart = this.state.cart;
    Actions.productDetail({ productId, cart });
  };

  render() {
    const { products, cart, spinner } = this.state;

    return (
      <Container>
        <AppBar
          showBackNav={false}
          title="Flash Deal"
          cart={this.props.totalCart ? this.props.totalCart : cart.length}
        />
        <Content
          contentContainerStyle={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-evenly'
          }}
        >
          {spinner ? (
            <Spinner color="#E40044" />
          ) : (
            products.map((item, index) => (
              <CartItem
                onPressBuy={this.handlePressBuyItem}
                key={index}
                products={item}
                onPress={this.handlePressProduct}
              />
            ))
          )}
        </Content>
      </Container>
    );
  }
}
